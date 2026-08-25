// HR.com Education 2026 Redesign — Executive Critique App Controller
import { globalCritique, pagesCritique } from './data/critique-data.js';

let currentTab = 'crisis'; // 'crisis' | 'page-1'..'page-7' | 'solution'
let selectedHotspotId = null;

// DOM Elements
const pageNavBar = document.getElementById('pageNavBar');
const appMain = document.getElementById('appMain');

// Initialize App
function initApp() {
  renderNavBar();
  renderCurrentView();
}

// --------------------------------------------------------------------------
// Render Navigation Bar
// --------------------------------------------------------------------------
function renderNavBar() {
  let navHtml = `
    <button class="nav-btn crisis-btn ${currentTab === 'crisis' ? 'active' : ''}" data-tab="crisis">
      <span>🚨</span>
      <span>The 7-Page Crisis</span>
    </button>
  `;

  pagesCritique.forEach(page => {
    navHtml += `
      <button class="nav-btn ${currentTab === page.id ? 'active' : ''}" data-tab="${page.id}">
        <span class="nav-num">${page.num}</span>
        <span>${page.name}</span>
      </button>
    `;
  });

  navHtml += `
    <button class="nav-btn solution-btn ${currentTab === 'solution' ? 'active' : ''}" data-tab="solution">
      <span>✨</span>
      <span>Consolidation Strategy</span>
    </button>
  `;

  pageNavBar.innerHTML = navHtml;

  // Attach nav event listeners
  pageNavBar.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTab = btn.dataset.tab;
      selectedHotspotId = null;
      renderNavBar();
      renderCurrentView();
    });
  });
}

// --------------------------------------------------------------------------
// Render Current Main View
// --------------------------------------------------------------------------
function renderCurrentView() {
  if (currentTab === 'crisis') {
    renderCrisisView();
  } else if (currentTab === 'solution') {
    renderSolutionView();
  } else {
    const pageData = pagesCritique.find(p => p.id === currentTab);
    if (pageData) {
      renderPageCritiqueView(pageData);
    }
  }
}

