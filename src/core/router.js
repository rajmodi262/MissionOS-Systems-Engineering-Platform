/* ============================================================
   Hash-Based SPA Router
   ============================================================ */

const routes = {};
let currentView = null;
let appContainer = null;
let onBeforeNavigate = null;
let isNavigating = false;

export function registerRoute(path, handler) {
  routes[path] = handler;
}

export function setAppContainer(el) {
  appContainer = el;
}

export function getAppContainer() {
  return appContainer;
}

export function setBeforeNavigate(fn) {
  onBeforeNavigate = fn;
}

export function navigate(path) {
  window.location.hash = path;
}

export function getCurrentRoute() {
  return window.location.hash.slice(1) || '/login';
}

async function handleRouteChange() {
  if (isNavigating) return;
  isNavigating = true;

  const path = getCurrentRoute();
  const handler = routes[path];

  if (!handler) {
    console.warn(`No route handler for: ${path}`);
    isNavigating = false;
    return;
  }

  // Skip if same route
  if (path === currentView) {
    isNavigating = false;
    return;
  }

  if (onBeforeNavigate) {
    await onBeforeNavigate(path, currentView);
  }

  // Re-get appContainer in case beforeNavigate changed it
  const container = appContainer;

  if (container && path !== '/login') {
    container.classList.add('view-transition-out');
    await new Promise(r => setTimeout(r, 150));
    container.innerHTML = '';
    container.classList.remove('view-transition-out');
    container.classList.add('view-transition-in');

    await handler(container);

    requestAnimationFrame(() => {
      container.classList.remove('view-transition-in');
    });
  } else {
    await handler(container);
  }

  currentView = path;
  isNavigating = false;
}

export function initRouter() {
  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange();
}
