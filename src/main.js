/* ============================================================
   MISSION OS — Main Entry Point
   The Operating System for Space Missions
   ============================================================ */

// Styles
import './styles/index.css';
import './styles/particles.css';
import './styles/glass.css';
import './styles/login.css';
import './styles/layout.css';
import './styles/sidebar.css';
import './styles/dashboard.css';
import './styles/requirements.css';
import './styles/vmodel.css';
import './styles/trade-study.css';
import './styles/countdown.css';
import './styles/risk.css';
import './styles/documents.css';
import './styles/architecture.css';
import './styles/orion.css';
import './styles/simulator.css';

// Core
import { ParticleField } from './engine/particles.js';
import { registerRoute, initRouter, setAppContainer, setBeforeNavigate } from './core/router.js';
import { getState } from './core/state.js';

// Views
import { renderLogin, setParticleField } from './views/login.js';
import { renderCommandCenter } from './views/command-center.js';
import { renderRequirements } from './views/requirements.js';
import { renderVModel } from './views/vmodel.js';
import { renderTradeStudy } from './views/trade-study.js';
import { renderCountdown } from './views/countdown.js';
import { renderRisk } from './views/risk.js';
import { renderN2Matrix } from './views/n2-matrix.js';
import { renderDiagrams } from './views/diagrams.js';
import { renderDocuments } from './views/documents.js';
import { renderArchitecture } from './views/architecture.js';
import { renderSimulator } from './views/simulator.js';

// Components
import { createSidebar } from './components/sidebar.js';
import { createContextDrawer } from './components/context-drawer.js';
import { initOrion } from './components/orion.js';

// ── Initialize Particle Field ──
const particleField = new ParticleField('particle-field');
particleField.start();
setParticleField(particleField);

// ── Layout Management ──
let layoutCreated = false;
let centerCanvas = null;

function createAppLayout() {
  if (layoutCreated) return;
  layoutCreated = true;

  const app = document.getElementById('app');
  app.innerHTML = '';

  const layout = document.createElement('div');
  layout.className = 'app-layout';
  layout.id = 'app-layout';

  const sidebar = createSidebar();
  centerCanvas = document.createElement('main');
  centerCanvas.className = 'zone-canvas';
  centerCanvas.id = 'zone-canvas';
  const drawer = createContextDrawer();

  layout.appendChild(sidebar);
  layout.appendChild(centerCanvas);
  layout.appendChild(drawer);
  app.appendChild(layout);

  setAppContainer(centerCanvas);

  // Initialize Orion AI
  initOrion();
}

function destroyAppLayout() {
  layoutCreated = false;
  centerCanvas = null;
  const app = document.getElementById('app');
  app.innerHTML = '';
  setAppContainer(app);
  // Remove orion panel if exists
  const orionPanel = document.getElementById('orion-panel');
  if (orionPanel) orionPanel.remove();
}

// ── Register Routes ──
registerRoute('/login', async (container) => {
  destroyAppLayout();
  const app = document.getElementById('app');
  setAppContainer(app);
  await renderLogin(app);
});

registerRoute('/command-center', async (container) => {
  createAppLayout();
  await renderCommandCenter(centerCanvas);
});

registerRoute('/requirements', async (container) => {
  createAppLayout();
  await renderRequirements(centerCanvas);
});

registerRoute('/architecture', async (container) => {
  createAppLayout();
  await renderArchitecture(centerCanvas);
});

registerRoute('/diagrams', async (container) => {
  createAppLayout();
  await renderDiagrams(centerCanvas);
});

registerRoute('/n2-matrix', async (container) => {
  createAppLayout();
  await renderN2Matrix(centerCanvas);
});

registerRoute('/risk', async (container) => {
  createAppLayout();
  await renderRisk(centerCanvas);
});

registerRoute('/trade-study', async (container) => {
  createAppLayout();
  await renderTradeStudy(centerCanvas);
});

registerRoute('/vmodel', async (container) => {
  createAppLayout();
  await renderVModel(centerCanvas);
});

registerRoute('/documents', async (container) => {
  createAppLayout();
  await renderDocuments(centerCanvas);
});

registerRoute('/countdown', async (container) => {
  createAppLayout();
  await renderCountdown(centerCanvas);
});

registerRoute('/simulator', async (container) => {
  createAppLayout();
  await renderSimulator(centerCanvas);
});

// ── Before Navigate Hook ──
setBeforeNavigate(async (path) => {
  if (path === '/login') {
    destroyAppLayout();
  } else if (!layoutCreated) {
    createAppLayout();
  }
});

// ── Initialize ──
const app = document.getElementById('app');
setAppContainer(app);

// Set initial route without triggering hashchange
const initialRoute = getState('isLoggedIn') ? '#/command-center' : '#/login';
history.replaceState(null, '', initialRoute);

// Start router (will handle the initial route)
initRouter();

console.log('%c🚀 MISSION OS v3.7.1 INITIALIZED', 'color: #00FF9D; font-size: 14px; font-weight: bold;');
console.log('%c   Systems Engineering for the Cosmos', 'color: #8888A0; font-size: 11px;');
