/* ============================================================
   Document Studio View
   ============================================================ */

import { missions } from '../core/data.js';
import { icons } from '../utils/svg-icons.js';

const documents = [
  { id: 'SRD', name: 'System Requirements Document', type: 'srd', version: '3.2', status: 'approved', lastEdit: '2026-04-20', pages: 47 },
  { id: 'ICD', name: 'Interface Control Document', type: 'icd', version: '2.1', status: 'draft', lastEdit: '2026-04-23', pages: 32 },
  { id: 'TPP', name: 'Test & Verification Plan', type: 'tpp', version: '1.4', status: 'in-review', lastEdit: '2026-04-22', pages: 28 },
  { id: 'RRR', name: 'Risk Register Report', type: 'rrr', version: '4.0', status: 'approved', lastEdit: '2026-04-24', pages: 15 },
  { id: 'ConOps', name: 'Concept of Operations', type: 'srd', version: '2.0', status: 'approved', lastEdit: '2026-03-15', pages: 38 },
  { id: 'PDR-Pkg', name: 'PDR Review Package', type: 'icd', version: '1.0', status: 'draft', lastEdit: '2026-04-24', pages: 62 },
  { id: 'MMP', name: 'Mission Management Plan', type: 'tpp', version: '1.2', status: 'approved', lastEdit: '2026-02-10', pages: 24 },
  { id: 'SEMP', name: 'Systems Engineering Mgmt Plan', type: 'srd', version: '1.5', status: 'approved', lastEdit: '2026-03-01', pages: 31 },
];

