# NorthPoint — Claude Code Migration Brief
# Paste this entire prompt when you launch `claude` in the repo folder

---

## CONTEXT

This is the NorthPoint repo — an internal IT operations platform for NACS (a skilled nursing facility company). It's a GitHub Pages static site currently served at `nacs.space` but being migrated to `northpoint.nacs.space`.

The site uses:
- Plain HTML/CSS/JS — no build tools, no frameworks
- `northpoint.css` — shared styles (in repo root)
- `nav.js` — shared navigation rail (in repo root)
- `auth.js` — authentication (in repo root)
- Supabase for auth and database (already integrated in some pages)
- Google Fonts: DM Serif Display + DM Sans
- Design: navy/white/silver palette, clean editorial style

---

## TASK LIST — complete all of these

---

### 1. UPDATE CNAME

Change the contents of `CNAME` from `nacs.space` to `northpoint.nacs.space`

---

### 2. REPLACE nav.js

Replace the entire contents of `nav.js` with the following. Do not modify anything — copy exactly:

```javascript
// NorthPoint — nav.js v4
// Subdomain: northpoint.nacs.space
// Absolute paths from /
// Role-aware: requires auth.js loaded first

function renderNav(active) {

  const pages = [
    {
      id: 'hub',
      href: '/index.html',
      label: 'Overview',
      module: null,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`
    },
    {
      id: 'executive-overview',
      href: '/executive-overview/index.html',
      label: 'Executive Overview',
      module: 'executive',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`
    },
    {
      id: 'budget',
      href: '/budget/index.html',
      label: 'Budget & Finance',
      module: 'budget',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`
    },
    {
      id: 'team',
      href: '/team/index.html',
      label: 'Team & Org',
      module: null,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`
    },
    {
      id: 'facilities',
      href: '/facilities/index.html',
      label: 'Facility Ops',
      module: null,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
    },
    {
      id: 'software',
      href: '/software/index.html',
      label: 'Software & Vendors',
      module: null,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`
    },
    {
      id: 'projects',
      href: '/projects/index.html',
      label: 'Projects',
      module: null,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`
    },
    {
      id: 'field-guide',
      href: '/field-guide/index.html',
      label: 'Field Guide',
      module: null,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`
    },
  ];

  const visiblePages = pages.filter(p => {
    if (!p.module) return true;
    if (typeof npHasModule === 'function') return npHasModule(p.module);
    return false;
  });

  const mount = document.getElementById('rail-mount');
  if (!mount) return;

  const initials    = typeof npGetInitials    === 'function' ? npGetInitials()    : 'AT';
  const displayName = typeof npGetDisplayName === 'function' ? npGetDisplayName() : '';
  const role        = typeof npGetRole        === 'function' ? npGetRole()        : '';

  mount.innerHTML = `
  <aside class="rail" id="np-rail">
    <button class="rail-toggle" id="rail-toggle-btn" title="Pin open">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <div class="rail-logo-row">
      <a href="/index.html" class="rail-logo" title="NorthPoint">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </a>
      <span class="rail-logo-label">NorthPoint</span>
    </div>
    <nav class="rail-nav">
      <div class="rail-divider"></div>
      ${visiblePages.map(p => `
      <a href="${p.href}" class="rail-item ${active === p.id ? 'active' : ''}">
        ${p.icon}
        <span class="rail-item-label">${p.label}</span>
      </a>`).join('')}
    </nav>
    <div class="rail-footer">
      <div class="rail-user" id="rail-user-btn">
        <div class="rail-avatar">${initials}</div>
        <div class="rail-user-info">
          <div class="rail-user-name">${displayName}</div>
          <div class="rail-user-role">${role}</div>
        </div>
      </div>
      <div class="rail-user-menu" id="rail-user-menu">
        <div class="rum-name">${displayName}</div>
        <div class="rum-email">${typeof npGetUser === 'function' && npGetUser() ? npGetUser().email : ''}</div>
        <button class="rum-signout" onclick="npSignOut()">Sign out</button>
      </div>
    </div>
  </aside>`;

  const rail      = document.getElementById('np-rail');
  const toggleBtn = document.getElementById('rail-toggle-btn');
  const STORAGE_KEY = 'np-rail-pinned';
  let pinned = localStorage.getItem(STORAGE_KEY) === 'true';
  let hoverTimer;

  function openRail()  { rail.classList.add('is-open'); }
  function closeRail() { if (!pinned) rail.classList.remove('is-open'); }

  if (pinned) openRail();

  rail.addEventListener('mouseenter', () => { clearTimeout(hoverTimer); openRail(); });
  rail.addEventListener('mouseleave', () => { hoverTimer = setTimeout(closeRail, 120); });

  toggleBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    pinned = !pinned;
    localStorage.setItem(STORAGE_KEY, pinned);
    pinned ? openRail() : rail.classList.remove('is-open');
    toggleBtn.title = pinned ? 'Unpin' : 'Pin open';
  });

  const userBtn  = document.getElementById('rail-user-btn');
  const userMenu = document.getElementById('rail-user-menu');
  if (userBtn && userMenu) {
    userBtn.addEventListener('click', e => {
      e.stopPropagation();
      userMenu.classList.toggle('open');
    });
    document.addEventListener('click', () => userMenu.classList.remove('open'));
  }

  const dateEl = document.getElementById('currentDate');
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  });
  const updatedEl = document.getElementById('lastUpdated');
  if (updatedEl) updatedEl.textContent = new Date().toLocaleDateString('en-US', {
    month: 'short', day: 'numeric'
  });
}
```

---

### 3. REPLACE auth.js

Replace the entire contents of `auth.js` with the following:

```javascript
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
```

---

### 4. CREATE login page

Create a new folder `login/` in the repo root and create `login/index.html` with the following content. This is the shared login page for the entire platform:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sign In — NorthPoint</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<style>
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
:root {
  --navy: #0f172a; --navy-2: #1e293b; --navy-3: #334155;
  --accent: #3b82f6; --accent-glow: rgba(59,130,246,0.25);
  --text: #f8fafc; --text-sub: #94a3b8; --text-dim: #475569; --error: #f87171;
}
body { font-family: 'DM Sans', sans-serif; background: var(--navy); min-height: 100vh; display: flex; align-items: stretch; -webkit-font-smoothing: antialiased; overflow: hidden; }
.left { width: 52%; background: var(--navy-2); display: flex; flex-direction: column; justify-content: space-between; padding: 48px 56px; position: relative; overflow: hidden; }
.left::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px); background-size: 40px 40px; }
.left::after { content: ''; position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%); top: -100px; left: -100px; pointer-events: none; }
.left-content { position: relative; z-index: 1; }
.brand { display: flex; align-items: center; gap: 14px; margin-bottom: 80px; }
.brand-logo { width: 44px; height: 44px; background: var(--accent); border-radius: 13px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 28px var(--accent-glow); }
.brand-logo svg { width: 22px; height: 22px; }
.brand-name { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--text); letter-spacing: -0.3px; }
.brand-sub { font-size: 11px; color: var(--text-dim); letter-spacing: 0.5px; margin-top: 1px; }
.hero-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 20px; }
.hero-title { font-family: 'DM Serif Display', serif; font-size: 52px; line-height: 1.08; color: var(--text); letter-spacing: -1px; margin-bottom: 24px; }
.hero-title em { color: var(--text-sub); font-style: italic; }
.hero-desc { font-size: 15px; color: var(--text-sub); line-height: 1.7; max-width: 380px; font-weight: 300; }
.left-footer { position: relative; z-index: 1; }
.modules { display: flex; gap: 8px; flex-wrap: wrap; }
.module-pill { padding: 5px 12px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); font-size: 11px; color: var(--text-dim); font-weight: 500; background: rgba(255,255,255,0.03); }
.left-copy { font-size: 11px; color: var(--text-dim); margin-top: 16px; }
.right { flex: 1; display: flex; align-items: center; justify-content: center; padding: 48px; background: var(--navy); }
.login-box { width: 100%; max-width: 380px; animation: slideUp 0.4s ease both; }
.login-title { font-size: 26px; font-weight: 600; color: var(--text); margin-bottom: 6px; letter-spacing: -0.4px; }
.login-sub { font-size: 13.5px; color: var(--text-sub); margin-bottom: 40px; line-height: 1.5; }
.field { margin-bottom: 18px; }
.field-label { display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--text-dim); margin-bottom: 8px; }
.field-input { width: 100%; padding: 12px 16px; background: var(--navy-2); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: var(--text); font-size: 14px; font-family: inherit; transition: all 0.2s; }
.field-input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
.field-input::placeholder { color: var(--text-dim); }
.submit-btn { width: 100%; padding: 13px; margin-top: 8px; background: var(--accent); border: none; border-radius: 10px; color: white; font-size: 14px; font-weight: 600; font-family: inherit; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 16px rgba(59,130,246,0.25); }
.submit-btn:hover { opacity: 0.92; transform: translateY(-1px); }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.error-msg { font-size: 12.5px; color: var(--error); margin-top: 12px; min-height: 18px; display: flex; align-items: center; gap: 6px; }
.divider { height: 1px; background: rgba(255,255,255,0.07); margin: 32px 0; }
.org-badge { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); }
.org-dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; flex-shrink: 0; box-shadow: 0 0 6px rgba(16,185,129,0.5); animation: pulse 2.5s ease infinite; }
@keyframes pulse { 0%,100% { box-shadow: 0 0 6px rgba(16,185,129,0.5); } 50% { box-shadow: 0 0 10px rgba(16,185,129,0.3); } }
.org-text { font-size: 12px; color: var(--text-sub); line-height: 1.4; }
.org-text strong { color: var(--text); font-weight: 600; }
@keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 768px) { body { flex-direction: column; overflow: auto; } .left { width: 100%; padding: 32px; } .hero-title { font-size: 36px; } .right { padding: 32px; } }
</style>
</head>
<body>
<div class="left">
  <div class="left-content">
    <div class="brand">
      <div class="brand-logo"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
      <div><div class="brand-name">NorthPoint</div><div class="brand-sub">NACS INFORMATION TECHNOLOGY</div></div>
    </div>
    <div class="hero-label">IT Operations Platform</div>
    <h1 class="hero-title">Where IT<br>gets <em>done.</em></h1>
    <p class="hero-desc">The single source of truth for NACS Information Technology — budget, team structure, software governance, and operational planning across all facilities.</p>
  </div>
  <div class="left-footer">
    <div class="modules">
      <div class="module-pill">Overview</div>
      <div class="module-pill">Budget & Finance</div>
      <div class="module-pill">Team & Org</div>
      <div class="module-pill">Facility Ops</div>
      <div class="module-pill">Software & Vendors</div>
      <div class="module-pill">Projects</div>
      <div class="module-pill">Field Guide</div>
    </div>
    <div class="left-copy">Access to modules is based on your assigned role.</div>
  </div>
</div>
<div class="right">
  <div class="login-box">
    <div class="login-title">Sign in</div>
    <div class="login-sub">Use your NACS credentials to access NorthPoint.</div>
    <div class="field"><label class="field-label" for="email">Email</label><input type="email" class="field-input" id="email" placeholder="you@naclientservices.com" autocomplete="email" /></div>
    <div class="field"><label class="field-label" for="password">Password</label><input type="password" class="field-input" id="password" placeholder="••••••••" autocomplete="current-password" /></div>
    <button class="submit-btn" id="submitBtn" onclick="signIn()">Sign In</button>
    <div class="error-msg" id="errorMsg"></div>
    <div class="divider"></div>
    <div class="org-badge">
      <div class="org-dot"></div>
      <div class="org-text"><strong>Secure access</strong><br>Credentials managed by NACS IT. Contact Anthony if you need access.</div>
    </div>
  </div>
</div>
<script>
const { createClient } = supabase;
const db = createClient('https://vpxlgtgavjmftbdsajtk.supabase.co', 'sb_publishable_xrH6NCenOJGh84f9NTf3WQ_xL8cmp3a');
async function checkExistingSession() {
  const { data: { session } } = await db.auth.getSession();
  if (session) redirectAfterLogin();
}
function redirectAfterLogin() {
  const params = new URLSearchParams(window.location.search);
  const next = params.get('next');
  if (next && next.startsWith('/')) { window.location.href = next; }
  else { window.location.href = '/index.html'; }
}
async function signIn() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const btn = document.getElementById('submitBtn');
  const errEl = document.getElementById('errorMsg');
  errEl.innerHTML = '';
  if (!email || !password) { showError('Please enter your email and password.'); return; }
  btn.disabled = true;
  btn.textContent = 'Signing in…';
  const { data, error } = await db.auth.signInWithPassword({ email, password });
  if (error) {
    btn.disabled = false;
    btn.textContent = 'Sign In';
    showError(error.message === 'Invalid login credentials' ? 'Incorrect email or password.' : error.message);
    return;
  }
  btn.textContent = 'Redirecting…';
  redirectAfterLogin();
}
function showError(msg) {
  document.getElementById('errorMsg').textContent = msg;
}
document.addEventListener('keydown', e => { if (e.key === 'Enter') signIn(); });
checkExistingSession();
</script>
</body>
</html>
```

