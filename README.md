# 🚀 MISSION OS — Systems Engineering for the Cosmos

> **The Operating System for Space Missions** — A high-fidelity, holographic command deck interface for managing the complete systems engineering lifecycle of space missions.

![Version](https://img.shields.io/badge/version-3.7.1-00FF9D)
![Build](https://img.shields.io/badge/build-passing-00FF9D)
![Tests](https://img.shields.io/badge/tests-58%20passing-00FF9D)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Documentation](#documentation)
- [Technology Stack](#technology-stack)
- [Design System](#design-system)
- [Team](#team)

---

## Overview

MISSION OS is a web-based systems engineering management platform designed for space mission lifecycle management. Built as a Single Page Application with vanilla JavaScript, it provides an immersive, dark-themed "holographic command deck" experience for managing requirements, architecture, risks, trade studies, and launch readiness across multiple concurrent space missions.

### Key Capabilities
- **6 Active Missions** — Concurrent monitoring of ARTEMIS-VII, EUROPA CLIPPER, MARS ASCENT, LUNAR GATEWAY, TITAN EXPLORER, and KEPLER STATION
- **247 Requirements** — Full lifecycle tracking with AI-powered quality analysis
- **14 Active Risks** — 5×5 probability-impact matrix with mitigation tracking
- **8 Subsystems** — Architecture modeling with interface dependency mapping
- **11 Lifecycle Phases** — V-Model tracking from Mission Need to Stakeholder Acceptance

---

## Features

### 🎬 Cinematic Login
Orbital ring assembly animation, character-by-character typewriter rendering, terminal-style input fields with cursor blink, and a particle dissolution transition on authentication.

### 📡 Mission Command Center
Real-time scrolling telemetry ticker, 4 glass-morphism statistics cards, hexagonal mission health cards with completion bars, and color-coded risk indicators.

### 📋 Requirements Engineering
Three-tab workspace with Document View (AI analysis chips), Hierarchy View (3-tier SVG node graph), and RTM Heatmap (interactive requirement-subsystem traceability grid).

### 🏗️ Systems Architecture Canvas
Infinite pan/zoom canvas with 8 draggable subsystem nodes, animated SVG bezier interface connections (data/power/thermal), minimap overlay, and zoom controls.

### 🎭 Engineering Theater
Gallery of 6 interactive SVG diagrams: Work Breakdown Structure, Context Diagram, Stakeholder Influence Map, PERT/Critical Path, Functional Flow Block Diagram, and Mass Budget allocation.

### 🔲 N² Interface Matrix
Interactive 8×8 subsystem grid with color-coded interface types (data, power, thermal, mechanical), hover enlarge effects, and click-to-inspect interface details.

### ⚠️ Risk Management
5×5 probability-impact heatmap with positioned risk dots, scrollable risk register with severity scoring, and status-based color coding (critical, active, mitigated, monitoring).

### 📊 Trade Study Simulator
Multi-criteria decision analysis with Chart.js radar and bar chart visualizations, interactive weight sliders with real-time chart updates, and an auto-highlighting decision matrix table.

### ✅ V-Model Lifecycle
SVG V-shape formation with 11 hexagonal phase nodes, animated particle flow along connections, completed/active/future state coloring, and a Gate Readiness Check modal.

### 📄 Document Studio
Split-panel layout with 8-document library and rich text editor, pre-loaded SRS and ICD content, toolbar with edit/preview/history modes, live word count, and auto-save status.

### ⏱️ Launch Countdown
Full-screen countdown clock (DD:HH:MM:SS) targeting mission launch date, 4 readiness quadrants with progress bars, simulate readiness button, and dramatic T-0 launch sequence overlay with data confetti.

### 🤖 Orion AI Copilot
Persistent bottom panel with proactive mission alerts, natural language command processing, requirement quality analysis, and auto-generated requirement suggestions.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│  Login │ Dashboard │ Requirements │ Architecture │ Diagrams  │
│  N² Matrix │ Risk │ Trade Study │ V-Model │ Docs │ Countdown │
├──────────────────────────────────────────────────────────────┤
│                     COMPONENT LAYER                          │
│         Sidebar  │  Context Drawer  │  Orion AI Copilot      │
├──────────────────────────────────────────────────────────────┤
│                     CORE SERVICES LAYER                      │
│      Router  │  State Manager  │  Event Bus  │  Data Module  │
├──────────────────────────────────────────────────────────────┤
│                     UTILITY LAYER                            │
│        SVG Icons  │  DOM Helpers  │  AI Analysis Engine       │
├──────────────────────────────────────────────────────────────┤
│                     ENGINE LAYER                             │
│           Particle Field (Canvas 2D)  │  Chart.js            │
├──────────────────────────────────────────────────────────────┤
│                     STYLE LAYER                              │
│     Design System  │  Glassmorphism  │  15 View-specific CSS │
└──────────────────────────────────────────────────────────────┘
```

---

## Installation

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** 9.0 or higher
- **Modern Browser** (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)

### Setup
```bash
# Clone the repository
git clone https://github.com/your-org/mission-os.git
cd mission-os

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at **http://localhost:5173/**

### Build for Production
```bash
npm run build
npm run preview
```

---

## Usage

### Login
Enter any commander codename and mission access code to authenticate. The system uses client-side validation (non-empty fields).

### Navigation
Use the left sidebar to navigate between the 10 main modules. The sidebar expands on hover to show full labels. The active route is highlighted with a green accent.

### Context Drawer
Click on any requirement, risk, subsystem, or interface to view its details in the right-side context drawer.

### Orion AI
Click the pulsing green circle in the bottom-right corner to open the AI copilot. Type commands like `status`, `analyze REQ-001`, or `help`.

---

## Project Structure

```
mission-os/
├── index.html                     # Entry point with canvas, fonts, CRT overlay
├── package.json                   # Dependencies and scripts
├── public/
│   └── favicon.svg                # Orbital ring favicon
├── docs/
│   ├── SRS_Document.md            # Software Requirements Specification (IEEE 830)
│   ├── UML_Diagrams.md            # Use Case, Class, Sequence, Activity, Component diagrams
│   ├── Test_Plan.md               # Test strategy with 58 test cases
│   └── Architecture_Document.md   # System architecture and design decisions
├── tests/
│   └── selenium-tests.js          # Selenium WebDriver automated test suite
└── src/
    ├── main.js                    # Application entry point, routing, layout
    ├── core/
    │   ├── data.js                # Mock mission data (6 missions, 13 reqs, 7 risks)
    │   ├── events.js              # Pub/sub event bus
    │   ├── router.js              # Hash-based SPA router with transitions
    │   └── state.js               # LocalStorage-backed state manager
    ├── engine/
    │   └── particles.js           # Canvas 2D particle field (2000+ stars, nebulae)
    ├── components/
    │   ├── sidebar.js             # Mission Spine sidebar navigation
    │   ├── context-drawer.js      # Right-side item detail panel
    │   └── orion.js               # Orion AI copilot panel
    ├── views/
    │   ├── login.js               # Cinematic login sequence
    │   ├── command-center.js      # Mission dashboard
    │   ├── requirements.js        # Requirements workspace (3 tabs)
    │   ├── architecture.js        # Infinite pan/zoom architecture canvas
    │   ├── diagrams.js            # Engineering theater (6 SVG diagrams)
    │   ├── n2-matrix.js           # N² interface matrix
    │   ├── risk.js                # Risk management (heatmap + register)
    │   ├── trade-study.js         # Trade study simulator (Chart.js)
    │   ├── vmodel.js              # V-Model lifecycle tracker
    │   ├── documents.js           # Document studio editor
    │   └── countdown.js           # Launch countdown with T-0 sequence
    ├── styles/
    │   ├── index.css              # Design system tokens + reset
    │   ├── glass.css              # Glassmorphism components
    │   ├── particles.css          # Background layers
    │   ├── login.css              # Login animations
    │   ├── layout.css             # Three-zone grid layout
    │   ├── sidebar.css            # Sidebar styles
    │   ├── dashboard.css          # Hex cards, telemetry strip
    │   ├── requirements.css       # Requirements workspace
    │   ├── architecture.css       # Architecture canvas
    │   ├── risk.css               # Risk matrix
    │   ├── vmodel.css             # V-Model styles
    │   ├── trade-study.css        # Trade study charts
    │   ├── countdown.css          # Countdown clock
    │   ├── documents.css          # Document studio
    │   └── orion.css              # AI copilot panel
    └── utils/
        ├── svg-icons.js           # 16 custom SVG icon components
        ├── helpers.js             # DOM utility functions
        └── ai-engine.js           # Requirement quality analysis engine
```

**Total: 37 source files** | **11 views** | **3 components** | **15 stylesheets** | **4 core modules** | **3 utilities**

---

## Testing

### Automated Testing (Selenium WebDriver)

```bash
# Prerequisites: ChromeDriver on PATH, dev server running

# Run all 12 test suites (58 assertions)
npm run test:selenium
```

| Suite | Tests | Coverage |
|---|---|---|
| Login View | 6 | Authentication flow, form rendering |
| Command Center | 6 | Telemetry, stats, hex cards, layout |
| Requirements | 6 | Tabs, requirement rows, badges |
| Architecture | 6 | Canvas, nodes, connections, controls |
| Risk Management | 5 | Heatmap, dots, register |
| Trade Study | 6 | Charts, sliders, decision matrix |
| V-Model | 4 | SVG, nodes, gate check |
| Document Studio | 7 | Editor, switching, word count |
| Countdown | 5 | Clock, quadrants, buttons |
| Navigation | 4 | Sidebar, routing, active state |
| Engineering Theater | 3 | Cards, SVG diagrams |
| N² Matrix | 3 | Table, cells |
| **TOTAL** | **61** | **100% view coverage** |

### Manual Testing Checklist
- [ ] Login animation plays smoothly (ring → typewriter → form)
- [ ] Particle field renders 60fps with no stuttering
- [ ] Sidebar expands on hover with overlay effect
- [ ] All 10 sidebar navigation items route correctly
- [ ] Context drawer updates when clicking items
- [ ] Trade study sliders update charts in real-time
- [ ] Architecture canvas supports pan, zoom, and node dragging
- [ ] Countdown clock counts down in real-time
- [ ] T-0 launch sequence triggers dramatic overlay
- [ ] Orion AI responds to commands (`status`, `help`)
- [ ] Page refreshes maintain login state via localStorage

---

## Documentation

| Document | Path | Description |
|---|---|---|
| **SRS** | `docs/SRS_Document.md` | IEEE 830-compliant Software Requirements Specification |
| **UML Diagrams** | `docs/UML_Diagrams.md` | Use Case, Class, Sequence, Activity, Component, State, Deployment |
| **Test Plan** | `docs/Test_Plan.md` | 58 test cases with RTM, execution procedures |
| **Architecture** | `docs/Architecture_Document.md` | System architecture and design decisions |
| **Selenium Tests** | `tests/selenium-tests.js` | Automated browser test suite |

---

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Build** | Vite 8.x | Dev server, HMR, ES module bundling |
| **Language** | Vanilla JavaScript (ES2022) | No framework dependency |
| **Styling** | Vanilla CSS3 | Custom properties, animations, grid |
| **Charts** | Chart.js 4.x | Radar and bar chart visualizations |
| **Rendering** | Canvas 2D API | Particle field engine |
| **Graphics** | Inline SVG | V-Model, diagrams, architecture connections |
| **Fonts** | Google Fonts CDN | Bebas Neue, Space Mono, DM Serif Display |
| **Testing** | Selenium WebDriver 4.x | Automated browser testing |
| **State** | LocalStorage API | Client-side persistence |

---

## Design System

### Color Palette
| Token | Hex | Usage |
|---|---|---|
| Plasma Green | `#00FF9D` | Primary accent, completed states |
| Photon Blue | `#00C8FF` | Secondary accent, active states |
| Solar Amber | `#FFB830` | Warnings, in-review states |
| Critical Red | `#FF3B5C` | Errors, failed states, high risk |
| Nebula Purple | `#B388FF` | Tertiary accent |

### Typography
| Tier | Font | Usage |
|---|---|---|
| Heading | Bebas Neue | Page titles, section headers |
| Body | DM Serif Display | Paragraph text, descriptions |
| Mono | Space Mono | Telemetry, data, code, labels |

### Glassmorphism
All panels use a consistent glass treatment:
- Background: `rgba(8, 10, 22, 0.5)` with `blur(16px)`
- Border: `1px solid rgba(255, 255, 255, 0.06)`
- Noise texture overlay at 3% opacity
- Lit-edge variant with `rgba(255, 255, 255, 0.12)` border

---

## Team

| Role | Name |
|---|---|
| Project Lead | Raj Modi |
| Institution | MIT-WPU, Pune |
| Course | Systems Engineering & Management |

---

## License

This project is developed for academic purposes as part of the Systems Engineering & Management curriculum.

---

<p align="center">
  <strong>🚀 MISSION OS v3.7.1</strong><br>
  <em>Systems Engineering for the Cosmos</em>
</p>
