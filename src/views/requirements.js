/* ============================================================
   Requirements Engineering Workspace View
   Three sub-views: Document, Hierarchy, RTM
   ============================================================ */

import { requirements, missions } from '../core/data.js';
import { selectItem } from '../core/state.js';
import { analyzeRequirement } from '../utils/ai-engine.js';

const missionId = 'MSN-001';

export async function renderRequirements(container) {
  const reqs = requirements[missionId] || [];
  const mission = missions.find(m => m.id === missionId);

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h1>REQUIREMENTS ENGINEERING</h1>
        <p class="subtitle">${mission?.name || 'MISSION'} // ${reqs.length} REQUIREMENTS TRACKED</p>
      </div>
      <div class="ai-indicator" id="ai-indicator" style="opacity:0">
        <div class="ai-ring"></div>
        <span>ORION ANALYZING</span>
      </div>
    </div>

    <div class="tab-bar">
      <button class="tab-btn active" data-tab="document">Document View</button>
      <button class="tab-btn" data-tab="hierarchy">Hierarchy View</button>
      <button class="tab-btn" data-tab="rtm">Traceability Matrix</button>
    </div>

    <div id="req-tab-content"></div>
  `;

  // Tab switching
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      if (tab === 'document') renderDocumentView(reqs);
      else if (tab === 'hierarchy') renderHierarchyView(reqs);
      else if (tab === 'rtm') renderRTMView(reqs, mission);
    });
  });

  renderDocumentView(reqs);
}

function renderDocumentView(reqs) {
  const content = document.getElementById('req-tab-content');
  if (!content) return;

  content.innerHTML = `
    <div class="req-list" id="req-list">
      ${reqs.map((req, idx) => `
        <div class="req-item status-${req.status}" data-idx="${idx}" id="req-${req.id}" style="animation: fadeInUp 0.4s var(--ease-out-expo) ${idx * 50}ms both;">
          <span class="req-id">${req.id}</span>
          <div style="flex:1;">
            <div class="req-text" id="text-${req.id}">${req.text}</div>
            <div class="ai-suggestions" id="ai-${req.id}"></div>
          </div>
          <div class="req-meta">
            <span class="glass-badge glass-badge--${req.status === 'verified' ? 'green' : req.status === 'failed' ? 'red' : req.status === 'draft' ? 'amber' : 'blue'}">${req.status}</span>
            <span class="glass-badge glass-badge--blue">${req.verification}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Click to select & show AI analysis
  content.querySelectorAll('.req-item').forEach(item => {
    item.addEventListener('click', () => {
      content.querySelectorAll('.req-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      const idx = parseInt(item.dataset.idx);
      const req = reqs[idx];
      selectItem(req);

      // Run AI analysis
      const aiEl = document.getElementById('ai-indicator');
      if (aiEl) aiEl.style.opacity = '1';

      setTimeout(() => {
        const suggestions = analyzeRequirement(req.text);
        const aiContainer = document.getElementById(`ai-${req.id}`);
        if (aiContainer) {
          aiContainer.innerHTML = suggestions.map(s =>
            `<span class="ai-chip ${s.type}">${s.icon} ${s.text}</span>`
          ).join('');
        }
        if (aiEl) aiEl.style.opacity = '0';
      }, 800);
    });

    // Double-click to edit
    item.addEventListener('dblclick', () => {
      const textEl = item.querySelector('.req-text');
      if (textEl) {
        textEl.contentEditable = 'true';
        textEl.focus();
        textEl.addEventListener('blur', () => {
          textEl.contentEditable = 'false';
          const suggestions = analyzeRequirement(textEl.textContent);
          const req = reqs[parseInt(item.dataset.idx)];
          const aiContainer = document.getElementById(`ai-${req.id}`);
          if (aiContainer) {
            aiContainer.innerHTML = suggestions.map(s =>
              `<span class="ai-chip ${s.type}">${s.icon} ${s.text}</span>`
            ).join('');
          }
        }, { once: true });
      }
    });
  });
}

function renderHierarchyView(reqs) {
  const content = document.getElementById('req-tab-content');
  if (!content) return;

  const stakeholderNeeds = ['STK-001: Crew Safety', 'STK-002: Communication', 'STK-003: Mission Success', 'STK-004: Standards', 'STK-005: Science'];
  const sysReqs = reqs.filter(r => r.level === 'system');
  const subReqs = reqs.filter(r => r.level === 'subsystem');

  content.innerHTML = `
    <div style="position:relative;width:100%;height:calc(100vh - 240px);overflow:auto;">
      <svg width="100%" height="100%" id="hierarchy-svg" style="position:absolute;top:0;left:0;pointer-events:none;z-index:0;"></svg>
      <div style="position:relative;z-index:1;">
        <!-- Tier 0: Stakeholder Needs -->
        <div style="display:flex;justify-content:center;gap:var(--space-xl);padding:var(--space-xl) 0;">
          ${stakeholderNeeds.map((s, i) => `
            <div class="hierarchy-node tier-0" style="position:relative;" id="stk-${i}">
              <span style="font-size:0.55rem;line-height:1.2;">${s.split(':')[0]}<br/>${s.split(':')[1]}</span>
            </div>
          `).join('')}
        </div>

        <!-- Tier 1: System Requirements -->
        <div style="display:flex;justify-content:center;gap:var(--space-lg);padding:var(--space-xl) 0;">
          ${sysReqs.map((r, i) => `
            <div class="hierarchy-node tier-1" id="sys-${i}" title="${r.text}">
              <span>${r.id}</span>
            </div>
          `).join('')}
        </div>

        <!-- Tier 2: Subsystem Requirements -->
        <div style="display:flex;justify-content:center;gap:var(--space-md);padding:var(--space-xl) 0;flex-wrap:wrap;">
          ${subReqs.map((r, i) => `
            <div class="hierarchy-node tier-2" id="sub-${i}" title="${r.text}">
              <span style="font-size:0.5rem;">${r.id}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    <div style="display:flex;gap:var(--space-lg);padding:var(--space-md);justify-content:center;">
      <span style="display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:0.7rem;color:var(--text-dim);">
        <span style="width:12px;height:12px;border-radius:50%;border:2px solid var(--plasma-green);"></span> Stakeholder Needs
      </span>
      <span style="display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:0.7rem;color:var(--text-dim);">
        <span style="width:10px;height:10px;border-radius:50%;border:2px solid var(--photon-blue);"></span> System Requirements
      </span>
      <span style="display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:0.7rem;color:var(--text-dim);">
        <span style="width:8px;height:8px;border-radius:50%;border:2px solid var(--solar-amber);"></span> Subsystem Requirements
      </span>
    </div>
  `;

  // Click nodes to select
  content.querySelectorAll('.hierarchy-node').forEach(node => {
    node.addEventListener('click', () => {
      const id = node.id;
      if (id.startsWith('sub-')) {
        const idx = parseInt(id.split('-')[1]);
        selectItem(subReqs[idx]);
      } else if (id.startsWith('sys-')) {
        const idx = parseInt(id.split('-')[1]);
        selectItem(sysReqs[idx]);
      }
    });
  });
}

function renderRTMView(reqs, mission) {
  const content = document.getElementById('req-tab-content');
  if (!content) return;

  const subsystems = mission?.subsystems || ['Propulsion', 'Avionics', 'Power', 'Thermal', 'Comms'];
  const traceMatrix = reqs.map(req => {
    return subsystems.map(() => {
      const r = Math.random();
      if (r > 0.7) return 'strong';
      if (r > 0.5) return 'weak';
      if (r > 0.4) return 'gap';
      return 'empty';
    });
  });

  content.innerHTML = `
    <div class="rtm-container">
      <table class="rtm-table">
        <thead>
          <tr>
            <th>REQUIREMENT</th>
            ${subsystems.map(s => `<th>${s.toUpperCase().slice(0, 6)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${reqs.map((req, ri) => `
            <tr>
              <td>
                <div style="display:flex;align-items:center;gap:6px;">
                  <span style="width:4px;height:4px;border-radius:50%;background:${req.status === 'verified' ? 'var(--plasma-green)' : req.status === 'failed' ? 'var(--critical-red)' : 'var(--solar-amber)'};"></span>
                  ${req.id}
                </div>
              </td>
              ${traceMatrix[ri].map(cell => `
                <td>
                  <div class="rtm-cell ${cell}">
                    ${cell === 'strong' ? '<span style="color:var(--plasma-green);font-size:0.7rem;">●</span>' : ''}
                    ${cell === 'weak' ? '<span style="color:var(--solar-amber);font-size:0.6rem;">◐</span>' : ''}
                    ${cell === 'gap' ? '<div class="gap-dot"></div>' : ''}
                  </div>
                </td>
              `).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div style="display:flex;gap:var(--space-lg);padding:var(--space-md);justify-content:center;">
      <span style="display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:0.7rem;color:var(--text-dim);">
        <span style="color:var(--plasma-green);">●</span> Verified Trace
      </span>
      <span style="display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:0.7rem;color:var(--text-dim);">
        <span style="color:var(--solar-amber);">◐</span> Unverified
      </span>
      <span style="display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:0.7rem;color:var(--text-dim);">
        <span style="width:6px;height:6px;border-radius:50%;background:var(--critical-red);display:inline-block;"></span> Gap Detected
      </span>
    </div>
  `;

  // Click cells to select
  content.querySelectorAll('.rtm-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      const tr = cell.closest('tr');
      const reqId = tr?.querySelector('td')?.textContent.trim();
      const req = reqs.find(r => r.id === reqId);
      if (req) selectItem(req);
    });
  });
}
