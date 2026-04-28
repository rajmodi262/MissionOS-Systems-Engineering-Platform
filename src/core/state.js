/* ============================================================
   Global State Management + localStorage Persistence
   ============================================================ */

import { emit } from './events.js';

const STORAGE_KEY = 'mission_os_state';

let state = {
  currentUser: null,
  isLoggedIn: false,
  activeMission: null,
  selectedItem: null,
  sidebarExpanded: false,
  orionOpen: false,
  notifications: [],
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load state:', e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
}

export function getState(key) {
  if (key) return state[key];
  return { ...state };
}

export function setState(updates) {
  const prev = { ...state };
  state = { ...state, ...updates };
  saveState();
  emit('state-change', { prev, current: state, changes: updates });
}

export function selectItem(item) {
  setState({ selectedItem: item });
  emit('select-item', item);
}

export function addNotification(notification) {
  const notifs = [...state.notifications, {
    id: Date.now(),
    time: new Date().toISOString(),
    read: false,
    ...notification
  }];
  setState({ notifications: notifs });
  emit('notification', notification);
}

loadState();
