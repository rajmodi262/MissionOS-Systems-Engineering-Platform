# System Architecture Document — MISSION OS

| Field | Value |
|---|---|
| **Document ID** | MOS-SAD-001 |
| **Version** | 3.7.1 |
| **Date** | April 25, 2026 |
| **Status** | Approved |

---

## 1. Architectural Overview

### 1.1 Architecture Style
MISSION OS employs a **Layered Client-Side Architecture** built as a Single Page Application (SPA). The architecture follows a strict unidirectional data flow pattern with event-driven communication between components.

### 1.2 Design Principles
1. **Zero-Framework Philosophy** — Pure vanilla JavaScript to minimize dependency risk and maximize learning transparency
2. **Modular View Composition** — Each view is a self-contained ES module with its own render function
3. **Event-Driven Decoupling** — Components communicate through a central EventBus, never by direct reference
4. **CSS-as-Design-System** — All visual tokens centralized in CSS custom properties, never hardcoded
5. **Progressive Enhancement** — Core functionality works without animations; visual effects layer on top

### 1.3 Architecture Layers

```
┌─────────────────────────────────────────────────┐
│  LAYER 1: PRESENTATION (Views)                  │
│  11 view modules, each exporting async render() │
├─────────────────────────────────────────────────┤
│  LAYER 2: COMPONENTS (Shared UI)                │
│  Sidebar, Context Drawer, Orion AI              │
├─────────────────────────────────────────────────┤
│  LAYER 3: CORE SERVICES                         │
│  Router, State, Events, Data                    │
├─────────────────────────────────────────────────┤
│  LAYER 4: UTILITIES                             │
│  SVG Icons, DOM Helpers, AI Engine              │
├─────────────────────────────────────────────────┤
│  LAYER 5: ENGINE                                │
│  Particle Field (Canvas 2D), Chart.js           │
├─────────────────────────────────────────────────┤
│  LAYER 6: STYLES                                │
│  Design System, Glassmorphism, View CSS (×15)   │
└─────────────────────────────────────────────────┘
```

**Dependency Rule**: Each layer may only depend on layers below it. Views may call Core Services and Utilities, but Core Services never reference Views.

---

## 2. Module Specifications

### 2.1 Core Modules

#### Router (`core/router.js`)
| Aspect | Detail |
|---|---|
| **Pattern** | Hash-based SPA routing (`#/path`) |
| **API** | `registerRoute()`, `initRouter()`, `navigate()`, `setBeforeNavigate()` |
| **Mechanism** | Listens to `hashchange` event, matches route, calls async handler |
| **Guards** | `beforeNavigate` hook for layout setup/teardown |
| **Dedup** | Skips re-render if navigating to current route |

#### State Manager (`core/state.js`)
| Aspect | Detail |
|---|---|
| **Pattern** | Centralized state with LocalStorage persistence |
| **API** | `getState(key)`, `setState(key, value)`, `selectItem(item)` |
| **Storage Key** | `mission-os-state` |
| **Events** | Emits `state-change` and `item-selected` via EventBus |
| **Defaults** | `{ isLoggedIn: false, commander: '', selectedItem: null }` |

#### Event Bus (`core/events.js`)
| Aspect | Detail |
|---|---|
| **Pattern** | Publish/Subscribe |
| **API** | `on(event, cb)`, `off(event, cb)`, `emit(event, data)` |
| **Events Used** | `state-change`, `item-selected`, `route-change`, `orion-alert` |

#### Data Module (`core/data.js`)
| Aspect | Detail |
|---|---|
| **Pattern** | Static data exports (mock backend) |
| **Exports** | `missions` (6), `requirements` (13), `risks` (7), `lifecyclePhases` (11), `subsystemLibrary` (8), `telemetryStreams` (17) |
| **Format** | ES module with `export const` declarations |

### 2.2 View Modules

Each view follows a consistent contract:

```javascript
// Standard view interface
export async function renderViewName(container: HTMLElement): Promise<void> {
  container.innerHTML = `...`;  // Render DOM
  // Bind event listeners
  // Initialize sub-components (charts, SVGs)
}
```

| View | File | Key Technologies | Data Sources |
|---|---|---|---|
| Login | `login.js` | Canvas 2D, CSS animations | ParticleField |
| Command Center | `command-center.js` | DOM manipulation, CSS Grid | missions, telemetryStreams |
| Requirements | `requirements.js` | Tab system, SVG nodes | requirements, AIEngine |
| Architecture | `architecture.js` | Mouse events, SVG bezier | subsystemLibrary |
| Diagrams | `diagrams.js` | Inline SVG generation | subsystemLibrary |
| N² Matrix | `n2-matrix.js` | HTML table, hover effects | subsystemLibrary |
| Risk | `risk.js` | CSS Grid, positioning | risks |
| Trade Study | `trade-study.js` | Chart.js, range inputs | Internal mock |
| V-Model | `vmodel.js` | SVG path drawing, animation | lifecyclePhases |
| Documents | `documents.js` | contentEditable, tab bar | Internal mock |
| Countdown | `countdown.js` | setInterval, CSS overlay | missions |

### 2.3 Component Modules

| Component | Responsibility | Communication |
|---|---|---|
| **Sidebar** | Navigation, route indication, notification dots | Calls `Router.navigate()` |
| **Context Drawer** | Display selected item details | Listens `EventBus.on('item-selected')` |
| **Orion AI** | Command processing, proactive alerts | Uses `AIEngine`, emits via `EventBus` |

---

## 3. Data Flow Architecture

### 3.1 Unidirectional Flow