const docContents = {
  'SRD': `<h1>SYSTEM REQUIREMENTS DOCUMENT</h1>
<p style="color:var(--text-dim);font-family:var(--font-mono);font-size:0.7rem;">ARTEMIS-VII // SRD-3.2 // APPROVED // CLASSIFICATION: UNCLASSIFIED</p>

<h2>1. INTRODUCTION</h2>
<h3>1.1 Purpose</h3>
<p>This System Requirements Document (SRD) defines the complete set of system-level requirements for the ARTEMIS-VII Lunar Surface Exploration Mission. It establishes the technical baseline for the design, development, integration, verification, and validation of the ARTEMIS-VII spacecraft and supporting ground systems.</p>

<h3>1.2 Scope</h3>
<p>This document covers all system-level functional, performance, interface, and environmental requirements derived from stakeholder needs and the Concept of Operations (ConOps). It does not include subsystem-level requirements, which are documented in the respective Subsystem Specifications.</p>

<h3>1.3 Applicable Documents</h3>
<table>
  <tr><th>Document ID</th><th>Title</th><th>Version</th></tr>
  <tr><td>ARTEMIS-CONOPS-2.0</td><td>Concept of Operations</td><td>2.0</td></tr>
  <tr><td>NASA-STD-8729.1</td><td>Planning, Developing, and Managing an Effective Reliability & Maintainability Program</td><td>Rev A</td></tr>
  <tr><td>NPR-7150.2</td><td>NASA Software Engineering Requirements</td><td>Rev D</td></tr>
  <tr><td>ARTEMIS-ICD-2.1</td><td>Interface Control Document</td><td>2.1</td></tr>
</table>

<h2>2. SYSTEM DESCRIPTION</h2>
<p>ARTEMIS-VII is a crewed lunar surface exploration mission targeting the South Pole-Aitken basin. The mission architecture comprises a crew transport vehicle, surface habitat module, and extravehicular activity (EVA) support systems designed for a 30-day surface stay duration.</p>

<h3>2.1 Mission Objectives</h3>
<ul>
  <li>Demonstrate sustained crewed operations on the lunar surface for 30 consecutive days</li>
  <li>Conduct in-situ resource utilization (ISRU) experiments for oxygen extraction from regolith</li>
  <li>Perform geological surveys and sample collection from at least 5 distinct surface sites</li>
  <li>Validate long-duration crew health monitoring and life support technologies</li>
</ul>

<h2>3. SYSTEM REQUIREMENTS</h2>
<h3>3.1 Functional Requirements</h3>
<table>
  <tr><th>ID</th><th>Requirement</th><th>Verification</th><th>Status</th></tr>
  <tr><td style="color:var(--text-dim);">REQ-001</td><td>The system shall sustain a crew of 4 astronauts for a minimum of 30 days on the lunar surface.</td><td>Test</td><td style="color:var(--plasma-green);">VERIFIED</td></tr>
  <tr><td style="color:var(--text-dim);">REQ-002</td><td>The thermal control system shall maintain cabin temperature between 18°C and 26°C.</td><td>Test</td><td style="color:var(--plasma-green);">VERIFIED</td></tr>
  <tr><td style="color:var(--text-dim);">REQ-003</td><td>The communication system shall maintain continuous contact with Earth via Lunar Gateway relay.</td><td>Demo</td><td style="color:var(--solar-amber);">DRAFT</td></tr>
  <tr><td style="color:var(--text-dim);">REQ-004</td><td>The power subsystem shall generate a minimum of 12 kW continuous power using solar arrays.</td><td>Analysis</td><td style="color:var(--plasma-green);">VERIFIED</td></tr>
  <tr><td style="color:var(--text-dim);">REQ-005</td><td>The propulsion system shall provide sufficient delta-v for lunar orbit insertion and descent.</td><td>Analysis</td><td style="color:var(--photon-blue);">IN-REVIEW</td></tr>
</table>

<h3>3.2 Performance Requirements</h3>
<p>The system shall achieve all performance thresholds as defined in the Performance Verification Matrix (PVM). Key performance parameters include propulsive delta-v margin ≥15%, power generation margin ≥20%, and communication uptime ≥98.5%.</p>

<h2>4. VERIFICATION MATRIX</h2>
<p>Requirements traceability and verification methods are documented in the companion Requirements Traceability Matrix (RTM). All system-level requirements shall be verified prior to the Preliminary Design Review (PDR) gate.</p>`,

  'ICD': `<h1>INTERFACE CONTROL DOCUMENT</h1>
<p style="color:var(--text-dim);font-family:var(--font-mono);font-size:0.7rem;">ARTEMIS-VII // ICD-2.1 // DRAFT // INTERFACE CONTROL BOARD</p>

<h2>1. INTERFACE SUMMARY</h2>
<p>This document defines all physical, data, power, and thermal interfaces between the ARTEMIS-VII subsystems. Each interface is assigned a unique identifier and tracked through the N² Interface Matrix.</p>

<h2>2. INTERFACE DEFINITIONS</h2>
<h3>2.1 Propulsion ↔ Structure (IFC-PROP-STR)</h3>
<table>
  <tr><th>Parameter</th><th>Value</th><th>Tolerance</th></tr>
  <tr><td>Mounting Load</td><td>45 kN axial</td><td>±5%</td></tr>
  <tr><td>Bolt Pattern</td><td>24× M12 radial</td><td>—</td></tr>
  <tr><td>Thermal Interface</td><td>MLI blanket, 10 layers</td><td>—</td></tr>
</table>

<h3>2.2 Avionics ↔ Communications (IFC-AVN-COM)</h3>
<table>
  <tr><th>Parameter</th><th>Value</th><th>Protocol</th></tr>
  <tr><td>Data Link</td><td>100 Mbps</td><td>SpaceWire</td></tr>
  <tr><td>Command Rate</td><td>2 kbps uplink</td><td>CCSDS</td></tr>
  <tr><td>Telemetry Rate</td><td>2 Mbps downlink</td><td>CCSDS</td></tr>
</table>`,

  'TPP': `<h1>TEST & VERIFICATION PLAN</h1>
<p style="color:var(--text-dim);font-family:var(--font-mono);font-size:0.7rem;">ARTEMIS-VII // TPP-1.4 // IN-REVIEW // VERIFICATION BOARD</p>
<h2>1. VERIFICATION APPROACH</h2>
<p>This plan outlines the testing methodology for the ARTEMIS-VII mission. Verification will be performed using a combination of Test, Analysis, Demonstration, and Inspection (TADI).</p>
<h2>2. TEST PHASES</h2>
<ul>
  <li>Component Level Qualification</li>
  <li>Subsystem Integration Testing</li>
  <li>System Level Environmental Testing (Thermal Vacuum, Vibration, Acoustic)</li>
  <li>End-to-End Mission Simulation</li>
</ul>`,

  'RRR': `<h1>RISK REGISTER REPORT</h1>
<p style="color:var(--text-dim);font-family:var(--font-mono);font-size:0.7rem;">ARTEMIS-VII // RRR-4.0 // APPROVED // RISK MANAGEMENT BOARD</p>
<h2>1. TOP MISSION RISKS</h2>
<table>
  <tr><th>ID</th><th>Risk Description</th><th>L × C</th><th>Mitigation</th></tr>
  <tr><td>RSK-001</td><td>Propulsion valve failure during LOI</td><td>2 × 5 = 10</td><td>Implement dual-redundant valve architecture.</td></tr>
  <tr><td>RSK-002</td><td>Solar flare event during EVA</td><td>3 × 4 = 12</td><td>Real-time space weather monitoring and rapid ingress procedures.</td></tr>
  <tr><td>RSK-003</td><td>Communication blackout over 12 hours</td><td>1 × 5 = 5</td><td>Utilize autonomous life support hold mode.</td></tr>
</table>
<h2>2. RISK TRENDS</h2>
<p>Overall mission risk exposure has decreased by 15% since the Critical Design Review (CDR) due to successful qualification testing of the environmental control system.</p>`,

  'ConOps': `<h1>CONCEPT OF OPERATIONS</h1>
<p style="color:var(--text-dim);font-family:var(--font-mono);font-size:0.7rem;">ARTEMIS-VII // CONOPS-2.0 // APPROVED // MISSION ARCHITECTURE</p>
<h2>1. MISSION PHASES</h2>
<p>The mission is divided into the following operational phases:</p>
<ol>
  <li>Pre-Launch and Ascent</li>
  <li>Earth Orbit Insertion & Trans-Lunar Injection (TLI)</li>
  <li>Lunar Orbit Insertion (LOI)</li>
  <li>Descent and Landing</li>
  <li>Surface Operations (30 Days)</li>
  <li>Ascent and Rendezvous</li>
  <li>Trans-Earth Injection (TEI)</li>
  <li>Re-entry and Recovery</li>
</ol>
<h2>2. CREW ACTIVITIES</h2>
<p>During the 30-day surface stay, the crew will conduct 10 EVAs, deploy 4 science packages, and collect 150 kg of geological samples.</p>`,

  'PDR-Pkg': `<h1>PRELIMINARY DESIGN REVIEW PACKAGE</h1>
<p style="color:var(--text-dim);font-family:var(--font-mono);font-size:0.7rem;">ARTEMIS-VII // PDR-1.0 // DRAFT // REVIEW BOARD</p>
<h2>1. EXECUTIVE SUMMARY</h2>
<p>This package contains the presentation materials, technical baseline documents, and independent review board assessments for the ARTEMIS-VII PDR.</p>
<h2>2. DESIGN MATURITY</h2>
<p>The current design maturity is assessed at 45%. All major trade studies have been closed, and system-level requirements have been baselined. Subsystem requirements are currently under review.</p>
<h2>3. OPEN ACTION ITEMS</h2>
<ul>
  <li>AI-01: Finalize thermal interface constraints for the ISRU payload.</li>
  <li>AI-02: Complete structural analysis of the landing gear under off-nominal conditions.</li>
</ul>`,

  'MMP': `<h1>MISSION MANAGEMENT PLAN</h1>
<p style="color:var(--text-dim);font-family:var(--font-mono);font-size:0.7rem;">ARTEMIS-VII // MMP-1.2 // APPROVED // PROGRAM OFFICE</p>
<h2>1. ORGANIZATIONAL STRUCTURE</h2>
<p>The ARTEMIS-VII program is managed using a matrix organization, integrating engineering directorates with the dedicated mission program office.</p>
<h2>2. SCHEDULE BASELINE</h2>
<p>The critical path currently runs through the integration and testing of the life support subsystem. Schedule margin stands at 45 days against the launch readiness date.</p>
<h2>3. BUDGET AND RESOURCES</h2>
<p>Current Estimate at Completion (EAC) is tracking 2% under the baseline budget. Workforce levels are nominal.</p>`,

  'SEMP': `<h1>SYSTEMS ENGINEERING MANAGEMENT PLAN</h1>
<p style="color:var(--text-dim);font-family:var(--font-mono);font-size:0.7rem;">ARTEMIS-VII // SEMP-1.5 // APPROVED // CHIEF ENGINEER</p>
<h2>1. TECHNICAL PLANNING</h2>
<p>This SEMP defines the systems engineering processes, methodologies, and tools used throughout the ARTEMIS-VII lifecycle, ensuring compliance with NPR 7123.1.</p>
<h2>2. CONFIGURATION MANAGEMENT</h2>
<p>All baselined artifacts are managed in the central repository. Changes to the technical baseline require approval from the Configuration Control Board (CCB).</p>
<h2>3. TECHNICAL REVIEWS</h2>
<p>The standard gate review lifecycle (SRR, SDR, PDR, CDR, TRR, ORR) shall be followed, with entry and exit criteria defined in Appendix A.</p>`
};

