/* ============================================================
   Orion AI Engine — Rule-Based Requirement Analyzer
   ============================================================ */

const AMBIGUOUS_TERMS = [
  'adequate', 'appropriate', 'as appropriate', 'as needed', 'be able to',
  'easy', 'effective', 'efficient', 'enough', 'fast', 'flexible',
  'good', 'handle', 'ideally', 'if possible', 'maybe', 'minimize',
  'maximize', 'normal', 'optimize', 'reasonable', 'robust', 'satisfactory',
  'should', 'simple', 'sufficient', 'suitable', 'support', 'timely',
  'user-friendly', 'when necessary', 'attempt to', 'try to',
];

const MEASURABLE_PATTERNS = [
  /\d+\s*(km|m|cm|mm|kg|g|kW|W|V|A|°C|°F|K|Hz|MHz|GHz|Mbps|kbps|ms|s|min|hr|day|%|mSv|krad)/i,
  /\b(less than|greater than|at least|minimum|maximum|within|between|no more than)\b/i,
  /\b(≤|≥|<|>|±)\s*\d/,
];

const VERIFIABLE_KEYWORDS = [
  'shall', 'must', 'will', 'is required to',
];

const WEAK_VERBS = [
  'may', 'might', 'could', 'can', 'should',
];

export function analyzeRequirement(text) {
  const suggestions = [];
  const lowerText = text.toLowerCase();

  // Check for ambiguous terms
  const foundAmbiguous = AMBIGUOUS_TERMS.filter(term => lowerText.includes(term));
  if (foundAmbiguous.length > 0) {
    suggestions.push({
      type: 'warning',
      icon: '⚠',
      text: `Ambiguous: "${foundAmbiguous[0]}" — use a quantifiable threshold`,
    });
  }

  // Check for measurability
  const isMeasurable = MEASURABLE_PATTERNS.some(pattern => pattern.test(text));
  if (!isMeasurable && text.includes('shall')) {
    suggestions.push({
      type: 'warning',
      icon: '⚠',
      text: 'Not measurable — add a quantifiable value or threshold',
    });
  }

  if (isMeasurable) {
    suggestions.push({
      type: 'success',
      icon: '✓',
      text: 'Contains measurable criteria',
    });
  }

  // Check for weak verbs
  const foundWeak = WEAK_VERBS.filter(v => {
    const regex = new RegExp(`\\b${v}\\b`, 'i');
    return regex.test(text);
  });
  if (foundWeak.length > 0) {
    suggestions.push({
      type: 'error',
      icon: '✗',
      text: `Weak verb "${foundWeak[0]}" — use "shall" for mandatory requirements`,
    });
  }

  // Check for verifiability
  const hasShall = /\bshall\b/i.test(text);
  if (hasShall && isMeasurable) {
    suggestions.push({
      type: 'success',
      icon: '✓',
      text: 'Verifiable via test or analysis',
    });
  }

  // Check for "comply" patterns (inspection-verifiable)
  if (/\bcompl(y|iance|iant)\b/i.test(text)) {
    suggestions.push({
      type: 'success',
      icon: '✓',
      text: 'Verifiable via inspection',
    });
  }

  // If no issues found
  if (suggestions.length === 0) {
    suggestions.push({
      type: 'success',
      icon: '✓',
      text: 'Requirement appears well-formed',
    });
  }

  return suggestions;
}

export function generateRequirement(topic) {
  const id = `REQ-${String(Math.floor(Math.random() * 900 + 100))}`;
  const templates = {
    thermal: `The thermal control system shall maintain all electronic components within their qualified operating temperature range of -40°C to +85°C during all mission phases.`,
    propulsion: `The propulsion system shall provide a minimum total impulse of 2,500 N·s with a specific impulse (Isp) of not less than 310 seconds.`,
    communications: `The communications subsystem shall maintain a minimum data downlink rate of 2 Mbps at a bit error rate not exceeding 10⁻⁶ at maximum Earth distance.`,
    power: `The electrical power system shall provide a continuous bus voltage of 28 ± 6 VDC with power capacity of no less than 12 kW during nominal operations.`,
    default: `The ${topic} subsystem shall meet all performance requirements as defined in the System Requirements Document with margin of no less than 10%.`,
  };

  const text = templates[topic.toLowerCase()] || templates.default;

  return {
    id,
    text,
    status: 'draft',
    level: 'subsystem',
    priority: 'high',
    verification: 'test',
    rationale: `Derived from system-level ${topic} performance allocation.`,
  };
}

export function generateInsight(context) {
  const insights = [
    `ALERT: ${context.mission || 'Mission'} has ${context.unverified || 3} unverified requirements. ${context.deadline || 'SRR'} is in ${context.daysUntil || 14} days. Recommend prioritizing verification activities.`,
    `TREND: Risk count in ${context.phase || 'Preliminary Design'} phase is ${context.riskDelta || '23%'} higher than baseline. Consider additional risk review board session.`,
    `OBSERVATION: ${context.engineer || 'Engineer'} has ${context.overdue || 5} overdue verification evidence submissions. Flagging as team risk.`,
    `RECOMMENDATION: Cross-reference analysis shows ${context.gaps || 2} potential traceability gaps between system and subsystem requirements in ${context.subsystem || 'Thermal'} domain.`,
  ];
  return insights[Math.floor(Math.random() * insights.length)];
}
