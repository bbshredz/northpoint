// NorthPoint nav.js v3
// renderNav('page-id')

function renderNav(active) {
    const isRoot = !location.pathname.split('/').filter(Boolean).some(seg =>
        ['budget','team','facilities','software','projects','field-guide','it-overview'].includes(seg)
    );
    const base = isRoot ? '.' : '..';

    const pages = [
        { id: 'hub',         href: `${base}/index.html`,            label: 'Hub',               icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>` },
        { id: 'it-overview', href: `${base}/it-overview/index.html`,label: 'IT Overview',        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>` },
        { id: 'budget',      href: `${base}/budget/index.html`,     label: 'Budget & Finance',   icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>` },
        { id: 'team',        href: `${base}/team/index.html`,       label: 'Team & Org',         icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>` },
        { id: 'facilities',  href: `${base}/facilities/index.html`, label: 'Facility Ops',       icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>` },
        { id: 'software',    href: `${base}/software/index.html`,   label: 'Software & Vendors', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>` },
        { id: 'projects',    href: `${base}/projects/index.html`,   label: 'Projects',           icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>` },
        { id: 'field-guide', href: `${base}/field-guide/index.html`,label: 'Field Guide',        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>` },
    ];

    const mount = document.getElementById('rail-mount');
    if (!mount) return;

    mount.innerHTML = `
    <aside class="rail" id="np-rail">
        <button class="rail-toggle" id="rail-toggle-btn" title="Pin open">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="rail-logo-row">
            <a href="${base}/index.html" class="rail-logo" title="NorthPoint">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </a>
            <span class="rail-logo-label">NorthPoint</span>
        </div>
        <nav class="rail-nav">
            <div class="rail-divider"></div>
            ${pages.map(p => `
            <a href="${p.href}" class="rail-item ${active === p.id ? 'active' : ''}">
                ${p.icon}
                <span class="rail-item-label">${p.label}</span>
            </a>`).join('')}
        </nav>
        <div class="rail-footer">
            <div class="rail-user">
                <div class="rail-avatar">AT</div>
                <div class="rail-user-info">
                    <div class="rail-user-name">Anthony Trujillo</div>
                    <div class="rail-user-role">IT Director</div>
                </div>
            </div>
        </div>
    </aside>`;

    // Expand/collapse logic
    const rail = document.getElementById('np-rail');
    const toggleBtn = document.getElementById('rail-toggle-btn');
    const STORAGE_KEY = 'np-rail-pinned';
    let pinned = localStorage.getItem(STORAGE_KEY) === 'true';
    let hoverTimer;

    function open()  { rail.classList.add('is-open'); }
    function close() { if (!pinned) rail.classList.remove('is-open'); }

    if (pinned) open();

    rail.addEventListener('mouseenter', () => { clearTimeout(hoverTimer); open(); });
    rail.addEventListener('mouseleave', () => { hoverTimer = setTimeout(close, 120); });

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        pinned = !pinned;
        localStorage.setItem(STORAGE_KEY, pinned);
        pinned ? open() : rail.classList.remove('is-open');
        toggleBtn.title = pinned ? 'Unpin' : 'Pin open';
    });

    // Date injection
    const dateEl = document.getElementById('currentDate');
    if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    const updatedEl = document.getElementById('lastUpdated');
    if (updatedEl) updatedEl.textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}