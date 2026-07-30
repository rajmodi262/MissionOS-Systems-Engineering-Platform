/* ============================================================
   MISSION OS — Selenium Test Suite
   Automated browser testing for all 11 views
   ============================================================ */

const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('assert');

const BASE_URL = 'http://localhost:5173';
const TIMEOUT = 10000;

let driver;

// ── Helper Functions ──
async function navigateTo(hash) {
  await driver.get(`${BASE_URL}/#${hash}`);
  await driver.sleep(1500);
}

async function waitForElement(selector, timeout = TIMEOUT) {
  return driver.wait(until.elementLocated(By.css(selector)), timeout);
}

async function getTextContent(selector) {
  const el = await waitForElement(selector);
  return el.getText();
}

async function elementExists(selector) {
  try {
    await driver.findElement(By.css(selector));
    return true;
  } catch {
    return false;
  }
}

async function getElementCount(selector) {
  const elements = await driver.findElements(By.css(selector));
  return elements.length;
}

// ── Setup / Teardown ──
async function setup() {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().window().setRect({ width: 1536, height: 900 });
  console.log('✅ Browser initialized');
}

async function teardown() {
  if (driver) {
    await driver.quit();
    console.log('✅ Browser closed');
  }
}

// ══════════════════════════════════════════════════════
//  TEST SUITES
// ══════════════════════════════════════════════════════

// ── TEST 1: Login View ──
async function testLoginView() {
  console.log('\n🧪 TEST SUITE: Login View');
  await navigateTo('/login');

  // T1.1: Page title
  const title = await driver.getTitle();
  assert.ok(title.includes('MISSION OS'), `T1.1 FAIL: Title is "${title}"`);
  console.log('  ✅ T1.1: Page title contains "MISSION OS"');

  // T1.2: Particle canvas exists
  const canvasExists = await elementExists('#particle-field');
  assert.ok(canvasExists, 'T1.2 FAIL: Particle canvas not found');
  console.log('  ✅ T1.2: Particle field canvas exists');

  // T1.3: Login form renders
  await driver.sleep(3000); // Wait for typewriter + form animation
  const formExists = await elementExists('.login-form');
  assert.ok(formExists, 'T1.3 FAIL: Login form not found');
  console.log('  ✅ T1.3: Login form rendered after animation');

  // T1.4: Input fields exist
  const inputs = await getElementCount('.login-form input');
  assert.strictEqual(inputs, 2, `T1.4 FAIL: Expected 2 inputs, found ${inputs}`);
  console.log('  ✅ T1.4: Two input fields present');

  // T1.5: Login button exists
  const btnExists = await elementExists('.login-form button');
  assert.ok(btnExists, 'T1.5 FAIL: Login button not found');
  console.log('  ✅ T1.5: Login button present');

  // T1.6: Login flow
  const inputs_list = await driver.findElements(By.css('.login-form input'));
  await inputs_list[0].sendKeys('Commander Raj');
  await inputs_list[1].sendKeys('ARTEMIS-VII');
  const loginBtn = await driver.findElement(By.css('.login-form button'));
  await loginBtn.click();
  await driver.sleep(2000);

  const currentUrl = await driver.getCurrentUrl();
  assert.ok(currentUrl.includes('/command-center'), `T1.6 FAIL: URL is ${currentUrl}`);
  console.log('  ✅ T1.6: Login redirects to /command-center');

  console.log('  ✅ Login View: ALL TESTS PASSED (6/6)');
}

