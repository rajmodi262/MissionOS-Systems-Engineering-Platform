# UML Diagrams — MISSION OS

| Field | Value |
|---|---|
| **Document ID** | MOS-UML-001 |
| **Version** | 3.7.1 |
| **Date** | April 25, 2026 |
| **Notation** | Mermaid UML |

---

## 1. Use Case Diagram

```mermaid
graph TB
    subgraph "MISSION OS Platform"
        UC1["UC-01: Login to System"]
        UC2["UC-02: View Mission Dashboard"]
        UC3["UC-03: Manage Requirements"]
        UC4["UC-04: Analyze Requirement Quality"]
        UC5["UC-05: Model System Architecture"]
        UC6["UC-06: View Engineering Diagrams"]
        UC7["UC-07: Map Subsystem Interfaces"]
        UC8["UC-08: Manage Risks"]
        UC9["UC-09: Conduct Trade Study"]
        UC10["UC-10: Track V-Model Lifecycle"]
        UC11["UC-11: Edit Documents"]
        UC12["UC-12: Monitor Launch Countdown"]
        UC13["UC-13: Interact with AI Copilot"]
        UC14["UC-14: View Item Context Details"]
        UC15["UC-15: Navigate Between Modules"]
    end

    MD["👤 Mission Director"]
    SE["👤 Systems Engineer"]
    RM["👤 Risk Manager"]
    TE["👤 Test Engineer"]
    AI["🤖 Orion AI"]

    MD --> UC1
    MD --> UC2
    MD --> UC12

    SE --> UC1
    SE --> UC3
    SE --> UC4
    SE --> UC5
    SE --> UC6
    SE --> UC7
    SE --> UC9
    SE --> UC10
    SE --> UC11
    SE --> UC13
    SE --> UC14
    SE --> UC15

    RM --> UC1
    RM --> UC8
    RM --> UC2

    TE --> UC1
    TE --> UC10
    TE --> UC12

    AI --> UC4
    AI --> UC13

    UC3 -.->|include| UC14
    UC8 -.->|include| UC14
    UC7 -.->|include| UC14
    UC4 -.->|extend| UC3
    UC13 -.->|extend| UC3
```

### Use Case Descriptions

| ID | Use Case | Primary Actor | Description |
|---|---|---|---|
| UC-01 | Login to System | All Users | Authenticate via codename and access code |
| UC-02 | View Mission Dashboard | Mission Director | Monitor telemetry, stats, mission health |
| UC-03 | Manage Requirements | Systems Engineer | View, analyze, and trace requirements |
| UC-04 | Analyze Requirement Quality | Orion AI | AI-driven verifiability and ambiguity scoring |
| UC-05 | Model System Architecture | Systems Engineer | Drag, zoom, pan subsystem topology |
| UC-06 | View Engineering Diagrams | Systems Engineer | Browse 6 diagram types (WBS, PERT, etc.) |
| UC-07 | Map Subsystem Interfaces | Systems Engineer | Interact with N² matrix cells |
| UC-08 | Manage Risks | Risk Manager | View heatmap, read risk register |
| UC-09 | Conduct Trade Study | Systems Engineer | Adjust weights, compare alternatives |
| UC-10 | Track V-Model Lifecycle | Test Engineer | Monitor phase progress, run gate checks |
| UC-11 | Edit Documents | Systems Engineer | Select and edit mission documents |
| UC-12 | Monitor Launch Countdown | Mission Director | Track countdown, simulate readiness |
| UC-13 | Interact with AI Copilot | Systems Engineer | Issue commands, receive analysis |
| UC-14 | View Item Context Details | All Users | Inspect selected item in context drawer |
| UC-15 | Navigate Between Modules | All Users | Use sidebar to switch views |

---

## 2. Class Diagram

