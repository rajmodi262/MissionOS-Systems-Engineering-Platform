/* ============================================================
   N² Interface Matrix View
   ============================================================ */

import { subsystemLibrary } from '../core/data.js';
import { selectItem } from '../core/state.js';

const interfaceTypes = {
  'data': { label: 'Data', color: '#00C8FF', icon: '↔' },
  'power': { label: 'Power', color: '#FFB830', icon: '⚡' },
  'thermal': { label: 'Thermal', color: '#FF6B35', icon: '🌡' },
  'mechanical': { label: 'Mechanical', color: '#90A4AE', icon: '⚙' },
  'none': { label: '', color: 'transparent', icon: '' },
};

function generateInterfaces() {
  const subs = subsystemLibrary;
  const matrix = [];
  for (let i = 0; i < subs.length; i++) {
    const row = [];
    for (let j = 0; j < subs.length; j++) {
      if (i === j) { row.push('self'); continue; }
      const r = Math.random();
      if (r > 0.6) row.push('data');
      else if (r > 0.45) row.push('power');
      else if (r > 0.35) row.push('thermal');
      else if (r > 0.25) row.push('mechanical');
      else row.push('none');
    }
    matrix.push(row);
  }
  return matrix;
}

export async function renderN2Matrix(container) {
  const subs = subsystemLibrary;
  const matrix = generateInterfaces();

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h1>N² INTERFACE MATRIX</h1>
        <p class="subtitle">ARTEMIS-VII // ${subs.length} SUBSYSTEMS // INTERFACE MAPPING</p>
      </div>
    </div>

    <div style="overflow:auto;padding:var(--space-md) 0;">
      <table style="border-collapse:collapse;margin:0 auto;">
        <thead>
          <tr>
            <th style="padding:8px;width:80px;"></th>
            ${subs.map(s => `
              <th style="padding:8px;writing-mode:vertical-lr;text-align:left;font-family:var(--font-mono);font-size:0.65rem;color:${s.color};letter-spacing:0.05em;min-width:55px;">
                ${s.abbr}
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          ${subs.map((rowSub, i) => `
            <tr>
              <td style="padding:8px;font-family:var(--font-mono);font-size:0.7rem;color:${rowSub.color};white-space:nowrap;text-align:right;padding-right:12px;">
                ${rowSub.abbr}
              </td>
              ${subs.map((colSub, j) => {
                const cellType = matrix[i][j];
                if (cellType === 'self') {
                  return `<td style="padding:3px;">
                    <div style="width:50px;height:50px;background:${rowSub.color}20;border:2px solid ${rowSub.color};border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:0.6rem;color:${rowSub.color};">
                      ${rowSub.abbr}
                    </div>
                  </td>`;
                }
                const iface = interfaceTypes[cellType];
                return `<td style="padding:3px;">
                  <div class="n2-cell" data-from="${rowSub.abbr}" data-to="${colSub.abbr}" data-type="${cellType}" style="width:50px;height:50px;background:${cellType !== 'none' ? iface.color + '12' : 'rgba(255,255,255,0.01)'};border:1px solid ${cellType !== 'none' ? iface.color + '30' : 'rgba(255,255,255,0.04)'};border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;cursor:${cellType !== 'none' ? 'pointer' : 'default'};transition:all 0.2s ease;font-size:0.8rem;">
                    ${cellType !== 'none' ? iface.icon : ''}
                  </div>
                </td>`;
              }).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Legend -->
    <div style="display:flex;gap:var(--space-xl);justify-content:center;padding:var(--space-lg) 0;">
      ${Object.entries(interfaceTypes).filter(([k]) => k !== 'none').map(([key, val]) => `
        <span style="display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:0.7rem;color:var(--text-dim);">
          <span style="width:12px;height:12px;background:${val.color}30;border:1px solid ${val.color};border-radius:2px;display:flex;align-items:center;justify-content:center;font-size:0.6rem;">${val.icon}</span>
          ${val.label}
        </span>
      `).join('')}
    </div>
  `;

  // Hover effects and click to select
  container.querySelectorAll('.n2-cell').forEach(cell => {
    cell.addEventListener('mouseenter', () => {
      if (cell.dataset.type !== 'none') {
        cell.style.transform = 'scale(1.15)';
        cell.style.zIndex = '5';
        cell.style.boxShadow = `0 0 12px ${interfaceTypes[cell.dataset.type].color}40`;
      }
    });
    cell.addEventListener('mouseleave', () => {
      cell.style.transform = '';
      cell.style.zIndex = '';
      cell.style.boxShadow = '';
    });
    cell.addEventListener('click', () => {
      if (cell.dataset.type === 'none') return;
      const iface = interfaceTypes[cell.dataset.type];
      selectItem({
        id: `IFC-${cell.dataset.from}-${cell.dataset.to}`,
        title: `${cell.dataset.from} → ${cell.dataset.to} Interface`,
        status: 'active',
        text: `${iface.label} interface between ${cell.dataset.from} and ${cell.dataset.to} subsystems. This interface carries ${iface.label.toLowerCase()} signals/connections and must be formally documented in the Interface Control Document (ICD).`,
        owner: 'Interface Control Board',
        priority: 'high',
      });
    });
  });
}