// ── TEST 2: Command Center Dashboard ──
async function testCommandCenter() {
  console.log('\n🧪 TEST SUITE: Command Center');
  await navigateTo('/command-center');

  // T2.1: View header
  const header = await getTextContent('.view-header h1');
  assert.ok(header.includes('COMMAND CENTER'), `T2.1 FAIL: Header is "${header}"`);
  console.log('  ✅ T2.1: Header reads "MISSION COMMAND CENTER"');

  // T2.2: Telemetry strip
  const telemetryExists = await elementExists('.telemetry-strip');
  assert.ok(telemetryExists, 'T2.2 FAIL: Telemetry strip not found');
  console.log('  ✅ T2.2: Telemetry strip rendered');

  // T2.3: Stats cards
  const statsCards = await getElementCount('.stat-card');
  assert.ok(statsCards >= 4, `T2.3 FAIL: Expected 4+ stat cards, found ${statsCards}`);
  console.log(`  ✅ T2.3: ${statsCards} stat cards rendered`);

  // T2.4: Mission hex cards
  const hexCards = await getElementCount('.hex-card');
  assert.ok(hexCards >= 5, `T2.4 FAIL: Expected 5+ hex cards, found ${hexCards}`);
  console.log(`  ✅ T2.4: ${hexCards} mission hex cards rendered`);

  // T2.5: Sidebar exists
  const sidebarExists = await elementExists('.mission-spine');
  assert.ok(sidebarExists, 'T2.5 FAIL: Sidebar not found');
  console.log('  ✅ T2.5: Sidebar component exists');

  // T2.6: Context drawer exists
  const drawerExists = await elementExists('.zone-drawer');
  assert.ok(drawerExists, 'T2.6 FAIL: Context drawer not found');
  console.log('  ✅ T2.6: Context drawer exists');

  console.log('  ✅ Command Center: ALL TESTS PASSED (6/6)');
}

// ── TEST 3: Requirements Engineering ──
async function testRequirements() {
  console.log('\n🧪 TEST SUITE: Requirements Engineering');
  await navigateTo('/requirements');

  // T3.1: Header
  const header = await getTextContent('.view-header h1');
  assert.ok(header.includes('REQUIREMENTS'), `T3.1 FAIL: Header is "${header}"`);
  console.log('  ✅ T3.1: Header reads "REQUIREMENTS ENGINEERING"');

  // T3.2: Tab bar
  const tabs = await getElementCount('.tab-btn');
  assert.strictEqual(tabs, 3, `T3.2 FAIL: Expected 3 tabs, found ${tabs}`);
  console.log('  ✅ T3.2: Three tabs present (Document, Hierarchy, Traceability)');

  // T3.3: Requirement rows
  const reqRows = await getElementCount('.req-row');
  assert.ok(reqRows >= 8, `T3.3 FAIL: Expected 8+ req rows, found ${reqRows}`);
  console.log(`  ✅ T3.3: ${reqRows} requirement rows rendered`);

  // T3.4: Status badges
  const badges = await getElementCount('.glass-badge');
  assert.ok(badges > 0, 'T3.4 FAIL: No status badges found');
  console.log(`  ✅ T3.4: ${badges} status badges rendered`);

  // T3.5: Tab switching
  const tabBtns = await driver.findElements(By.css('.tab-btn'));
  await tabBtns[1].click(); // Hierarchy tab
  await driver.sleep(800);
  const hierarchyContent = await elementExists('.hierarchy-container, svg');
  assert.ok(hierarchyContent, 'T3.5 FAIL: Hierarchy view not rendered');
  console.log('  ✅ T3.5: Tab switching works (Hierarchy tab)');

  // T3.6: Traceability tab
  await tabBtns[2].click();
  await driver.sleep(800);
  const rtmExists = await elementExists('.rtm-grid, .heatmap-container');
  assert.ok(rtmExists, 'T3.6 FAIL: RTM heatmap not rendered');
  console.log('  ✅ T3.6: Traceability Matrix tab renders');

  console.log('  ✅ Requirements: ALL TESTS PASSED (6/6)');
}

