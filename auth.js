// NorthPoint — auth.js v2
// Shared session + role management
// Include on every protected page BEFORE nav.js

const SUPABASE_URL = 'https://vpxlgtgavjmftbdsajtk.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xrH6NCenOJGh84f9NTf3WQ_xL8cmp3a';
const LOGIN_URL = '/login/index.html';

const _npSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let _npUser    = null;
let _npRole    = null;
let _npModules = [];

async function npInit(requireModule = null) {
  const { data: { session } } = await _npSupabase.auth.getSession();

  if (!session) {
    window.location.href = LOGIN_URL + '?next=' + encodeURIComponent(window.location.pathname);
    return null;
  }

  _npUser = session.user;

  const { data: roleData } = await _npSupabase
    .from('user_roles')
    .select('role, modules')
    .eq('user_id', _npUser.id)
    .single();

  if (roleData) {
    _npRole    = roleData.role;
    _npModules = roleData.modules || [];
  } else {
    _npRole    = 'staff';
    _npModules = ['team','facilities','software','projects','field-guide'];
  }

  if (requireModule) {
    const mods = Array.isArray(requireModule) ? requireModule : [requireModule];
    if (!mods.some(m => npHasModule(m))) {
      window.location.href = '/index.html';
      return null;
    }
  }

  return { user: _npUser, role: _npRole, modules: _npModules };
}

// Modules automatically granted by role (no Supabase modules column entry required)
const ROLE_MODULES = {
  exec: ['restructure', 'budget-planner', 'responsibility-planner'],
};

function npHasModule(module) {
  if (_npRole === 'admin') return true;
  if (ROLE_MODULES[_npRole]?.includes(module)) return true;
  return _npModules.includes(module);
}

function npGetUser()        { return _npUser; }
function npGetRole()        { return _npRole; }
function npGetInitials()    { if (!_npUser?.email) return '?'; return _npUser.email.split('@')[0].slice(0,2).toUpperCase(); }
function npGetDisplayName() { if (!_npUser?.email) return ''; return _npUser.email.split('@')[0]; }

async function npSignOut() {
  await _npSupabase.auth.signOut();
  window.location.href = LOGIN_URL;
}

function npPopulateTopbar() {
  const roleEl = document.getElementById('topbarRole');
  const date   = document.getElementById('currentDate');
  if (roleEl) {
    const labels = { admin: 'Admin', staff: 'Staff', director: 'Director', exec: 'Executive', executive: 'Executive' };
    roleEl.textContent = labels[_npRole] || _npRole || '';
  }
  if (date) date.textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  });
}
