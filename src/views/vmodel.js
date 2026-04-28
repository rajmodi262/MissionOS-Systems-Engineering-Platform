/* ============================================================
   V-Model Lifecycle Tracker View
   ============================================================ */

export async function renderVModel(container) {
  const phases = [
    { name: 'Mission Need', status: 'completed', side: 'left', x: 80, y: 60 },
    { name: 'ConOps', status: 'completed', side: 'left', x: 170, y: 140 },
    { name: 'System Reqs', status: 'completed', side: 'left', x: 260, y: 220 },
    { name: 'Architecture', status: 'active', side: 'left', x: 350, y: 300 },
    { name: 'Detailed Design', status: 'future', side: 'left', x: 440, y: 380 },
    { name: 'Integration', status: 'future', side: 'bottom', x: 480, y: 440 },
    { name: 'Unit Test', status: 'future', side: 'right', x: 520, y: 380 },
    { name: 'Subsys Integration', status: 'future', side: 'right', x: 610, y: 300 },
    { name: 'System Verif', status: 'future', side: 'right', x: 700, y: 220 },
    { name: 'Mission Valid', status: 'future', side: 'right', x: 790, y: 140 },
    { name: 'Acceptance', status: 'future', side: 'right', x: 880, y: 60 },
  ];

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h1>V-MODEL LIFECYCLE</h1>
        <p class="subtitle">ARTEMIS-VII // CURRENT PHASE: ARCHITECTURE DESIGN</p>
      </div>
      <button class="glass-btn glass-btn--primary" id="gate-check-btn">GATE READINESS CHECK</button>
    </div>
    <div class="vmodel-container">
      <svg class="vmodel-svg" viewBox="0 0 960 500" xmlns="http://www.w3.org/2000/svg">
        <!-- V-shape arms -->
        <path d="M 80 60 L 440 380 L 480 440 L 520 380 L 880 60"
              fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>

        <!-- Animated particle flow along V -->
        <path d="M 80 60 L 440 380 L 480 440 L 520 380 L 880 60" id="v-path"
              fill="none" stroke="url(#vGradient)" stroke-width="2" stroke-dasharray="6 4" opacity="0.4">
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite"/>
        </path>

        <defs>
          <linearGradient id="vGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="var(--plasma-green)"/>
            <stop offset="50%" stop-color="var(--photon-blue)"/>
            <stop offset="100%" stop-color="var(--plasma-green)"/>
          </linearGradient>
        </defs>

        <!-- Horizontal verification lines -->
        ${[0,1,2,3,4].map(i => {
          const left = phases[i];
          const right = phases[10 - i];
          return `<line x1="${left.x}" y1="${left.y}" x2="${right.x}" y2="${right.y}"
                        stroke="var(--text-ghost)" stroke-width="1" stroke-dasharray="4 4" opacity="0.3"/>`;
        }).join('')}

        <!-- Nodes -->
        ${phases.map((p, i) => {
          const hexPath = `M ${p.x} ${p.y-20} L ${p.x+18} ${p.y-10} L ${p.x+18} ${p.y+10} L ${p.x} ${p.y+20} L ${p.x-18} ${p.y+10} L ${p.x-18} ${p.y-10} Z`;
          return `
            <g class="vmodel-node ${p.status}" data-idx="${i}" style="cursor:pointer;">
              <path d="${hexPath}" class="vmodel-node-hex" fill="rgba(0,255,157,0.05)" stroke="var(--plasma-green)" stroke-width="1.5"/>
              <text x="${p.x}" y="${p.y + 38}" class="vmodel-label">${p.name}</text>
              ${p.status === 'completed' ? `<text x="${p.x}" y="${p.y + 5}" text-anchor="middle" fill="var(--plasma-green)" font-size="14">✓</text>` : ''}
              ${p.status === 'active' ? `<circle cx="${p.x}" cy="${p.y}" r="4" fill="var(--photon-blue)"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/></circle>` : ''}
            </g>
          `;
        }).join('')}
      </svg>

      <!-- Legend -->
      <div style="display:flex;gap:var(--space-xl);margin-top:var(--space-lg);">
        <span style="display:flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:0.7rem;color:var(--plasma-green);">
          <span style="width:12px;height:12px;background:var(--plasma-green-dim);border:1.5px solid var(--plasma-green);"></span> Completed
        </span>
        <span style="display:flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:0.7rem;color:var(--photon-blue);">
          <span style="width:12px;height:12px;background:var(--photon-blue-dim);border:1.5px solid var(--photon-blue);border-radius:50%;"></span> Active
        </span>
        <span style="display:flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:0.7rem;color:var(--text-ghost);">
          <span style="width:12px;height:12px;border:1.5px dashed var(--text-ghost);"></span> Future
        </span>
      </div>
    </div>

    <div id="gate-modal-mount"></div>
  `;

  // Gate readiness check
  document.getElementById('gate-check-btn')?.addEventListener('click', () => {
    showGateCheck();
  });

  // Click nodes
  container.querySelectorAll('.vmodel-node').forEach(node => {
    node.addEventListener('click', () => {
      const idx = parseInt(node.dataset.idx);
      if (phases[idx].status === 'active') showGateCheck();
    });
  });
}

function showGateCheck() {
  const mount = document.getElementById('gate-modal-mount');
  if (!mount) return;

  const artifacts = [
    { name: 'System Requirements Document (SRD)', complete: true },
    { name: 'Functional Architecture Diagram', complete: true },
    { name: 'Physical Architecture Diagram', complete: true },
    { name: 'Interface Control Document (ICD)', complete: false },
    { name: 'N² Interface Matrix', complete: true },
    { name: 'Risk Register (updated)', complete: false },
    { name: 'Requirements Traceability Matrix', complete: true },
    { name: 'Trade Study Results', complete: true },
    { name: 'Test & Verification Plan', complete: false },
    { name: 'PDR Review Package', complete: false },
  ];

  const completedCount = artifacts.filter(a => a.complete).length;

  mount.innerHTML = `
    <div class="gate-modal" id="gate-modal">
      <div class="gate-modal-content glass-panel glass-panel--elevated">
        <h2 class="font-heading" style="font-size:1.3rem;color:var(--solar-amber);margin-bottom:var(--space-xs);">
          GATE READINESS CHECK
        </h2>
        <p class="font-mono" style="font-size:0.7rem;color:var(--text-dim);margin-bottom:var(--space-lg);">
          PDR — PRELIMINARY DESIGN REVIEW // ${completedCount}/${artifacts.length} ARTIFACTS COMPLETE
        </p>

        <div style="width:100%;height:6px;background:rgba(255,255,255,0.05);border-radius:3px;margin-bottom:var(--space-lg);overflow:hidden;">
          <div style="width:${(completedCount/artifacts.length)*100}%;height:100%;background:${completedCount === artifacts.length ? 'var(--plasma-green)' : 'var(--solar-amber)'};border-radius:3px;transition:width 1s var(--ease-out-expo);"></div>
        </div>

        ${artifacts.map(a => `
          <div class="gate-checklist-item ${a.complete ? 'complete' : 'incomplete'}">
            <div class="check">${a.complete ? '✓' : '✗'}</div>
            <span>${a.name}</span>
          </div>
        `).join('')}

        <div style="display:flex;gap:var(--space-sm);margin-top:var(--space-xl);">
          <button class="glass-btn glass-btn--danger" style="flex:1;justify-content:center;" id="gate-override-btn">
            OVERRIDE (REQUIRES JUSTIFICATION)
          </button>
          <button class="glass-btn" style="flex:1;justify-content:center;" id="gate-close-btn">CLOSE</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('gate-close-btn')?.addEventListener('click', () => {
    mount.innerHTML = '';
  });

  document.getElementById('gate-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'gate-modal') mount.innerHTML = '';
  });
}
