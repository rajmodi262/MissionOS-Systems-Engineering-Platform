/* ============================================================
   Engineering Theater — Diagram Gallery
   ============================================================ */

import { subsystemLibrary, missions } from '../core/data.js';

export async function renderDiagrams(container) {
  container.innerHTML = `
    <div class="view-header">
      <div>
        <h1>ENGINEERING THEATER</h1>
        <p class="subtitle">ARTEMIS-VII // SYSTEMS VISUALIZATION GALLERY</p>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-lg);">
      ${renderWBSCard()}
      ${renderContextDiagramCard()}
      ${renderStakeholderMapCard()}
      ${renderPERTCard()}
      ${renderFunctionalFlowCard()}
      ${renderBudgetCard()}
    </div>
  `;

  // Animate on entry
  container.querySelectorAll('.theater-card').forEach((card, i) => {
    card.style.animation = `fadeInUp 0.5s var(--ease-out-expo) ${i * 100}ms both`;
  });
}

function renderWBSCard() {
  return `
    <div class="theater-card glass-panel glass-panel--interactive" style="padding:var(--space-lg);min-height:280px;">
      <h3 class="font-heading" style="font-size:0.9rem;letter-spacing:0.12em;color:var(--plasma-green);margin-bottom:var(--space-md);">WORK BREAKDOWN STRUCTURE</h3>
      <svg viewBox="0 0 300 200" style="width:100%;" fill="none">
        <!-- Level 0 -->
        <rect x="100" y="5" width="100" height="28" rx="4" fill="rgba(0,255,157,0.1)" stroke="#00FF9D" stroke-width="1.5"/>
        <text x="150" y="23" text-anchor="middle" fill="#00FF9D" font-family="Space Mono" font-size="7">ARTEMIS-VII</text>

        <!-- Level 1 -->
        <line x1="150" y1="33" x2="150" y2="50" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
        <line x1="50" y1="50" x2="250" y2="50" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>

        ${['Spacecraft', 'Ground Seg', 'Launch Seg', 'Mission Ops'].map((name, i) => {
          const x = 25 + i * 70;
          return `
            <line x1="${x + 25}" y1="50" x2="${x + 25}" y2="60" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
            <rect x="${x}" y="60" width="55" height="24" rx="3" fill="rgba(0,200,255,0.08)" stroke="#00C8FF" stroke-width="1"/>
            <text x="${x + 27}" y="75" text-anchor="middle" fill="#00C8FF" font-family="Space Mono" font-size="5.5">${name}</text>
            ${['Sub A', 'Sub B'].map((sub, j) => `
              <line x1="${x + 10 + j * 30}" y1="84" x2="${x + 10 + j * 30}" y2="95" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
              <rect x="${x + j * 30}" y="95" width="25" height="18" rx="2" fill="rgba(255,184,48,0.06)" stroke="#FFB83050" stroke-width="0.5"/>
              <text x="${x + 12 + j * 30}" y="107" text-anchor="middle" fill="#8888A0" font-family="Space Mono" font-size="4">${sub}</text>
            `).join('')}
          `;
        }).join('')}
      </svg>
    </div>
  `;
}

function renderContextDiagramCard() {
  return `
    <div class="theater-card glass-panel glass-panel--interactive" style="padding:var(--space-lg);min-height:280px;">
      <h3 class="font-heading" style="font-size:0.9rem;letter-spacing:0.12em;color:var(--photon-blue);margin-bottom:var(--space-md);">CONTEXT DIAGRAM</h3>
      <svg viewBox="0 0 300 200" style="width:100%;" fill="none">
        <!-- Central System -->
        <circle cx="150" cy="100" r="35" fill="rgba(0,200,255,0.1)" stroke="#00C8FF" stroke-width="2"/>
        <text x="150" y="97" text-anchor="middle" fill="#00C8FF" font-family="Space Mono" font-size="6">ARTEMIS</text>
        <text x="150" y="107" text-anchor="middle" fill="#00C8FF" font-family="Space Mono" font-size="6">VII</text>

        <!-- External Entities -->
        ${[
          { name: 'Mission Ctrl', x: 150, y: 15, color: '#00FF9D' },
          { name: 'Crew', x: 270, y: 60, color: '#FFB830' },
          { name: 'Lunar Surface', x: 270, y: 140, color: '#90A4AE' },
          { name: 'Gateway', x: 150, y: 185, color: '#B388FF' },
          { name: 'Launch Vehicle', x: 30, y: 140, color: '#FF3B5C' },
          { name: 'Supply Chain', x: 30, y: 60, color: '#4DD0E1' },
        ].map(e => `
          <rect x="${e.x - 30}" y="${e.y - 10}" width="60" height="20" rx="3" fill="${e.color}10" stroke="${e.color}" stroke-width="1"/>
          <text x="${e.x}" y="${e.y + 3}" text-anchor="middle" fill="${e.color}" font-family="Space Mono" font-size="5">${e.name}</text>
          <line x1="${e.x}" y1="${e.y}" x2="150" y2="100" stroke="${e.color}40" stroke-width="1" stroke-dasharray="3 2"/>
        `).join('')}
      </svg>
    </div>
  `;
}