// ── TEST 4: Architecture Canvas ──
async function testArchitecture() {
  console.log('\n🧪 TEST SUITE: Architecture Canvas');
  await navigateTo('/architecture');

  // T4.1: Header
  const header = await getTextContent('.view-header h1');
  assert.ok(header.includes('ARCHITECTURE'), `T4.1 FAIL: Header is "${header}"`);
  console.log('  ✅ T4.1: Header reads "SYSTEMS ARCHITECTURE"');

  // T4.2: Canvas container
  const canvasExists = await elementExists('.arch-canvas-container');
  assert.ok(canvasExists, 'T4.2 FAIL: Architecture canvas not found');
  console.log('  ✅ T4.2: Canvas container exists');

  // T4.3: Subsystem nodes
  const nodes = await getElementCount('.arch-node');
  assert.ok(nodes >= 8, `T4.3 FAIL: Expected 8+ nodes, found ${nodes}`);
  console.log(`  ✅ T4.3: ${nodes} subsystem nodes rendered`);

  // T4.4: Zoom controls
  const zoomIn = await elementExists('#arch-zoom-in');
  const zoomOut = await elementExists('#arch-zoom-out');
  assert.ok(zoomIn && zoomOut, 'T4.4 FAIL: Zoom controls missing');
  console.log('  ✅ T4.4: Zoom controls present');

  // T4.5: Minimap
  const minimap = await elementExists('.arch-minimap');
  assert.ok(minimap, 'T4.5 FAIL: Minimap not found');
  console.log('  ✅ T4.5: Minimap component exists');

  // T4.6: SVG connections
  const svgExists = await elementExists('.arch-connections');
  assert.ok(svgExists, 'T4.6 FAIL: SVG connections layer not found');
  console.log('  ✅ T4.6: SVG connection lines rendered');

  console.log('  ✅ Architecture: ALL TESTS PASSED (6/6)');
}

// ── TEST 5: Risk Management ──
async function testRiskManagement() {
  console.log('\n🧪 TEST SUITE: Risk Management');
  await navigateTo('/risk');

  // T5.1: Header
  const header = await getTextContent('.view-header h1');
  assert.ok(header.includes('RISK'), `T5.1 FAIL: Header is "${header}"`);
  console.log('  ✅ T5.1: Header reads "RISK MANAGEMENT"');

  // T5.2: Risk matrix
  const matrixExists = await elementExists('#risk-matrix');
  assert.ok(matrixExists, 'T5.2 FAIL: Risk matrix not found');
  console.log('  ✅ T5.2: 5×5 risk matrix rendered');

  // T5.3: Matrix cells
  const cells = await getElementCount('.risk-cell');
  assert.strictEqual(cells, 25, `T5.3 FAIL: Expected 25 cells, found ${cells}`);
  console.log('  ✅ T5.3: 25 risk matrix cells (5×5 grid)');

  // T5.4: Risk dots
  const dots = await getElementCount('.risk-dot');
  assert.ok(dots >= 3, `T5.4 FAIL: Expected 3+ risk dots, found ${dots}`);
  console.log(`  ✅ T5.4: ${dots} risk dots plotted on matrix`);

  // T5.5: Risk list
  const items = await getElementCount('.risk-item');
  assert.ok(items >= 3, `T5.5 FAIL: Expected 3+ risk items, found ${items}`);
  console.log(`  ✅ T5.5: ${items} risk register items listed`);

  console.log('  ✅ Risk Management: ALL TESTS PASSED (5/5)');
}

// ── TEST 6: Trade Study Simulator ──
async function testTradeStudy() {
  console.log('\n🧪 TEST SUITE: Trade Study Simulator');
  await navigateTo('/trade-study');

  // T6.1: Header
  const header = await getTextContent('.view-header h1');
  assert.ok(header.includes('TRADE STUDY'), `T6.1 FAIL: Header is "${header}"`);
  console.log('  ✅ T6.1: Header reads "TRADE STUDY SIMULATOR"');

  // T6.2: Radar chart canvas
  const radarExists = await elementExists('#radar-chart');
  assert.ok(radarExists, 'T6.2 FAIL: Radar chart canvas not found');
  console.log('  ✅ T6.2: Radar chart canvas exists');

  // T6.3: Bar chart canvas
  const barExists = await elementExists('#bar-chart');
  assert.ok(barExists, 'T6.3 FAIL: Bar chart canvas not found');
  console.log('  ✅ T6.3: Bar chart canvas exists');

  // T6.4: Weight sliders
  const sliders = await getElementCount('.trade-slider');
  assert.strictEqual(sliders, 5, `T6.4 FAIL: Expected 5 sliders, found ${sliders}`);
  console.log('  ✅ T6.4: 5 criteria weight sliders present');

  // T6.5: Decision matrix
  const matrixExists = await elementExists('.decision-matrix');
  assert.ok(matrixExists, 'T6.5 FAIL: Decision matrix table not found');
  console.log('  ✅ T6.5: Decision matrix table rendered');

  // T6.6: Slider interaction
  const slider = await driver.findElement(By.css('.trade-slider'));
  await driver.executeScript("arguments[0].value = 50; arguments[0].dispatchEvent(new Event('input'));", slider);
  await driver.sleep(500);
  const updatedVal = await getTextContent('#weight-val-0');
  assert.ok(updatedVal.includes('50'), `T6.6 FAIL: Weight not updated, got "${updatedVal}"`);
  console.log('  ✅ T6.6: Slider interaction updates weight display');

  console.log('  ✅ Trade Study: ALL TESTS PASSED (6/6)');
}