```
User Action → View Handler → State Update → Event Emission → Component Update
     ↑                                                              │
     └──────────────────── DOM Re-render ◄──────────────────────────┘
```

### 3.2 Navigation Flow

```
Sidebar Click
    │
    ▼
Router.navigate(path)
    │
    ├── beforeNavigate hook
    │   ├── destroyAppLayout() if /login
    │   └── createAppLayout() if needed
    │
    ▼
handleRouteChange()
    │
    ├── Match route from Map
    ├── Clear container innerHTML
    ├── Add transition-out CSS class
    ├── Call view.render(container)
    └── Add transition-in CSS class
```

### 3.3 Item Selection Flow

```
User clicks item (requirement, risk, subsystem)
    │
    ▼
View calls state.selectItem(item)
    │
    ▼
State persists to localStorage
    │
    ▼
EventBus.emit("item-selected", item)
    │
    ▼
ContextDrawer.updateDrawer(item)
    │
    ▼
Drawer panel re-renders with item details
```

---

## 4. Layout Architecture

### 4.1 Three-Zone Grid System

```css
.app-layout {
  display: grid;
  grid-template-columns: 60px 1fr 320px;
  /* Sidebar | Canvas | Drawer */
}
```

| Zone | Purpose | Behavior |
|---|---|---|
| **Left (Sidebar)** | Navigation, logo, user avatar | Fixed 60px, expands to 220px as overlay on hover |
| **Center (Canvas)** | Main view content | Flex, scrollable, receives view renders |
| **Right (Drawer)** | Context details panel | Fixed 320px, hideable to 0px |

### 4.2 Login vs App Layout

The application has two distinct layout modes:

1. **Login Mode** — Full-screen, no sidebar/drawer, particle field visible
2. **App Mode** — Three-zone grid with sidebar, canvas, and drawer

The `createAppLayout()` and `destroyAppLayout()` functions in `main.js` manage transitions between these modes.

---

## 5. Rendering Architecture

### 5.1 Particle Engine

The particle field runs on a dedicated `<canvas>` element behind all content:

| Parameter | Value |
|---|---|
| Stars | ~2000 particles with random twinkle |
| Nebulae | 3-5 colored radial gradient clouds |
| Ripples | Expanding ring on click / login events |
| z-index | -1 (behind all content) |
| Performance | requestAnimationFrame, 60fps target |

### 5.2 CSS Layer Stack

```
z-index: 100  — Overlays (T-0 launch, modals)
z-index: 50   — Orion AI panel
z-index: 30   — Sidebar (expanded)
z-index: 20   — Context drawer
z-index: 10   — Content views
z-index: 1    — Glass panels, cards
z-index: -1   — Particle canvas
z-index: -2   — CRT scanline overlay
```

---

## 6. Design Decisions & Trade-offs

### 6.1 No Framework
**Decision**: Build with vanilla JS instead of React/Vue/Angular.
**Rationale**: Academic project requiring deep understanding of DOM manipulation, event handling, and SPA routing. Eliminates abstraction layers for learning transparency.
**Trade-off**: More boilerplate code, no virtual DOM diffing, manual state management.

### 6.2 Hash-Based Routing
**Decision**: Use `#/path` URLs instead of History API.
**Rationale**: Works on static file servers without URL rewrite configuration. Simpler deployment.
**Trade-off**: URLs contain `#`, slightly less clean than path-based routing.

### 6.3 LocalStorage State
**Decision**: Persist state in `localStorage` instead of backend.
**Rationale**: Frontend-only application, no server. Enables session persistence across refreshes.
**Trade-off**: No multi-device sync, limited to 5MB, no real authentication.

### 6.4 Inline SVG Generation
**Decision**: Generate SVG markup directly in JavaScript instead of external `.svg` files.
**Rationale**: Enables dynamic, data-driven diagrams with computed positions, colors, and animations.
**Trade-off**: Larger JavaScript bundles, harder to design visually in tools like Figma.

### 6.5 Chart.js for Data Visualization
**Decision**: Use Chart.js instead of D3.js.
**Rationale**: Simpler API for radar and bar charts. Tree-shakeable imports minimize bundle size.
**Trade-off**: Less flexibility for custom visualizations compared to D3.

---

## 7. Security Considerations

| Concern | Mitigation |
|---|---|
| XSS via innerHTML | User content is limited to controlled input fields; no unsanitized user data in innerHTML |
| Data Privacy | All data is mock/client-side; no real mission data transmitted |
| Authentication | Client-side only (localStorage flag); not suitable for production |
| ContentEditable | Document editor uses contentEditable; output is not persisted to server |

---

## 8. Performance Characteristics

| Metric | Target | Actual |
|---|---|---|
| Initial Load (dev) | < 3s | ~2.5s |
| Initial Load (prod build) | < 1s | ~0.8s |
| Route Transition | < 500ms | ~300ms |
| Particle FPS | 60fps | 60fps (hardware accelerated) |
| Chart Update | < 100ms | ~50ms |
| Memory (idle) | < 100MB | ~65MB |
| Bundle Size (prod) | < 500KB | ~380KB |

---

## 9. Future Architecture Evolution

| Phase | Enhancement | Architecture Impact |
|---|---|---|
| Phase 2 | Backend API (Node.js/Express) | Add API client layer, real authentication |
| Phase 2 | WebSocket telemetry | Real-time data stream engine |
| Phase 3 | Multi-user collaboration | WebSocket rooms, conflict resolution |
| Phase 3 | Plugin architecture | Dynamic module loading, extension API |
| Phase 4 | 3D visualization | WebGL/Three.js engine for spacecraft models |