```mermaid
classDiagram
    class ParticleField {
        -canvas: HTMLCanvasElement
        -ctx: CanvasRenderingContext2D
        -particles: Array~Particle~
        -nebulae: Array~Nebula~
        -width: number
        -height: number
        -animFrameId: number
        +constructor(canvasId: string)
        +start(): void
        +stop(): void
        +addRipple(x: number, y: number): void
        -initParticles(): void
        -animate(): void
        -drawParticle(p: Particle): void
        -drawNebula(n: Nebula): void
    }

    class Router {
        -routes: Map~string, Function~
        -currentRoute: string
        -appContainer: HTMLElement
        -beforeNavigate: Function
        +registerRoute(path: string, handler: Function): void
        +initRouter(): void
        +navigate(path: string): void
        +setAppContainer(el: HTMLElement): void
        +setBeforeNavigate(fn: Function): void
        -handleRouteChange(): void
    }

    class StateManager {
        -state: Object
        -STORAGE_KEY: string
        +getState(key: string): any
        +setState(key: string, value: any): void
        +selectItem(item: Object): void
        -loadState(): Object
        -saveState(): void
    }

    class EventBus {
        -listeners: Map~string, Array~
        +on(event: string, callback: Function): void
        +off(event: string, callback: Function): void
        +emit(event: string, data: any): void
    }

    class AIEngine {
        -rules: Array~AnalysisRule~
        +analyzeRequirement(text: string): AnalysisResult
        +checkVerifiability(text: string): Score
        +checkAmbiguity(text: string): Score
        +generateRequirement(prompt: string): string
        -applyRules(text: string): Array~Finding~
    }

    class Sidebar {
        -navItems: Array~NavItem~
        -activeRoute: string
        +createSidebar(): HTMLElement
        -renderNavItems(): string
        -handleNavClick(route: string): void
    }

    class ContextDrawer {
        -currentItem: Object
        +createContextDrawer(): HTMLElement
        +updateDrawer(item: Object): void
        -renderItemDetails(item: Object): string
    }

    class OrionCopilot {
        -messages: Array~Message~
        -isOpen: boolean
        +initOrion(): void
        +processCommand(input: string): string
        +addProactiveAlert(alert: Alert): void
        -renderPanel(): HTMLElement
        -handleInput(text: string): void
    }

    class MissionData {
        +missions: Array~Mission~
        +requirements: Map~string, Array~
        +risks: Map~string, Array~
        +lifecyclePhases: Array~Phase~
        +subsystemLibrary: Array~Subsystem~
        +telemetryStreams: Array~Telemetry~
    }

    class Mission {
        +id: string
        +name: string
        +codename: string
        +phase: string
        +phaseIndex: number
        +healthScore: number
        +completion: number
        +riskLevel: string
        +status: string
        +launchDate: string
        +color: string
        +team: Array~string~
        +subsystems: Array~string~
        +telemetry: Object
    }

    class Requirement {
        +id: string
        +text: string
        +status: string
        +level: string
        +priority: string
        +verification: string
        +parent: string
    }

    class Risk {
        +id: string
        +title: string
        +likelihood: number
        +consequence: number
        +status: string
        +mitigation: string
        +owner: string
    }

    class Subsystem {
        +id: string
        +name: string
        +abbr: string
        +color: string
        +icon: string
        +category: string
    }

    Router --> StateManager : reads login state
    Router --> EventBus : emits route-change
    Sidebar --> Router : triggers navigation
    ContextDrawer --> StateManager : reads selectedItem
    ContextDrawer --> EventBus : listens item-selected
    OrionCopilot --> AIEngine : delegates analysis
    OrionCopilot --> EventBus : listens/emits alerts
    StateManager --> EventBus : emits state-change
    MissionData --> Mission : contains
    MissionData --> Requirement : contains
    MissionData --> Risk : contains
    MissionData --> Subsystem : contains
```

---

## 3. Sequence Diagrams

### 3.1 Login Sequence

```mermaid
sequenceDiagram
    participant User
    participant Login as LoginView
    participant PF as ParticleField
    participant State as StateManager
    participant Router as Router

    User->>Login: Opens application
    Login->>PF: addRipple() ring animation
    Login->>Login: Typewriter "MISSION OS"
    Login->>Login: Materialize input fields
    User->>Login: Enter codename + access code
    User->>Login: Click "INITIALIZE"
    Login->>Login: Validate inputs (non-empty)
    Login->>State: setState("isLoggedIn", true)
    Login->>State: setState("commander", codename)
    Login->>PF: addRipple() dissolution effect
    Login->>Login: Fade-out animation (800ms)
    Login->>Router: navigate("/command-center")
    Router->>Router: destroyAppLayout()
    Router->>Router: createAppLayout()
    Router-->>User: Command Center rendered
```

### 3.2 Requirements Analysis Sequence