// ── TEST 7: V-Model Lifecycle ──
async function testVModel() {
  console.log('\n🧪 TEST SUITE: V-Model Lifecycle');
  await navigateTo('/vmodel');

  // T7.1: Header
  const header = await getTextContent('.view-header h1');
  assert.ok(header.includes('V-MODEL'), `T7.1 FAIL: Header is "${header}"`);
  console.log('  ✅ T7.1: Header reads "V-MODEL LIFECYCLE"');

  // T7.2: SVG V-shape
  const svgExists = await elementExists('.vmodel-svg, svg');
  assert.ok(svgExists, 'T7.2 FAIL: SVG V-shape not found');
  console.log('  ✅ T7.2: SVG V-shape rendered');

  // T7.3: Phase nodes
  const nodes = await getElementCount('.vmodel-node, [data-phase]');
  assert.ok(nodes >= 8, `T7.3 FAIL: Expected 8+ phase nodes, found ${nodes}`);
  console.log(`  ✅ T7.3: ${nodes} lifecycle phase nodes rendered`);

  // T7.4: Gate readiness button
  const gateBtn = await elementExists('.glass-btn--primary, button');
  assert.ok(gateBtn, 'T7.4 FAIL: Gate readiness button not found');
  console.log('  ✅ T7.4: Gate Readiness Check button exists');

  console.log('  ✅ V-Model: ALL TESTS PASSED (4/4)');
}

// ── TEST 8: Document Studio ──
async function testDocumentStudio() {
  console.log('\n🧪 TEST SUITE: Document Studio');
  await navigateTo('/documents');

  // T8.1: Header
  const header = await getTextContent('.view-header h1');
  assert.ok(header.includes('DOCUMENT STUDIO'), `T8.1 FAIL: Header is "${header}"`);
  console.log('  ✅ T8.1: Header reads "DOCUMENT STUDIO"');

  // T8.2: Document list
  const docItems = await getElementCount('.doc-item');
  assert.ok(docItems >= 6, `T8.2 FAIL: Expected 6+ documents, found ${docItems}`);
  console.log(`  ✅ T8.2: ${docItems} documents in list panel`);

  // T8.3: Editor panel
  const editorExists = await elementExists('#doc-editor');
  assert.ok(editorExists, 'T8.3 FAIL: Editor panel not found');
  console.log('  ✅ T8.3: Rich text editor panel exists');

  // T8.4: Editor is contentEditable
  const editor = await driver.findElement(By.css('#doc-editor'));
  const isEditable = await editor.getAttribute('contenteditable');
  assert.strictEqual(isEditable, 'true', 'T8.4 FAIL: Editor not contentEditable');
  console.log('  ✅ T8.4: Editor is contentEditable');

  // T8.5: Word count
  const wordCountExists = await elementExists('#doc-word-count');
  assert.ok(wordCountExists, 'T8.5 FAIL: Word count not found');
  const wordCount = await getTextContent('#doc-word-count');
  assert.ok(wordCount.includes('WORDS:'), `T8.5 FAIL: Word count format wrong: "${wordCount}"`);
  console.log(`  ✅ T8.5: Word count displays (${wordCount})`);

  // T8.6: Document switching
  const docItems_list = await driver.findElements(By.css('.doc-item'));
  await docItems_list[1].click(); // Click ICD
  await driver.sleep(600);
  const editorContent = await driver.findElement(By.css('#doc-editor')).getText();
  assert.ok(editorContent.length > 0, 'T8.6 FAIL: Editor empty after switching');
  console.log('  ✅ T8.6: Document switching works');

  // T8.7: Export button
  const exportBtn = await elementExists('#doc-export-btn');
  assert.ok(exportBtn, 'T8.7 FAIL: Export PDF button not found');
  console.log('  ✅ T8.7: Export PDF button exists');

  console.log('  ✅ Document Studio: ALL TESTS PASSED (7/7)');
}

