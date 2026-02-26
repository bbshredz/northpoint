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
      module: 'team',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`
    },
    {
      id: 'facilities',
      href: '/facilities/index.html',
      label: 'Facility Ops',
      module: 'facilities',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
    },
    {
      id: 'software',
      href: '/software/index.html',
      label: 'Software & Vendors',
      module: 'software',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`
    },
    {
      id: 'projects',
      href: '/projects/index.html',
      label: 'Projects',
      module: 'projects',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`
    },
    {
      id: 'field-guide',
      href: '/field-guide/index.html',
      label: 'Field Guide',
      module: 'field-guide',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`
    },
    // ── Direct-access pages for exec/review role ──
    {
      id: 'restructure',
      href: '/budget/restructure/index.html',
      label: 'Case for Restructure',
      module: 'restructure',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`
    },
    {
      id: 'budget-planner',
      href: '/budget/planner/index.html',
      label: 'Budget Planner',
      module: 'budget-planner',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`
    },
    {
      id: 'responsibility-planner',
      href: '/team/responsibility-planner/index.html',
      label: 'Roles & Responsibilities',
      module: 'responsibility-planner',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`
    },
  ];

  const mount = document.getElementById('rail-mount');
  if (!mount) return;

  const initials    = typeof npGetInitials    === 'function' ? npGetInitials()    : 'AT';
  const displayName = typeof npGetDisplayName === 'function' ? npGetDisplayName() : '';
  const role        = typeof npGetRole        === 'function' ? npGetRole()        : '';

  const visiblePages = pages.filter(p =>
    !p.module || (typeof npHasModule === 'function' && npHasModule(p.module))
  );

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
