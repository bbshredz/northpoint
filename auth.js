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

  if (requireModule && !npHasModule(requireModule)) {
    window.location.href = '/index.html';
    return null;
  }

  return { user: _npUser, role: _npRole, modules: _npModules };
}

function npHasModule(module) {
  if (_npRole === 'admin') return true;
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
  const avatar = document.getElementById('topbarAvatar');
  const date   = document.getElementById('currentDate');
  if (avatar) avatar.textContent = npGetInitials();
  if (date)   date.textContent   = new Date().toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  });
}