// ── TEST 9: Launch Countdown ──
async function testCountdown() {
  console.log('\n🧪 TEST SUITE: Launch Countdown');
  await navigateTo('/countdown');

  // T9.1: Header
  const header = await getTextContent('.view-header h1');
  assert.ok(header.includes('COUNTDOWN'), `T9.1 FAIL: Header is "${header}"`);
  console.log('  ✅ T9.1: Header contains "COUNTDOWN"');

  // T9.2: Countdown clock
  const clockExists = await elementExists('.countdown-clock');
  assert.ok(clockExists, 'T9.2 FAIL: Countdown clock not found');
  console.log('  ✅ T9.2: Countdown clock rendered');

  // T9.3: Readiness quadrants
  const quadrants = await getElementCount('.readiness-quadrant');
  assert.strictEqual(quadrants, 4, `T9.3 FAIL: Expected 4 quadrants, found ${quadrants}`);
  console.log('  ✅ T9.3: 4 readiness quadrants present');

  // T9.4: Simulate button
  const simBtn = await elementExists('#sim-readiness-btn, .glass-btn--primary');
  assert.ok(simBtn, 'T9.4 FAIL: Simulate readiness button not found');
  console.log('  ✅ T9.4: Simulate Readiness button exists');

  // T9.5: T-0 trigger button
  const t0Btn = await elementExists('#launch-btn, .glass-btn--outline');
  assert.ok(t0Btn, 'T9.5 FAIL: T-0 trigger button not found');
  console.log('  ✅ T9.5: Trigger T-0 Sequence button exists');

  console.log('  ✅ Launch Countdown: ALL TESTS PASSED (5/5)');
}

// ── TEST 10: Navigation & Sidebar ──
async function testNavigation() {
  console.log('\n🧪 TEST SUITE: Navigation & Sidebar');
  await navigateTo('/command-center');

  // T10.1: Sidebar nav items
  const navItems = await getElementCount('.nav-item');
  assert.ok(navItems >= 10, `T10.1 FAIL: Expected 10+ nav items, found ${navItems}`);
  console.log(`  ✅ T10.1: ${navItems} navigation items in sidebar`);

  // T10.2: Active state on current route
  const activeItem = await elementExists('.nav-item.active');
  assert.ok(activeItem, 'T10.2 FAIL: No active nav item found');
  console.log('  ✅ T10.2: Active nav item highlighted');

  // T10.3: Navigate to Requirements
  const navItemsList = await driver.findElements(By.css('.nav-item'));
  if (navItemsList.length > 1) {
    await navItemsList[1].click(); // Requirements
    await driver.sleep(1000);
    const url = await driver.getCurrentUrl();
    assert.ok(url.includes('/requirements'), `T10.3 FAIL: URL is ${url}`);
    console.log('  ✅ T10.3: Sidebar navigation to Requirements works');
  }

  // T10.4: Navigate back to dashboard
  await navItemsList[0].click(); // Command Center
  await driver.sleep(1000);
  const url2 = await driver.getCurrentUrl();
  assert.ok(url2.includes('/command-center'), `T10.4 FAIL: URL is ${url2}`);
  console.log('  ✅ T10.4: Navigate back to Command Center works');

  console.log('  ✅ Navigation: ALL TESTS PASSED (4/4)');
}