---

### 5. UPDATE every HTML page to use shared auth

For every `index.html` file across all folders, make these changes:

**A. Add Supabase + auth scripts** in the `<head>` BEFORE the closing `</head>` tag (and before any existing `<script src="nav.js">` or `<script src="auth.js">`):

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="/auth.js"></script>
```

**B. Remove any old password-gate logic** — look for any inline script blocks that check a hardcoded password, show/hide `.sensitive` elements, or prompt for a password. Remove those entirely.

**C. Update the init call** — find where `renderNav(...)` is called in each page's `<script>` block and wrap it with `npInit()`. Use this pattern:

```javascript
// Pages that are open to all logged-in users:
npInit(null).then(session => {
  if (!session) return;
  npPopulateTopbar();
  renderNav('PAGE_ID_HERE');
  // rest of existing page init code goes here
});

// executive-overview/index.html only — requires executive module:
npInit('executive').then(session => {
  if (!session) return;
  npPopulateTopbar();
  renderNav('executive-overview');
});

// budget/index.html only — requires budget module:
npInit('budget').then(session => {
  if (!session) return;
  npPopulateTopbar();
  renderNav('budget');
});
```

**Page IDs for renderNav calls:**
- `index.html` → `'hub'`
- `executive-overview/index.html` → `'executive-overview'`
- `budget/index.html` → `'budget'`
- `team/index.html` → `'team'`
- `facilities/index.html` → `'facilities'`
- `software/index.html` → `'software'`
- `projects/index.html` → `'projects'`
- `field-guide/index.html` → `'field-guide'`
- `team/responsibility-planner/index.html` → `'team'`

**D. Update CSS/script paths** — change any relative paths like `../northpoint.css`, `../nav.js`, `../auth.js` to absolute paths:
- `<link rel="stylesheet" href="/northpoint.css">`
- `<script src="/nav.js"></script>`
- `<script src="/auth.js"></script>`

---

### 6. REMOVE it-overview from nav

The `it-overview` folder can stay on disk (don't delete it) but it should no longer appear in the nav. The new nav.js already handles this — `it-overview` is simply not in the pages list.

---

### 7. ADD northpoint.css styles for rail user menu

At the end of `northpoint.css`, add these styles for the new user menu in the rail footer:

```css
/* ── RAIL USER MENU ── */
.rail-footer {
  width: 100%;
  padding: 0 12px 16px;
  position: relative;
}

