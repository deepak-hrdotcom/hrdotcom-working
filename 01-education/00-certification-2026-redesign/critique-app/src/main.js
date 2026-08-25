// HR.com Certification Redesign 2026 — Master Controller
// Supports 3 Worlds: 1. Critique Audit | 2. Low-Fi Wireframe Prototype (1:3 Split) | 3. Hi-Fi Prototype (Coming Soon)

import { globalCritique, pagesCritique } from './data/critique-data.js';
import { lowFiHubs } from './data/lowfi-data.js';

// Application State
let currentMode = 'lowfi'; // 'critique' | 'lowfi' | 'hifi'
let currentCritiqueTab = 'crisis'; // 'crisis' | 'page-1'..'page-7' | 'solution'
let selectedHotspotId = null;
let currentLowFiHubId = 'hub-1'; // 'hub-1' | 'hub-2' | 'hub-3'
let selectedExperienceChip = 'exp-1'; // 'exp-0' | 'exp-1' | 'exp-4'
let teamMemberCount = 10;

// DOM Elements
const pageNavBar = document.getElementById('pageNavBar');
const appMain = document.getElementById('appMain');
const worldCritiqueBtn = document.getElementById('worldCritiqueBtn');
const worldLowFiBtn = document.getElementById('worldLowFiBtn');

// Initialize Application
function initApp() {
  setupWorldSwitcher();
  renderApp();
}

// --------------------------------------------------------------------------
// 1. World Mode Switcher Controller
// --------------------------------------------------------------------------
function setupWorldSwitcher() {
  worldCritiqueBtn.addEventListener('click', () => {
    currentMode = 'critique';
    updateWorldBtnStates();
    renderApp();
  });

  worldLowFiBtn.addEventListener('click', () => {
    currentMode = 'lowfi';
    updateWorldBtnStates();
    renderApp();
  });
}

function updateWorldBtnStates() {
  worldCritiqueBtn.classList.toggle('active', currentMode === 'critique');
  worldLowFiBtn.classList.toggle('active', currentMode === 'lowfi');
}

function renderApp() {
  renderSubNavBar();
  if (currentMode === 'critique') {
    renderCritiqueWorld();
  } else if (currentMode === 'lowfi') {
    renderLowFiWorld();
  }
}

// --------------------------------------------------------------------------
// 2. Sub-Navigation Bar
// --------------------------------------------------------------------------
function renderSubNavBar() {
  if (currentMode === 'critique') {
    pageNavBar.style.display = 'flex';
    let navHtml = `
      <button class="nav-btn crisis-btn ${currentCritiqueTab === 'crisis' ? 'active' : ''}" data-tab="crisis">
        <span>🚨</span>
        <span>The 7-Page Problem</span>
      </button>
    `;

    pagesCritique.forEach(page => {
      navHtml += `
        <button class="nav-btn ${currentCritiqueTab === page.id ? 'active' : ''}" data-tab="${page.id}">
          <span class="nav-num">${page.num}</span>
          <span>${page.name}</span>
        </button>
      `;
    });

    navHtml += `
      <button class="nav-btn solution-btn ${currentCritiqueTab === 'solution' ? 'active' : ''}" data-tab="solution">
        <span>✨</span>
        <span>The 3-Page Solution</span>
      </button>
    `;

    pageNavBar.innerHTML = navHtml;

    pageNavBar.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCritiqueTab = btn.dataset.tab;
        selectedHotspotId = null;
        renderSubNavBar();
        renderCritiqueWorld();
      });
    });
  } else if (currentMode === 'lowfi') {
    // In Low-Fi Prototype mode, navigation is directly inside the wireframe prototype canvas!
    pageNavBar.style.display = 'none';
  }
}


// --------------------------------------------------------------------------
// 3. World 1: Executive Critique View Renderer
// --------------------------------------------------------------------------
function renderCritiqueWorld() {
  if (currentCritiqueTab === 'crisis') {
    renderCrisisView();
  } else if (currentCritiqueTab === 'solution') {
    renderSolutionView();
  } else {
    const pageData = pagesCritique.find(p => p.id === currentCritiqueTab);
    if (pageData) {
      renderPageCritiqueView(pageData);
    }
  }
}