let activeDoc = 'SRD';

export async function renderDocuments(container) {
  container.innerHTML = `
    <div class="view-header">
      <div>
        <h1>DOCUMENT STUDIO</h1>
        <p class="subtitle">ARTEMIS-VII // ${documents.length} DOCUMENTS // LIVE ENGINE</p>
      </div>
      <button class="glass-btn glass-btn--primary" id="doc-export-btn">EXPORT PDF</button>
    </div>

    <div class="doc-layout">
      <!-- Left: Document List -->
      <div class="doc-list-panel glass-panel">
        <div class="doc-list-header">
          <span class="font-heading" style="font-size:0.8rem;letter-spacing:0.1em;color:var(--text-secondary);">DOCUMENTS</span>
          <button class="glass-btn" style="padding:2px 8px;font-size:0.6rem;">+ NEW</button>
        </div>
        <div id="doc-list">
          ${documents.map(doc => `
            <div class="doc-item ${doc.id === activeDoc ? 'active' : ''}" data-doc-id="${doc.id}" style="animation:fadeInUp 0.3s var(--ease-out-expo) ${documents.indexOf(doc) * 50}ms both;">
              <div class="doc-icon ${doc.type}">${icons.documents}</div>
              <div>
                <div class="doc-name">${doc.name}</div>
                <div class="doc-meta">v${doc.version} · ${doc.status} · ${doc.pages} pages</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Right: Editor -->
      <div class="doc-editor-panel glass-panel">
        <div class="doc-editor-toolbar">
          <button class="doc-toolbar-btn active" data-mode="edit">EDIT</button>
          <button class="doc-toolbar-btn" data-mode="preview">PREVIEW</button>
          <button class="doc-toolbar-btn" data-mode="history">HISTORY</button>
          <div style="flex:1;"></div>
          <span class="font-mono" style="font-size:0.6rem;color:var(--text-dim);" id="doc-version-label">SRD v3.2</span>
        </div>
        <div class="doc-editor-body" id="doc-editor" contenteditable="true">
          ${docContents[activeDoc] || '<p>Select a document to begin editing.</p>'}
        </div>
        <div class="doc-status-bar">
          <div class="doc-status-item">
            <span class="doc-status-dot"></span>
            AUTO-SAVED
          </div>
          <div class="doc-status-item" id="doc-word-count">WORDS: —</div>
          <div class="doc-status-item">LAST EDIT: ${documents[0].lastEdit}</div>
        </div>
      </div>
    </div>
  `;

  updateWordCount();
  setupToolbar(container);
  setupDocList(container);

  // Word count on input
  const editor = document.getElementById('doc-editor');
  if (editor) editor.addEventListener('input', updateWordCount);

  // Export button
  document.getElementById('doc-export-btn')?.addEventListener('click', () => {
    const doc = documents.find(d => d.id === activeDoc);
    alert(`EXPORT: ${doc?.name || 'Document'} v${doc?.version || '1.0'}\n\nIn a production build, this would generate a formatted PDF with MISSION OS branding, cover page, table of contents, and all requirement cross-references.`);
  });
}

let currentMode = 'edit';
let editSnapshot = '';

const versionHistory = {
  'SRD': [
    { version: '3.2', date: '2026-04-20', author: 'Dr. Sarah Chen', changes: 'Updated REQ-005 verification method from Demo to Analysis. Added performance margin requirements.' },
    { version: '3.1', date: '2026-04-12', author: 'Marcus Rodriguez', changes: 'Added ISRU oxygen production requirement REQ-010. Updated applicable documents table.' },
    { version: '3.0', date: '2026-03-28', author: 'Dr. Sarah Chen', changes: 'Major revision: restructured Section 3 to separate functional and performance requirements.' },
    { version: '2.4', date: '2026-03-15', author: 'Yuki Tanaka', changes: 'Incorporated SRR RID resolutions. Updated communication requirements per Gateway ICD v2.0.' },
    { version: '2.0', date: '2026-02-01', author: 'Pavel Volkov', changes: 'Initial baseline after Stakeholder Review. 8 system-level requirements baselined.' },
  ],
  'ICD': [
    { version: '2.1', date: '2026-04-23', author: 'Yuki Tanaka', changes: 'Added SpaceWire interface parameters for Avionics-Communications link.' },
    { version: '2.0', date: '2026-04-10', author: 'Marcus Rodriguez', changes: 'Complete rewrite of thermal interface specifications. Added bolt pattern details.' },
    { version: '1.0', date: '2026-03-01', author: 'Dr. Sarah Chen', changes: 'Initial draft with Propulsion-Structure and Power-Thermal interfaces.' },
  ],
  'TPP': [
    { version: '1.4', date: '2026-04-22', author: 'Test Engineering Team', changes: 'Updated thermal vacuum test profiles.' },
    { version: '1.0', date: '2026-01-15', author: 'System', changes: 'Initial baseline release.' }
  ],
  'RRR': [
    { version: '4.0', date: '2026-04-24', author: 'Risk Management Board', changes: 'Retired RSK-015. Escalated RSK-002.' },
    { version: '3.5', date: '2026-03-10', author: 'System', changes: 'Monthly risk cycle update.' }
  ],
  'ConOps': [
    { version: '2.0', date: '2026-03-15', author: 'Mission Architecture Team', changes: 'Added detailed surface EVA timelines.' },
    { version: '1.0', date: '2025-11-01', author: 'System', changes: 'Initial Concept of Operations.' }
  ],
  'PDR-Pkg': [
    { version: '1.0', date: '2026-04-24', author: 'Program Office', changes: 'Compiled initial PDR presentation deck.' }
  ],
  'MMP': [
    { version: '1.2', date: '2026-02-10', author: 'Program Management', changes: 'Updated schedule baseline and milestones.' },
    { version: '1.0', date: '2025-10-15', author: 'System', changes: 'Initial Management Plan.' }
  ],
  'SEMP': [
    { version: '1.5', date: '2026-03-01', author: 'Chief Engineer', changes: 'Updated configuration management workflows.' },
    { version: '1.0', date: '2025-09-01', author: 'System', changes: 'Initial SEMP baseline.' }
  ]
};

function setupToolbar(container) {
  container.querySelectorAll('.doc-toolbar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      if (!mode || mode === currentMode) return;

      // Update active button
      container.querySelectorAll('.doc-toolbar-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = mode;

      const editor = document.getElementById('doc-editor');
      if (!editor) return;

      if (mode === 'edit') {
        editor.contentEditable = 'true';
        editor.innerHTML = editSnapshot || docContents[activeDoc] || '';
        editor.style.animation = 'fadeIn 0.3s ease';
      } else if (mode === 'preview') {
        // Save current edits
        editSnapshot = editor.innerHTML;
        editor.contentEditable = 'false';
        const doc = documents.find(d => d.id === activeDoc);
        editor.innerHTML = `
          <div style="border-bottom:1px solid var(--glass-border);padding-bottom:var(--space-md);margin-bottom:var(--space-lg);">
            <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-sm);">
              <span class="glass-badge glass-badge--${doc?.status === 'approved' ? 'success' : doc?.status === 'draft' ? 'warning' : 'info'}">${doc?.status?.toUpperCase() || 'DRAFT'}</span>
              <span style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-dim);">v${doc?.version || '1.0'} · ${doc?.pages || 0} pages · ${doc?.lastEdit || '—'}</span>
            </div>
          </div>
          ${editSnapshot}
          <div style="margin-top:var(--space-3xl);padding-top:var(--space-lg);border-top:1px solid var(--glass-border);">
            <p style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-dim);text-align:center;">
              END OF DOCUMENT · ${doc?.name || 'UNTITLED'} · v${doc?.version || '1.0'} · ARTEMIS-VII PROGRAM
            </p>
          </div>
        `;
        editor.style.animation = 'fadeIn 0.3s ease';
      } else if (mode === 'history') {
        editSnapshot = editor.innerHTML;
        editor.contentEditable = 'false';
        const doc = documents.find(d => d.id === activeDoc);
        const history = versionHistory[activeDoc] || [
          { version: doc?.version || '1.0', date: doc?.lastEdit || '—', author: 'System', changes: 'Current version.' }
        ];
        editor.innerHTML = `
          <h1 style="font-size:1.2rem;">VERSION HISTORY</h1>
          <p style="color:var(--text-dim);font-family:var(--font-mono);font-size:0.7rem;margin-bottom:var(--space-xl);">${doc?.name || 'DOCUMENT'} · ${history.length} REVISIONS</p>
          <div style="position:relative;padding-left:24px;">
            <div style="position:absolute;left:7px;top:8px;bottom:8px;width:2px;background:var(--glass-border);"></div>
            ${history.map((h, i) => `
              <div style="position:relative;margin-bottom:var(--space-xl);animation:fadeInUp 0.4s var(--ease-out-expo) ${i * 100}ms both;">
                <div style="position:absolute;left:-20px;top:4px;width:12px;height:12px;border-radius:50%;background:${i === 0 ? 'var(--plasma-green)' : 'var(--glass-border)'};border:2px solid ${i === 0 ? 'var(--plasma-green)' : 'rgba(255,255,255,0.1)'};${i === 0 ? 'box-shadow:0 0 8px rgba(0,255,157,0.4);' : ''}"></div>
                <div style="font-family:var(--font-heading);font-size:0.9rem;letter-spacing:0.06em;color:${i === 0 ? 'var(--plasma-green)' : 'var(--text-primary)'};">v${h.version} ${i === 0 ? '(CURRENT)' : ''}</div>
                <div style="font-family:var(--font-mono);font-size:0.6rem;color:var(--text-dim);margin:4px 0 8px;">${h.date} · ${h.author}</div>
                <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.6;">${h.changes}</div>
              </div>
            `).join('')}
          </div>
        `;
        editor.style.animation = 'fadeIn 0.3s ease';
      }
      updateWordCount();
    });
  });
}

function setupDocList(container) {
  container.querySelectorAll('.doc-item').forEach(item => {
    item.addEventListener('click', () => {
      activeDoc = item.dataset.docId;
      currentMode = 'edit';
      editSnapshot = '';
      container.querySelectorAll('.doc-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Reset toolbar to edit mode
      container.querySelectorAll('.doc-toolbar-btn').forEach(b => b.classList.remove('active'));
      container.querySelector('.doc-toolbar-btn[data-mode="edit"]')?.classList.add('active');

      const editor = document.getElementById('doc-editor');
      const doc = documents.find(d => d.id === activeDoc);
      const versionLabel = document.getElementById('doc-version-label');

      if (editor) {
        editor.contentEditable = 'true';
        editor.innerHTML = docContents[activeDoc] || `<h1>${doc?.name || 'UNTITLED'}</h1><p>Document content is being synchronized from the central repository. Content will appear here when available.</p>`;
        editor.style.animation = 'fadeIn 0.3s ease';
      }
      if (versionLabel && doc) versionLabel.textContent = `${doc.id} v${doc.version}`;
      updateWordCount();
    });
  });
}

function updateWordCount() {
  const editor = document.getElementById('doc-editor');
  const countEl = document.getElementById('doc-word-count');
  if (editor && countEl) {
    const text = editor.innerText || '';
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    countEl.textContent = `WORDS: ${words}`;
  }
}
