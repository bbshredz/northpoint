// NorthPoint Shared Navigation
// Include this script in every page and call renderNav('active-page-id')
// active: 'hub' | 'overview' | 'operations' | 'strategy' | 'field-guide'

function renderNav(active) {
    const root = location.pathname.includes('/northpoint/') ? '/northpoint' : '.';
    const base = root;

    const pages = [
        {
            id: 'hub',
            href: `${base}/index.html`,
            label: 'Hub',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`
        },
        {
            id: 'overview',
            href: `${base}/overview/index.html`,
            label: 'Overview',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`
        },
        {
            id: 'operations',
            href: `${base}/operations/index.html`,
            label: 'Operations',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>`
        },
        {
            id: 'strategy',
            href: `${base}/strategy/index.html`,
            label: 'Strategy',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`
        },
        {
            id: 'field-guide',
            href: `${base}/field-guide/index.html`,
            label: 'Field Guide',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`
        }
    ];

    const railHTML = `
    <aside class="rail">
        <a href="${base}/index.html" class="rail-logo" title="NorthPoint">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
        </a>
        <nav class="rail-nav">
            <div class="rail-divider"></div>
            ${pages.map(p => `
            <a href="${p.href}" class="rail-item ${active === p.id ? 'active' : ''}" title="${p.label}">
                ${p.icon}
                <span class="rail-tooltip">${p.label}</span>
            </a>`).join('')}
        </nav>
    </aside>`;

    document.getElementById('rail-mount').innerHTML = railHTML;

    // Live date
    const d = new Date();
    const el = document.getElementById('currentDate');
    if (el) el.textContent = d.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const lu = document.getElementById('lastUpdated');
    if (lu) lu.textContent = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