```mermaid
sequenceDiagram
    participant SE as Systems Engineer
    participant ReqView as RequirementsView
    participant AI as AIEngine
    participant Drawer as ContextDrawer
    participant State as StateManager
    participant EB as EventBus

    SE->>ReqView: Click requirement row (REQ-001)
    ReqView->>AI: analyzeRequirement(req.text)
    AI->>AI: checkVerifiability(text)
    AI->>AI: checkAmbiguity(text)
    AI-->>ReqView: {verifiability: 85, ambiguity: 12}
    ReqView->>ReqView: Render AI chips (green/red)
    ReqView->>State: selectItem(requirement)
    State->>EB: emit("item-selected", requirement)
    EB->>Drawer: updateDrawer(requirement)
    Drawer-->>SE: Show requirement details panel
```

### 3.3 Trade Study Interaction Sequence

```mermaid
sequenceDiagram
    participant SE as Systems Engineer
    participant TS as TradeStudyView
    participant CJS as Chart.js
    participant DOM as DecisionMatrix

    SE->>TS: Navigate to /trade-study
    TS->>TS: Render layout (config + results)
    TS->>CJS: new Chart("radar", radarConfig)
    TS->>CJS: new Chart("bar", barConfig)
    TS->>DOM: renderDecisionMatrix()
    SE->>TS: Drag "Cost" weight slider to 40%
    TS->>TS: Update criteria[1].weight = 40
    TS->>TS: calcWeightedScores()
    TS->>CJS: barChart.update("none")
    TS->>DOM: renderDecisionMatrix()
    CJS-->>SE: Updated bar chart
    DOM-->>SE: Updated winner highlighting
```

### 3.4 Navigation Sequence

```mermaid
sequenceDiagram
    participant User
    participant SB as Sidebar
    participant Router as Router
    participant Layout as AppLayout
    participant View as TargetView
    participant Canvas as ZoneCanvas

    User->>SB: Click nav item (e.g., "Risk")
    SB->>Router: navigate("/risk")
    Router->>Router: Check beforeNavigate hook
    Router->>Layout: createAppLayout() if needed
    Router->>Canvas: Clear innerHTML
    Router->>Canvas: Add transition-out class
    Router->>View: renderRisk(canvas)
    View->>View: Build DOM content
    View->>Canvas: Set innerHTML
    Router->>Canvas: Add transition-in class
    Canvas-->>User: Risk view rendered with animation
```

---

## 4. Activity Diagrams

### 4.1 Application Startup

```mermaid
flowchart TD
    A([Start]) --> B[Initialize ParticleField]
    B --> C[Start canvas animation]
    C --> D{Check localStorage isLoggedIn?}
    D -->|No| E[Set hash to #/login]
    D -->|Yes| F[Set hash to #/command-center]
    E --> G[Initialize Router]
    F --> G
    G --> H[handleRouteChange]
    H -->|/login| I[Render Login View]
    H -->|/command-center| J[createAppLayout]
    J --> K[Create Sidebar]
    J --> L[Create Zone Canvas]
    J --> M[Create Context Drawer]
    K --> N[Initialize Orion AI]
    L --> N
    M --> N
    N --> O[Render Command Center]
    I --> P([Login Screen Ready])
    O --> Q([Dashboard Ready])
```

### 4.2 Requirement Quality Analysis

```mermaid
flowchart TD
    A([Requirement Selected]) --> B[Extract requirement text]
    B --> C[Run Verifiability Check]
    C --> C1{Contains measurable terms?}
    C1 -->|Yes| C2[Score += 30]
    C1 -->|No| C3[Score += 0]
    C2 --> D
    C3 --> D
    D[Run Ambiguity Check]
    D --> D1{Contains weak words?}
    D1 -->|"adequately, ideally"| D2[Ambiguity += 25 per word]
    D1 -->|No weak words| D3[Ambiguity = 0]
    D2 --> E
    D3 --> E
    E[Compute Final Scores]
    E --> F{Verifiability >= 70?}
    F -->|Yes| G["🟢 PASS"]
    F -->|No| H["🔴 FAIL"]
    G --> I[Render green chip]
    H --> J[Render red chip with warning]
    I --> K([Analysis Complete])
    J --> K
```

---

## 5. Component Diagram

