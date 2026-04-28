/* ============================================================
   Login View — Cinematic Entry Experience
   ============================================================ */

import { setState } from '../core/state.js';
import { navigate } from '../core/router.js';
import { delay } from '../utils/helpers.js';
import { icons } from '../utils/svg-icons.js';

let particleField = null;

export function setParticleField(pf) {
  particleField = pf;
}

export async function renderLogin(container) {
  container.innerHTML = `
    <div class="login-screen" id="login-screen">
      <div class="login-ring" id="login-ring">
        <span class="spine-logo-icon" style="position:absolute;inset:25%;width:50%;height:50%;color:var(--plasma-green);filter:drop-shadow(0 0 12px rgba(0,255,157,0.5))">${icons.orion}</span>
      </div>

      <h1 class="login-title" id="login-title"></h1>
      <p class="login-tagline" id="login-tagline">SYSTEMS ENGINEERING FOR THE COSMOS</p>

      <div class="login-form-container" id="login-form-container">
        <form class="login-form" id="login-form" autocomplete="off">
          <div class="login-field">
            <label for="login-user">OPERATOR ID</label>
            <input type="text" id="login-user" class="glass-input" placeholder="Enter operator callsign" autocomplete="off" />
            <div class="field-cursor"></div>
          </div>
          <div class="login-field">
            <label for="login-pass">ACCESS CODE</label>
            <input type="password" id="login-pass" class="glass-input" placeholder="Enter secure passphrase" autocomplete="off" />
            <div class="field-cursor"></div>
          </div>
          <p class="login-error" id="login-error">AUTHENTICATION SEQUENCE FAILED</p>
          <button type="submit" class="login-btn" id="login-btn">INITIALIZE SESSION</button>
        </form>
      </div>

      <p class="login-version">MISSION OS v3.7.1 // BUILD 2026.117 // CLASSIFICATION: UNCLASSIFIED</p>
    </div>
  `;

  // Typewriter effect for title
  await delay(2500);
  const titleEl = document.getElementById('login-title');
  const titleText = 'MISSION OS';
  for (let i = 0; i < titleText.length; i++) {
    const span = document.createElement('span');
    span.className = 'char';
    if (titleText[i] === ' ') {
      span.innerHTML = '&nbsp;&nbsp;';
    } else {
      span.textContent = titleText[i];
    }
    span.style.animationDelay = `${i * 80}ms`;
    titleEl.appendChild(span);
  }
  titleEl.style.opacity = '1';

  // Setup keystroke ripples
  const inputs = container.querySelectorAll('.login-field input');
  inputs.forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (particleField) {
        const rect = input.getBoundingClientRect();
        const x = rect.left + rect.width * Math.random();
        const y = rect.top + rect.height / 2;
        particleField.addRipple(x, y);
      }
    });
  });

  // Form submission
  const form = document.getElementById('login-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value.trim();

    if (!user) {
      const error = document.getElementById('login-error');
      error.textContent = 'OPERATOR ID REQUIRED';
      error.classList.add('visible');
      return;
    }

    const btn = document.getElementById('login-btn');
    btn.textContent = 'AUTHENTICATING...';
    btn.disabled = true;

    // Simulate auth delay
    await delay(1200);

    // Set user state
    setState({
      isLoggedIn: true,
      currentUser: {
        name: user || 'COMMANDER',
        role: 'Systems Engineer',
        clearance: 'LEVEL-4',
        initials: (user || 'CM').slice(0, 2).toUpperCase()
      }
    });

    // Dissolution animation
    const screen = document.getElementById('login-screen');
    screen.classList.add('dissolving');

    await delay(800);

    // Navigate to command center
    navigate('/command-center');
  });
}