function renderCrisisView() {
  appMain.innerHTML = `
    <div class="crisis-view">
      <!-- Hero Card -->
      <div class="crisis-hero-card">
        <div class="crisis-eyebrow">🚨 EXECUTIVE REVIEW — EDUCATION PAGES</div>
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
          <h3>How Visitors Get Lost Across 7 Pages</h3>
          <p>Every time a visitor is forced to click to a new page, many get tired and leave the site.</p>
        </div>

        <div class="funnel-flow-container">
          <div class="funnel-step-box">
            <span class="step-num">01</span>
            <div class="step-title">Understanding</div>
            <div class="step-flaw">Confusing quiz &amp; outdated graphics</div>
            <div class="drop-badge">📉 35% Leave</div>
          </div>
          <div class="funnel-arrow">→</div>

          <div class="funnel-step-box">
            <span class="step-num">02</span>
            <div class="step-title">Prep Options</div>
            <div class="step-flaw">Too many choices &amp; price confusion</div>
            <div class="drop-badge">📉 40% Give Up</div>
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
            <div class="step-flaw">49+ reviews separated from pricing</div>
            <div class="drop-badge">📉 85% Never See It</div>
          </div>
          <div class="funnel-arrow">→</div>

          <div class="funnel-step-box">
            <span class="step-num">07</span>
            <div class="step-title">Ask Employer</div>
            <div class="step-flaw">Boss request guide hidden at the end</div>
            <div class="drop-badge">📉 Missed Boss Funding</div>
          </div>
        </div>
      </div>

      <!-- Core Problems Grid -->
      <div class="section-title-wrap" style="margin-top: 0.5rem;">
        <h3>Key Reasons Why People Leave</h3>
        <p>Why interested candidates give up before clicking 'Enroll Now'.</p>
      </div>

      <div class="core-problems-grid">
        ${globalCritique.coreProblems.map(p => `
          <div class="problem-card">
            <div class="problem-header">
              <span class="problem-icon">${p.icon}</span>
              <h4>${p.headline}</h4>
            </div>
            <div class="problem-body">${p.explanation}</div>
            <div class="impact-strip">⚠️ Business Impact: ${p.businessImpact}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderPageCritiqueView(page) {
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
        <div class="page-header-card">
          <div class="page-badge-row">
            <span class="page-num-pill">PAGE ${page.num} OF 07</span>
          </div>
          <h2>${page.name}</h2>
          <p class="page-summary-text">${page.executiveSummary}</p>
        </div>

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
                  <span class="detail-lbl amber">📉 Why People Leave:</span>
                  <p class="detail-val">${h.whyUsersBounce}</p>
                </div>

                <div class="detail-block solution-box">
                  <span class="detail-lbl green">✨ The Simple 2026 Fix:</span>
                  <p class="detail-val">${h.theFix}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  const pins = document.querySelectorAll('.hotspot-pin');
  const cards = document.querySelectorAll('.hotspot-card');

  pins.forEach(pin => {
    pin.addEventListener('click', () => selectHotspot(pin.dataset.hotspot));
  });

  cards.forEach(card => {
    card.addEventListener('click', () => selectHotspot(card.dataset.hotspot));
  });
}

function selectHotspot(hid) {
  selectedHotspotId = hid;

  document.querySelectorAll('.hotspot-pin').forEach(pin => {
    pin.classList.toggle('active', pin.dataset.hotspot === hid);
  });

  document.querySelectorAll('.hotspot-card').forEach(card => {
    const isSelected = card.dataset.hotspot === hid;
    card.classList.toggle('selected', isSelected);
    if (isSelected) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  const activePin = document.querySelector(`.hotspot-pin[data-hotspot="${hid}"]`);
  const viewport = document.getElementById('screenshotViewport');
  if (activePin && viewport) {
    viewport.scrollTo({
      top: activePin.offsetTop - viewport.clientHeight / 2,
      behavior: 'smooth'
    });
  }
}

function renderSolutionView() {
  const { headline, hubs } = globalCritique.consolidationBlueprint;

  appMain.innerHTML = `
    <div class="solution-view">
      <div class="solution-hero-card">
        <h2>${headline}</h2>
        <p>Stop confusing visitors with too many separate links. Combine everything into 3 clear, easy-to-use pages designed for specific types of learners.</p>
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

// --------------------------------------------------------------------------
// 4. World 2: Low-Fi Grayscale Wireframe Prototype Renderer (1:3 Split)
// --------------------------------------------------------------------------
function renderLowFiWorld() {
  const hub = lowFiHubs.find(h => h.id === currentLowFiHubId) || lowFiHubs[0];

  appMain.innerHTML = `
    <div class="lowfi-container">
      <!-- Minimalist 1-Line Meta Strip -->
      <div class="lowfi-meta-strip">
        <div class="meta-left">
          <span class="meta-pill">PAGE ${hub.num}</span>
          <span class="meta-title">${hub.name}</span>
          <span class="meta-divider">|</span>
          <span class="meta-audience">👤 ${hub.targetAudience}</span>
        </div>
        <div class="meta-right">
          <span class="meta-replaces">⚡ ${hub.replaces}</span>
        </div>
      </div>

      <!-- 1:3 Split Layout -->
      <div class="lowfi-split-layout">
        <!-- Left Panel: 1 Part (~28%) Sleek Dark Behavioral Strategy Console -->
        <aside class="lowfi-left-panel">
          <div class="lowfi-panel-title">
            <h3>🧠 Why It Is Built This Way</h3>
            <p>Behavioral psychology &amp; conversion architecture solving previous traffic drop-offs.</p>
          </div>

          <div class="lowfi-explanations-list">
            ${hub.sections.map((sec, idx) => `
              <div class="lowfi-expl-card" data-section-target="${sec.id}">
                <h4 class="lowfi-expl-section-title">${sec.name}</h4>

                <div class="lowfi-expl-block">
                  <span class="lowfi-expl-lbl">Why it works:</span>
                  <p class="lowfi-expl-val">${sec.psychology.whyItWorks}</p>
                </div>

                <div class="lowfi-expl-block lowfi-expl-fix">
                  <span class="lowfi-expl-lbl">Conversion problem it solves:</span>
                  <p class="lowfi-expl-val">${sec.psychology.conversionFix}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </aside>

        <!-- Right Panel: 3 Parts (~72%) The Interactive Grayscale Low-Fi Wireframe -->
        <div class="lowfi-canvas" id="lowFiCanvas">
          ${renderHubWireframe(hub)}
        </div>
      </div>
    </div>
  `;

  // Attach Interactive Listeners for Low-Fi Wireframe
  attachLowFiInteractivity(hub);
}

// --------------------------------------------------------------------------
// 5. Wireframe HTML Generation per Hub
// --------------------------------------------------------------------------
function renderPrototypeNavBar(activeHubId) {
  return `
    <header class="wire-proto-nav-header">
      <!-- Utility Bar -->
      <div class="wire-proto-top-bar">
        <div class="wire-proto-top-left">
          <span>📞 Speak with an Exam Advisor: <strong>1-877-472-6648</strong></span>
          <span class="wire-proto-dot">•</span>
          <span>🛡️ 100% Pass Assurance Guarantee Included</span>
        </div>
        <div class="wire-proto-top-right">
          <span>Official HRCI &amp; SHRM Approved Provider</span>
        </div>
      </div>

      <!-- Main Navigation Bar -->
      <div class="wire-proto-main-bar">
        <div class="wire-proto-brand">
          <span class="wire-proto-brand-title">HR Education &amp; Certification</span>
        </div>

        <!-- 3 Core Integrated Pages Navigation -->
        <nav class="wire-proto-tabs-nav">
          <button class="wire-proto-tab ${activeHubId === 'hub-1' ? 'active' : ''}" data-nav-hub="hub-1">
            <span class="wire-tab-name">Certification Prep</span>
          </button>

          <button class="wire-proto-tab ${activeHubId === 'hub-2' ? 'active' : ''}" data-nav-hub="hub-2">
            <span class="wire-tab-name">Employer Funding &amp; Teams</span>
          </button>

          <button class="wire-proto-tab ${activeHubId === 'hub-3' ? 'active' : ''}" data-nav-hub="hub-3">
            <span class="wire-tab-name">Recertification Credits</span>
          </button>
        </nav>

        <div class="wire-proto-actions">
          <button class="wire-btn-compact primary">Enroll Now →</button>
        </div>
      </div>
    </header>
  `;
}

function renderHubWireframe(hub) {
  if (hub.id === 'hub-1') {
    return renderHub1Wireframe(hub);
  } else if (hub.id === 'hub-2') {
    return renderHub2Wireframe(hub);
  } else if (hub.id === 'hub-3') {
    return renderHub3Wireframe(hub);
  }
  return '';
}

// HUB 1 WIREFRAME: Master Certification Hub
function renderHub1Wireframe(hub) {
  const s1 = hub.sections[0].wireframe;
  const s2 = hub.sections[1].wireframe;
  const s3 = hub.sections[2].wireframe;
  const s4 = hub.sections[3].wireframe;
  const s5 = hub.sections[4].wireframe;
  const s6 = hub.sections[5].wireframe;
  const s7 = hub.sections[6].wireframe;
  const s8 = hub.sections[7].wireframe;
  const s9 = hub.sections[8].wireframe;
  const s10 = hub.sections[9].wireframe;

  return `
    ${renderPrototypeNavBar(hub.id)}

    <!-- ============================================================
         SECTION 1: HERO — 2-Column Real-World Layout
         Left: All text content, CTAs, trust strip
         Right: Single hero image (only image on the page)
         ============================================================ -->
    <section class="wire-hero-section" id="h1-s1">
      <div class="wire-hero-left">
        <span class="wire-badge">${s1.eyebrow}</span>
        <h1 class="wire-h1">${s1.headline}</h1>
        <p class="wire-lead">${s1.subheadline}</p>

        <div class="wire-btn-row">
          <button class="wire-btn primary" id="btnScrollQuiz">${s1.ctaPills[0].label}</button>
          <button class="wire-btn secondary" id="btnScrollCatalog">${s1.ctaPills[1].label}</button>
        </div>

        <div class="wire-trust-strip">
          ${s1.trustStrip.map(t => `
            <div class="wire-trust-item">
              <div class="wire-trust-stat">${t.stat}</div>
              <div class="wire-trust-lbl">${t.label}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="wire-hero-right">
        <div class="wire-image-box wire-hero-img">
          <div class="wire-image-header">
            <span class="wire-image-icon">🖼️</span>
            <span class="wire-image-title">${s1.imagePlaceholder.title}</span>
          </div>
          <div class="wire-image-purpose">${s1.imagePlaceholder.psychology}</div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 2: 4 Core Value Pillars (Eric's Suggestion)
         ============================================================ -->
    <section class="wire-section" id="h1-s2">
      <div class="wire-section-header">
        <span class="wire-badge">${s2.badge}</span>
        <h2 class="wire-h2">${s2.title}</h2>
      </div>

      <div class="wire-pillars-grid">
        ${s2.pillars.map(p => `
          <div class="wire-pillar-card">
            <div class="wire-pillar-icon">${p.icon}</div>
            <div class="wire-pillar-metric">${p.metric}</div>
            <div class="wire-pillar-title">${p.title}</div>
            <div class="wire-pillar-desc">${p.desc}</div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- ============================================================
         SECTION 3: Important Choice #1 — 1-Click Exam Matcher
         ============================================================ -->
    <section class="wire-section wire-section-shaded" id="h1-s3">
      <div class="wire-section-header">
        <span class="wire-badge">${s3.badge}</span>
        <h2 class="wire-h2">${s3.title}</h2>
      </div>

      <div class="wire-matcher-box">
        <div class="wire-chips-row">
          ${s3.chips.map(c => `
            <div class="wire-chip ${selectedExperienceChip === c.id ? 'active' : ''}" data-exp="${c.id}">
              <div class="wire-chip-title">${c.label}</div>
              <div class="wire-chip-salary">${c.salary}</div>
              <div class="wire-chip-desc">${c.desc}</div>
            </div>
          `).join('')}
        </div>
        <div class="wire-recommendation-box" id="wireRecommendationBox">
          ${renderExperienceRecommendation(s3)}
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 4: Important Choice #2 — 3-Tier Course Catalog
         ============================================================ -->
    <section class="wire-section" id="h1-s4">
      <div class="wire-section-header">
        <span class="wire-badge">${s4.badge}</span>
        <h2 class="wire-h2">${s4.title}</h2>
        <p class="wire-lead" style="max-width: 680px;">${s4.subtitle}</p>
      </div>

      <div class="wire-pricing-grid">
        ${s4.cards.map(card => `
          <div class="wire-course-card ${card.featured ? 'featured' : ''}">
            ${card.featured ? `<div class="wire-featured-ribbon">RECOMMENDED — 93% PASS RATE</div>` : ''}
            <div class="wire-course-tier">${card.tier}</div>
            <div class="wire-course-name">${card.name}</div>
            <div class="wire-course-duration">⏱️ ${card.duration} | 📊 ${card.passRate}</div>
            <div class="wire-price-row">
              <div class="wire-price-val">${card.price}</div>
              <div class="wire-employer-note">${card.employerNote}</div>
            </div>
            <ul class="wire-features-list">
              ${card.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <div class="wire-card-guarantee">${card.guaranteeBadge}</div>
            <div class="wire-card-review">${card.reviewQuote}</div>
            <button class="wire-btn ${card.featured ? 'primary' : 'secondary'}" style="margin-top: 0.5rem; width: 100%;">
              ${card.cta}
            </button>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- ============================================================
         SECTION 5: Video Explainer (Greg's Suggestion)
         ============================================================ -->
    <section class="wire-section wire-section-shaded" id="h1-s5">
      <div class="wire-split-section" style="align-items: center;">
        <div class="wire-split-left">
          <span class="wire-badge">${s5.badge}</span>
          <h2 class="wire-h2">${s5.title}</h2>
          <p class="wire-lead">${s5.subtitle}</p>
          <div style="margin-top: 0.5rem;">
            <button class="wire-btn primary" id="btnScrollCatalog2">Compare Class Schedules →</button>
          </div>
        </div>
        <div class="wire-split-right">
          <div class="wire-video-frame">
            <div class="wire-video-play-btn">▶</div>
            <div class="wire-video-title-label">${s5.videoPlaceholder}</div>
            <span class="wire-video-duration-badge">⏱️ ${s5.videoDuration}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 6: 'Get Your Boss to Pay' Conversion Trigger
         ============================================================ -->
    <section class="wire-section" id="h1-s6">
      <div class="wire-split-section">
        <div class="wire-split-left">
          <span class="wire-badge">${s6.badge}</span>
          <h2 class="wire-h2">${s6.title}</h2>
          <p class="wire-lead">${s6.subtitle}</p>
          <button class="wire-btn primary" style="margin-top: 1rem;">${s6.cta}</button>
        </div>
        <div class="wire-split-right">
          <div class="wire-boss-grid">
            ${s6.featuresGrid.map(f => `
              <div class="wire-boss-card">
                <div class="wire-boss-icon">${f.icon}</div>
                <div class="wire-boss-title">${f.title}</div>
                <div class="wire-boss-desc">${f.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 7: Verified Student Proof & Outcomes
         ============================================================ -->
    <section class="wire-section wire-section-shaded" id="h1-s7">
      <div class="wire-section-header">
        <span class="wire-badge">${s7.badge}</span>
        <h2 class="wire-h2">${s7.title}</h2>
      </div>
      <div class="wire-proof-grid">
        ${s7.reviewCards.map(r => `
          <div class="wire-proof-card">
            <div class="wire-proof-photo-box">
              <span class="wire-proof-photo-label">📷 ${r.name.split(',')[0]}'s Photo</span>
            </div>
            <span class="wire-outcome-badge">${r.outcomeBadge}</span>
            <div class="wire-student-name">${r.name}</div>
            <div class="wire-student-role">${r.role}</div>
            <p class="wire-student-quote">${r.quote}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- ============================================================
         SECTION 8: 7-Step Certification Best Practices (Eric's Roadmap)
         ============================================================ -->
    <section class="wire-section" id="h1-s8">
      <div class="wire-section-header">
        <span class="wire-badge">${s8.badge}</span>
        <h2 class="wire-h2">${s8.title}</h2>
      </div>
      <div class="wire-roadmap-timeline">
        ${s8.steps.map(st => `
          <div class="wire-roadmap-step">
            <div class="wire-step-num">${st.num}</div>
            <div class="wire-step-title">${st.title}</div>
            <div class="wire-step-desc">${st.desc}</div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- ============================================================
         SECTION 9: Resource Center & Authority Guides (Shelley's Requirement)
         ============================================================ -->
    <section class="wire-section wire-section-shaded" id="h1-s9">
      <div class="wire-section-header">
        <span class="wire-badge">${s9.badge}</span>
        <h2 class="wire-h2">${s9.title}</h2>
        <p class="wire-lead" style="max-width: 700px;">${s9.subtitle}</p>
      </div>
      <div class="wire-resource-grid">
        ${s9.resourceCards.map(rc => `
          <div class="wire-resource-card">
            <span class="wire-resource-tag">${rc.tag}</span>
            <h3 class="wire-resource-title">${rc.title}</h3>
            <p class="wire-resource-desc">${rc.desc}</p>
            <span class="wire-resource-link">Read Free Guide ↗</span>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- ============================================================
         SECTION 10: FAQ (2-column: categories left, accordions right)
         ============================================================ -->
    <section class="wire-section" id="h1-s10">
      <div class="wire-split-section" style="align-items: flex-start;">
        <div class="wire-split-left">
          <span class="wire-badge">${s10.badge}</span>
          <h2 class="wire-h2">${s10.title}</h2>
          <div class="wire-faq-categories">
            ${s10.categories.map(cat => `<div class="wire-faq-cat">${cat}</div>`).join('')}
          </div>
          <div style="background: #f4f4f4; border: 1.5px solid #d1d5db; border-radius: 6px; padding: 1rem; margin-top: 1rem;">
            <div style="font-weight: 800; font-size: 0.9rem; color: #000;">💬 Have questions?</div>
            <div style="font-size: 0.8rem; color: #4b5563; margin-top: 0.25rem;">Call our lead instructors directly at <strong>1-877-472-6648</strong> (Mon–Fri 8am–7pm ET).</div>
          </div>
        </div>
        <div class="wire-split-right">
          <div class="wire-faq-container">
            ${s10.sampleFaqs.map(faq => `
              <div class="wire-faq-item">
                <div class="wire-faq-q">
                  <span>${faq.q}</span>
                  <span>▾</span>
                </div>
                <div class="wire-faq-a">${faq.a}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    ${renderPrototypeFooter()}
  `;
}


// --------------------------------------------------------------------------
// Shared Prototype Footer — consistent across all 3 pages
// --------------------------------------------------------------------------
function renderPrototypeFooter() {
  return `
    <footer class="wire-proto-footer">

      <!-- Row 1: Advisor CTA — converts last-minute hesitators -->
      <div class="wire-footer-cta-row">
        <div class="wire-footer-cta-left">
          <div class="wire-footer-cta-headline">
            Still thinking? Talk to a real HR instructor — not a chatbot.
          </div>
          <div class="wire-footer-cta-sub">
            📞 <strong>1-877-472-6648</strong> &nbsp;•&nbsp; Mon–Fri 8am–7pm ET
          </div>
        </div>
        <div class="wire-footer-cta-btns">
          <button class="wire-btn primary">📅 Book Free 15-Min Advisor Call</button>
          <button class="wire-btn secondary">🎓 Enroll in 2026 Cohort →</button>
        </div>
      </div>

      <!-- Row 2: Provider Seals Strip -->
      <div class="wire-footer-seals-row">
        <div class="wire-footer-seal">[ HRCI APPROVED PROVIDER SEAL ]</div>
        <div class="wire-footer-seal">[ SHRM RECERTIFICATION PROVIDER SEAL ]</div>
        <div class="wire-footer-seal">⭐⭐⭐⭐⭐ 4.9 / 5 &nbsp;|&nbsp; 49+ Verified Reviews</div>
        <div class="wire-footer-seal">✅ 10,000+ HR Professionals Certified Since 2012</div>
        <div class="wire-footer-seal">🛡️ 100% Money-Back Pass Assurance</div>
      </div>

      <!-- Row 3: Cross-Page Nav -->
      <nav class="wire-footer-nav-row">
        <div class="wire-footer-nav-label">EXPLORE:</div>
        <a class="wire-footer-nav-link" href="#">Certification Prep (aPHR, PHR, SPHR, SHRM-CP)</a>
        <span class="wire-footer-nav-sep">|</span>
        <a class="wire-footer-nav-link" href="#">Employer Funding &amp; Team Training</a>
        <span class="wire-footer-nav-sep">|</span>
        <a class="wire-footer-nav-link" href="#">HR Recertification &amp; Credits</a>
      </nav>

      <!-- Row 4: Legal Trademark Disclaimer -->
      <div class="wire-footer-legal">
        © 2026 HR.com. All rights reserved. Official HRCI &amp; SHRM Approved Provider.
        PHR®, SPHR®, aPHR®, PHRi®, SPHRi® are registered trademarks of HRCI.
        SHRM-CP® and SHRM-SCP® are registered trademarks of SHRM.
        HR.com is not affiliated with, endorsed by, or in partnership with HRCI or SHRM.
      </div>

    </footer>
  `;
}

function renderExperienceRecommendation(s2) {
  const chip = s2.chips.find(c => c.id === selectedExperienceChip) || s2.chips[1];
  return `
    <div class="wire-rec-header">✨ Recommendation: ${chip.match}</div>
    <div class="wire-rec-summary">${chip.desc}</div>
    <div class="wire-rec-stats">Estimated Salary Acceleration: <strong>${chip.salary}</strong> | 100% Pass Assurance Eligible</div>
  `;
}

// HUB 2 WIREFRAME: Employer Funding & Team Training Hub
function renderHub2Wireframe(hub) {
  const s1 = hub.sections[0].wireframe;
  const s2 = hub.sections[1].wireframe;
  const s3 = hub.sections[2].wireframe;
  const s4 = hub.sections[3].wireframe;

  return `
    ${renderPrototypeNavBar(hub.id)}

    <!-- ============================================================
         PAGE 02 HERO — 2-Column Real-World Layout
         Left: Audience toggle + headline + subhead
         Right: Single hero image (only image on the page)
         ============================================================ -->
    <section class="wire-hero-section" id="h2-s1">
      <div class="wire-hero-left">
        <span class="wire-badge">${s1.eyebrow}</span>
        <h1 class="wire-h1">${s1.headline}</h1>
        <p class="wire-lead">${s1.subheadline}</p>

        <div class="wire-audience-toggle">
          <div class="wire-toggle-label">Who are you?</div>
          <div class="wire-btn-row">
            <button class="wire-btn primary">${s1.toggleChips[0].label}</button>
            <button class="wire-btn secondary">${s1.toggleChips[1].label}</button>
          </div>
        </div>
      </div>

      <div class="wire-hero-right">
        <div class="wire-image-box wire-hero-img">
          <div class="wire-image-header">
            <span class="wire-image-icon">🖼️</span>
            <span class="wire-image-title">${s1.imagePlaceholder.title}</span>
          </div>
          <div class="wire-image-purpose">${s1.imagePlaceholder.psychology}</div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 2: Team Calculator (full-width interactive tool)
         ============================================================ -->
    <section class="wire-section wire-section-shaded" id="h2-s2">
      <div class="wire-split-section" style="align-items: flex-start;">
        <div class="wire-split-left">
          <span class="wire-badge">${s2.badge}</span>
          <h2 class="wire-h2">${s2.title}</h2>
          <p class="wire-lead">Drag the slider to instantly see your team's volume discount and total savings.</p>
          <div class="wire-calc-results" id="calcResultsBox" style="margin-top: 1.5rem;">
            ${renderCalculatorResults(teamMemberCount)}
          </div>
        </div>
        <div class="wire-split-right">
          <div class="wire-calc-box">
            <div class="wire-slider-wrap">
              <label style="font-weight: 700; font-size: 0.9rem;">Select Number of Team Members to Enroll:</label>
              <div class="wire-slider-row">
                <input type="range" min="3" max="50" value="${teamMemberCount}" class="wire-slider" id="teamMemberSlider">
                <span class="wire-slider-val-badge" id="sliderValDisplay">${teamMemberCount} Members</span>
              </div>
            </div>
            <div style="background: #f0f0f0; padding: 0.75rem; border-radius: 6px; font-size: 0.8rem; color: #222; margin-top: 1rem;">
              ${s2.includedBonus}
            </div>
            <button class="wire-btn primary" style="align-self: flex-start; margin-top: 1rem;">${s2.cta}</button>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 3: CFO Business Case (3 stat cards, full-width)
         ============================================================ -->
    <section class="wire-section" id="h2-s3">
      <div class="wire-section-header">
        <span class="wire-badge">${s3.badge}</span>
        <h2 class="wire-h2">${s3.title}</h2>
      </div>
      <div class="wire-boss-grid">
        ${s3.pillars.map(p => `
          <div class="wire-boss-card">
            <div style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 900; color: #000;">${p.metric}</div>
            <div class="wire-boss-title">${p.title}</div>
            <div class="wire-boss-desc">${p.desc}</div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- ============================================================
         SECTION 4: Boss Pitch Email (2-column: intro left, email preview right)
         ============================================================ -->
    <section class="wire-section wire-section-shaded" id="h2-s4">
      <div class="wire-split-section" style="align-items: flex-start;">
        <div class="wire-split-left">
          <span class="wire-badge">${s4.badge}</span>
          <h2 class="wire-h2">${s4.title}</h2>
          <p class="wire-lead">Most employees want to ask — they just don't know what to say. Copy this proven email and send it in 30 seconds.</p>
          <div class="wire-btn-row" style="margin-top: 1.5rem; flex-direction: column; align-items: flex-start; gap: 0.65rem;">
            <button class="wire-btn primary" id="btnCopyEmail">📋 Copy Email to Clipboard</button>
            <button class="wire-btn secondary">📥 Download 1-Page Business Case PDF</button>
          </div>
        </div>
        <div class="wire-split-right">
          <div style="background: #f8f8f8; border: 2px solid #222; border-radius: 8px; padding: 1.5rem; font-family: monospace; font-size: 0.82rem; white-space: pre-wrap; line-height: 1.7;" id="emailTemplateContent">
${s4.emailPreviewBox.subject}

${s4.emailPreviewBox.bodyPreview}
          </div>
        </div>
      </div>
    </section>

    ${renderPrototypeFooter()}
  `;
}

function renderCalculatorResults(count) {
  let discountPct = 0.15;
  if (count >= 20) discountPct = 0.35;
  else if (count >= 10) discountPct = 0.25;

  const basePrice = 1065;
  const regularTotal = count * basePrice;
  const savings = Math.round(regularTotal * discountPct);
  const finalTotal = regularTotal - savings;
  const perSeat = Math.round(finalTotal / count);

  return `
    <div>
      <div class="wire-calc-res-lbl">Regular Price</div>
      <div class="wire-calc-res-val" style="text-decoration: line-through; color: #888;">$${regularTotal.toLocaleString()}</div>
    </div>
    <div>
      <div class="wire-calc-res-lbl">Volume Discount</div>
      <div class="wire-calc-res-val" style="color: #111;">${Math.round(discountPct * 100)}% OFF</div>
    </div>
    <div>
      <div class="wire-calc-res-lbl">Total Team Price</div>
      <div class="wire-calc-res-val">$${finalTotal.toLocaleString()}</div>
    </div>
    <div>
      <div class="wire-calc-res-lbl">Price Per Person</div>
      <div class="wire-calc-res-val">$${perSeat.toLocaleString()}</div>
    </div>
  `;
}

// HUB 3 WIREFRAME: HR Recertification & Credits Engine
function renderHub3Wireframe(hub) {
  const s1 = hub.sections[0].wireframe;
  const s2 = hub.sections[1].wireframe;
  const s3 = hub.sections[2].wireframe;

  return `
    ${renderPrototypeNavBar(hub.id)}

    <!-- ============================================================
         PAGE 03 HERO — 2-Column Real-World Layout
         Left: Headline + trust seals + CTA
         Right: Single hero image (only image on the page)
         ============================================================ -->
    <section class="wire-hero-section" id="h3-s1">
      <div class="wire-hero-left">
        <span class="wire-badge">${s1.eyebrow}</span>
        <h1 class="wire-h1">${s1.headline}</h1>
        <p class="wire-lead">${s1.subheadline}</p>

        <div class="wire-seal-strip">
          ${s1.trustSeals.map(seal => `
            <div class="wire-seal-badge">🛡️ ${seal}</div>
          `).join('')}
        </div>

        <button class="wire-btn primary" style="margin-top: 1.25rem;">View All Recertification Options →</button>
      </div>

      <div class="wire-hero-right">
        <div class="wire-image-box wire-hero-img">
          <div class="wire-image-header">
            <span class="wire-image-icon">🖼️</span>
            <span class="wire-image-title">${s1.imagePlaceholder.title}</span>
          </div>
          <div class="wire-image-purpose">${s1.imagePlaceholder.psychology}</div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         SECTION 2: Pricing Cards (2-column comparison)
         ============================================================ -->
    <section class="wire-section wire-section-shaded" id="h3-s2">
      <div class="wire-section-header">
        <span class="wire-badge">${s2.badge}</span>
        <h2 class="wire-h2">${s2.title}</h2>
      </div>

      <div class="wire-pricing-grid" style="grid-template-columns: 1.25fr 1fr;">
        ${s2.cards.map(card => `
          <div class="wire-course-card ${card.featured ? 'featured' : ''}">
            ${card.featured ? `<div class="wire-featured-ribbon">${card.savingsRibbon}</div>` : ''}
            <div class="wire-course-tier">${card.tier}</div>
            <div class="wire-price-row">
              <div class="wire-price-val">${card.price}</div>
              <div class="wire-employer-note">${card.subprice}</div>
            </div>
            <ul class="wire-features-list">
              ${card.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <button class="wire-btn ${card.featured ? 'primary' : 'secondary'}" style="margin-top: 1rem; width: 100%;">
              ${card.cta}
            </button>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- ============================================================
         SECTION 3: Credit Tracker (2-column: explanation left, tracker right)
         ============================================================ -->
    <section class="wire-section" id="h3-s3">
      <div class="wire-split-section" style="align-items: flex-start;">
        <div class="wire-split-left">
          <span class="wire-badge">${s3.badge}</span>
          <h2 class="wire-h2">${s3.title}</h2>
          <p class="wire-lead">Watch your credits fill up automatically as you attend webcasts. We handle the paperwork, you handle passing.</p>
          <div style="background: #f4f4f4; border: 1.5px solid #ccc; border-radius: 6px; padding: 0.85rem; margin-top: 1rem; font-size: 0.85rem; font-weight: 600; color: #222;">
            ${s3.guaranteeCallout}
          </div>
        </div>
        <div class="wire-split-right">
          <div class="wire-boss-box">
            <div class="wire-meters-list">
              ${s3.progressMeters.map(m => `
                <div class="wire-meter-card">
                  <div class="wire-meter-header">
                    <span>${m.label}</span>
                    <span><strong>${m.current} / ${m.max} Credits</strong> (${m.pct})</span>
                  </div>
                  <div class="wire-progress-bar-bg">
                    <div class="wire-progress-bar-fill" style="width: ${m.pct};"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    ${renderPrototypeFooter()}
  `;
}

// --------------------------------------------------------------------------
// 6. Interactive Event Handlers for Low-Fi Wireframe
// --------------------------------------------------------------------------
function attachLowFiInteractivity(hub) {
  // In-Canvas Prototype Navigation Bar Tabs
  document.querySelectorAll('.wire-proto-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      currentLowFiHubId = tab.dataset.navHub;
      renderLowFiWorld();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Left Panel card click -> Smooth scroll to section in canvas
  document.querySelectorAll('.lowfi-expl-card').forEach(card => {
    card.addEventListener('click', () => {
      const targetId = card.dataset.sectionTarget;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetEl.style.outline = '3px solid #000';
        setTimeout(() => { targetEl.style.outline = 'none'; }, 1500);
      }
    });
  });

  // Hub 1 Quiz Experience Chips
  if (hub.id === 'hub-1') {
    document.querySelectorAll('.wire-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        selectedExperienceChip = chip.dataset.exp;
        document.querySelectorAll('.wire-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const s3 = hub.sections[2].wireframe;
        const recBox = document.getElementById('wireRecommendationBox');
        if (recBox) {
          recBox.innerHTML = renderExperienceRecommendation(s3);
        }
      });
    });

    const btnScrollQuiz = document.getElementById('btnScrollQuiz');
    if (btnScrollQuiz) {
      btnScrollQuiz.addEventListener('click', () => {
        document.getElementById('h1-s3')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    const btnScrollCatalog = document.getElementById('btnScrollCatalog');
    if (btnScrollCatalog) {
      btnScrollCatalog.addEventListener('click', () => {
        document.getElementById('h1-s4')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    const btnScrollCatalog2 = document.getElementById('btnScrollCatalog2');
    if (btnScrollCatalog2) {
      btnScrollCatalog2.addEventListener('click', () => {
        document.getElementById('h1-s4')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  // Hub 2 Calculator Slider
  if (hub.id === 'hub-2') {
    const slider = document.getElementById('teamMemberSlider');
    const display = document.getElementById('sliderValDisplay');
    const resultsBox = document.getElementById('calcResultsBox');

    if (slider && display && resultsBox) {
      slider.addEventListener('input', (e) => {
        teamMemberCount = parseInt(e.target.value, 10);
        display.textContent = `${teamMemberCount} Members`;
        resultsBox.innerHTML = renderCalculatorResults(teamMemberCount);
      });
    }

    const btnCopyEmail = document.getElementById('btnCopyEmail');
    if (btnCopyEmail) {
      btnCopyEmail.addEventListener('click', () => {
        const text = document.getElementById('emailTemplateContent')?.innerText;
        if (text) {
          navigator.clipboard.writeText(text).then(() => {
            btnCopyEmail.textContent = '✅ Copied to Clipboard!';
            setTimeout(() => {
              btnCopyEmail.textContent = '📋 Copy Pre-Written Email';
            }, 2000);
          });
        }
      });
    }
  }
}

// Start Application
initApp();
