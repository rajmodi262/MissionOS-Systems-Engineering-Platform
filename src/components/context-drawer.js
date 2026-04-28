/* ============================================================
   Context Drawer — Right Zone
   ============================================================ */

import { on } from '../core/events.js';
import { icons } from '../utils/svg-icons.js';

export function createContextDrawer() {
  const drawer = document.createElement('aside');
  drawer.className = 'zone-drawer glass-panel';
  drawer.id = 'context-drawer';

  drawer.innerHTML = `
    <div style="padding: var(--space-lg);">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-lg);">
        <h3 class="font-heading" style="font-size:1rem;letter-spacing:0.12em;color:var(--text-secondary);">CONTEXT</h3>
        <span style="color:var(--text-dim);font-family:var(--font-mono);font-size:0.7rem;">PANEL</span>
      </div>
      <div id="drawer-content" class="drawer-content">
        <div style="text-align:center;padding:var(--space-3xl) var(--space-lg);">
          <div style="color:var(--text-ghost);margin-bottom:var(--space-md);">${icons.search}</div>
          <p class="font-body" style="color:var(--text-dim);font-size:0.9rem;">Select an item to view its details, relationships, and actions.</p>
          <p class="font-mono" style="color:var(--text-ghost);font-size:0.7rem;margin-top:var(--space-sm);">Click any requirement, subsystem, or risk item</p>
        </div>
      </div>
    </div>
  `;

  on('select-item', (item) => {
    if (!item) return;
    const content = drawer.querySelector('#drawer-content');
    content.innerHTML = renderItemDetails(item);
    content.style.animation = 'fadeInUp 0.3s var(--ease-out-expo)';
  });

  return drawer;
}

function renderItemDetails(item) {
  if (!item) return '';

  const statusColor = {
    'verified': 'green', 'active': 'green', 'nominal': 'green',
    'draft': 'amber', 'in-review': 'amber', 'warning': 'amber', 'monitoring': 'amber',
    'failed': 'red', 'critical': 'red', 'blocked': 'red',
  }[item.status] || 'blue';

  return `
    <div style="animation:fadeInUp 0.3s var(--ease-out-expo)">
      <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md);">
        <span class="glass-badge glass-badge--${statusColor}">${item.status || 'N/A'}</span>
        <span class="font-mono" style="color:var(--text-dim);font-size:0.7rem;">${item.id || ''}</span>
      </div>

      <h4 class="font-heading" style="font-size:1.1rem;color:var(--text-primary);margin-bottom:var(--space-md);">
        ${item.title || item.name || item.text?.slice(0, 60) || 'Untitled'}
      </h4>

      ${item.text ? `<p class="font-body" style="color:var(--text-secondary);font-size:0.85rem;line-height:1.7;margin-bottom:var(--space-lg);">${item.text}</p>` : ''}

      ${item.owner ? `
        <div style="margin-bottom:var(--space-md);">
          <span class="font-mono" style="color:var(--text-dim);font-size:0.7rem;display:block;margin-bottom:4px;">OWNER</span>
          <span class="font-mono" style="color:var(--text-secondary);font-size:0.8rem;">${item.owner}</span>
        </div>
      ` : ''}

      ${item.priority ? `
        <div style="margin-bottom:var(--space-md);">
          <span class="font-mono" style="color:var(--text-dim);font-size:0.7rem;display:block;margin-bottom:4px;">PRIORITY</span>
          <span class="glass-badge glass-badge--${item.priority === 'critical' ? 'red' : item.priority === 'high' ? 'amber' : 'blue'}">${item.priority}</span>
        </div>
      ` : ''}

      ${item.mitigation ? `
        <div style="margin-bottom:var(--space-md);">
          <span class="font-mono" style="color:var(--text-dim);font-size:0.7rem;display:block;margin-bottom:4px;">MITIGATION</span>
          <p class="font-body" style="color:var(--text-secondary);font-size:0.8rem;line-height:1.6;">${item.mitigation}</p>
        </div>
      ` : ''}

      <div style="margin-top:var(--space-lg);display:flex;flex-direction:column;gap:var(--space-sm);">
        <button class="glass-btn glass-btn--primary" style="width:100%;justify-content:center;">
          ${item.text ? 'EDIT REQUIREMENT' : item.mitigation ? 'UPDATE RISK' : 'VIEW DETAILS'}
        </button>
        <button class="glass-btn" style="width:100%;justify-content:center;">VIEW TRACE LINKS</button>
      </div>
    </div>
  `;
}
