/* ============================================================
   Custom SVG Icon Library — Engineering-Specific Symbols
   ============================================================ */

export const icons = {
  // Mission Command Center — home
  command: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/>
    <line x1="12" y1="22" x2="12" y2="15.5"/>
    <line x1="22" y1="8.5" x2="12" y2="15.5"/>
    <line x1="2" y1="8.5" x2="12" y2="15.5"/>
    <circle cx="12" cy="10" r="2.5"/>
  </svg>`,

  // Requirements — circuit node
  requirements: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="8"/>
    <line x1="12" y1="16" x2="12" y2="22"/>
    <line x1="2" y1="12" x2="8" y2="12"/>
    <line x1="16" y1="12" x2="22" y2="12"/>
    <circle cx="12" cy="2" r="1" fill="currentColor"/>
    <circle cx="12" cy="22" r="1" fill="currentColor"/>
    <circle cx="2" cy="12" r="1" fill="currentColor"/>
    <circle cx="22" cy="12" r="1" fill="currentColor"/>
  </svg>`,

  // Architecture — orbital path
  architecture: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-60 12 12)"/>
  </svg>`,

  // N² Diagram — matrix grid
  n2matrix: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="2" width="6" height="6" rx="1"/>
    <rect x="9" y="2" width="6" height="6" rx="1"/>
    <rect x="16" y="2" width="6" height="6" rx="1"/>
    <rect x="2" y="9" width="6" height="6" rx="1"/>
    <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.3"/>
    <rect x="16" y="9" width="6" height="6" rx="1"/>
    <rect x="2" y="16" width="6" height="6" rx="1"/>
    <rect x="9" y="16" width="6" height="6" rx="1"/>
    <rect x="16" y="16" width="6" height="6" rx="1"/>
  </svg>`,

  // WBS — branching tree
  wbs: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="4" r="2.5"/>
    <circle cx="5" cy="14" r="2.5"/>
    <circle cx="12" cy="14" r="2.5"/>
    <circle cx="19" cy="14" r="2.5"/>
    <line x1="12" y1="6.5" x2="5" y2="11.5"/>
    <line x1="12" y1="6.5" x2="12" y2="11.5"/>
    <line x1="12" y1="6.5" x2="19" y2="11.5"/>
    <circle cx="3" cy="21" r="1.5"/>
    <circle cx="7" cy="21" r="1.5"/>
    <line x1="5" y1="16.5" x2="3" y2="19.5"/>
    <line x1="5" y1="16.5" x2="7" y2="19.5"/>
  </svg>`,

  // Risk — crosshair
  risk: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    <line x1="12" y1="1" x2="12" y2="5"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="1" y1="12" x2="5" y2="12"/>
    <line x1="19" y1="12" x2="23" y2="12"/>
  </svg>`,

  // Interface Registry — signal wave
  interfaces: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 12 C4 8, 6 8, 8 12 C10 16, 12 16, 14 12 C16 8, 18 8, 20 12 C22 16, 22 16, 22 12"/>
    <circle cx="2" cy="12" r="1" fill="currentColor"/>
    <circle cx="22" cy="12" r="1" fill="currentColor"/>
    <line x1="12" y1="4" x2="12" y2="7" opacity="0.5"/>
    <line x1="12" y1="17" x2="12" y2="20" opacity="0.5"/>
  </svg>`,

  // Engineering Theater — theater
  theater: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 4 L12 2 L22 4"/>
    <rect x="3" y="4" width="18" height="14" rx="2"/>
    <line x1="3" y1="8" x2="21" y2="8"/>
    <path d="M6 18 L6 22 M18 18 L18 22"/>
    <line x1="4" y1="22" x2="20" y2="22"/>
    <circle cx="12" cy="13" r="2.5"/>
  </svg>`,

  // Trade Study — balance scale
  tradeStudy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="12" y1="2" x2="12" y2="22"/>
    <line x1="2" y1="6" x2="22" y2="6"/>
    <polygon points="2,6 5,16 -1,16" transform="translate(3,0)"/>
    <polygon points="2,6 5,16 -1,16" transform="translate(17,0)"/>
    <circle cx="12" cy="2" r="1.5" fill="currentColor"/>
    <line x1="8" y1="22" x2="16" y2="22"/>
  </svg>`,

  // V-Model — checkmark V
  vmodel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="2,4 12,20 22,4"/>
    <circle cx="2" cy="4" r="2" fill="currentColor" opacity="0.5"/>
    <circle cx="12" cy="20" r="2" fill="currentColor" opacity="0.5"/>
    <circle cx="22" cy="4" r="2" fill="currentColor" opacity="0.5"/>
    <circle cx="7" cy="12" r="1.5"/>
    <circle cx="17" cy="12" r="1.5"/>
    <line x1="7" y1="12" x2="17" y2="12" stroke-dasharray="2 2" opacity="0.5"/>
  </svg>`,

  // Launch Countdown — rocket
  countdown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2 C12 2 8 8 8 14 L16 14 C16 8 12 2 12 2Z"/>
    <rect x="9" y="14" width="6" height="4" rx="1"/>
    <path d="M10 18 L8 22 M14 18 L16 22"/>
    <path d="M8 12 L5 14 L7 16" opacity="0.5"/>
    <path d="M16 12 L19 14 L17 16" opacity="0.5"/>
    <circle cx="12" cy="10" r="1.5" fill="currentColor"/>
  </svg>`,

  // Documents
  documents: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 2 L6 2 C4.9 2 4 2.9 4 4 L4 20 C4 21.1 4.9 22 6 22 L18 22 C19.1 22 20 21.1 20 20 L20 8 Z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="17" x2="14" y2="17"/>
    <line x1="8" y1="9" x2="10" y2="9"/>
  </svg>`,

  // Orion AI
  orion: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2 C14 7, 17 10, 22 12 C17 14, 14 17, 12 22 C10 17, 7 14, 2 12 C7 10, 10 7, 12 2Z" opacity="0.3" fill="currentColor"/>
  </svg>`,

  // Expand/Collapse
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>`,

  // Close
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`,

  // Search
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>`,

  // Alert
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>`,

  // Simulator
  simulator: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="6"/>
    <circle cx="6.5" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="9.5" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="15.5" cy="10" r="1.5"/>
    <circle cx="17.5" cy="14" r="1.5"/>
    <path d="M10 6 L14 6" opacity="0.3"/>
  </svg>`,
};

export function icon(name, size = 24, className = '') {
  const svg = icons[name];
  if (!svg) return '';
  return `<span class="icon ${className}" style="width:${size}px;height:${size}px;display:inline-flex;align-items:center;justify-content:center;">${svg}</span>`;
}
