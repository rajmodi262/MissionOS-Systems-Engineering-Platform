/* ============================================================
   Spaceship Anatomy Simulator — Architecture Interactive Tour
   ============================================================ */

import { navigate } from '../core/router.js';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false, theme: 'dark' });

const useCaseUML = `graph TB
    subgraph "MISSION OS Platform"
        UC1["UC-01: Login"]
        UC2["UC-02: Dashboard"]
        UC3["UC-03: Manage Requirements"]
        UC4["UC-04: AI Quality Analysis"]
        UC14["UC-14: View Context Details"]
        UC15["UC-15: Navigate Modules"]
    end
    SE["👤 Systems Engineer"]
    AI["🤖 Orion AI"]
    SE --> UC1
    SE --> UC3
    SE --> UC14
    SE --> UC15
    AI --> UC4
    UC3 -.->|include| UC14
    UC4 -.->|extend| UC3`;

const sequenceUML = `sequenceDiagram
    participant User
    participant Router as Router
    participant Canvas as ZoneCanvas
    User->>Router: navigate("/risk")
    Router->>Canvas: Clear innerHTML
    Router->>Canvas: Add transition-out class
    Router->>Canvas: Set innerHTML with View
    Router->>Canvas: Add transition-in class
    Canvas-->>User: Risk view rendered`;

const classUML = `classDiagram
    class Router {
        +navigate(path: string)
    }
    class StateManager {
        +getState(key: string)
        +setState(key: string, value: any)
    }
    class EventBus {
        +emit(event: string, data: any)
    }
    class OrionCopilot {
        +processCommand(input: string)
    }
    Router --> StateManager : reads
    Router --> EventBus : emits
    StateManager --> EventBus : emits`;

const levels = [
  {
    id: 1,
    tag: 'PRESENTATION LAYER',
    title: 'THE HULL & VIEWPORTS',
    desc: 'Just like the outer hull protects the crew and the windows let them see out, our Presentation Layer (the UI) is the outer shell of the software. Click the spaceship hull to peel it away and reveal the glowing logic engine underneath.',
  },
  {
    id: 2,
    tag: 'ROUTER & CORE LOGIC',
    title: 'THE NAV COMPUTER',
    desc: 'A spaceship needs a navigation computer to chart courses between stars. In MISSION OS, our Router (JavaScript) handles navigation. It seamlessly moves the user between different screens without ever reloading the browser page. Click a destination screen to route to it.',
  },
  {
    id: 3,
    tag: 'EVENT BUS (PUB/SUB)',
    title: 'THE INTERCOM NETWORK',
    desc: 'If every room had a direct wire to every other room, the ship would be too heavy. Instead, they use a shared intercom. Our software uses an Event Bus. Trigger the meteor strike alarm to see how one signal alerts multiple decoupled systems instantly.',
  },
  {
    id: 4,
    tag: 'STATE PERSISTENCE',
    title: 'THE FLIGHT RECORDER',
    desc: 'If a ship loses power, it cannot forget its mission. By default, web browsers have amnesia. We use a State Manager linked to LocalStorage (our flight recorder) to securely save data. Type a Captain\'s Log and lock it in the vault.',
  },
  {
    id: 5,
    tag: 'UNIFIED MODELING LANGUAGE',
    title: 'THE HOLODECK SCHEMATICS',
    desc: 'Before building a starship, you need blueprints. Software Engineers use UML. Access the Holodeck projector to view the formal engineering blueprints used to construct MISSION OS.',
  }
];

let currentLevel = 1;

export async function renderSimulator(container) {
  container.innerHTML = `
    <div class="sim-container" id="sim-container">
      <div class="sim-header">
        <div>
          <h1 style="color:var(--photon-blue);letter-spacing:0.1em;font-size:1.8rem;text-transform:uppercase;">SPACESHIP ANATOMY</h1>
          <p class="font-mono" style="color:var(--text-dim);font-size:0.9rem;">INTERACTIVE ARCHITECTURE EXPLORER</p>
        </div>
        <div class="sim-progress-container">
          <div class="sim-progress-bar" id="sim-progress-bar"></div>
        </div>
        <span class="font-mono" style="color:var(--text-secondary);" id="sim-level-indicator">SECTOR 1 / 5</span>
      </div>

      <div class="sim-main-area" id="sim-main-area">
        <!-- Dynamic Content Injected Here -->
      </div>

      <div class="sim-footer">
        <button class="glass-btn" id="sim-btn-prev" disabled>PREVIOUS SECTOR</button>
        <button class="glass-btn glass-btn--primary" id="sim-btn-next" disabled>SYSTEM UNDERSTOOD: PROCEED</button>
      </div>
    </div>
  `;

  document.getElementById('sim-btn-prev')?.addEventListener('click', () => {
    if (currentLevel > 1) {
      currentLevel--;
      loadLevel();
    }
  });

  document.getElementById('sim-btn-next')?.addEventListener('click', evaluateLevel);

  loadLevel();
}

