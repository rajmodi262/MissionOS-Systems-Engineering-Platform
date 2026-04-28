# Test Plan Document — MISSION OS

| Field | Value |
|---|---|
| **Document ID** | MOS-TP-001 |
| **Version** | 1.0 |
| **Date** | April 25, 2026 |
| **Test Framework** | Selenium WebDriver 4.x |
| **Browser** | Google Chrome (latest) |
| **Status** | Active |

---

## 1. Introduction

### 1.1 Purpose
This Test Plan defines the testing strategy, scope, approach, and procedures for validating the MISSION OS platform. It covers automated browser testing via Selenium WebDriver and manual verification procedures.

### 1.2 Scope
Testing encompasses all 11 application views, the navigation system, the AI copilot, and cross-cutting concerns including state persistence, animation rendering, and responsive layout behavior.

### 1.3 Test Environment

| Component | Specification |
|---|---|
| OS | Windows 10/11 |
| Browser | Google Chrome 120+ |
| Driver | ChromeDriver (matching Chrome version) |
| Runtime | Node.js 18+ |
| Dev Server | Vite 8.x at http://localhost:5173 |
| Test Library | selenium-webdriver 4.x |
| Resolution | 1536 × 900 |

---

## 2. Test Strategy

### 2.1 Testing Levels

| Level | Description | Tool |
|---|---|---|
| **UI Functional** | Verify all views render correctly with expected elements | Selenium |
| **Navigation** | Verify route transitions and sidebar interactions | Selenium |
| **Interaction** | Verify user inputs (sliders, clicks, text) produce expected results | Selenium |
| **Visual** | Verify animations, transitions, and visual styling | Manual |
| **State** | Verify localStorage persistence across refreshes | Selenium |
| **Performance** | Verify page load and transition times | Manual / Lighthouse |

### 2.2 Entry Criteria
- Dev server running at http://localhost:5173
- Chrome and ChromeDriver installed and accessible on PATH
- All source code compiled without errors (Vite HMR active)

### 2.3 Exit Criteria
- All 58 automated test assertions pass (0 failures)
- Manual visual inspection confirms no rendering artifacts
- No console errors in browser DevTools

---

## 3. Test Cases

### 3.1 Login View (TC-01)

| Test ID | Description | Expected Result | Priority |
|---|---|---|---|
| T1.1 | Page title verification | Title contains "MISSION OS" | Critical |
| T1.2 | Particle canvas existence | `#particle-field` canvas element present | High |
| T1.3 | Login form rendering | `.login-form` visible after 3s animation | Critical |
| T1.4 | Input field count | Exactly 2 input fields present | Critical |
| T1.5 | Login button existence | Submit button present in form | Critical |
| T1.6 | Login flow end-to-end | Enter credentials → redirects to `/command-center` | Critical |

### 3.2 Command Center (TC-02)

| Test ID | Description | Expected Result | Priority |
|---|---|---|---|
| T2.1 | View header text | H1 contains "COMMAND CENTER" | High |
| T2.2 | Telemetry strip | `.telemetry-strip` element exists | High |
| T2.3 | Statistics cards | ≥4 `.stat-card` elements rendered | High |
| T2.4 | Mission hex cards | ≥5 `.hex-card` elements rendered | High |
| T2.5 | Sidebar presence | `.mission-spine` element exists | Critical |
| T2.6 | Context drawer | `.zone-drawer` element exists | High |

### 3.3 Requirements Engineering (TC-03)

| Test ID | Description | Expected Result | Priority |
|---|---|---|---|
| T3.1 | Header text | H1 contains "REQUIREMENTS" | High |
| T3.2 | Tab bar | Exactly 3 `.tab-btn` elements | High |
| T3.3 | Requirement rows | ≥8 `.req-row` elements | High |
| T3.4 | Status badges | >0 `.glass-badge` elements | Medium |
| T3.5 | Hierarchy tab switch | Clicking tab 2 shows hierarchy content | High |
| T3.6 | Traceability tab | Clicking tab 3 shows RTM heatmap | High |

### 3.4 Architecture Canvas (TC-04)

| Test ID | Description | Expected Result | Priority |
|---|---|---|---|
| T4.1 | Header text | H1 contains "ARCHITECTURE" | High |
| T4.2 | Canvas container | `.arch-canvas-container` exists | Critical |
| T4.3 | Subsystem nodes | ≥8 `.arch-node` elements | High |
| T4.4 | Zoom controls | `#arch-zoom-in` and `#arch-zoom-out` exist | Medium |
| T4.5 | Minimap | `.arch-minimap` element exists | Medium |
| T4.6 | SVG connections | `.arch-connections` SVG layer exists | High |

### 3.5 Risk Management (TC-05)

| Test ID | Description | Expected Result | Priority |
|---|---|---|---|
| T5.1 | Header text | H1 contains "RISK" | High |
| T5.2 | Risk matrix | `#risk-matrix` element exists | Critical |
| T5.3 | Matrix cells | Exactly 25 `.risk-cell` elements (5×5) | High |
| T5.4 | Risk dots | ≥3 `.risk-dot` elements plotted | High |
| T5.5 | Risk register | ≥3 `.risk-item` elements listed | High |

### 3.6 Trade Study Simulator (TC-06)

| Test ID | Description | Expected Result | Priority |
|---|---|---|---|
| T6.1 | Header text | H1 contains "TRADE STUDY" | High |
| T6.2 | Radar chart | `#radar-chart` canvas exists | Critical |
| T6.3 | Bar chart | `#bar-chart` canvas exists | Critical |
| T6.4 | Weight sliders | Exactly 5 `.trade-slider` inputs | High |
| T6.5 | Decision matrix | `.decision-matrix` table exists | High |
| T6.6 | Slider interaction | Changing slider updates weight display | High |

