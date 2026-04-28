/* ============================================================
   Sidebar Component — Mission Spine
   ============================================================ */

import { icons, icon } from '../utils/svg-icons.js';
import { getState, setState } from '../core/state.js';
import { navigate, getCurrentRoute } from '../core/router.js';
import { on } from '../core/events.js';

const navItems = [
  { id: 'simulator', label: 'Mission Simulator', icon: 'simulator', route: '/simulator', badge: 'new' },
  { id: 'command-center', label: 'Command Center', icon: 'command', route: '/command-center' },
  { id: 'requirements', label: 'Requirements', icon: 'requirements', route: '/requirements', badge: 'warning' },
  { id: 'architecture', label: 'Architecture', icon: 'architecture', route: '/architecture' },
  { id: 'diagrams', label: 'Engineering Theater', icon: 'theater', route: '/diagrams' },
  { id: 'n2-matrix', label: 'N² Matrix', icon: 'n2matrix', route: '/n2-matrix' },
  { id: 'risk', label: 'Risk Management', icon: 'risk', route: '/risk', badge: 'danger' },
  { id: 'trade-study', label: 'Trade Studies', icon: 'tradeStudy', route: '/trade-study' },
  { id: 'vmodel', label: 'V-Model Lifecycle', icon: 'vmodel', route: '/vmodel' },
  { id: 'documents', label: 'Document Studio', icon: 'documents', route: '/documents' },
  { id: 'countdown', label: 'Launch Countdown', icon: 'countdown', route: '/countdown' },
];

export function createSidebar() {
  const sidebar = document.createElement('aside');
  sidebar.className = 'mission-spine zone-sidebar';
  sidebar.id = 'mission-spine';

  const user = getState('currentUser') || { initials: 'CM', name: 'Commander' };

  sidebar.innerHTML = `
    <div class="spine-logo">
      <div class="spine-logo-icon">${icons.orion}</div>
      <span class="spine-logo-text">MISSION OS</span>
    </div>

    <nav class="spine-nav" id="spine-nav">
      ${navItems.map(item => `
        <button class="spine-item" data-route="${item.route}" id="nav-${item.id}">
          <span class="spine-item-icon">${icons[item.icon] || ''}</span>
          <span class="spine-item-label">${item.label}</span>
          ${item.badge ? `<span class="spine-item-badge ${item.badge}"></span>` : ''}
        </button>
      `).join('')}
    </nav>

    <div class="spine-bottom">
      <div class="spine-user" id="spine-user">
        <div class="spine-user-avatar">${user.initials}</div>
        <span class="spine-user-name">${user.name}</span>
      </div>
    </div>
  `;

  // Click handlers
  sidebar.querySelectorAll('.spine-item').forEach(item => {
    item.addEventListener('click', () => {
      const route = item.dataset.route;
      navigate(route);
    });
  });

  // Update active state on navigation
  function updateActive() {
    const current = getCurrentRoute();
    sidebar.querySelectorAll('.spine-item').forEach(item => {
      item.classList.toggle('active', item.dataset.route === current);
    });
  }

  window.addEventListener('hashchange', updateActive);
  setTimeout(updateActive, 50);

  // Update user info on state change
  on('state-change', ({ current }) => {
    if (current.currentUser) {
      const avatar = sidebar.querySelector('.spine-user-avatar');
      const name = sidebar.querySelector('.spine-user-name');
      if (avatar) avatar.textContent = current.currentUser.initials;
      if (name) name.textContent = current.currentUser.name;
    }
  });

  return sidebar;
}