function renderStakeholderMapCard() {
  return `
    <div class="theater-card glass-panel glass-panel--interactive" style="padding:var(--space-lg);min-height:280px;">
      <h3 class="font-heading" style="font-size:0.9rem;letter-spacing:0.12em;color:var(--solar-amber);margin-bottom:var(--space-md);">STAKEHOLDER MAP</h3>
      <svg viewBox="0 0 300 200" style="width:100%;" fill="none">
        <!-- Grid Lines -->
        <line x1="150" y1="15" x2="150" y2="185" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <line x1="15" y1="100" x2="285" y2="100" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <text x="78" y="12" fill="#555570" font-family="Space Mono" font-size="5">LOW INFLUENCE</text>
        <text x="220" y="12" fill="#555570" font-family="Space Mono" font-size="5">HIGH INFLUENCE</text>
        <text x="5" y="50" fill="#555570" font-family="Space Mono" font-size="5" transform="rotate(-90 8 50)">HIGH INTEREST</text>

        <!-- Stakeholder Bubbles -->
        ${[
          { name: 'NASA HQ', x: 240, y: 35, r: 18, color: '#FF3B5C' },
          { name: 'Crew', x: 260, y: 65, r: 14, color: '#FFB830' },
          { name: 'ESA', x: 200, y: 50, r: 12, color: '#00C8FF' },
          { name: 'Public', x: 80, y: 40, r: 16, color: '#B388FF' },
          { name: 'Congress', x: 210, y: 85, r: 10, color: '#FF6B35' },
          { name: 'Contractors', x: 170, y: 130, r: 13, color: '#4DD0E1' },
          { name: 'Scientists', x: 100, y: 110, r: 11, color: '#00FF9D' },
          { name: 'Media', x: 60, y: 75, r: 9, color: '#90A4AE' },
        ].map(s => `
          <circle cx="${s.x}" cy="${s.y}" r="${s.r}" fill="${s.color}15" stroke="${s.color}" stroke-width="1"/>
          <text x="${s.x}" y="${s.y + 3}" text-anchor="middle" fill="${s.color}" font-family="Space Mono" font-size="4.5">${s.name}</text>
        `).join('')}
      </svg>
    </div>
  `;
}

function renderPERTCard() {
  return `
    <div class="theater-card glass-panel glass-panel--interactive" style="padding:var(--space-lg);min-height:280px;">
      <h3 class="font-heading" style="font-size:0.9rem;letter-spacing:0.12em;color:var(--critical-red);margin-bottom:var(--space-md);">PERT / CRITICAL PATH</h3>
      <svg viewBox="0 0 300 200" style="width:100%;" fill="none">
        ${[
          { id: 'A', name: 'SRR', x: 30, y: 50, critical: true },
          { id: 'B', name: 'PDR', x: 100, y: 30, critical: true },
          { id: 'C', name: 'Prototype', x: 100, y: 90, critical: false },
          { id: 'D', name: 'CDR', x: 180, y: 50, critical: true },
          { id: 'E', name: 'Fab', x: 180, y: 120, critical: false },
          { id: 'F', name: 'I&T', x: 240, y: 70, critical: true },
          { id: 'G', name: 'TRR', x: 280, y: 70, critical: true },
        ].map(n => {
          const color = n.critical ? '#FF3B5C' : '#8888A0';
          return `
            <circle cx="${n.x}" cy="${n.y}" r="16" fill="${color}15" stroke="${color}" stroke-width="${n.critical ? 2 : 1}"/>
            <text x="${n.x}" y="${n.y + 3}" text-anchor="middle" fill="${color}" font-family="Space Mono" font-size="5">${n.name}</text>
          `;
        }).join('')}
        <!-- Critical path -->
        <path d="M 46 50 L 84 30 L 164 50 L 224 70 L 264 70" stroke="#FF3B5C" stroke-width="2" fill="none" stroke-dasharray="4 2">
          <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1.5s" repeatCount="indefinite"/>
        </path>
        <!-- Non-critical -->
        <line x1="46" y1="50" x2="84" y2="90" stroke="#8888A040" stroke-width="1"/>
        <line x1="116" y1="90" x2="164" y2="120" stroke="#8888A040" stroke-width="1"/>
        <line x1="196" y1="120" x2="224" y2="70" stroke="#8888A040" stroke-width="1"/>
      </svg>
      <div style="display:flex;gap:var(--space-md);margin-top:var(--space-sm);justify-content:center;">
        <span class="font-mono" style="font-size:0.65rem;color:var(--critical-red);">── Critical Path</span>
        <span class="font-mono" style="font-size:0.65rem;color:var(--text-dim);">── Float Activities</span>
      </div>
    </div>
  `;
}