### 3.7 V-Model Lifecycle (TC-07)

| Test ID | Description | Expected Result | Priority |
|---|---|---|---|
| T7.1 | Header text | H1 contains "V-MODEL" | High |
| T7.2 | SVG diagram | SVG V-shape rendered | Critical |
| T7.3 | Phase nodes | ≥8 lifecycle phase nodes | High |
| T7.4 | Gate button | Gate Readiness Check button exists | High |

### 3.8 Document Studio (TC-08)

| Test ID | Description | Expected Result | Priority |
|---|---|---|---|
| T8.1 | Header text | H1 contains "DOCUMENT STUDIO" | High |
| T8.2 | Document list | ≥6 `.doc-item` elements | High |
| T8.3 | Editor panel | `#doc-editor` element exists | Critical |
| T8.4 | ContentEditable | Editor has `contenteditable="true"` | Critical |
| T8.5 | Word count | `#doc-word-count` shows "WORDS: N" | Medium |
| T8.6 | Document switching | Clicking doc item loads different content | High |
| T8.7 | Export button | `#doc-export-btn` exists | Medium |

### 3.9 Launch Countdown (TC-09)

| Test ID | Description | Expected Result | Priority |
|---|---|---|---|
| T9.1 | Header text | H1 contains "COUNTDOWN" | High |
| T9.2 | Countdown clock | `.countdown-clock` element exists | Critical |
| T9.3 | Readiness quadrants | Exactly 4 `.readiness-quadrant` elements | High |
| T9.4 | Simulate button | Simulate Readiness button exists | Medium |
| T9.5 | T-0 button | Trigger T-0 Sequence button exists | Medium |

### 3.10 Navigation & Sidebar (TC-10)

| Test ID | Description | Expected Result | Priority |
|---|---|---|---|
| T10.1 | Nav items count | ≥10 `.nav-item` elements | Critical |
| T10.2 | Active state | `.nav-item.active` exists on current route | High |
| T10.3 | Navigate to Requirements | Clicking nav item changes URL to `/requirements` | Critical |
| T10.4 | Navigate back | Clicking Command Center returns to `/command-center` | Critical |

### 3.11 Engineering Theater (TC-11)

| Test ID | Description | Expected Result | Priority |
|---|---|---|---|
| T11.1 | Header text | H1 contains "ENGINEERING" | High |
| T11.2 | Diagram cards | Exactly 6 `.theater-card` elements | High |
| T11.3 | SVG content | ≥5 SVGs inside theater cards | High |

### 3.12 N² Matrix (TC-12)

| Test ID | Description | Expected Result | Priority |
|---|---|---|---|
| T12.1 | Header text | H1 contains "N²" or "MATRIX" | High |
| T12.2 | Matrix table | `<table>` element rendered | Critical |
| T12.3 | Interface cells | ≥40 `.n2-cell` elements | High |

---

## 4. Requirements Traceability Matrix

| Requirement | Test Case(s) | Status |
|---|---|---|
| FR-001 (Login) | T1.1 – T1.6 | ✅ Covered |
| FR-002 (Dashboard) | T2.1 – T2.6 | ✅ Covered |
| FR-003 (Requirements) | T3.1 – T3.6 | ✅ Covered |
| FR-004 (Architecture) | T4.1 – T4.6 | ✅ Covered |
| FR-005 (Diagrams) | T11.1 – T11.3 | ✅ Covered |
| FR-006 (N² Matrix) | T12.1 – T12.3 | ✅ Covered |
| FR-007 (Risk) | T5.1 – T5.5 | ✅ Covered |
| FR-008 (Trade Study) | T6.1 – T6.6 | ✅ Covered |
| FR-009 (V-Model) | T7.1 – T7.4 | ✅ Covered |
| FR-010 (Documents) | T8.1 – T8.7 | ✅ Covered |
| FR-011 (Countdown) | T9.1 – T9.5 | ✅ Covered |
| FR-012 (Orion AI) | Manual | ⚠️ Manual Only |
| IR-001 (Layout) | T2.5, T2.6, T10.1 | ✅ Covered |
| IR-002 (Navigation) | T10.1 – T10.4 | ✅ Covered |

---

## 5. Execution Instructions

### 5.1 Prerequisites
```bash
# Install ChromeDriver (must match Chrome version)
# Download from: https://chromedriver.chromium.org/downloads
# Add to PATH

# Verify installation
chromedriver --version
```

### 5.2 Running Tests
```bash
# Terminal 1: Start dev server
cd mission-os
npm run dev

# Terminal 2: Run Selenium tests
node tests/selenium-tests.js
```

### 5.3 Expected Output
```
═══════════════════════════════════════════════
  MISSION OS — Selenium Test Suite v1.0
  Target: http://localhost:5173
═══════════════════════════════════════════════

🧪 TEST SUITE: Login View
  ✅ T1.1: Page title contains "MISSION OS"
  ✅ T1.2: Particle field canvas exists
  ...

═══════════════════════════════════════════════
  RESULTS: 12 PASSED / 0 FAILED / 12 TOTAL
═══════════════════════════════════════════════
```

---

## 6. Defect Management

| Severity | Description | SLA |
|---|---|---|
| **Critical** | Application crash, login failure, navigation broken | Fix within 4 hours |
| **High** | View not rendering, data not displayed | Fix within 1 day |
| **Medium** | Visual glitch, animation stutter | Fix within 3 days |
| **Low** | Cosmetic, typo, minor alignment | Fix in next sprint |