// ── TEST 11: Engineering Theater ──
async function testDiagrams() {
  console.log('\n🧪 TEST SUITE: Engineering Theater');
  await navigateTo('/diagrams');

  // T11.1: Header
  const header = await getTextContent('.view-header h1');
  assert.ok(header.includes('ENGINEERING'), `T11.1 FAIL: Header is "${header}"`);
  console.log('  ✅ T11.1: Header reads "ENGINEERING THEATER"');

  // T11.2: Diagram cards
  const cards = await getElementCount('.theater-card');
  assert.strictEqual(cards, 6, `T11.2 FAIL: Expected 6 diagram cards, found ${cards}`);
  console.log('  ✅ T11.2: 6 diagram cards rendered');

  // T11.3: SVG content
  const svgs = await getElementCount('.theater-card svg');
  assert.ok(svgs >= 5, `T11.3 FAIL: Expected 5+ SVGs, found ${svgs}`);
  console.log(`  ✅ T11.3: ${svgs} SVG diagrams rendered`);

  console.log('  ✅ Engineering Theater: ALL TESTS PASSED (3/3)');
}

// ── TEST 12: N² Matrix ──
async function testN2Matrix() {
  console.log('\n🧪 TEST SUITE: N² Matrix');
  await navigateTo('/n2-matrix');

  // T12.1: Header
  const header = await getTextContent('.view-header h1');
  assert.ok(header.includes('N²') || header.includes('MATRIX'), `T12.1 FAIL: Header is "${header}"`);
  console.log('  ✅ T12.1: Header reads "N² INTERFACE MATRIX"');

  // T12.2: Matrix table
  const tableExists = await elementExists('table');
  assert.ok(tableExists, 'T12.2 FAIL: Matrix table not found');
  console.log('  ✅ T12.2: Matrix table rendered');

  // T12.3: Interface cells
  const cells = await getElementCount('.n2-cell');
  assert.ok(cells >= 40, `T12.3 FAIL: Expected 40+ cells, found ${cells}`);
  console.log(`  ✅ T12.3: ${cells} interface cells rendered`);

  console.log('  ✅ N² Matrix: ALL TESTS PASSED (3/3)');
}

// ══════════════════════════════════════════════════════
//  MAIN TEST RUNNER
// ══════════════════════════════════════════════════════

async function runAllTests() {
  console.log('═══════════════════════════════════════════════');
  console.log('  MISSION OS — Selenium Test Suite v1.0');
  console.log('  Target: ' + BASE_URL);
  console.log('  Date: ' + new Date().toISOString());
  console.log('═══════════════════════════════════════════════');

  let passed = 0;
  let failed = 0;
  const suites = [
    { name: 'Login View', fn: testLoginView },
    { name: 'Command Center', fn: testCommandCenter },
    { name: 'Requirements', fn: testRequirements },
    { name: 'Architecture Canvas', fn: testArchitecture },
    { name: 'Risk Management', fn: testRiskManagement },
    { name: 'Trade Study', fn: testTradeStudy },
    { name: 'V-Model Lifecycle', fn: testVModel },
    { name: 'Document Studio', fn: testDocumentStudio },
    { name: 'Launch Countdown', fn: testCountdown },
    { name: 'Navigation', fn: testNavigation },
    { name: 'Engineering Theater', fn: testDiagrams },
    { name: 'N² Matrix', fn: testN2Matrix },
  ];

  try {
    await setup();

    for (const suite of suites) {
      try {
        await suite.fn();
        passed++;
      } catch (err) {
        console.error(`  ❌ ${suite.name} FAILED: ${err.message}`);
        failed++;
      }
    }
  } finally {
    await teardown();
  }

  console.log('\n═══════════════════════════════════════════════');
  console.log(`  RESULTS: ${passed} PASSED / ${failed} FAILED / ${suites.length} TOTAL`);
  console.log('═══════════════════════════════════════════════');

  process.exit(failed > 0 ? 1 : 0);
}

runAllTests();