```mermaid
graph TB
    subgraph "Presentation Layer"
        LOGIN["Login View"]
        CC["Command Center"]
        REQ["Requirements View"]
        ARCH["Architecture Canvas"]
        DIAG["Engineering Theater"]
        N2["N² Matrix"]
        RISK["Risk View"]
        TS["Trade Study"]
        VM["V-Model View"]
        DOC["Document Studio"]
        CD["Countdown View"]
    end

    subgraph "Component Layer"
        SB["Sidebar Component"]
        CTX["Context Drawer"]
        ORION["Orion AI Copilot"]
    end

    subgraph "Core Services Layer"
        ROUTER["Router Module"]
        STATE["State Manager"]
        EVENTS["Event Bus"]
        DATA["Data Module"]
    end

    subgraph "Utility Layer"
        ICONS["SVG Icon Library"]
        HELP["DOM Helpers"]
        AIENG["AI Engine"]
    end

    subgraph "Engine Layer"
        PF["Particle Field Engine"]
        CHARTJS["Chart.js Library"]
    end

    subgraph "Style Layer"
        DS["Design System - index.css"]
        GLASS["Glass Morphism"]
        VIEWS_CSS["View-specific CSS x15"]
    end

    LOGIN --> ROUTER
    CC --> ROUTER
    REQ --> ROUTER
    ARCH --> ROUTER
    RISK --> ROUTER
    TS --> ROUTER
    VM --> ROUTER
    DOC --> ROUTER
    CD --> ROUTER

    SB --> ROUTER
    SB --> ICONS
    CTX --> STATE
    CTX --> EVENTS
    ORION --> AIENG
    ORION --> EVENTS

    ROUTER --> STATE
    STATE --> EVENTS
    REQ --> AIENG
    TS --> CHARTJS
    CC --> DATA
    REQ --> DATA
    RISK --> DATA
    VM --> DATA
    ARCH --> DATA
    N2 --> DATA

    LOGIN --> PF
```

---

## 6. State Diagram — Application State Machine

```mermaid
stateDiagram-v2
    [*] --> Initializing: App loads
    Initializing --> CheckingAuth: Particle field started

    CheckingAuth --> LoginScreen: Not authenticated
    CheckingAuth --> Dashboard: Authenticated

    LoginScreen --> Authenticating: Submit credentials
    Authenticating --> LoginScreen: Invalid (empty fields)
    Authenticating --> TransitionOut: Valid credentials
    TransitionOut --> Dashboard: Dissolution complete

    Dashboard --> RequirementsView: Navigate
    Dashboard --> ArchitectureView: Navigate
    Dashboard --> DiagramsView: Navigate
    Dashboard --> N2MatrixView: Navigate
    Dashboard --> RiskView: Navigate
    Dashboard --> TradeStudyView: Navigate
    Dashboard --> VModelView: Navigate
    Dashboard --> DocumentsView: Navigate
    Dashboard --> CountdownView: Navigate

    RequirementsView --> Dashboard: Navigate back
    ArchitectureView --> Dashboard: Navigate back
    RiskView --> Dashboard: Navigate back
    TradeStudyView --> Dashboard: Navigate back
    VModelView --> Dashboard: Navigate back
    DocumentsView --> Dashboard: Navigate back
    CountdownView --> Dashboard: Navigate back

    CountdownView --> LaunchSequence: Trigger T-0
    LaunchSequence --> CountdownView: Sequence complete

    state Dashboard {
        [*] --> TelemetryActive
        TelemetryActive --> MissionSelected: Click hex card
        MissionSelected --> TelemetryActive: Deselect
    }

    state RequirementsView {
        [*] --> DocumentTab
        DocumentTab --> HierarchyTab: Switch tab
        HierarchyTab --> TraceabilityTab: Switch tab
        TraceabilityTab --> DocumentTab: Switch tab
    }
```

---

## 7. Deployment Diagram

```mermaid
graph TB
    subgraph "Developer Machine"
        subgraph "Node.js Runtime"
            VITE["Vite Dev Server :5173"]
            NPM["npm / package.json"]
        end
        subgraph "Source Files"
            HTML["index.html"]
            JS["src/**/*.js - 22 modules"]
            CSS["src/styles/*.css - 15 files"]
        end
    end

    subgraph "Browser Environment"
        subgraph "Rendering Engine"
            DOM["DOM Tree"]
            CSSOM["CSSOM"]
            CANVAS["Canvas 2D Context"]
        end
        subgraph "JavaScript Engine"
            ESM["ES Module Loader"]
            LS["LocalStorage API"]
        end
        subgraph "CDN Resources"
            FONTS["Google Fonts CDN"]
            CHARTCDN["Chart.js - npm bundled"]
        end
    end

    VITE -->|HMR WebSocket| DOM
    VITE -->|HTTP :5173| ESM
    JS -->|Bundled by Vite| ESM
    CSS -->|Injected| CSSOM
    HTML -->|Entry Point| DOM
    ESM -->|State Persistence| LS
    FONTS -->|HTTPS| CSSOM
```
