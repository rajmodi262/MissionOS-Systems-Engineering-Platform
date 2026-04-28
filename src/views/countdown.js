/* ============================================================
   Launch Countdown View
   ============================================================ */

import { missions } from '../core/data.js';
import { formatCountdown, padZero, delay } from '../utils/helpers.js';

let countdownInterval = null;
let quadrantValues = { technical: 87, safety: 92, operations: 78, financial: 95 };

export async function renderCountdown(container) {
  const mission = missions[0]; // ARTEMIS-VII

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h1>LAUNCH COUNTDOWN</h1>
        <p class="subtitle">${mission.name} // TARGET: ${new Date(mission.launchDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </div>

    <div class="countdown-fullscreen">
      <div class="countdown-clock" id="countdown-clock">
        <span id="cd-days">000</span><span class="separator">:</span><span id="cd-hours">00</span><span class="separator">:</span><span id="cd-mins">00</span><span class="separator">:</span><span id="cd-secs">00</span>
      </div>
      <div class="countdown-label">TIME TO LAUNCH</div>

      <div class="countdown-quadrants">
        <div class="countdown-quadrant glass-panel" id="quad-technical">
          <div class="quadrant-title">TECHNICAL</div>
          <div class="quadrant-value pending" id="val-technical">${quadrantValues.technical}%</div>
          <div class="quadrant-bar">
            <div class="quadrant-bar-fill pending" id="bar-technical" style="width:${quadrantValues.technical}%"></div>
          </div>
        </div>
        <div class="countdown-quadrant glass-panel" id="quad-safety">
          <div class="quadrant-title">SAFETY</div>
          <div class="quadrant-value pending" id="val-safety">${quadrantValues.safety}%</div>
          <div class="quadrant-bar">
            <div class="quadrant-bar-fill pending" id="bar-safety" style="width:${quadrantValues.safety}%"></div>
          </div>
        </div>
        <div class="countdown-quadrant glass-panel" id="quad-operations">
          <div class="quadrant-title">OPERATIONS</div>
          <div class="quadrant-value pending" id="val-operations">${quadrantValues.operations}%</div>
          <div class="quadrant-bar">
            <div class="quadrant-bar-fill pending" id="bar-operations" style="width:${quadrantValues.operations}%"></div>
          </div>
        </div>
        <div class="countdown-quadrant glass-panel" id="quad-financial">
          <div class="quadrant-title">FINANCIAL</div>
          <div class="quadrant-value pending" id="val-financial">${quadrantValues.financial}%</div>
          <div class="quadrant-bar">
            <div class="quadrant-bar-fill pending" id="bar-financial" style="width:${quadrantValues.financial}%"></div>
          </div>
        </div>
      </div>

      <div class="countdown-actions">
        <button class="glass-btn glass-btn--primary" id="btn-boost-readiness">SIMULATE READINESS +5%</button>
        <button class="glass-btn" id="btn-trigger-launch" style="color:var(--solar-amber);border-color:var(--solar-amber);">TRIGGER T-0 SEQUENCE</button>
      </div>
    </div>

    <div id="launch-overlay-mount"></div>
  `;

  // Start countdown timer
  startCountdown(mission.launchDate);

  // Boost readiness button
  document.getElementById('btn-boost-readiness')?.addEventListener('click', () => {
    Object.keys(quadrantValues).forEach(key => {
      quadrantValues[key] = Math.min(100, quadrantValues[key] + 5);
    });
    updateQuadrants();
  });

  // Trigger launch button
  document.getElementById('btn-trigger-launch')?.addEventListener('click', () => {
    quadrantValues = { technical: 100, safety: 100, operations: 100, financial: 100 };
    updateQuadrants();
    setTimeout(() => triggerLaunchSequence(), 1500);
  });
}

function startCountdown(targetDate) {
  if (countdownInterval) clearInterval(countdownInterval);

  function update() {
    const daysEl = document.getElementById('cd-days');
    // If DOM elements are gone (navigated away), auto-cleanup
    if (!daysEl) {
      clearInterval(countdownInterval);
      countdownInterval = null;
      return;
    }
    const cd = formatCountdown(targetDate);
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');
    daysEl.textContent = padZero(cd.days, 3);
    if (hoursEl) hoursEl.textContent = padZero(cd.hours);
    if (minsEl) minsEl.textContent = padZero(cd.minutes);
    if (secsEl) secsEl.textContent = padZero(cd.seconds);
  }

  update();
  countdownInterval = setInterval(update, 1000);
}

function updateQuadrants() {
  Object.entries(quadrantValues).forEach(([key, val]) => {
    const valEl = document.getElementById(`val-${key}`);
    const barEl = document.getElementById(`bar-${key}`);
    const quadEl = document.getElementById(`quad-${key}`);

    if (valEl) {
      valEl.textContent = `${val}%`;
      valEl.className = `quadrant-value ${val >= 100 ? 'ready' : 'pending'}`;
    }
    if (barEl) {
      barEl.style.width = `${val}%`;
      barEl.className = `quadrant-bar-fill ${val >= 100 ? 'ready' : 'pending'}`;
    }
    if (quadEl && val >= 100) {
      quadEl.classList.add('ready');
    }
  });
}

async function triggerLaunchSequence() {
  if (countdownInterval) clearInterval(countdownInterval);

  // Stop the clock
  const clockEl = document.getElementById('countdown-clock');
  if (clockEl) {
    clockEl.innerHTML = `<span style="color:var(--plasma-green);">T-0</span>`;
    clockEl.style.fontSize = '8rem';
    clockEl.style.textShadow = '0 0 60px rgba(0,255,157,0.5)';
  }

  await delay(1000);

  // Show launch overlay
  const mount = document.getElementById('launch-overlay-mount');
  if (!mount) return;

  mount.innerHTML = `
    <div class="launch-authorized" id="launch-overlay">
      <h1>LAUNCH AUTHORIZED</h1>
      <p class="launch-sub">ALL SYSTEMS GO // GODSPEED</p>
      <button class="glass-btn" style="margin-top:var(--space-xl);animation:fadeInUp 1s var(--ease-out-expo) 1.5s both;" id="close-launch">
        RETURN TO COMMAND CENTER
      </button>
    </div>
    <div class="confetti-container" id="confetti-container"></div>
  `;

  // Data confetti
  spawnConfetti();

  document.getElementById('close-launch')?.addEventListener('click', () => {
    mount.innerHTML = '';
    startCountdown(missions[0].launchDate);
  });
}

function spawnConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;

  const confettiData = [
    'REQ-001', 'REQ-007', 'RSK-002', 'PDR✓', 'CDR✓', 'SRR✓', 'TRR✓',
    'PROP', 'AVN', 'COM', 'PWR', 'THM', 'GNC', 'STR', 'PLD',
    'MSN-001', 'GO', 'NOMINAL', 'VERIFIED', '✓', '★', '⬡',
  ];

  const colors = ['#00FF9D', '#00C8FF', '#FFB830', '#B388FF', '#4DD0E1', '#FF6B9D'];

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.textContent = confettiData[Math.floor(Math.random() * confettiData.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.color = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${2 + Math.random() * 4}s`;
    piece.style.animationDelay = `${Math.random() * 2}s`;
    piece.style.fontSize = `${0.5 + Math.random() * 0.6}rem`;
    container.appendChild(piece);
  }
}