function renderFunctionalFlowCard() {
  return `
    <div class="theater-card glass-panel glass-panel--interactive" style="padding:var(--space-lg);min-height:280px;">
      <h3 class="font-heading" style="font-size:0.9rem;letter-spacing:0.12em;color:#B388FF;margin-bottom:var(--space-md);">FUNCTIONAL FLOW</h3>
      <svg viewBox="0 0 300 200" style="width:100%;" fill="none">
        ${[
          { name: 'Launch', x: 20, y: 90 },
          { name: 'TLI Burn', x: 80, y: 90 },
          { name: 'LOI', x: 140, y: 90 },
          { name: 'Descent', x: 200, y: 90 },
          { name: 'Landing', x: 260, y: 90 },
        ].map((n, i, arr) => `
          <rect x="${n.x}" y="${n.y - 15}" width="50" height="30" rx="4" fill="#B388FF10" stroke="#B388FF" stroke-width="1"/>
          <text x="${n.x + 25}" y="${n.y + 3}" text-anchor="middle" fill="#B388FF" font-family="Space Mono" font-size="5.5">${n.name}</text>
          ${i < arr.length - 1 ? `<path d="M ${n.x + 50} ${n.y} L ${arr[i+1].x} ${n.y}" stroke="#B388FF50" stroke-width="1.5" marker-end="url(#arrowPurple)"/>` : ''}
        `).join('')}

        <!-- Sub-functions branching down -->
        ${[
          { parent: 200, name: 'Nav Check', y: 140 },
          { parent: 200, name: 'Retro Fire', y: 165 },
        ].map(s => `
          <line x1="${s.parent + 25}" y1="105" x2="${s.parent + 25}" y2="${s.y - 10}" stroke="#B388FF30" stroke-width="1"/>
          <rect x="${s.parent + 5}" y="${s.y - 10}" width="45" height="20" rx="3" fill="#B388FF08" stroke="#B388FF40" stroke-width="0.5"/>
          <text x="${s.parent + 27}" y="${s.y + 3}" text-anchor="middle" fill="#8888A0" font-family="Space Mono" font-size="4.5">${s.name}</text>
        `).join('')}

        <defs><marker id="arrowPurple" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#B388FF"/></marker></defs>
      </svg>
    </div>
  `;
}

function renderBudgetCard() {
  const subsystems = subsystemLibrary.slice(0, 6);
  const budgets = [28, 18, 12, 15, 10, 17];

  return `
    <div class="theater-card glass-panel glass-panel--interactive" style="padding:var(--space-lg);min-height:280px;">
      <h3 class="font-heading" style="font-size:0.9rem;letter-spacing:0.12em;color:#4DD0E1;margin-bottom:var(--space-md);">MASS BUDGET</h3>
      <div style="display:flex;flex-direction:column;gap:6px;padding:var(--space-sm) 0;">
        ${subsystems.map((s, i) => `
          <div style="display:flex;align-items:center;gap:var(--space-sm);">
            <span class="font-mono" style="font-size:0.65rem;color:${s.color};width:40px;">${s.abbr}</span>
            <div style="flex:1;height:18px;background:rgba(255,255,255,0.03);border-radius:3px;overflow:hidden;position:relative;">
              <div style="width:${budgets[i]}%;height:100%;background:${s.color}40;border-radius:3px;transition:width 1s var(--ease-out-expo);animation:fadeIn 0.5s ease ${i * 80}ms both;"></div>
            </div>
            <span class="font-mono" style="font-size:0.65rem;color:var(--text-dim);width:35px;text-align:right;">${budgets[i]}%</span>
          </div>
        `).join('')}
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:var(--space-sm);padding-top:var(--space-sm);border-top:1px solid var(--glass-border);">
        <span class="font-mono" style="font-size:0.65rem;color:var(--text-dim);">TOTAL ALLOCATED</span>
        <span class="font-mono" style="font-size:0.7rem;color:var(--plasma-green);">${budgets.reduce((a, b) => a + b)}% / 100%</span>
      </div>
    </div>
  `;
}