function loadLevel() {
  const levelData = levels[currentLevel - 1];
  const contentEl = document.getElementById('sim-main-area');
  const progress = document.getElementById('sim-progress-bar');
  const indicator = document.getElementById('sim-level-indicator');
  const prevBtn = document.getElementById('sim-btn-prev');
  const nextBtn = document.getElementById('sim-btn-next');

  progress.style.width = `${(currentLevel / 5) * 100}%`;
  indicator.textContent = `SECTOR ${currentLevel} / 5`;
  prevBtn.disabled = currentLevel === 1;
  nextBtn.style.display = currentLevel === 5 ? 'none' : 'block';
  nextBtn.disabled = true; // Lock until interaction complete

  let html = `
    <div class="sim-info-panel">
      <span class="sim-concept-tag">${levelData.tag}</span>
      <h2 class="sim-level-title">${levelData.title}</h2>
      <p class="sim-level-desc">${levelData.desc}</p>
    </div>
    <div class="sim-interactive-area" id="sim-interactive-area">
  `;

  switch(currentLevel) {
    case 1:
      html += `
        <div class="lvl1-scene" id="hull-scene">
          <div class="ship-core"></div>
          <div class="ship-hull" id="ship-hull">HULL (UI)</div>
        </div>
      `;
      break;
    case 2:
      html += `
        <div class="lvl2-scene">
          <div class="nav-paths">
            <div class="nav-screen bp-node" data-target="DASHBOARD">Dashboard</div>
            <div class="nav-screen bp-node" data-target="RADAR">Risk Radar</div>
            <div class="nav-screen bp-node" data-target="ENGINE">Architecture</div>
          </div>
          <div style="width:100px;height:2px;background:var(--photon-blue);"></div>
          <div class="nav-router bp-node" style="border-radius:50%;color:var(--plasma-green);">ROUTER</div>
        </div>
      `;
      break;
    case 3:
      html += `
        <div class="lvl3-scene">
          <div class="bus-hub bp-node" style="border-radius:50%;color:var(--photon-blue);">BUS</div>
          <div class="bus-wave" id="bus-wave"></div>
          <div class="bus-node bus-sensor bp-node" id="trigger-alarm" style="cursor:pointer;color:var(--critical-red);font-size:0.7rem;text-align:center;">METEOR ALARM</div>
          <div class="bus-node bus-alarm1 bp-node" id="alarm-1" style="font-size:0.7rem;">Bridge</div>
          <div class="bus-node bus-alarm2 bp-node" id="alarm-2" style="font-size:0.7rem;">Engines</div>
        </div>
      `;
      break;
    case 4:
      html += `
        <div class="lvl4-scene">
          <div class="log-input-area">
            <input type="text" class="log-input" id="log-input" placeholder="Captain's Log Entry..." value="Mission Alpha is GO.">
            <button class="glass-btn" id="log-save-btn">SAVE TO VAULT</button>
          </div>
          <div class="binary-stream" id="binary-stream">01001101 01101001 01110011</div>
          <div class="black-box" id="black-box">
            <span style="font-size:2rem;">📦</span>
          </div>
        </div>
      `;
      break;
    case 5:
      html += `
        <div class="lvl5-scene">
          <div class="uml-nav">
            <button class="uml-btn" data-uml="useCase">"Who flies the ship?" (Use Case)</button>
            <button class="uml-btn" data-uml="sequence">"How do parts talk?" (Sequence)</button>
            <button class="uml-btn" data-uml="class">"How is it built?" (Class)</button>
            <button class="uml-btn" id="exit-sim-btn" style="background:var(--plasma-green);color:black;">COMPLETE SIMULATION</button>
          </div>
          <div class="uml-display" id="uml-display-container" style="overflow: auto;">
            <p style="position:absolute;color:var(--text-dim);font-family:var(--font-mono);top:50%;left:50%;transform:translate(-50%,-50%);" id="uml-placeholder">SELECT A HOLOGRAM TO PROJECT</p>
            <div id="uml-svg-box" style="padding: 20px;"></div>
          </div>
        </div>
      `;
      break;
  }

  html += `</div>`;
  contentEl.innerHTML = html;

  attachLevelListeners();
}

