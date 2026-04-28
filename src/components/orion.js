/* ============================================================
   Orion AI Copilot Component
   ============================================================ */

import { icons } from '../utils/svg-icons.js';
import { generateRequirement, generateInsight } from '../utils/ai-engine.js';
import { missions, risks } from '../core/data.js';
import { navigate } from '../core/router.js';

let isOpen = false;
let panel = null;

export function initOrion() {
  const trigger = document.getElementById('orion-trigger');
  if (!trigger) return;

  trigger.innerHTML = icons.orion;
  trigger.classList.add('alert');

  // Create panel
  panel = document.createElement('div');
  panel.className = 'orion-panel';
  panel.id = 'orion-panel';
  panel.innerHTML = `
    <div class="orion-header">
      <div class="orion-title">
        <span class="dot"></span>
        ORION AI COPILOT
      </div>
      <button class="glass-btn" id="orion-close" style="padding:4px 8px;font-size:0.7rem;">MINIMIZE</button>
    </div>
    <div class="orion-messages" id="orion-messages">
      <div class="orion-msg alert">
        ALERT: Mission MARS ASCENT has 3 unverified critical requirements. SRR deadline approaching. 
        Recommend prioritizing verification for <a data-nav="/requirements">REQ-047</a>, <a data-nav="/requirements">REQ-083</a>, <a data-nav="/requirements">REQ-091</a>.
      </div>
      <div class="orion-msg system">
        ORION v2.4 online. ${missions.length} active missions monitored. Ready for commands.
      </div>
    </div>
    <div class="orion-input-row">
      <input class="orion-input" id="orion-input" placeholder="Ask Orion anything... (e.g. 'generate requirement for thermal')" />
      <button class="orion-send" id="orion-send">SEND</button>
    </div>
  `;
  document.body.appendChild(panel);

  // Toggle
  trigger.addEventListener('click', toggleOrion);
  document.getElementById('orion-close')?.addEventListener('click', toggleOrion);

  // Send command
  document.getElementById('orion-send')?.addEventListener('click', handleCommand);
  document.getElementById('orion-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleCommand();
  });

  // Nav links
  panel.addEventListener('click', (e) => {
    const nav = e.target.dataset?.nav;
    if (nav) navigate(nav);
  });
}

function toggleOrion() {
  isOpen = !isOpen;
  if (panel) panel.classList.toggle('open', isOpen);
  const trigger = document.getElementById('orion-trigger');
  if (trigger && isOpen) trigger.classList.remove('alert');
}

function addMessage(text, type = 'system') {
  const messages = document.getElementById('orion-messages');
  if (!messages) return;
  const msg = document.createElement('div');
  msg.className = `orion-msg ${type}`;
  msg.innerHTML = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function handleCommand() {
  const input = document.getElementById('orion-input');
  if (!input) return;
  const cmd = input.value.trim();
  if (!cmd) return;

  addMessage(cmd, 'user');
  input.value = '';

  setTimeout(() => processCommand(cmd), 600);
}

function processCommand(cmd) {
  const lower = cmd.toLowerCase();

  if (lower.includes('generate requirement') || lower.includes('draft requirement')) {
    const topic = lower.includes('thermal') ? 'thermal'
      : lower.includes('propulsion') ? 'propulsion'
      : lower.includes('comm') ? 'communications'
      : lower.includes('power') ? 'power' : 'system';

    const req = generateRequirement(topic);
    addMessage(`
      <strong>DRAFT REQUIREMENT GENERATED:</strong><br/>
      <span style="color:var(--text-dim);">${req.id}</span> | ${req.status.toUpperCase()} | ${req.verification}<br/><br/>
      "${req.text}"<br/><br/>
      <em style="color:var(--text-dim);">Rationale: ${req.rationale}</em><br/>
      <span style="color:var(--photon-blue);cursor:pointer;">[ IMPORT TO REQUIREMENTS MODULE ]</span>
    `, 'system');
    return;
  }

  if (lower.includes('risk') && (lower.includes('show') || lower.includes('list') || lower.includes('high'))) {
    const allRisks = Object.values(risks).flat();
    const highRisks = allRisks.filter(r => r.consequence >= 4 || r.status === 'critical');
    addMessage(`
      <strong>HIGH-SEVERITY RISKS (${highRisks.length} found):</strong><br/><br/>
      ${highRisks.map(r => `
        <span style="color:${r.status === 'critical' ? 'var(--critical-red)' : 'var(--solar-amber)'};">▸ ${r.id}</span> 
        ${r.title} [L:${r.likelihood} × C:${r.consequence}]<br/>
      `).join('')}
    `, 'alert');
    return;
  }

  if (lower.includes('status') && lower.includes('mission')) {
    const missionName = missions.find(m => lower.includes(m.name.toLowerCase().split(' ')[0]));
    const m = missionName || missions[0];
    addMessage(`
      <strong>${m.name}</strong> — ${m.codename}<br/>
      Phase: ${m.phase} | Health: <span style="color:${m.healthScore >= 80 ? 'var(--plasma-green)' : 'var(--solar-amber)'};">${m.healthScore}</span> | Completion: ${m.completion}%<br/>
      Risk Level: ${m.riskLevel.toUpperCase()} | Team: ${m.team.length} engineers<br/>
      Launch: ${new Date(m.launchDate).toLocaleDateString()}
    `, 'system');
    return;
  }

  // Default insight
  const insight = generateInsight({ mission: 'ARTEMIS-VII', phase: 'Architecture Design' });
  addMessage(insight, 'system');
}