.rail-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.18s;
  overflow: hidden;
}

.rail-user:hover { background: rgba(255,255,255,0.06); }

.rail-avatar {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.rail-user-info {
  opacity: 0;
  transition: opacity 0.2s;
  white-space: nowrap;
  overflow: hidden;
}

.rail.is-open .rail-user-info { opacity: 1; }

.rail-user-name {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
}

.rail-user-role {
  font-size: 10px;
  color: rgba(255,255,255,0.35);
  text-transform: capitalize;
}

.rail-user-menu {
  position: absolute;
  bottom: calc(100% + 4px);
  left: 12px;
  right: 12px;
  background: #1e293b;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  padding: 10px;
  display: none;
  z-index: 300;
}

.rail-user-menu.open { display: block; }

.rum-name {
  font-size: 12px;
  font-weight: 600;
  color: white;
  padding: 4px 6px 2px;
}

.rum-email {
  font-size: 11px;
  color: #64748b;
  padding: 0 6px 8px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  margin-bottom: 4px;
}

.rum-signout {
  width: 100%;
  padding: 7px 6px;
  border: none;
  background: none;
  color: #f87171;
  font-size: 12px;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  border-radius: 6px;
}

.rum-signout:hover { background: rgba(248,113,113,0.1); }
```

---

### 8. COMMIT and push

After all changes are made:

```bash
git add .
git commit -m "feat: shared auth, absolute nav paths, login page, role-aware nav"
git push
```

---

## IMPORTANT NOTES

- The Supabase project URL is `https://vpxlgtgavjmftbdsajtk.supabase.co`
- The anon key is `sb_publishable_xrH6NCenOJGh84f9NTf3WQ_xL8cmp3a`
- Do NOT add `<script src="/auth.js">` to `login/index.html` — the login page handles its own auth inline
- Do NOT modify the `team/responsibility-planner/index.html` auth logic — it has its own Supabase auth that will be migrated separately
- The `it-overview` folder stays on disk, just not linked from nav
- If a page already loads `northpoint.css` via a relative path like `../northpoint.css`, change it to `/northpoint.css`
- Preserve all existing page content and functionality — only modify auth wiring, script paths, and nav calls