function attachLevelListeners() {
  const nextBtn = document.getElementById('sim-btn-next');

  if (currentLevel === 1) {
    const hull = document.getElementById('ship-hull');
    const scene = document.getElementById('hull-scene');
    hull.addEventListener('click', () => {
      hull.classList.add('peeled');
      scene.classList.add('revealed');
      nextBtn.disabled = false;
      hull.textContent = 'CORE LOGIC EXPOSED';
    });
  }

  if (currentLevel === 2) {
    const screens = document.querySelectorAll('.nav-screen');
    screens.forEach(screen => {
      screen.addEventListener('click', () => {
        screens.forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
        screen.textContent = 'ROUTED: ' + screen.dataset.target;
        nextBtn.disabled = false;
      });
    });
  }

  if (currentLevel === 3) {
    const trigger = document.getElementById('trigger-alarm');
    const wave = document.getElementById('bus-wave');
    const a1 = document.getElementById('alarm-1');
    const a2 = document.getElementById('alarm-2');
    
    trigger.addEventListener('click', () => {
      wave.classList.remove('broadcast');
      void wave.offsetWidth; // trigger reflow
      wave.classList.add('broadcast');
      
      setTimeout(() => {
        a1.style.borderColor = 'var(--critical-red)';
        a1.style.color = 'var(--critical-red)';
        a2.style.borderColor = 'var(--critical-red)';
        a2.style.color = 'var(--critical-red)';
        nextBtn.disabled = false;
      }, 500);
    });
  }

  if (currentLevel === 4) {
    const saveBtn = document.getElementById('log-save-btn');
    const input = document.getElementById('log-input');
    const box = document.getElementById('black-box');
    const stream = document.getElementById('binary-stream');

    saveBtn.addEventListener('click', () => {
      if(!input.value) return;
      input.value = '';
      stream.classList.remove('animate');
      void stream.offsetWidth;
      stream.classList.add('animate');

      setTimeout(() => {
        box.classList.add('locked');
        box.innerHTML = '<span style="font-size:2rem;">🔒</span><span style="position:absolute;top:10px;font-family:var(--font-mono);font-size:0.7rem;color:var(--solar-amber);">LOCAL_STORAGE</span>';
        nextBtn.disabled = false;
      }, 1000);
    });
  }

  if (currentLevel === 5) {
    const btns = document.querySelectorAll('.uml-btn[data-uml]');
    const svgBox = document.getElementById('uml-svg-box');
    const placeholder = document.getElementById('uml-placeholder');

    btns.forEach(btn => {
      btn.addEventListener('click', async () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        placeholder.style.display = 'none';
        
        let graphDef = '';
        if (btn.dataset.uml === 'useCase') graphDef = useCaseUML;
        if (btn.dataset.uml === 'sequence') graphDef = sequenceUML;
        if (btn.dataset.uml === 'class') graphDef = classUML;

        try {
          const { svg } = await mermaid.render('mermaid-svg-' + Date.now(), graphDef);
          svgBox.innerHTML = svg;
          // Ensure SVG is fully scalable
          const renderedSvg = svgBox.querySelector('svg');
          if (renderedSvg) {
            renderedSvg.style.maxWidth = 'none';
            renderedSvg.style.height = 'auto';
          }
        } catch (err) {
          svgBox.innerHTML = '<p style="color:var(--critical-red);">Hologram projection failed.</p>';
        }
      });
    });

    document.getElementById('exit-sim-btn').addEventListener('click', () => {
      navigate('/command-center');
    });
  }
}

function evaluateLevel() {
  if (currentLevel < 5) {
    currentLevel++;
    loadLevel();
  }
}