// --------------------------------------------------------------------------
// 1. Render Global Crisis View (The 7-Page Fragmentation Crisis)
// --------------------------------------------------------------------------
function renderCrisisView() {
  appMain.innerHTML = `
    <div class="crisis-view">
      <!-- Hero Card -->
      <div class="crisis-hero-card">
        <div class="crisis-eyebrow">🚨 EXECUTIVE AUDIT FOR MARKETING SERVICES</div>
        <h2>${globalCritique.title}</h2>
        <p class="lead">${globalCritique.subtitle}</p>
        
        <div class="metric-strip">
          ${globalCritique.overviewMetrics.map(m => `
            <div class="metric-card">
              <div class="val">${m.value}</div>
              <div class="lbl">${m.label}</div>
              <div class="note">${m.note}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Funnel Leakage Diagram -->
      <div class="leakage-diagram-section">
        <div class="section-title-wrap">
          <h3>The 7-Page Funnel Fragmentation Flow</h3>
          <p>Each page boundary forces the candidate to re-evaluate their intent, causing steep drop-offs.</p>
        </div>

        <div class="funnel-flow-container">
          <div class="funnel-step-box">
            <span class="step-num">01</span>
            <div class="step-title">Understanding</div>
            <div class="step-flaw">Confusing quiz &amp; outdated graphics</div>
            <div class="drop-badge">📉 35% Bounce</div>
          </div>
          <div class="funnel-arrow">→</div>

          <div class="funnel-step-box">
            <span class="step-num">02</span>
            <div class="step-title">Prep Options</div>
            <div class="step-flaw">Catalog overload &amp; choice paralysis</div>
            <div class="drop-badge">📉 40% Drop-off</div>
          </div>
          <div class="funnel-arrow">→</div>

          <div class="funnel-step-box">
            <span class="step-num">03</span>
            <div class="step-title">Pass Assurance</div>
            <div class="step-flaw">Guarantee is hidden on separate page</div>
            <div class="drop-badge">📉 80% Never See It</div>
          </div>
          <div class="funnel-arrow">→</div>

          <div class="funnel-step-box">
            <span class="step-num">06</span>
            <div class="step-title">Reviews</div>
            <div class="step-flaw">49+ reviews isolated from pricing</div>
            <div class="drop-badge">📉 85% Never See It</div>
          </div>
          <div class="funnel-arrow">→</div>

          <div class="funnel-step-box">
            <span class="step-num">07</span>
            <div class="step-title">Ask Employer</div>
            <div class="step-flaw">Manager pitch deck hidden as afterthought</div>
            <div class="drop-badge">📉 Lost B2B Budget</div>
          </div>
        </div>
      </div>

      <!-- Core Problems Grid -->
      <div class="section-title-wrap" style="margin-top: 0.5rem;">
        <h3>Core Behavioral &amp; UX Breakdown</h3>
        <p>Why prospective students abandon before ever clicking 'Enroll Now'.</p>
      </div>

      <div class="core-problems-grid">
        ${globalCritique.coreProblems.map(p => `
          <div class="problem-card">
            <div class="problem-header">
              <span class="problem-icon">${p.icon}</span>
              <h4>${p.headline}</h4>
            </div>
            <div class="problem-body">${p.explanation}</div>
            <div class="impact-strip">⚠️ Revenue Impact: ${p.businessImpact}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 2. Render Page-by-Page Split Screen View
// --------------------------------------------------------------------------
function renderPageCritiqueView(page) {
  // Set default selected hotspot
  if (!selectedHotspotId && page.hotspots.length > 0) {
    selectedHotspotId = page.hotspots[0].id;
  }

  appMain.innerHTML = `
    <div class="page-critique-view">
      <!-- Left: Interactive Screenshot Panel -->
      <div class="screenshot-panel">
        <div class="panel-header-bar">
          <div class="panel-title">
            <span>📸 Live Page Screenshot</span>
            <span class="live-url-tag">${page.url}</span>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">Click any pin to inspect</span>
        </div>

        <div class="screenshot-viewport" id="screenshotViewport">
          <div class="screenshot-img-wrapper">
            <img src="${page.screenshot}" alt="${page.name}" class="screenshot-img">
            
            <!-- Hotspot Pins -->
            ${page.hotspots.map((h, idx) => `
              <div 
                class="hotspot-pin ${selectedHotspotId === h.id ? 'active' : ''}" 
                style="top: ${h.top}%; left: ${h.left}%;"
                data-hotspot="${h.id}"
                title="${h.title}"
              >
                ${idx + 1}
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Right: Detailed Critique Breakdown Panel -->
      <div class="critique-details-panel">
        <!-- Page Header Card -->
        <div class="page-header-card">
          <div class="page-badge-row">
            <span class="page-num-pill">PAGE ${page.num} OF 07</span>
          </div>
          <h2>${page.name}</h2>
          <p class="page-summary-text">${page.executiveSummary}</p>
        </div>

        <!-- Hotspot Cards List -->
        <div class="hotspots-list">
          ${page.hotspots.map((h, idx) => `
            <div 
              class="hotspot-card ${selectedHotspotId === h.id ? 'selected' : ''}" 
              id="card-${h.id}"
              data-hotspot="${h.id}"
            >
              <div class="hotspot-card-header">
                <div class="card-pin-num">${idx + 1}</div>
                <h4>${h.title}</h4>
              </div>

              <div class="hotspot-details-grid">
                <div class="detail-block">
                  <span class="detail-lbl red">🚨 What is Wrong:</span>
                  <p class="detail-val">${h.whatIsWrong}</p>
                </div>

                <div class="detail-block">
                  <span class="detail-lbl amber">📉 Why Users Bounce:</span>
                  <p class="detail-val">${h.whyUsersBounce}</p>
                </div>

                <div class="detail-block solution-box">
                  <span class="detail-lbl green">✨ The High-Converting 2026 Fix:</span>
                  <p class="detail-val">${h.theFix}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Attach Hotspot Click Listeners
  const pins = document.querySelectorAll('.hotspot-pin');
  const cards = document.querySelectorAll('.hotspot-card');

  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      const hid = pin.dataset.hotspot;
      selectHotspot(hid);
    });
  });

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const hid = card.dataset.hotspot;
      selectHotspot(hid);
    });
  });
}

function selectHotspot(hid) {
  selectedHotspotId = hid;

  // Update Pin Classes
  document.querySelectorAll('.hotspot-pin').forEach(pin => {
    pin.classList.toggle('active', pin.dataset.hotspot === hid);
  });

  // Update Card Classes
  document.querySelectorAll('.hotspot-card').forEach(card => {
    const isSelected = card.dataset.hotspot === hid;
    card.classList.toggle('selected', isSelected);
    if (isSelected) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // Scroll Screenshot Viewport to Pin
  const activePin = document.querySelector(`.hotspot-pin[data-hotspot="${hid}"]`);
  const viewport = document.getElementById('screenshotViewport');
  if (activePin && viewport) {
    const pinTop = activePin.offsetTop;
    viewport.scrollTo({
      top: pinTop - viewport.clientHeight / 2,
      behavior: 'smooth'
    });
  }
}

// --------------------------------------------------------------------------
// 3. Render Consolidation Blueprint View
// --------------------------------------------------------------------------
function renderSolutionView() {
  const { headline, hubs } = globalCritique.consolidationBlueprint;

  appMain.innerHTML = `
    <div class="solution-view">
      <div class="solution-hero-card">
        <h2>${headline}</h2>
        <p>Eliminate decision fatigue by consolidating 7 fragmented silos into 3 focused, high-converting experience hubs.</p>
      </div>

      <div class="hubs-grid">
        ${hubs.map(hub => `
          <div class="hub-card">
            <span class="hub-tag">${hub.tag}</span>
            <h3>${hub.name}</h3>
            <div class="hub-replaces">🔄 Replaces: ${hub.replaces}</div>
            <div class="hub-desc">${hub.howItWorks}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Start App
initApp();
