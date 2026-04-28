/* ============================================================
   Architecture Canvas View — Infinite Pan/Zoom
   ============================================================ */

import { subsystemLibrary } from '../core/data.js';
import { selectItem } from '../core/state.js';
import { icons } from '../utils/svg-icons.js';

const nodePositions = [
  { x: 400, y: 200 },   // Propulsion
  { x: 700, y: 120 },   // Avionics
  { x: 1000, y: 200 },  // Power
  { x: 400, y: 500 },   // Thermal
  { x: 700, y: 600 },   // Communications
  { x: 1000, y: 500 },  // Structure
  { x: 250, y: 350 },   // Payload
  { x: 1150, y: 350 },  // GNC
];

const connections = [
  { from: 0, to: 1, type: 'data' },
  { from: 1, to: 2, type: 'power' },
  { from: 1, to: 4, type: 'data' },
  { from: 2, to: 3, type: 'thermal' },
  { from: 2, to: 5, type: 'power' },
  { from: 3, to: 0, type: 'thermal' },
  { from: 4, to: 1, type: 'data' },
  { from: 5, to: 0, type: 'power' },
  { from: 6, to: 1, type: 'data' },
  { from: 7, to: 1, type: 'data' },
  { from: 7, to: 0, type: 'data' },
  { from: 6, to: 2, type: 'power' },
];

let panX = 0, panY = 0, zoom = 1;
let isDragging = false;
let dragStartX = 0, dragStartY = 0;
let selectedNode = null;

