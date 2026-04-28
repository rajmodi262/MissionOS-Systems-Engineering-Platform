/* ============================================================
   Command Center View — Mission Home Screen
   ============================================================ */

import { missions, telemetryStreams } from '../core/data.js';
import { navigate } from '../core/router.js';
import { selectItem } from '../core/state.js';

export async function renderCommandCenter(container) {
  const activeMissions = missions.filter(m => m.status !== 'archived');

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h1>MISSION COMMAND CENTER</h1>
        <p class="subtitle">ACTIVE MISSIONS: ${activeMissions.length} // STATUS: OPERATIONAL</p>
      </div>
      <div style="display:flex;gap:var(--space-sm);">
        <button class="glass-btn">GLOBAL OVERVIEW</button>
      </div>
    </div>

    <!-- Telemetry Strip -->
    <div class="telemetry-strip" id="telemetry-strip">
      <div class="telemetry-track" id="telemetry-track"></div>
    </div>

    <!-- Stats Overview -->
    <div class="stats-row">
      <div class="stat-card glass-panel">
        <div class="stat-value text-green glow-green">${activeMissions.length}</div>
        <div class="stat-label">Active Missions</div>
      </div>
      <div class="stat-card glass-panel">
        <div class="stat-value text-amber glow-amber">14</div>
        <div class="stat-label">Open Risks</div>
      </div>
      <div class="stat-card glass-panel">
        <div class="stat-value text-blue glow-blue">247</div>
        <div class="stat-label">Requirements</div>
      </div>
      <div class="stat-card glass-panel">
        <div class="stat-value text-green glow-green">82%</div>
        <div class="stat-label">System Readiness</div>
      </div>
    </div>

    <!-- Mission Cards -->
    <div class="section-title">ACTIVE MISSIONS</div>
    <div class="honeycomb-grid" id="honeycomb-grid"></div>
  `;

  // Render telemetry
  renderTelemetry();

  // Render hex cards
  renderHexCards(activeMissions);
}

function renderTelemetry() {
  const track = document.getElementById('telemetry-track');
  if (!track) return;

  // Duplicate for seamless loop
  const items = [...telemetryStreams, ...telemetryStreams];

  track.innerHTML = items.map((t, i) => {
    const isFirst = i % telemetryStreams.length === 0 || telemetryStreams[i % telemetryStreams.length]?.mission !== telemetryStreams[(i - 1 + telemetryStreams.length) % telemetryStreams.length]?.mission;

    return `
      ${isFirst && i > 0 ? '<div class="telemetry-divider"></div>' : ''}
      ${isFirst ? `<span class="telemetry-mission">${t.mission}</span>` : ''}
      <div class="telemetry-item">
        <span class="telemetry-label">${t.label}</span>
        <span class="telemetry-value ${t.status === 'warning' ? 'warning' : ''}">${t.value}${t.unit ? ' ' + t.unit : ''}</span>
      </div>
    `;
  }).join('');
}

function renderHexCards(missionList) {
  const grid = document.getElementById('honeycomb-grid');
  if (!grid) return;

  grid.innerHTML = missionList.map((m, idx) => {
    const healthClass = m.healthScore >= 80 ? 'nominal' : m.healthScore >= 60 ? 'warning' : 'critical';
    const isPulsing = m.riskLevel === 'high' ? 'critical-pulse' : '';

    return `
      <div class="hex-card ${isPulsing}" data-mission-id="${m.id}" style="animation-delay: ${idx * 100}ms; animation: fadeInUp 0.6s var(--ease-out-expo) ${idx * 100}ms both;">
        <div class="hex-health ${healthClass}">${m.healthScore}</div>
        <div class="hex-name">${m.name}</div>
        <div class="hex-phase">${m.phase}</div>
        <div class="hex-completion">
          <div class="hex-completion-fill ${healthClass}" style="width: ${m.completion}%"></div>
        </div>
      </div>
    `;
  }).join('');

  // Click handlers
  grid.querySelectorAll('.hex-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.missionId;
      const mission = missions.find(m => m.id === id);
      if (mission) {
        selectItem({
          id: mission.id,
          name: mission.name,
          title: mission.name + ' — ' + mission.codename,
          status: mission.status,
          text: mission.description,
          owner: mission.team[0],
          priority: mission.riskLevel,
        });
      }
    });

    card.addEventListener('dblclick', () => {
      navigate('/requirements');
    });
  });
}
