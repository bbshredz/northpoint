// NorthPoint — auth.js v2
// Shared session + role management
// Include on every protected page BEFORE nav.js

// FOUC prevention — apply saved theme + hide body until auth resolves
// Uses body (not html) so html background is visible during view transition snapshots
(function(){
  var t = localStorage.getItem('np-theme');
  if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  var style = document.createElement('style');
  style.id = 'np-fouc';
  style.textContent = 'body { opacity: 0; transition: opacity 0.14s ease; }';
  document.head.appendChild(style);
}());

const SUPABASE_URL = 'https://vpxlgtgavjmftbdsajtk.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xrH6NCenOJGh84f9NTf3WQ_xL8cmp3a';
const LOGIN_URL = '/login/index.html';

const _npSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let _npUser          = null;
let _npRole          = null;
let _npModules       = [];
let _npDisplayName   = null;
let _npModuleControl = {}; // moduleId → 'live' | 'hidden' | 'maintenance'

async function npInit(requireModule = null) {
  const { data: { session } } = await _npSupabase.auth.getSession();

  if (!session) {
    window.location.href = LOGIN_URL + '?next=' + encodeURIComponent(window.location.pathname);
    return null;
  }

  _npUser = session.user;

  const [{ data: roleData }, { data: roleDefs }, { data: mcData }] = await Promise.all([
    _npSupabase.from('user_roles').select('role, modules').eq('user_id', _npUser.id).single(),
    _npSupabase.from('role_definitions').select('role, modules'),
    _npSupabase.from('module_control').select('module_id, state'),
  ]);

  if (roleDefs?.length) {
    roleDefs.forEach(r => { _npRoleModules[r.role] = r.modules || []; });
  }

  if (roleData) {
    _npRole    = roleData.role;
    _npModules = roleData.modules || [];
  } else {
    _npRole    = 'staff';
    _npModules = [];
  }

  if (mcData) mcData.forEach(r => { _npModuleControl[r.module_id] = r.state; });

  // Look up display name from employees table by email
  const { data: empData } = await _npSupabase
    .from('employees')
    .select('first_name, last_name, name')
    .eq('email', _npUser.email)
    .maybeSingle();
  if (empData) {
    _npDisplayName = (empData.first_name && empData.last_name)
      ? `${empData.first_name} ${empData.last_name}`
      : empData.name || null;
  }

  if (requireModule) {
    const mods = Array.isArray(requireModule) ? requireModule : [requireModule];
    if (!mods.some(m => npHasModule(m))) {
      window.location.href = '/index.html';
      return null;
    }
  }

  var fouc = document.getElementById('np-fouc');
  if (fouc) fouc.remove();
  return { user: _npUser, role: _npRole, modules: _npModules };
}

// Role → modules map. Loaded from role_definitions table in npInit; these are fallbacks.
let _npRoleModules = {
  exec:     ['executive','budget','restructure','budget-planner','responsibility-planner','swot','risk-register'],
  director: ['team','facilities','software','projects','field-guide'],
  staff:    ['team','facilities','software','projects','field-guide'],
};

function npHasModule(module) {
  if (_npRole === 'admin') return true;
  const ctrl = _npModuleControl[module] || 'live';
  if (ctrl !== 'live') return false;
  if (_npRoleModules[_npRole]?.includes(module)) return true;
  return _npModules.includes(module);
}

function npGetModuleState(module) {
  return _npModuleControl[module] || 'live';
}

function npGetRoleModules() { return _npRoleModules; }

// Allow pages with custom init flows to populate auth context for npHasModule / nav rendering
function npSetAuthContext(role, modules) {
  _npRole    = role || 'staff';
  _npModules = Array.isArray(modules) ? modules : [];
}

function npGetUser()        { return _npUser; }
function npGetRole()        { return _npRole; }
function npGetInitials()    { if (!_npUser?.email) return '?'; const n = _npDisplayName || _npUser.user_metadata?.full_name; if (n) { const p = n.trim().split(/\s+/); return (p[0][0] + (p[1]?.[0] || '')).toUpperCase(); } return _npUser.email.split('@')[0].slice(0,2).toUpperCase(); }
function npGetDisplayName() { if (!_npUser?.email) return ''; const n = _npDisplayName || _npUser.user_metadata?.full_name || _npUser.email.split('@')[0]; return n.split(' ')[0]; }

async function npSignOut() {
  await _npSupabase.auth.signOut();
  window.location.href = LOGIN_URL;
}

function npPopulateTopbar() {
  const roleEl = document.getElementById('topbarRole');
  const date   = document.getElementById('currentDate');
  if (roleEl) {
    const labels = { admin: 'Admin', staff: 'Staff', director: 'Director', exec: 'Executive', executive: 'Executive', limited: 'Limited' };
    roleEl.textContent = labels[_npRole] || _npRole || '';
  }
  if (date) date.textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  });
}