export async function renderArchitecture(container) {
  const subs = subsystemLibrary;

  container.innerHTML = `
    <div class="view-header">
      <div>
        <h1>SYSTEMS ARCHITECTURE</h1>
        <p class="subtitle">ARTEMIS-VII // ${subs.length} SUBSYSTEMS // PHYSICAL ARCHITECTURE</p>
      </div>
    </div>

    <div class="arch-canvas-container" id="arch-container">
      <svg class="arch-connections" id="arch-svg" viewBox="0 0 3000 2000" preserveAspectRatio="none"></svg>
      <div class="arch-canvas-inner" id="arch-inner">
        ${subs.map((sub, i) => {
          const pos = nodePositions[i] || { x: 200 + i * 150, y: 300 };
          const health = 60 + Math.floor(Math.random() * 35);
          const healthColor = health >= 80 ? 'var(--plasma-green)' : health >= 60 ? 'var(--solar-amber)' : 'var(--critical-red)';
          return `
            <div class="arch-node" id="arch-node-${i}" data-idx="${i}"
                 style="left:${pos.x}px;top:${pos.y}px;background:${sub.color}10;border:1.5px solid ${sub.color}60;box-shadow:0 0 20px ${sub.color}15;animation:fadeInUp 0.5s var(--ease-out-expo) ${i * 80}ms both;">
              <div class="arch-node-icon" style="color:${sub.color};">${icons[sub.icon] || icons.orion}</div>
              <div class="arch-node-label" style="color:${sub.color};">${sub.name}</div>
              <div class="arch-node-abbr">${sub.abbr}</div>
              <div class="arch-node-health">
                <div class="arch-node-health-bar" style="width:${health}%;background:${healthColor};box-shadow:0 0 6px ${healthColor};"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Controls -->
      <div class="arch-controls">
        <button class="arch-ctrl-btn" id="arch-zoom-in" title="Zoom In">+</button>
        <button class="arch-ctrl-btn" id="arch-zoom-out" title="Zoom Out">−</button>
        <button class="arch-ctrl-btn" id="arch-reset" title="Reset View">⌂</button>
      </div>

      <!-- Info -->
      <div class="arch-info">
        <span id="arch-zoom-level">ZOOM: 100%</span>
        <span>PAN: 0, 0</span>
        <span>${subs.length} SUBSYSTEMS · ${connections.length} INTERFACES</span>
      </div>

      <!-- Minimap -->
      <div class="arch-minimap" id="arch-minimap">
        <svg viewBox="0 0 1400 800" style="width:100%;height:100%;">
          ${subs.map((sub, i) => {
            const pos = nodePositions[i] || { x: 200 + i * 150, y: 300 };
            return `<circle cx="${pos.x}" cy="${pos.y}" r="8" fill="${sub.color}" opacity="0.6"/>`;
          }).join('')}
          ${connections.map(c => {
            const f = nodePositions[c.from] || { x: 0, y: 0 };
            const t = nodePositions[c.to] || { x: 0, y: 0 };
            return `<line x1="${f.x + 70}" y1="${f.y + 40}" x2="${t.x + 70}" y2="${t.y + 40}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>`;
          }).join('')}
          <rect id="minimap-viewport" x="0" y="0" width="200" height="120" fill="rgba(0,255,157,0.08)" stroke="var(--plasma-green)" stroke-width="1.5" rx="2"/>
        </svg>
      </div>
    </div>
  `;

  drawConnections();
  setupPanZoom(container);
  setupNodeInteractions(container, subs);
}

function drawConnections() {
  const svg = document.getElementById('arch-svg');
  if (!svg) return;

  let paths = '';
  connections.forEach(c => {
    const from = nodePositions[c.from] || { x: 0, y: 0 };
    const to = nodePositions[c.to] || { x: 0, y: 0 };
    const fx = from.x + 70, fy = from.y + 45;
    const tx = to.x + 70, ty = to.y + 45;

    // Bezier curve
    const mx = (fx + tx) / 2;
    const my = (fy + ty) / 2;
    const cx1 = mx, cy1 = fy;
    const cx2 = mx, cy2 = ty;

    paths += `<path d="M ${fx} ${fy} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${tx} ${ty}" class="arch-connection arch-connection-animated ${c.type}"/>`;
  });

  svg.innerHTML = paths;
}

function setupPanZoom(container) {
  const wrapper = document.getElementById('arch-container');
  const inner = document.getElementById('arch-inner');
  const svg = document.getElementById('arch-svg');
  if (!wrapper || !inner) return;

  // Pan
  wrapper.addEventListener('mousedown', (e) => {
    if (e.target.closest('.arch-node') || e.target.closest('.arch-ctrl-btn')) return;
    isDragging = true;
    dragStartX = e.clientX - panX;
    dragStartY = e.clientY - panY;
    wrapper.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    panX = e.clientX - dragStartX;
    panY = e.clientY - dragStartY;
    applyTransform(inner, svg);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    if (wrapper) wrapper.style.cursor = 'grab';
  });

  // Zoom
  wrapper.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    zoom = Math.max(0.3, Math.min(2, zoom + delta));
    applyTransform(inner, svg);
    updateZoomLabel();
  }, { passive: false });

  // Zoom buttons
  document.getElementById('arch-zoom-in')?.addEventListener('click', () => {
    zoom = Math.min(2, zoom + 0.15);
    applyTransform(inner, svg);
    updateZoomLabel();
  });

  document.getElementById('arch-zoom-out')?.addEventListener('click', () => {
    zoom = Math.max(0.3, zoom - 0.15);
    applyTransform(inner, svg);
    updateZoomLabel();
  });

  document.getElementById('arch-reset')?.addEventListener('click', () => {
    panX = 0; panY = 0; zoom = 1;
    applyTransform(inner, svg);
    updateZoomLabel();
  });
}

function applyTransform(inner, svg) {
  const t = `translate(${panX}px, ${panY}px) scale(${zoom})`;
  if (inner) inner.style.transform = t;
  if (svg) svg.style.transform = t;
}

function updateZoomLabel() {
  const el = document.getElementById('arch-zoom-level');
  if (el) el.textContent = `ZOOM: ${Math.round(zoom * 100)}%`;
}

function setupNodeInteractions(container, subs) {
  container.querySelectorAll('.arch-node').forEach(node => {
    node.addEventListener('click', () => {
      // Deselect previous
      container.querySelectorAll('.arch-node.selected').forEach(n => {
        n.classList.remove('selected');
        n.style.boxShadow = '';
      });

      // Select this
      node.classList.add('selected');
      const idx = parseInt(node.dataset.idx);
      const sub = subs[idx];
      node.style.boxShadow = `0 0 30px ${sub.color}40, inset 0 0 20px ${sub.color}10`;

      selectItem({
        id: sub.abbr,
        title: sub.name,
        status: 'active',
        text: `${sub.name} (${sub.abbr}) — Core subsystem responsible for ${sub.name.toLowerCase()} functions. This subsystem has ${connections.filter(c => c.from === idx || c.to === idx).length} active interfaces with other subsystems.`,
        owner: 'Subsystem Lead',
        priority: 'high',
      });
    });

    // Drag nodes
    let nodeDragging = false;
    let nodeOffsetX = 0, nodeOffsetY = 0;

    node.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      nodeDragging = true;
      const rect = node.getBoundingClientRect();
      nodeOffsetX = e.clientX - rect.left;
      nodeOffsetY = e.clientY - rect.top;
      node.style.zIndex = '30';
    });

    window.addEventListener('mousemove', (e) => {
      if (!nodeDragging) return;
      const container = document.getElementById('arch-container');
      if (!container) return;
      const cRect = container.getBoundingClientRect();
      const newX = (e.clientX - cRect.left - nodeOffsetX - panX) / zoom;
      const newY = (e.clientY - cRect.top - nodeOffsetY - panY) / zoom;
      node.style.left = `${newX}px`;
      node.style.top = `${newY}px`;

      const idx = parseInt(node.dataset.idx);
      nodePositions[idx] = { x: newX, y: newY };
      drawConnections();
    });

    window.addEventListener('mouseup', () => {
      if (nodeDragging) {
        nodeDragging = false;
        node.style.zIndex = '';
      }
    });
  });
}
