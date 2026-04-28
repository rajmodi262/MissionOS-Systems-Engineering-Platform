/* ============================================================
   Trade Study Simulator View
   ============================================================ */

import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ALT_COLORS = ['#00FF9D', '#00C8FF', '#FFB830', '#FF3B5C', '#B388FF', '#4DD0E1'];

let radarChart = null;
let barChart = null;

const defaultStudy = {
  alternatives: ['Chemical Prop', 'Electric Prop', 'Hybrid Prop'],
  criteria: [
    { name: 'Delta-V', weight: 30 },
    { name: 'Cost', weight: 25 },
    { name: 'Reliability', weight: 20 },
    { name: 'Mass', weight: 15 },
    { name: 'TRL', weight: 10 },
  ],
  scores: [
    [9, 4, 8, 5, 9],
    [7, 7, 6, 9, 6],
    [8, 6, 7, 7, 7],
  ],
};

export async function renderTradeStudy(container) {
  container.innerHTML = `
    <div class="view-header">
      <div>
        <h1>TRADE STUDY SIMULATOR</h1>
        <p class="subtitle">PROPULSION SYSTEM SELECTION // MULTI-CRITERIA ANALYSIS</p>
      </div>
    </div>
    <div class="trade-layout">
      <div class="trade-config glass-panel">
        <h3 class="font-heading" style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:var(--space-md);letter-spacing:0.1em;">ALTERNATIVES</h3>
        <div id="alt-list">
          ${defaultStudy.alternatives.map((a, i) => `
            <div class="trade-alt-input">
              <div class="trade-alt-color" style="background:${ALT_COLORS[i]}"></div>
              <input class="trade-alt-name" value="${a}" data-idx="${i}" />
            </div>
          `).join('')}
        </div>

        <h3 class="font-heading" style="font-size:0.9rem;color:var(--text-secondary);margin:var(--space-lg) 0 var(--space-md);letter-spacing:0.1em;">CRITERIA WEIGHTS</h3>
        <div id="weight-sliders">
          ${defaultStudy.criteria.map((c, i) => `
            <div class="trade-slider-group">
              <div class="trade-slider-label">
                <span>${c.name}</span>
                <span id="weight-val-${i}">${c.weight}%</span>
              </div>
              <input type="range" class="trade-slider" min="0" max="100" value="${c.weight}" data-idx="${i}" />
            </div>
          `).join('')}
        </div>

        <h3 class="font-heading" style="font-size:0.9rem;color:var(--text-secondary);margin:var(--space-lg) 0 var(--space-md);letter-spacing:0.1em;">SENSITIVITY</h3>
        <p class="font-mono" style="font-size:0.65rem;color:var(--text-dim);line-height:1.5;">Adjust weights above to see real-time impact on ranking. Swing factors are criteria where small changes alter the winning alternative.</p>
      </div>

      <div class="trade-results">
        <div class="trade-chart-card glass-panel">
          <h3>RADAR COMPARISON</h3>
          <canvas id="radar-chart"></canvas>
        </div>
        <div class="trade-chart-card glass-panel">
          <h3>WEIGHTED SCORES</h3>
          <canvas id="bar-chart"></canvas>
        </div>
        <div class="trade-chart-card glass-panel full-width">
          <h3>DECISION MATRIX</h3>
          <div id="decision-matrix-container" style="overflow:auto;flex:1;"></div>
        </div>
      </div>
    </div>
  `;

  // Destroy previous chart instances
  if (radarChart) { radarChart.destroy(); radarChart = null; }
  if (barChart) { barChart.destroy(); barChart = null; }

  // Delay chart init to next frame so canvas has computed dimensions
  requestAnimationFrame(() => {
    initCharts();
    renderDecisionMatrix();
  });

  // Weight slider listeners
  container.querySelectorAll('.trade-slider').forEach(slider => {
    slider.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.idx);
      defaultStudy.criteria[idx].weight = parseInt(e.target.value);
      document.getElementById(`weight-val-${idx}`).textContent = `${e.target.value}%`;
      updateCharts();
      renderDecisionMatrix();
    });
  });
}

