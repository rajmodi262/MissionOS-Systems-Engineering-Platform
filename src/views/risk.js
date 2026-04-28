/* ============================================================
   Risk Management View
   ============================================================ */

import { risks, missions } from '../core/data.js';
import { selectItem } from '../core/state.js';

const missionId = 'MSN-001';

export async function renderRisk(container) {
  const riskList = risks[missionId] || [];
  const allRisks = Object.values(risks).flat();
  const mission = missions.find(m => m.id === missionId);

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h1>RISK MANAGEMENT</h1>
        <p class="subtitle">${mission?.name || 'MISSION'} // ${riskList.length} ACTIVE RISKS // ${allRisks.filter(r => r.status === 'critical').length} CRITICAL</p>
      </div>
    </div>

    <div class="risk-layout">
      <!-- Left: 5x5 Heatmap -->
      <div class="risk-matrix-container glass-panel">
        <h3 class="section-title" style="margin-bottom:var(--space-md);">RISK MATRIX</h3>
        <div class="risk-matrix-grid" id="risk-matrix"></div>
        <div class="risk-axis-title">LIKELIHOOD →</div>
      </div>

      <!-- Right: Risk List -->
      <div class="risk-list-container glass-panel">
        <h3 class="section-title" style="margin-bottom:var(--space-md);">RISK REGISTER</h3>
        <div id="risk-list"></div>
      </div>
    </div>
  `;

  renderMatrix(riskList);
  renderRiskList(riskList);
}

function renderMatrix(riskList) {
  const grid = document.getElementById('risk-matrix');
  if (!grid) return;

  const getColor = (l, c) => {
    const score = l * c;
    if (score >= 15) return 'red';
    if (score >= 10) return 'orange';
    if (score >= 5) return 'yellow';
    return 'green';
  };

  let html = '';

  // Rows: consequence 5 (top) to 1 (bottom)
  for (let c = 5; c >= 1; c--) {
    // Y axis label
    html += `<div class="risk-axis-label">${c}</div>`;

    for (let l = 1; l <= 5; l++) {
      const cellRisks = riskList.filter(r => r.likelihood === l && r.consequence === c);
      html += `
        <div class="risk-cell ${getColor(l, c)}" data-l="${l}" data-c="${c}">
          ${cellRisks.map(r => `
            <div class="risk-dot ${r.status}" title="${r.id}: ${r.title}" data-risk-id="${r.id}"></div>
          `).join('')}
        </div>
      `;
    }
  }

  // X axis labels
  html += '<div></div>';
  for (let l = 1; l <= 5; l++) {
    html += `<div class="risk-axis-label">${l}</div>`;
  }

  grid.innerHTML = html;

  // Click handlers for dots
  grid.querySelectorAll('.risk-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = dot.dataset.riskId;
      const risk = riskList.find(r => r.id === id);
      if (risk) selectItem(risk);
    });
  });
}

function renderRiskList(riskList) {
  const list = document.getElementById('risk-list');
  if (!list) return;

  list.innerHTML = riskList.map((r, idx) => {
    const score = r.likelihood * r.consequence;
    const scoreClass = score >= 15 ? 'high' : score >= 8 ? 'medium' : 'low';

    return `
      <div class="risk-item ${r.status}" data-idx="${idx}" style="animation: fadeInUp 0.4s var(--ease-out-expo) ${idx * 80}ms both;">
        <div class="risk-score ${scoreClass}">${score}</div>
        <div style="flex:1;">
          <div class="risk-title">${r.title}</div>
          <div class="risk-meta-row">
            <span class="glass-badge glass-badge--${r.status === 'critical' ? 'red' : r.status === 'active' ? 'amber' : r.status === 'mitigated' ? 'green' : 'blue'}">${r.status}</span>
            <span class="font-mono" style="font-size:0.65rem;color:var(--text-dim);">L:${r.likelihood} × C:${r.consequence}</span>
            <span class="font-mono" style="font-size:0.65rem;color:var(--text-dim);">→ ${r.owner}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  list.querySelectorAll('.risk-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.idx);
      selectItem(riskList[idx]);
    });
  });
}