function initCharts() {
  const chartDefaults = {
    color: '#8888A0',
    borderColor: 'rgba(255,255,255,0.05)',
    font: { family: "'Space Mono', monospace", size: 10 }
  };

  // Radar
  const radarCtx = document.getElementById('radar-chart');
  if (radarCtx) {
    radarChart = new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: defaultStudy.criteria.map(c => c.name),
        datasets: defaultStudy.alternatives.map((alt, i) => ({
          label: alt,
          data: defaultStudy.scores[i],
          borderColor: ALT_COLORS[i],
          backgroundColor: ALT_COLORS[i] + '15',
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: ALT_COLORS[i],
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#8888A0', font: { family: "'Space Mono'" , size: 9 } } },
        },
        scales: {
          r: {
            grid: { color: 'rgba(255,255,255,0.06)' },
            angleLines: { color: 'rgba(255,255,255,0.06)' },
            pointLabels: { color: '#8888A0', font: { family: "'Space Mono'", size: 9 } },
            ticks: { display: false },
            suggestedMin: 0,
            suggestedMax: 10,
          }
        }
      }
    });
  }

  // Bar
  const barCtx = document.getElementById('bar-chart');
  if (barCtx) {
    const weightedScores = calcWeightedScores();
    barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: defaultStudy.alternatives,
        datasets: [{
          data: weightedScores,
          backgroundColor: ALT_COLORS.slice(0, defaultStudy.alternatives.length).map(c => c + '60'),
          borderColor: ALT_COLORS.slice(0, defaultStudy.alternatives.length),
          borderWidth: 1,
          borderRadius: 4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#8888A0', font: { family: "'Space Mono'", size: 9 } } },
          y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#555570', font: { family: "'Space Mono'", size: 9 } } },
        }
      }
    });
  }
}

function calcWeightedScores() {
  const totalWeight = defaultStudy.criteria.reduce((s, c) => s + c.weight, 0) || 1;
  return defaultStudy.scores.map(altScores => {
    return altScores.reduce((sum, score, i) => {
      return sum + (score * defaultStudy.criteria[i].weight / totalWeight);
    }, 0);
  });
}

function updateCharts() {
  if (barChart) {
    barChart.data.datasets[0].data = calcWeightedScores();
    barChart.update('none');
  }
}

function renderDecisionMatrix() {
  const el = document.getElementById('decision-matrix-container');
  if (!el) return;

  const totalWeight = defaultStudy.criteria.reduce((s, c) => s + c.weight, 0) || 1;
  const weighted = defaultStudy.scores.map(altScores =>
    altScores.map((score, i) => (score * defaultStudy.criteria[i].weight / totalWeight).toFixed(1))
  );
  const totals = weighted.map(w => w.reduce((s, v) => s + parseFloat(v), 0).toFixed(1));
  const maxTotal = Math.max(...totals.map(parseFloat));

  el.innerHTML = `
    <table class="decision-matrix">
      <thead>
        <tr>
          <th>Criteria</th>
          <th>Weight</th>
          ${defaultStudy.alternatives.map(a => `<th>${a}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${defaultStudy.criteria.map((c, ci) => {
          const rowScores = defaultStudy.scores.map(s => s[ci]);
          const maxInRow = Math.max(...rowScores);
          return `
            <tr>
              <td style="text-align:left;color:var(--text-secondary);">${c.name}</td>
              <td>${c.weight}%</td>
              ${defaultStudy.alternatives.map((_, ai) => {
                const isWinner = defaultStudy.scores[ai][ci] === maxInRow;
                return `<td class="${isWinner ? 'winner' : ''}">${defaultStudy.scores[ai][ci]} (${weighted[ai][ci]})</td>`;
              }).join('')}
            </tr>
          `;
        }).join('')}
        <tr style="border-top:2px solid var(--glass-border-lit);">
          <td style="text-align:left;color:var(--text-primary);font-weight:700;">TOTAL</td>
          <td>—</td>
          ${totals.map((t, i) => `
            <td class="${parseFloat(t) === maxTotal ? 'winner' : ''}" style="font-size:0.85rem;font-weight:700;">${t}</td>
          `).join('')}
        </tr>
      </tbody>
    </table>
  `;
}
