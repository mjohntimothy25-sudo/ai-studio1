/**
 * ==========================================================================
 * AI MODEL HUB & JOHN AI STUDIO - PLATFORM ENGINE
 * ==========================================================================
 * High-performance Vanilla JavaScript implementation powering AI Models,
 * RAG Playground, AI Agents, Architectures, Computer Vision, Speech AI,
 * Prompt Engineering Masterclass, Model Selection Wizard, 12 Real-World
 * Projects, Learning Roadmap, 5 Interactive Lab Models, Quiz, and Voice Assistant.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Systems & Navigation
  CoreSystem.init();

  // Initialize AI Model Hub Features
  AIModelExplorerModule.init();
  ImportantModelsModule.init();
  RAGPlaygroundModule.init();
  AIArchitecturesModule.init();
  AIAgentsModule.init();
  PromptEngineeringModule.init();
  ComputerVisionModule.init();
  SpeechAIModule.init();
  ModelComparisonModule.init();
  ModelWizardModule.init();
  RealWorldProjectsModule.init();
  LearningRoadmapModule.init();

  // Initialize Interactive Lab Models (01 - 05)
  LLMPredictorModule.init();
  PromptAnalyzerModule.init();
  ChatSimulatorModule.init();
  Architecture3DModule.init();
  TokenEstimatorModule.init();

  // Initialize Supporting Modules
  ToolsExplorerModule.init();
  PromptLibraryModule.init();
  QuizModule.init();
  VoiceChatbotModule.init();
});

/* ==========================================================================
   0. CORE SYSTEM (Dark Mode Lock, Dropdown Menu, Nav, Toasts, Modals)
   ========================================================================== */
const CoreSystem = (() => {
  const completedModels = new Set(JSON.parse(localStorage.getItem('ai_lab_completed') || '[]'));

  function init() {
    // Lock dark theme permanently
    document.documentElement.setAttribute('data-theme', 'dark');

    setupDropdownMenu();
    setupMobileNav();
    setupScrollProgress();
    setupActiveNavHighlight();
    setupLabProgressTracker();
    setupModalHandlers();
  }

  function setupDropdownMenu() {
    const btn = document.getElementById('ai-hub-dropdown-btn');
    const dropdown = btn ? btn.closest('.nav-dropdown') : null;
    const menu = dropdown ? dropdown.querySelector('.dropdown-menu') : null;

    if (!btn || !dropdown || !menu) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      if (isOpen) {
        dropdown.classList.remove('open');
        menu.classList.remove('show');
      } else {
        dropdown.classList.add('open');
        menu.classList.add('show');
      }
    });

    menu.querySelectorAll('.dropdown-link').forEach(link => {
      link.addEventListener('click', () => {
        dropdown.classList.remove('open');
        menu.classList.remove('show');
      });
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        menu.classList.remove('show');
      }
    });
  }

  function setupMobileNav() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('.nav-item, .dropdown-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function setupScrollProgress() {
    const progressBar = document.getElementById('reading-progress');
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      if (progressBar) progressBar.style.width = `${scrolled}%`;
    });
  }

  function setupActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
      let current = '';
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
          item.classList.add('active');
        }
      });
    });
  }

  function setupLabProgressTracker() {
    updateTrackerUI();

    document.querySelectorAll('.completion-btn').forEach(btn => {
      const targetId = btn.getAttribute('data-target');
      if (completedModels.has(targetId)) {
        btn.classList.add('completed');
        btn.querySelector('.comp-text').textContent = 'Completed!';
      }

      btn.addEventListener('click', () => {
        if (completedModels.has(targetId)) {
          completedModels.delete(targetId);
          btn.classList.remove('completed');
          btn.querySelector('.comp-text').textContent = 'Mark Completed';
          showToast('Model status updated', 'ℹ️');
        } else {
          completedModels.add(targetId);
          btn.classList.add('completed');
          btn.querySelector('.comp-text').textContent = 'Completed!';
          showToast('Lab model marked completed!', '🎉');
        }
        localStorage.setItem('ai_lab_completed', JSON.stringify([...completedModels]));
        updateTrackerUI();
      });
    });
  }

  function updateTrackerUI() {
    const total = 5;
    const count = completedModels.size;
    const pct = Math.round((count / total) * 100);

    const countText = document.getElementById('lab-completed-text');
    const fill = document.getElementById('lab-progress-fill');
    const navCount = document.getElementById('nav-lab-count');
    const ringCircle = document.getElementById('global-progress-circle');
    const ringText = document.getElementById('global-progress-text');

    if (countText) countText.textContent = `${count} of ${total} Models Completed`;
    if (fill) fill.style.width = `${pct}%`;
    if (navCount) navCount.textContent = `${count}/${total}`;
    if (ringText) ringText.textContent = `${pct}%`;

    if (ringCircle) {
      const radius = 14;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (pct / 100) * circumference;
      ringCircle.style.strokeDasharray = `${circumference} ${circumference}`;
      ringCircle.style.strokeDashoffset = offset;
    }
  }

  function setupModalHandlers() {
    const modelModal = document.getElementById('model-detail-modal');
    const projectModal = document.getElementById('project-detail-modal');

    document.getElementById('modal-close-btn')?.addEventListener('click', () => modelModal?.classList.add('hidden'));
    document.getElementById('model-modal-backdrop')?.addEventListener('click', () => modelModal?.classList.add('hidden'));

    document.getElementById('project-modal-close-btn')?.addEventListener('click', () => projectModal?.classList.add('hidden'));
    document.getElementById('project-modal-backdrop')?.addEventListener('click', () => projectModal?.classList.add('hidden'));
  }

  function showToast(message, icon = '✨') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-notification glass-panel';
    toast.innerHTML = `<span class="toast-icon">${icon}</span> <span class="toast-msg">${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  return { init, showToast };
})();

/* ==========================================================================
   1. AI MODEL EXPLORER MODULE (20 CATEGORIES & 100+ MODELS)
   ========================================================================== */
const AIModelExplorerModule = (() => {
  let activeCategory = 'all';

  function init() {
    renderCategoryPills();
    renderModelsGrid();
    setupEventListeners();
  }

  function renderCategoryPills() {
    const container = document.getElementById('category-pills');
    if (!container || typeof AI_MODEL_CATEGORIES === 'undefined') return;

    container.innerHTML = AI_MODEL_CATEGORIES.map(cat => `
      <button class="cat-pill ${cat.id === activeCategory ? 'active' : ''}" data-cat="${cat.id}">
        <span>${cat.icon}</span> ${cat.name}
      </button>
    `).join('');

    container.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        container.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.getAttribute('data-cat');
        renderModelsGrid();
      });
    });
  }

  function renderModelsGrid() {
    const grid = document.getElementById('models-grid');
    if (!grid || typeof AI_MODELS_DATA === 'undefined') return;

    const query = document.getElementById('model-search-input')?.value.toLowerCase().trim() || '';
    const availabilityFilter = document.getElementById('filter-availability')?.value || 'all';
    const licenseFilter = document.getElementById('filter-license')?.value || 'all';
    const difficultyFilter = document.getElementById('filter-difficulty')?.value || 'all';

    const filtered = AI_MODELS_DATA.filter(m => {
      const matchCat = activeCategory === 'all' || m.category === activeCategory;
      const matchQuery = !query || 
        m.name.toLowerCase().includes(query) || 
        m.org.toLowerCase().includes(query) || 
        m.purpose.toLowerCase().includes(query) ||
        m.uses.some(u => u.toLowerCase().includes(query));

      const matchAvail = availabilityFilter === 'all' || m.availability.includes(availabilityFilter);
      const matchLicense = licenseFilter === 'all' || m.license.includes(licenseFilter);
      const matchDiff = difficultyFilter === 'all' || m.difficulty === difficultyFilter;

      return matchCat && matchQuery && matchAvail && matchLicense && matchDiff;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="no-results glass-panel text-center padding-lg width-full">
        <h3>🔍 No AI models match your search criteria</h3>
        <p class="text-muted">Try clearing search filters or picking another category.</p>
      </div>`;
      return;
    }

    grid.innerHTML = filtered.map(m => `
      <article class="model-card glass-panel" data-id="${m.id}">
        <div>
          <div class="model-card-header">
            <h3 class="model-card-title">${m.name}</h3>
            <span class="model-cat-badge">${m.categoryName}</span>
          </div>
          <div class="model-org">By ${m.org} • <span class="diff-badge ${m.difficulty}">${m.difficulty}</span></div>
          <p class="model-purpose">${m.purpose}</p>

          <div class="model-meta-grid">
            <div class="meta-item"><label>Input:</label> <span>${m.input}</span></div>
            <div class="meta-item"><label>Output:</label> <span>${m.output}</span></div>
            <div class="meta-item"><label>License:</label> <span>${m.license}</span></div>
            <div class="meta-item"><label>Access:</label> <span>${m.availability}</span></div>
          </div>

          <div class="model-uses-row">
            ${m.uses.map(u => `<span class="use-chip">🎯 ${u}</span>`).join('')}
          </div>
        </div>

        <button class="btn btn-secondary btn-sm width-full margin-top-sm btn-view-model" data-id="${m.id}">
          🔍 View Full Specs & Uses
        </button>
      </article>
    `).join('');

    grid.querySelectorAll('.btn-view-model').forEach(btn => {
      btn.addEventListener('click', () => showModelDetailsModal(btn.getAttribute('data-id')));
    });
  }

  function setupEventListeners() {
    document.getElementById('model-search-input')?.addEventListener('input', renderModelsGrid);
    document.getElementById('filter-availability')?.addEventListener('change', renderModelsGrid);
    document.getElementById('filter-license')?.addEventListener('change', renderModelsGrid);
    document.getElementById('filter-difficulty')?.addEventListener('change', renderModelsGrid);
  }

  function showModelDetailsModal(modelId) {
    const model = AI_MODELS_DATA.find(m => m.id === modelId);
    if (!model) return;

    const modal = document.getElementById('model-detail-modal');
    const title = document.getElementById('modal-model-title');
    const body = document.getElementById('modal-model-body');

    if (title) title.textContent = `${model.name} — Technical Overview`;
    if (body) {
      body.innerHTML = `
        <div class="modal-model-detail">
          <div class="badge-pill margin-bottom-sm">Developer: ${model.org} | Category: ${model.categoryName}</div>
          <p class="margin-bottom-md">${model.purpose}</p>

          <h4>Key Strengths:</h4>
          <ul>
            ${model.strengths.map(s => `<li>✅ ${s}</li>`).join('')}
          </ul>

          <h4 class="margin-top-sm">Limitations:</h4>
          <ul>
            ${model.limitations.map(l => `<li>⚠️ ${l}</li>`).join('')}
          </ul>

          <h4 class="margin-top-sm">Best Real-World Applications:</h4>
          <div class="model-uses-row margin-top-xs">
            ${model.uses.map(u => `<span class="use-chip">⚡ ${u}</span>`).join('')}
          </div>

          <div class="model-meta-grid margin-top-md">
            <div class="meta-item"><label>Parameters:</label> <span>${model.parameters || 'Undisclosed'}</span></div>
            <div class="meta-item"><label>Speed Rating:</label> <span>${model.speed || 'Fast'}</span></div>
            <div class="meta-item"><label>Quality Score:</label> <span>${model.quality || 'High'}</span></div>
            <div class="meta-item"><label>Availability:</label> <span>${model.availability}</span></div>
          </div>
        </div>
      `;
    }

    modal?.classList.remove('hidden');
  }

  return { init, renderModelsGrid };
})();

/* ==========================================================================
   2. IMPORTANT MODELS SPOTLIGHT MODULE
   ========================================================================== */
const ImportantModelsModule = (() => {
  let activeTab = 'spotlight-llm';

  function init() {
    setupTabs();
    renderSpotlightContent();
  }

  function setupTabs() {
    const tabs = document.querySelectorAll('#spotlight-tabs .tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeTab = tab.getAttribute('data-tab');
        renderSpotlightContent();
      });
    });
  }

  function renderSpotlightContent() {
    const container = document.getElementById('spotlight-content-box');
    if (!container || typeof AI_MODELS_DATA === 'undefined') return;

    let targetCat = 'llm';
    if (activeTab === 'spotlight-embeddings') targetCat = 'embedding';
    if (activeTab === 'spotlight-vision') targetCat = 'vlm';
    if (activeTab === 'spotlight-cv') targetCat = 'object_det';
    if (activeTab === 'spotlight-speech') targetCat = 'stt';
    if (activeTab === 'spotlight-imagegen') targetCat = 'image_gen';

    const models = AI_MODELS_DATA.filter(m => m.category === targetCat || (targetCat === 'object_det' && (m.category === 'object_det' || m.category === 'segmentation')));

    container.innerHTML = `
      <div class="spotlight-grid">
        ${models.map(m => `
          <div class="spotlight-card glass-panel">
            <div class="model-org">${m.org}</div>
            <h3>${m.name}</h3>
            <p class="margin-bottom-sm">${m.purpose}</p>
            <strong>What it's useful for:</strong>
            <ul>
              ${m.uses.map(u => `<li>🎯 ${u}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `;
  }

  return { init };
})();

/* ==========================================================================
   3. RAG PLAYGROUND MODULE (SIMULATED RAG ENGINE)
   ========================================================================== */
const RAGPlaygroundModule = (() => {
  const PRESET_DATASETS = {
    university: [
      { id: 1, doc: "University_Policy_2026.pdf", text: "Section 4.2: Attendance Requirement — Students must maintain at least 75% classroom attendance to sit for final semester examinations." },
      { id: 2, doc: "University_Policy_2026.pdf", text: "Section 4.3: Medical Absence — Absence due to illness must be documented with a certified physician note submitted within 3 business days." },
      { id: 3, doc: "Exam_Regulations.pdf", text: "Section 8.1: Grading Scale — Final grades consist of 40% Continuous Assessment, 10% Quizzes, and 50% Final Written Examination." }
    ],
    medical: [
      { id: 1, doc: "Clinical_Vitals_Handbook.pdf", text: "Chapter 2: Normal Blood Pressure — Healthy adult resting blood pressure is defined as systolic below 120 mmHg and diastolic below 80 mmHg." },
      { id: 2, doc: "Triage_Protocol.pdf", text: "Emergency Response: Heart Rate Spikes — Resting pulse exceeding 100 BPM (Tachycardia) requires immediate ECG evaluation." }
    ],
    technical: [
      { id: 1, doc: "K8s_Ops_Guide.pdf", text: "Deployment Replica Scaling: HPA scales pod replicas based on average CPU utilization exceeding 80% threshold." },
      { id: 2, doc: "Database_Backup.pdf", text: "WAL Archiving: Postgres WAL logs are synced to Cloud Storage every 60 seconds to ensure sub-1-minute RPO recovery." }
    ]
  };

  let currentChunks = [...PRESET_DATASETS.university];

  function init() {
    renderChunks();
    setupEventListeners();
  }

  function renderChunks() {
    const box = document.getElementById('rag-doc-chunks-box');
    if (!box) return;

    box.innerHTML = currentChunks.map((c, idx) => `
      <div class="chunk-item" id="chunk-item-${idx}">
        <strong>📄 ${c.doc} (Chunk #${c.id})</strong>
        <p>${c.text}</p>
      </div>
    `).join('');
  }

  function setupEventListeners() {
    document.getElementById('rag-preset-select')?.addEventListener('change', (e) => {
      const val = e.target.value;
      if (PRESET_DATASETS[val]) {
        currentChunks = [...PRESET_DATASETS[val]];
        renderChunks();
      }
    });

    document.getElementById('rag-run-btn')?.addEventListener('click', runRAGSimulation);

    document.getElementById('rag-add-doc-btn')?.addEventListener('click', () => {
      const newText = prompt("Enter custom document chunk text:");
      if (newText) {
        currentChunks.push({ id: currentChunks.length + 1, doc: "Custom_Note.txt", text: newText });
        renderChunks();
      }
    });
  }

  function runRAGSimulation() {
    const query = document.getElementById('rag-query-input')?.value.trim();
    if (!query) return;

    const logBox = document.getElementById('rag-process-visualizer');
    const responseBox = document.getElementById('rag-llm-response-box');
    const citationsBox = document.getElementById('rag-citations-list');

    if (logBox) {
      logBox.innerHTML = `
        <div class="step-log-item"><span class="log-badge">QUERY</span> Intent: "${query}"</div>
        <div class="step-log-item"><span class="log-badge">EMBEDDING</span> Converted query to 1024-dim dense vector</div>
        <div class="step-log-item"><span class="log-badge">VECTOR DB</span> Cosine Similarity Search executed in ChromaDB</div>
        <div class="step-log-item"><span class="log-badge">RERANKER</span> BGE Cross-encoder scored top matching chunks</div>
      `;
    }

    const scoredChunks = currentChunks.map((c, idx) => {
      const words = query.toLowerCase().split(' ');
      let matches = 0;
      words.forEach(w => { if (c.text.toLowerCase().includes(w)) matches++; });
      const score = Math.min(0.98, 0.45 + (matches * 0.18));
      return { ...c, idx, score: score.toFixed(2) };
    }).sort((a, b) => b.score - a.score);

    document.querySelectorAll('.chunk-item').forEach(el => el.classList.remove('selected'));
    const topChunk = scoredChunks[0];
    if (topChunk) {
      document.getElementById(`chunk-item-${topChunk.idx}`)?.classList.add('selected');
    }

    setTimeout(() => {
      if (responseBox) {
        responseBox.innerHTML = `
          <div class="rag-answer-body">
            <p>Based on the official retrieved documentation, <strong>${topChunk.text}</strong> <span class="citation-tag">[${topChunk.doc}, Chunk #${topChunk.id}]</span></p>
          </div>
        `;
      }

      if (citationsBox) {
        citationsBox.innerHTML = `
          <span class="citation-tag">🔗 Source: ${topChunk.doc} (Similarity Score: ${topChunk.score})</span>
        `;
      }

      CoreSystem.showToast("RAG Retrieval & Generation pipeline completed!", "📚");
    }, 400);
  }

  return { init };
})();

/* ==========================================================================
   4. AI ARCHITECTURES MODULE
   ========================================================================== */
const AIArchitecturesModule = (() => {
  let activeArchId = 'rag';

  function init() {
    renderTabs();
    renderDisplay();
  }

  function renderTabs() {
    const container = document.getElementById('arch-selector-tabs');
    if (!container || typeof AI_ARCHITECTURES_DATA === 'undefined') return;

    container.innerHTML = AI_ARCHITECTURES_DATA.map(a => `
      <button class="tab-btn ${a.id === activeArchId ? 'active' : ''}" data-arch="${a.id}">
        ${a.name}
      </button>
    `).join('');

    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeArchId = btn.getAttribute('data-arch');
        renderDisplay();
      });
    });
  }

  function renderDisplay() {
    const card = document.getElementById('arch-display-card');
    if (!card || typeof AI_ARCHITECTURES_DATA === 'undefined') return;

    const arch = AI_ARCHITECTURES_DATA.find(a => a.id === activeArchId);
    if (!arch) return;

    card.innerHTML = `
      <div class="arch-content">
        <h3>${arch.name}</h3>
        <p class="text-muted margin-bottom-md">${arch.subtitle}</p>

        ${arch.image ? `<img src="${arch.image}" alt="${arch.name}" class="concept-image-lg">` : ''}

        <div class="flow-steps-horizontal margin-top-md">
          ${arch.flow.map(f => `
            <div class="flow-step-node">
              <span class="node-icon">${f.icon}</span>
              <strong>${f.label}</strong>
              <p class="text-sm text-muted">${f.desc}</p>
            </div>
          `).join('')}
        </div>

        <div class="info-callout margin-top-lg">
          💡 <strong>Architectural Explanation:</strong> ${arch.explanation}
        </div>
      </div>
    `;
  }

  return { init };
})();

/* ==========================================================================
   5. AI AGENTS MODULE (INTERACTIVE WORKFLOW SIMULATOR)
   ========================================================================== */
const AIAgentsModule = (() => {
  function init() {
    document.getElementById('agent-run-sim-btn')?.addEventListener('click', runAgentSimulation);
  }

  function runAgentSimulation() {
    const steps = document.querySelectorAll('#agent-sim-steps-box .agent-step-item');
    if (!steps.length) return;

    steps.forEach(s => {
      s.className = 'agent-step-item idle';
    });

    let currentStep = 0;
    CoreSystem.showToast("Autonomous Agent initialized loop...", "🤖");

    const interval = setInterval(() => {
      if (currentStep > 0) {
        steps[currentStep - 1].className = 'agent-step-item completed';
      }

      if (currentStep < steps.length) {
        steps[currentStep].className = 'agent-step-item active';
        currentStep++;
      } else {
        clearInterval(interval);
        CoreSystem.showToast("Agent goal achieved successfully!", "🎉");
      }
    }, 700);
  }

  return { init };
})();

/* ==========================================================================
   6. PROMPT ENGINEERING MASTERCLASS MODULE
   ========================================================================== */
const PromptEngineeringModule = (() => {
  let activeTechId = 'system-persona';

  function init() {
    renderTabs();
    renderWorkbench();
  }

  function renderTabs() {
    const container = document.getElementById('technique-tabs');
    if (!container || typeof PROMPT_TECHNIQUES_DATA === 'undefined') return;

    container.innerHTML = PROMPT_TECHNIQUES_DATA.map(t => `
      <button class="tab-btn ${t.id === activeTechId ? 'active' : ''}" data-tech="${t.id}">
        ${t.title}
      </button>
    `).join('');

    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTechId = btn.getAttribute('data-tech');
        renderWorkbench();
      });
    });
  }

  function renderWorkbench() {
    const box = document.getElementById('technique-workbench');
    if (!box || typeof PROMPT_TECHNIQUES_DATA === 'undefined') return;

    const tech = PROMPT_TECHNIQUES_DATA.find(t => t.id === activeTechId);
    if (!tech) return;

    box.innerHTML = `
      <div class="tech-card glass-panel padding-lg">
        <h4>${tech.title}</h4>
        <p class="text-muted margin-bottom-md">${tech.desc}</p>

        <div class="margin-bottom-sm">
          <label><strong>System Instruction Persona:</strong></label>
          <pre class="prompt-text-box">${tech.systemPrompt}</pre>
        </div>

        <div class="margin-bottom-sm">
          <label><strong>User Input Prompt:</strong></label>
          <pre class="prompt-text-box">${tech.userPrompt}</pre>
        </div>

        <div class="info-callout margin-top-md">
          💡 <strong>Why this technique works:</strong> ${tech.whyItWorks}
        </div>
      </div>
    `;
  }

  return { init };
})();

/* ==========================================================================
   7. COMPUTER VISION MODULE
   ========================================================================== */
const ComputerVisionModule = (() => {
  function init() {
    const btns = document.querySelectorAll('.cv-btn');
    const info = document.getElementById('cv-task-info');
    const overlay = document.getElementById('cv-overlay-element');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const task = btn.getAttribute('data-task');
        if (task === 'det') {
          if (info) info.textContent = "Showing simulated bounding boxes generated by YOLOv8-x (Confidence: 98.4%).";
          if (overlay) overlay.innerHTML = `<div style="border:2px solid #38bdf8; position:absolute; top:20%; left:30%; width:40%; height:50%; border-radius:4px;"><span style="background:#38bdf8; color:#000; font-weight:700; font-size:0.7rem; padding:2px 4px;">Person 98%</span></div>`;
        } else if (task === 'seg') {
          if (info) info.textContent = "Showing pixel-level instance segmentation mask generated by SAM 2.";
          if (overlay) overlay.innerHTML = `<div style="background:rgba(168,85,247,0.4); border:2px dashed #a855f7; position:absolute; top:20%; left:30%; width:40%; height:50%; border-radius:50%;"></div>`;
        } else if (task === 'pose') {
          if (info) info.textContent = "Showing 17 human keypoint skeleton tracking by YOLOv8-pose.";
          if (overlay) overlay.innerHTML = `<div style="color:#10b981; position:absolute; top:30%; left:48%; font-size:1.5rem;">🔴---🔴---🔴</div>`;
        } else if (task === 'ocr') {
          if (info) info.textContent = "Showing OCR text bounding boxes generated by GOT-OCR 2.0.";
          if (overlay) overlay.innerHTML = `<div style="border:1px solid #f59e0b; background:rgba(245,158,11,0.2); position:absolute; top:40%; left:25%; width:50%; height:20%; color:#fff; font-size:0.8rem; padding:4px;">Extracted Text: "INVOICE #9201"</div>`;
        }
      });
    });
  }

  return { init };
})();

/* ==========================================================================
   8. SPEECH AI MODULE
   ========================================================================== */
const SpeechAIModule = (() => {
  function init() {}
  return { init };
})();

/* ==========================================================================
   9. MODEL COMPARISON MODULE
   ========================================================================== */
const ModelComparisonModule = (() => {
  function init() {
    renderTable();
    setupEventListeners();
  }

  function renderTable() {
    const tbody = document.getElementById('comparison-tbody');
    if (!tbody || typeof AI_MODELS_DATA === 'undefined') return;

    const query = document.getElementById('comp-search-input')?.value.toLowerCase().trim() || '';
    const cat = document.getElementById('comp-cat-filter')?.value || 'all';

    const filtered = AI_MODELS_DATA.filter(m => {
      const matchCat = cat === 'all' || m.category === cat;
      const matchQuery = !query || m.name.toLowerCase().includes(query) || m.org.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    tbody.innerHTML = filtered.map(m => `
      <tr>
        <td><strong>${m.name}</strong></td>
        <td><span class="model-cat-badge">${m.categoryName}</span></td>
        <td>${m.parameters || 'N/A'}</td>
        <td>${m.input}</td>
        <td>${m.output}</td>
        <td>${m.availability.includes('Local') ? '✅' : '❌'}</td>
        <td>${m.availability.includes('API') ? '✅' : '❌'}</td>
        <td>${m.license}</td>
        <td>${m.uses[0] || 'General'}</td>
        <td>${m.speed || 'Fast'}</td>
        <td>${m.quality || 'High'}</td>
      </tr>
    `).join('');
  }

  function setupEventListeners() {
    document.getElementById('comp-search-input')?.addEventListener('input', renderTable);
    document.getElementById('comp-cat-filter')?.addEventListener('change', renderTable);
  }

  return { init };
})();

/* ==========================================================================
   10. MODEL SELECTION WIZARD MODULE
   ========================================================================== */
const ModelWizardModule = (() => {
  function init() {
    const btns = document.querySelectorAll('#wiz-build-options .wiz-opt-btn');
    const resultBox = document.getElementById('wiz-result-box');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const val = btn.getAttribute('data-val');
        if (!resultBox) return;

        let rec = "";
        if (val === 'voice') {
          rec = `<strong>Recommended Stack for Voice Assistant:</strong><br>
          Whisper Large v3 (STT) + Qwen 2.5 72B / Llama 3.3 (Brain) + BGE-M3 (RAG) + Piper / XTTS v2 (TTS)`;
        } else if (val === 'rag') {
          rec = `<strong>Recommended Stack for RAG System:</strong><br>
          BGE-M3 (Embeddings) + Qdrant / ChromaDB (Vector DB) + BGE Reranker v2 + Claude 3.5 Sonnet / Llama 3.3 (LLM)`;
        } else if (val === 'agent') {
          rec = `<strong>Recommended Stack for Autonomous AI Agent:</strong><br>
          Claude 3.5 Sonnet / DeepSeek V3 (Reasoning) + Tavily Web Search API + Python REPL Sandbox + Zod Schema Guardrails`;
        } else {
          rec = `<strong>Recommended Stack:</strong><br>
          Qwen 2.5 72B / GPT-4o + BGE-M3 Embeddings + FastAPI Backend`;
        }

        resultBox.innerHTML = `
          <div class="info-callout text-left">
            ${rec}
          </div>
        `;
        resultBox.classList.remove('hidden');
      });
    });
  }

  return { init };
})();

/* ==========================================================================
   11. REAL-WORLD PROJECTS MODULE
   ========================================================================== */
const RealWorldProjectsModule = (() => {
  function init() {
    renderProjects();
  }

  function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid || typeof AI_PROJECTS_DATA === 'undefined') return;

    grid.innerHTML = AI_PROJECTS_DATA.map(p => `
      <div class="project-card glass-panel">
        <div>
          <div class="model-card-header">
            <h3 class="model-card-title">${p.title}</h3>
            <span class="diff-badge ${p.difficulty}">${p.difficulty}</span>
          </div>
          <p class="model-purpose">${p.desc}</p>
          
          <strong>Required Models:</strong>
          <div class="model-uses-row margin-top-xs">
            ${p.models.map(m => `<span class="use-chip">🧩 ${m}</span>`).join('')}
          </div>
        </div>

        <button class="btn btn-secondary btn-sm width-full margin-top-md btn-view-project" data-id="${p.id}">
          📐 View Architecture Blueprint
        </button>
      </div>
    `).join('');

    grid.querySelectorAll('.btn-view-project').forEach(btn => {
      btn.addEventListener('click', () => showProjectModal(btn.getAttribute('data-id')));
    });
  }

  function showProjectModal(projId) {
    const proj = AI_PROJECTS_DATA.find(p => p.id === projId);
    if (!proj) return;

    const modal = document.getElementById('project-detail-modal');
    const title = document.getElementById('modal-project-title');
    const body = document.getElementById('modal-project-body');

    if (title) title.textContent = proj.title;
    if (body) {
      body.innerHTML = `
        <div class="project-blueprint-detail">
          <div class="badge-pill margin-bottom-sm">Category: ${proj.category} | Difficulty: ${proj.difficulty}</div>
          <p class="margin-bottom-md">${proj.desc}</p>

          <h4>Architecture Flow:</h4>
          <pre class="prompt-text-box">${proj.architecture}</pre>

          <h4 class="margin-top-sm">Required APIs & Technologies:</h4>
          <div class="model-uses-row margin-top-xs">
            ${proj.technologies.map(t => `<span class="use-chip">💻 ${t}</span>`).join('')}
          </div>

          <div class="model-meta-grid margin-top-md">
            <div class="meta-item"><label>Complexity:</label> <span>${proj.complexity}</span></div>
            <div class="meta-item"><label>Real-world Use:</label> <span>${proj.useCase}</span></div>
          </div>
        </div>
      `;
    }

    modal?.classList.remove('hidden');
  }

  return { init };
})();

/* ==========================================================================
   12. LEARNING ROADMAP MODULE
   ========================================================================== */
const LearningRoadmapModule = (() => {
  const completedNodes = new Set(JSON.parse(localStorage.getItem('ai_roadmap_completed') || '[]'));

  function init() {
    const nodes = document.querySelectorAll('.roadmap-node');
    nodes.forEach(node => {
      const id = node.getAttribute('data-node');
      if (completedNodes.has(id)) node.classList.add('completed');

      node.addEventListener('click', () => {
        if (completedNodes.has(id)) {
          completedNodes.delete(id);
          node.classList.remove('completed');
        } else {
          completedNodes.add(id);
          node.classList.add('completed');
          CoreSystem.showToast("Roadmap skill completed!", "🗺️");
        }
        localStorage.setItem('ai_roadmap_completed', JSON.stringify([...completedNodes]));
        updateRoadmapUI();
      });
    });

    updateRoadmapUI();
  }

  function updateRoadmapUI() {
    const total = 15;
    const count = completedNodes.size;
    const pct = Math.round((count / total) * 100);

    const txt = document.getElementById('roadmap-percent-text');
    const fill = document.getElementById('roadmap-progress-fill');

    if (txt) txt.textContent = `${pct}% Completed (${count}/${total} Skills)`;
    if (fill) fill.style.width = `${pct}%`;
  }

  return { init };
})();

/* ==========================================================================
   13. LAB MODEL 01: LLM PREDICTOR MODULE (FULLY WORKING)
   ========================================================================== */
const LLMPredictorModule = (() => {
  const VOCAB = [
    { word: "transforming", prob: 0.38 },
    { word: "revolutionizing", prob: 0.28 },
    { word: "accelerating", prob: 0.18 },
    { word: "reshaping", prob: 0.10 },
    { word: "empowering", prob: 0.06 }
  ];

  let currentWords = [];
  let temp = 0.7;

  function init() {
    const select = document.getElementById('llm-prompt-select');
    const slider = document.getElementById('llm-temp-slider');
    const tempVal = document.getElementById('llm-temp-val');
    const stepBtn = document.getElementById('llm-step-btn');
    const autoBtn = document.getElementById('llm-auto-btn');
    const resetBtn = document.getElementById('llm-reset-btn');

    if (select) {
      currentWords = select.value.split(' ');
      renderOutput();
      select.addEventListener('change', () => {
        currentWords = select.value.split(' ');
        renderOutput();
      });
    }

    if (slider) {
      slider.addEventListener('input', (e) => {
        temp = parseFloat(e.target.value);
        if (tempVal) tempVal.textContent = temp.toFixed(1);
        renderOutput();
      });
    }

    stepBtn?.addEventListener('click', generateNextWord);
    autoBtn?.addEventListener('click', autoGenerateWords);
    resetBtn?.addEventListener('click', () => {
      if (select) currentWords = select.value.split(' ');
      renderOutput();
    });
  }

  function renderOutput() {
    const tokensBox = document.getElementById('llm-tokens-box');
    const generatedBox = document.getElementById('llm-generated-output');
    const barsBox = document.getElementById('llm-prob-bars');
    const attnGrid = document.getElementById('llm-attention-matrix');

    if (tokensBox) {
      tokensBox.innerHTML = currentWords.map(w => `<span class="token-pill">${w}</span>`).join(' ');
    }

    if (generatedBox) {
      generatedBox.innerHTML = `<strong>Generated Text:</strong> ${currentWords.join(' ')}`;
    }

    if (barsBox) {
      const adjusted = VOCAB.map(v => {
        const raw = Math.pow(v.prob, 1 / temp);
        return { word: v.word, raw };
      });
      const sum = adjusted.reduce((acc, curr) => acc + curr.raw, 0);
      const normalized = adjusted.map(a => ({ word: a.word, pct: Math.round((a.raw / sum) * 100) }));

      barsBox.innerHTML = normalized.map(n => `
        <div class="word-bar-item">
          <span class="w-label">${n.word}</span>
          <div class="w-bar-wrap"><div class="w-bar" style="width: ${n.pct}%;"></div></div>
          <span class="w-val">${n.pct}%</span>
        </div>
      `).join('');
    }

    if (attnGrid) {
      attnGrid.innerHTML = `
        <div style="font-size:0.75rem; color:var(--text-muted); padding:4px;">
          Attention Weights (Temp ${temp.toFixed(1)}): High correlation on tokens "${currentWords.slice(-2).join(' ')}"
        </div>
      `;
    }
  }

  function generateNextWord() {
    const nextOptions = ["technology", "industries", "automation", "education", "creativity", "workflows"];
    const picked = nextOptions[Math.floor(Math.random() * nextOptions.length)];
    currentWords.push(picked);
    renderOutput();
  }

  function autoGenerateWords() {
    let count = 0;
    const interval = setInterval(() => {
      generateNextWord();
      count++;
      if (count >= 4) clearInterval(interval);
    }, 400);
  }

  return { init };
})();

/* ==========================================================================
   14. LAB MODEL 02: PROMPT ANALYZER MODULE (FULLY WORKING)
   ========================================================================== */
/* ==========================================================================
   14. LAB MODEL 02: PROMPT ANALYZER MODULE (ENHANCED ACCURACY & RECOMMENDATIONS)
   ========================================================================== */
const PromptAnalyzerModule = (() => {
  function init() {
    const input = document.getElementById('analyzer-input');
    const improveBtn = document.getElementById('analyzer-improve-btn');
    const resetBtn = document.getElementById('analyzer-reset-btn');
    const presetBtns = document.querySelectorAll('.analyzer-preset-btn');

    if (input) {
      input.addEventListener('input', analyzePrompt);
      analyzePrompt();
    }

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (!input) return;
        const preset = btn.getAttribute('data-preset');
        if (preset === 'vague') {
          input.value = "Write python code";
        } else if (preset === 'mid') {
          input.value = "Refactor this Python function into an async FastAPI endpoint to handle HTTP requests.";
        } else if (preset === 'perfect') {
          input.value = "Act as a Senior DevOps Architect. Refactor this Docker Compose configuration to support high-availability Redis clustering. Target production AWS environment. Provide clean YAML code blocks with inline comments. Max 300 words, strict technical tone.";
        }
        analyzePrompt();
      });
    });

    improveBtn?.addEventListener('click', () => {
      if (input) {
        input.value = "Act as a Senior DevOps Architect. Refactor this Docker Compose configuration to support high-availability Redis clustering. Target production AWS environment. Provide clean YAML code blocks with inline comments. Max 300 words, strict technical tone.";
        analyzePrompt();
        CoreSystem.showToast("Prompt auto-improved to 100/100!", "✨");
      }
    });

    resetBtn?.addEventListener('click', () => {
      if (input) {
        input.value = "";
        analyzePrompt();
      }
    });
  }

  function analyzePrompt() {
    const val = document.getElementById('analyzer-input')?.value.trim() || '';
    const valLower = val.toLowerCase();

    if (!val) {
      updateScoreUI(0, false, false, false, false, false, false, []);
      return;
    }
    
    // 1. Role / Persona (20 pts)
    const hasRole = /act as|persona|you are a|as a|role:|senior|expert|engineer|architect|specialist|consultant|developer|designer|assistant|system prompt|identity|given you are|function as|serve as/i.test(valLower);
    
    // 2. Task Clarity (20 pts)
    const hasTask = /write|refactor|create|summarize|build|analyze|explain|generate|code|design|convert|translate|list|extract|find|implement|optimize|fix|debug|review|evaluate|calculate|audit|draft|develop/i.test(valLower);
    
    // 3. Background & Context (20 pts)
    const hasContext = (val.length > 25 && /for|background|context|target|environment|scenario|database|api|app|system|user|dataset|stack|framework|operating|given|using|production|cloud|aws/i.test(valLower)) || val.length > 60;
    
    // 4. Output Format (15 pts)
    const hasFormat = /json|yaml|markdown|table|bullet|code block|list|schema|xml|csv|pydantic|zod|array|steps|structure|template|output format|in html|in markdown|formatted as/i.test(valLower);
    
    // 5. Constraints & Boundaries (15 pts)
    const hasConstraints = /avoid|must|limit|max|only|do not|don't|no |without|never|restrict|within|keep under|exclude|zero|minimum|at most|at least|ensure/i.test(valLower);
    
    // 6. Tone & Style (10 pts)
    const hasTone = /tone|friendly|professional|academic|concise|polite|formal|informal|casual|rigorous|technical|simple|detailed|direct|authoritative|clear|brief|explanatory/i.test(valLower);

    let score = 0;
    const recommendations = [];

    if (hasRole) {
      score += 20;
    } else {
      recommendations.push("👤 <strong>Add a Role:</strong> Start with a clear persona (e.g. <em>'Act as a Senior Python Developer...'</em>).");
    }

    if (hasTask) {
      score += 20;
    } else {
      recommendations.push("🎯 <strong>Clarify Task:</strong> Use direct action verbs (e.g. <em>'Refactor', 'Generate', 'Audit'</em>).");
    }

    if (hasContext) {
      score += 20;
    } else {
      recommendations.push("📖 <strong>Provide Context:</strong> Add background details, stack info, or target environment.");
    }

    if (hasFormat) {
      score += 15;
    } else {
      recommendations.push("📐 <strong>Specify Format:</strong> Name the output layout (e.g. <em>'JSON schema', 'Markdown table'</em>).");
    }

    if (hasConstraints) {
      score += 15;
    } else {
      recommendations.push("⛔ <strong>Add Constraints:</strong> Declare boundaries (e.g. <em>'Max 200 words', 'Do not use third-party libraries'</em>).");
    }

    if (hasTone) {
      score += 10;
    } else {
      recommendations.push("🎨 <strong>Specify Tone:</strong> Indicate communication style (e.g. <em>'Strict technical tone', 'Concise'</em>).");
    }

    updateScoreUI(score, hasRole, hasTask, hasContext, hasFormat, hasConstraints, hasTone, recommendations);
  }

  function updateScoreUI(score, hasRole, hasTask, hasContext, hasFormat, hasConstraints, hasTone, recommendations) {
    updateCheckItem('chk-role', hasRole);
    updateCheckItem('chk-task', hasTask);
    updateCheckItem('chk-context', hasContext);
    updateCheckItem('chk-format', hasFormat);
    updateCheckItem('chk-constraints', hasConstraints);
    updateCheckItem('chk-tone', hasTone);

    const scoreNum = document.getElementById('analyzer-score-num');
    const scoreLabel = document.getElementById('analyzer-score-label');
    const scoreCircle = document.getElementById('analyzer-score-circle');
    const feedbackBox = document.getElementById('analyzer-feedback-box');

    if (scoreNum) scoreNum.textContent = score;

    let labelText = "Needs Work ❌";
    let themeColor = "var(--error)";

    if (score >= 80) {
      labelText = "Production Ready 🔥";
      themeColor = "var(--success)";
    } else if (score >= 50) {
      labelText = "Good Start 👍";
      themeColor = "var(--secondary)";
    } else if (score > 0) {
      labelText = "Needs Work ❌";
      themeColor = "var(--error)";
    } else {
      labelText = "Enter Prompt Text";
      themeColor = "var(--text-muted)";
    }

    if (scoreLabel) {
      scoreLabel.textContent = labelText;
      scoreLabel.style.color = themeColor;
    }

    if (scoreCircle) {
      scoreCircle.style.borderColor = themeColor;
    }

    if (feedbackBox) {
      if (score === 100) {
        feedbackBox.innerHTML = `<div class="info-callout text-sm">🎉 <strong>100/100 Perfect Prompt!</strong> This prompt follows all enterprise prompt engineering standards and will produce highly accurate results.</div>`;
      } else if (recommendations.length > 0) {
        feedbackBox.innerHTML = `
          <div class="feedback-suggestions-list text-sm">
            <span class="text-xs font-bold text-muted uppercase">Key Improvement Suggestions:</span>
            <ul class="margin-top-xs" style="padding-left: 1.2rem; margin-bottom: 0;">
              ${recommendations.map(r => `<li style="margin-bottom:0.25rem;">${r}</li>`).join('')}
            </ul>
          </div>
        `;
      } else {
        feedbackBox.innerHTML = `<span class="text-xs text-muted">💡 Type a prompt above to receive instant recommendations.</span>`;
      }
    }
  }

  function updateCheckItem(id, pass) {
    const el = document.getElementById(id);
    if (!el) return;
    if (pass) {
      el.classList.add('pass');
      el.querySelector('.chk-icon').textContent = '✅';
    } else {
      el.classList.remove('pass');
      el.querySelector('.chk-icon').textContent = '❌';
    }
  }

  return { init };
})();

/* ==========================================================================
   15. LAB MODEL 03: MOCK CHAT SIMULATOR (FULLY WORKING)
   ========================================================================== */
const ChatSimulatorModule = (() => {
  const CHAT_DATA = {
    study: {
      vague: "Just study 2 hours a day and read your textbook notes.",
      detailed: `### Recommended 5-Day Study Strategy\n1. **Day 1 (Concepts):** Review lecture slides and define core technical terms.\n2. **Day 2 (Practice):** Solve 10 active recall quiz questions.\n3. **Day 3 (Weak Spots):** Re-read textbook section 4.2.`
    },
    coding: {
      vague: "Fix the function syntax and check your loops.",
      detailed: "```python\n# Refactored Code with Retry Logic\nimport time\n\ndef fetch_api_with_retry(url, retries=3):\n    for i in range(retries):\n        try:\n            return requests.get(url)\n        except Exception as e:\n            time.sleep(2)\n```"
    }
  };

  function init() {
    document.getElementById('chat-run-btn')?.addEventListener('click', runChat);
  }

  function runChat() {
    const key = document.getElementById('chat-preset-select')?.value || 'study';
    const vagueBox = document.getElementById('chat-vague-box');
    const detailedBox = document.getElementById('chat-detailed-box');

    const data = CHAT_DATA[key] || CHAT_DATA.study;

    if (vagueBox) vagueBox.innerHTML = `<div class="chat-msg vague-msg"><p>${data.vague}</p></div>`;
    if (detailedBox) detailedBox.innerHTML = `<div class="chat-msg detailed-msg"><pre>${data.detailed}</pre></div>`;
  }

  return { init };
})();

/* ==========================================================================
   16. LAB MODEL 04: ARCHITECTURE REQUEST FLOW (FULLY WORKING)
   ========================================================================== */
const Architecture3DModule = (() => {
  function init() {
    const btn = document.getElementById('arch-send-packet-btn');
    const slider = document.getElementById('arch-load-slider');
    const loadVal = document.getElementById('arch-load-val');

    slider?.addEventListener('input', (e) => {
      if (loadVal) loadVal.textContent = `${e.target.value} req/sec`;
    });

    btn?.addEventListener('click', triggerSpike);
  }

  function triggerSpike() {
    const nodes = document.querySelectorAll('.topo-node');
    nodes.forEach((n, idx) => {
      setTimeout(() => {
        n.style.boxShadow = '0 0 25px rgba(56,189,248,0.8)';
        setTimeout(() => n.style.boxShadow = '', 400);
      }, idx * 150);
    });

    CoreSystem.showToast("Traffic spike simulated across API Gateway & DB cluster!", "⚡");
  }

  return { init };
})();

/* ==========================================================================
   17. LAB MODEL 05: TOKEN ESTIMATOR (FULLY WORKING)
   ========================================================================== */
const TokenEstimatorModule = (() => {
  function init() {
    const input = document.getElementById('token-input');
    const sampleBtn = document.getElementById('token-sample-btn');
    const resetBtn = document.getElementById('token-reset-btn');

    input?.addEventListener('input', calculateTokens);

    sampleBtn?.addEventListener('click', () => {
      if (input) {
        input.value = "Artificial intelligence and software engineering are rapidly converging. Large language models process textual input by splitting paragraphs into sub-word fragments called tokens. A general rule of thumb is that 1000 tokens represent roughly 750 English words. Modern foundational models like GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro charge per 1 Million input and output tokens.";
        calculateTokens();
      }
    });

    resetBtn?.addEventListener('click', () => {
      if (input) {
        input.value = '';
        calculateTokens();
      }
    });
  }

  function calculateTokens() {
    const text = document.getElementById('token-input')?.value || '';
    const charCount = text.length;
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const tokenEst = Math.round(wordCount * 1.33);

    const cChar = document.getElementById('tok-count-char');
    const cWord = document.getElementById('tok-count-word');
    const cTok = document.getElementById('tok-count-tokens');

    if (cChar) cChar.textContent = charCount;
    if (cWord) cWord.textContent = wordCount;
    if (cTok) cTok.textContent = tokenEst;

    const gpt4 = ((tokenEst / 1000000) * 2.50).toFixed(6);
    const claude = ((tokenEst / 1000000) * 3.00).toFixed(6);
    const gemini = ((tokenEst / 1000000) * 0.075).toFixed(6);

    const elGpt = document.getElementById('cost-gpt4o');
    const elClaude = document.getElementById('cost-claude');
    const elGemini = document.getElementById('cost-gemini');

    if (elGpt) elGpt.textContent = `$${gpt4}`;
    if (elClaude) elClaude.textContent = `$${claude}`;
    if (elGemini) elGemini.textContent = `$${gemini}`;
  }

  return { init };
})();

/* ==========================================================================
   18. SUPPORTING MODULES (TOOLS EXPLORER, PROMPT LIBRARY, QUIZ, VOICE CHATBOT)
   ========================================================================== */
const ToolsExplorerModule = (() => {
  const TOOLS_DATA = [
    { name: "ChatGPT (GPT-4o)", cat: "coding", desc: "Flagship conversational assistant for code generation, writing, and analysis.", free: "Free / Plus" },
    { name: "Claude 3.5 Sonnet", cat: "coding", desc: "Premier coding model with artifact previews and technical writing.", free: "Free / Pro" },
    { name: "Midjourney v6", cat: "image", desc: "Industry benchmark for high-fidelity photorealistic image synthesis.", free: "Paid" },
    { name: "FLUX.1", cat: "image", desc: "Open-weights image generator with perfect text spelling inside images.", free: "Free Open" },
    { name: "Whisper", cat: "audio", desc: "Open-source speech recognition transcribing 99+ languages.", free: "Free Open" },
    { name: "Perplexity AI", cat: "research", desc: "AI search engine providing real-time answer synthesis with web citations.", free: "Free / Pro" }
  ];

  function init() {
    renderTools('all');
    document.querySelectorAll('#tools-filter-tabs .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#tools-filter-tabs .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTools(btn.getAttribute('data-filter'));
      });
    });
  }

  function renderTools(filter) {
    const grid = document.getElementById('tools-grid');
    if (!grid) return;

    const list = filter === 'all' ? TOOLS_DATA : TOOLS_DATA.filter(t => t.cat === filter);

    grid.innerHTML = list.map(t => `
      <div class="tool-card glass-panel padding-md">
        <h4>${t.name}</h4>
        <span class="vdb-tag">${t.free}</span>
        <p class="text-sm text-muted">${t.desc}</p>
      </div>
    `).join('');
  }

  return { init };
})();

const PromptLibraryModule = (() => {
  let activeCategory = 'all';

  function init() {
    renderPrompts();
    setupEventListeners();
  }

  function setupEventListeners() {
    document.getElementById('prompt-search-input')?.addEventListener('input', renderPrompts);
    document.querySelectorAll('#library-tabs .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#library-tabs .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-cat');
        renderPrompts();
      });
    });
  }

  function renderPrompts() {
    const grid = document.getElementById('prompts-grid');
    if (!grid) return;

    const data = typeof PROMPT_LIBRARY_DATA !== 'undefined' ? PROMPT_LIBRARY_DATA : [];
    const query = document.getElementById('prompt-search-input')?.value.toLowerCase().trim() || '';

    const filtered = data.filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchQuery = !query || p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query) || p.prompt.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="no-results glass-panel text-center padding-lg width-full"><p class="text-muted">No prompts match your search.</p></div>`;
      return;
    }

    grid.innerHTML = filtered.map(p => `
      <div class="prompt-card glass-panel padding-md">
        <div class="prompt-card-header">
          <strong>${p.title}</strong>
          <span class="p-category-badge">${p.categoryName || p.category}</span>
        </div>
        <p class="text-sm text-muted margin-bottom-xs">${p.desc}</p>
        <pre class="prompt-text-box">${p.prompt}</pre>
        <button class="btn btn-secondary btn-sm width-full margin-top-sm btn-copy-prompt" data-text="${p.prompt.replace(/"/g, '&quot;')}">📋 Copy Prompt Template</button>
      </div>
    `).join('');

    grid.querySelectorAll('.btn-copy-prompt').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-text');
        navigator.clipboard.writeText(text);
        CoreSystem.showToast("Prompt copied to clipboard!", "📋");
      });
    });
  }

  return { init };
})();

const QuizModule = (() => {
  const QUESTIONS = [
    { q: "What does RAG stand for in artificial intelligence?", options: ["Random Access Generation", "Retrieval-Augmented Generation", "Recursive Agent Graph", "Recurrent Automated Group"], ans: 1 },
    { q: "Which component is used to re-score vector retrieval candidates?", options: ["Tokenizer", "Cross-Encoder Reranker", "Quantizer", "Softmax Layer"], ans: 1 },
    { q: "What parameter controls randomness in LLM next-word sampling?", options: ["Learning Rate", "Temperature", "Batch Size", "Epochs"], ans: 1 },
    { q: "What distinguishes an AI Agent from a basic chatbot?", options: ["Agents have dark themes", "Agents call tools & act autonomously", "Agents can only output text", "Agents don't use LLMs"], ans: 1 }
  ];

  let currentIdx = 0;
  let score = 0;

  function init() {
    renderQuestion();
    document.getElementById('quiz-next-btn')?.addEventListener('click', nextQuestion);
    document.getElementById('quiz-restart-btn')?.addEventListener('click', restartQuiz);
  }

  function renderQuestion() {
    const qText = document.getElementById('quiz-question-text');
    const optsContainer = document.getElementById('quiz-options-container');
    const progressText = document.getElementById('quiz-progress-text');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (currentIdx >= QUESTIONS.length) {
      showSummary();
      return;
    }

    const item = QUESTIONS[currentIdx];
    if (qText) qText.textContent = `${currentIdx + 1}. ${item.q}`;
    if (progressText) progressText.textContent = `Question ${currentIdx + 1} of ${QUESTIONS.length}`;
    if (nextBtn) nextBtn.disabled = true;

    if (optsContainer) {
      optsContainer.innerHTML = item.options.map((opt, i) => `
        <button class="btn btn-outline quiz-opt-btn" data-idx="${i}" style="width:100%; text-align:left; margin-bottom:0.5rem;">
          ${opt}
        </button>
      `).join('');

      optsContainer.querySelectorAll('.quiz-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const selected = parseInt(btn.getAttribute('data-idx'));
          if (selected === item.ans) {
            btn.style.borderColor = 'var(--success)';
            btn.style.background = 'rgba(16,185,129,0.2)';
            score++;
          } else {
            btn.style.borderColor = 'var(--error)';
            btn.style.background = 'rgba(239,68,68,0.2)';
          }
          optsContainer.querySelectorAll('.quiz-opt-btn').forEach(b => b.disabled = true);
          if (nextBtn) nextBtn.disabled = false;
        });
      });
    }
  }

  function nextQuestion() {
    currentIdx++;
    renderQuestion();
  }

  function showSummary() {
    const body = document.getElementById('quiz-body');
    const summary = document.getElementById('quiz-summary-box');
    const scoreDetail = document.getElementById('quiz-score-detail');
    const footerNav = document.getElementById('quiz-footer-nav');

    if (body) body.classList.add('hidden');
    if (footerNav) footerNav.classList.add('hidden');
    if (summary) summary.classList.remove('hidden');

    if (scoreDetail) scoreDetail.textContent = `You scored ${score} out of ${QUESTIONS.length} (${Math.round((score/QUESTIONS.length)*100)}%)`;
  }

  function restartQuiz() {
    currentIdx = 0;
    score = 0;
    document.getElementById('quiz-body')?.classList.remove('hidden');
    document.getElementById('quiz-footer-nav')?.classList.remove('hidden');
    document.getElementById('quiz-summary-box')?.classList.add('hidden');
    renderQuestion();
  }

  return { init };
})();

const VoiceChatbotModule = (() => {
  let isListening = false;
  let isMuted = false;
  let recognition = null;
  let activePersona = 'scholar';
  let availableVoices = [];

  function init() {
    setupModal();
    setupChatLogic();
    setupSuggestions();
    setupPersonas();
    setupSettings();
    setupHeaderActions();
    setupVisualizer();
    setupSpeechRecognition();
    setupKeyboardShortcuts();
  }

  function setupModal() {
    const fab = document.getElementById('voice-fab');
    const navBtn = document.getElementById('nav-voice-btn');
    const modal = document.getElementById('voice-modal');
    const closeBtn = document.getElementById('voice-close-btn');
    const backdrop = document.getElementById('voice-modal-backdrop');

    function openModal() {
      if (!modal) return;
      modal.classList.add('active');
      modal.classList.remove('hidden');
      document.getElementById('voice-text-input')?.focus();
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('active');
      modal.classList.add('hidden');
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    }

    fab?.addEventListener('click', openModal);
    navBtn?.addEventListener('click', openModal);
    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);
  }

  function setupChatLogic() {
    const sendBtn = document.getElementById('voice-send-btn');
    const input = document.getElementById('voice-text-input');

    sendBtn?.addEventListener('click', () => handleUserMessage());
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUserMessage();
    });
  }

  function setupSuggestions() {
    const container = document.getElementById('voice-chips-container');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const chip = e.target.closest('.voice-chip-btn');
      if (!chip) return;

      const promptText = chip.getAttribute('data-prompt') || chip.textContent.trim();
      const input = document.getElementById('voice-text-input');
      if (input) input.value = promptText;

      handleUserMessage(promptText);
    });
  }

  function setupPersonas() {
    const personaBtns = document.querySelectorAll('.persona-btn');
    personaBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        personaBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activePersona = btn.getAttribute('data-persona') || 'scholar';

        const statusText = document.getElementById('voice-status-text');
        if (statusText) {
          const personaNames = {
            scholar: 'Scholar Mode (Deep Math & Theory)',
            coder: 'Code Architect Mode (Systems & Clean Code)',
            prompter: 'Prompt Engineer Mode (100/100 Formulas)',
            agent: 'AI Agent Mode (Autonomous Tools)'
          };
          statusText.textContent = `Active Persona: ${personaNames[activePersona] || 'Ready'}`;
        }
        CoreSystem.showToast(`Switched persona to ${btn.textContent.trim()}`, "🧠");
      });
    });
  }

  function setupSettings() {
    const pitchRange = document.getElementById('voice-pitch-range');
    const pitchVal = document.getElementById('voice-pitch-val');
    const speedRange = document.getElementById('voice-speed-range');
    const speedVal = document.getElementById('voice-speed-val');
    const voiceSelect = document.getElementById('voice-select-dropdown');
    const muteBtn = document.getElementById('voice-mute-btn');

    if (pitchRange && pitchVal) {
      pitchRange.addEventListener('input', (e) => {
        pitchVal.textContent = parseFloat(e.target.value).toFixed(1);
      });
    }

    if (speedRange && speedVal) {
      speedRange.addEventListener('input', (e) => {
        speedVal.textContent = `${parseFloat(e.target.value).toFixed(1)}x`;
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        muteBtn.textContent = isMuted ? '🔇' : '🔊';
        if (isMuted && window.speechSynthesis) window.speechSynthesis.cancel();
        CoreSystem.showToast(isMuted ? "Voice speech muted" : "Voice speech unmuted", isMuted ? "🔇" : "🔊");
      });
    }

    populateVoiceList();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = populateVoiceList;
    }
  }

  function populateVoiceList() {
    const select = document.getElementById('voice-select-dropdown');
    if (!select || !('speechSynthesis' in window)) return;

    availableVoices = window.speechSynthesis.getVoices();
    if (availableVoices.length === 0) return;

    select.innerHTML = availableVoices.map((v, i) => `
      <option value="${i}">${v.name} (${v.lang}) ${v.default ? '— Default' : ''}</option>
    `).join('');
  }

  function setupHeaderActions() {
    const personaBtn = document.getElementById('voice-persona-btn');
    const settingsBtn = document.getElementById('voice-settings-btn');
    const exportBtn = document.getElementById('voice-export-btn');
    const clearBtn = document.getElementById('voice-clear-btn');

    const personaPanel = document.getElementById('voice-persona-panel');
    const settingsPanel = document.getElementById('voice-settings-panel');

    personaBtn?.addEventListener('click', () => {
      settingsPanel?.classList.add('hidden');
      personaPanel?.classList.toggle('hidden');
    });

    settingsBtn?.addEventListener('click', () => {
      personaPanel?.classList.add('hidden');
      settingsPanel?.classList.toggle('hidden');
    });

    clearBtn?.addEventListener('click', () => {
      const container = document.getElementById('voice-messages-container');
      if (container) {
        container.innerHTML = `
          <div class="voice-msg system-msg">
            <div class="voice-msg-avatar">✨</div>
            <div class="voice-msg-body">
              <div class="voice-msg-author">AI Voice Assistant</div>
              <div class="voice-msg-content">Conversation cleared! 🎙️ Ask any question or select a suggestion chip to start.</div>
            </div>
          </div>
        `;
      }
      CoreSystem.showToast("Conversation transcript cleared", "🗑️");
    });

    exportBtn?.addEventListener('click', exportChatTranscript);
  }

  function exportChatTranscript() {
    const container = document.getElementById('voice-messages-container');
    if (!container) return;

    const msgs = container.querySelectorAll('.voice-msg');
    let mdContent = `# AI Model Hub — Voice AI Assistant Transcript\n*Exported on ${new Date().toLocaleString()}*\n\n---\n\n`;

    msgs.forEach(msg => {
      const author = msg.querySelector('.voice-msg-author')?.textContent.trim() || 
                     (msg.classList.contains('user-msg') ? 'User' : 'AI Assistant');
      const text = msg.querySelector('.voice-msg-content')?.textContent.trim() || msg.textContent.trim();

      mdContent += `### **${author}**\n${text}\n\n`;
    });

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai_chatbot_transcript_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    CoreSystem.showToast("Exported chat transcript to Markdown!", "📥");
  }

  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        const modal = document.getElementById('voice-modal');
        if (modal?.classList.contains('active')) {
          modal.classList.remove('active');
          modal.classList.add('hidden');
        } else if (modal) {
          modal.classList.add('active');
          modal.classList.remove('hidden');
          document.getElementById('voice-text-input')?.focus();
        }
      }
    });
  }

  function handleUserMessage(overrideQuery = null) {
    const input = document.getElementById('voice-text-input');
    const container = document.getElementById('voice-messages-container');
    const query = (overrideQuery || input?.value || '').trim();

    if (!query || !container) return;

    // Append user bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'voice-msg user-msg';
    userBubble.innerHTML = `
      <div class="voice-msg-body">
        <div class="voice-msg-author">You</div>
        <div class="voice-msg-content">${escapeHTML(query)}</div>
      </div>
    `;
    container.appendChild(userBubble);
    if (input) input.value = '';
    container.scrollTop = container.scrollHeight;

    // Show thinking indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'voice-msg ai-msg thinking';
    typingIndicator.id = 'ai-typing-indicator';
    typingIndicator.innerHTML = `
      <div class="voice-msg-avatar">✨</div>
      <div class="voice-msg-body">
        <div class="voice-msg-author">AI Assistant (${activePersona.toUpperCase()})</div>
        <div class="voice-msg-content"><span class="pulse-dot"></span> Generating intelligent answer...</div>
      </div>
    `;
    container.appendChild(typingIndicator);
    container.scrollTop = container.scrollHeight;

    // Generate response
    setTimeout(() => {
      document.getElementById('ai-typing-indicator')?.remove();

      const reply = generateAiReply(query, activePersona);
      const aiBubble = document.createElement('div');
      aiBubble.className = 'voice-msg ai-msg';
      aiBubble.innerHTML = `
        <div class="voice-msg-avatar">✨</div>
        <div class="voice-msg-body">
          <div class="voice-msg-author">AI Assistant (${activePersona.toUpperCase()})</div>
          <div class="voice-msg-content">${reply}</div>
        </div>
      `;
      container.appendChild(aiBubble);
      container.scrollTop = container.scrollHeight;

      speakText(stripHTML(reply));
    }, 450);
  }

  function generateAiReply(q, persona) {
    const query = q.toLowerCase();

    // 1. Overview / What is AI Model Hub
    if (query.includes('overview') || query.includes('what is ai model hub')) {
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
      return "<strong>AI Model Hub</strong> is an interactive learning platform designed to help developers, students, and engineers master AI models (Qwen, Llama, Claude, Whisper, YOLO), RAG architectures, Autonomous Agents, Prompt Engineering, Computer Vision, and real-world system designs.";
    }

    // 2. AI Models Explorer
    if (query.includes('explore ai models') || query.includes('ai models catalog') || query.includes('ai models')) {
      document.getElementById('ai-models-explorer')?.scrollIntoView({ behavior: 'smooth' });
      return "I've navigated you to the <strong>AI Model Explorer</strong> catalog! You can search and filter 20 categories and 100+ models including LLMs, Embeddings, Vision-Language, Speech, and Pose Estimation models.";
    }

    // 3. Popular Models Spotlight
    if (query.includes('popular models') || query.includes('spotlight') || query.includes('qwen') || query.includes('llama')) {
      document.getElementById('important-models')?.scrollIntoView({ behavior: 'smooth' });
      return "Showing the <strong>Popular Models Spotlight</strong>! Compare industry benchmark models like Qwen 2.5 (leader in coding/math), Llama 3.3 70B (open weights benchmark), Claude 3.5 Sonnet, and Whisper v3.";
    }

    // 4. RAG Architecture
    if (query.includes('rag architecture') || query.includes('rag system') || (query.includes('rag') && !query.includes('playground'))) {
      document.getElementById('rag-section')?.scrollIntoView({ behavior: 'smooth' });
      return "<strong>Retrieval-Augmented Generation (RAG):</strong> I've scrolled to the RAG Architecture section! RAG connects LLMs to vector databases (ChromaDB, FAISS, Qdrant) via HNSW similarity search and Cross-Encoder reranking to eliminate hallucinations.";
    }

    // 5. RAG Playground Simulator
    if (query.includes('rag playground') || query.includes('playground') || query.includes('simulator')) {
      document.getElementById('rag-playground')?.scrollIntoView({ behavior: 'smooth' });
      return "I've opened the live <strong>Interactive RAG Playground</strong>! Pick a dataset (University Policy, Medical Vitals, DevOps K8s), enter a question, and click 'Execute RAG Pipeline' to see vectors and citations in real time.";
    }

    // 6. AI System Architectures
    if (query.includes('architectures') || query.includes('system design') || query.includes('jarvis')) {
      document.getElementById('ai-architectures-section')?.scrollIntoView({ behavior: 'smooth' });
      return "Scrolled to <strong>AI System Architectures</strong>! Explore multi-modal topologies for Enterprise RAG, Autonomous Web Agents, JARVIS Voice Systems, and Local Offline AI clusters.";
    }

    // 7. AI Agents & Workflows
    if (query.includes('agent') || query.includes('react') || query.includes('workflow')) {
      document.getElementById('ai-agents-section')?.scrollIntoView({ behavior: 'smooth' });
      return "<strong>Autonomous AI Agents:</strong> Unlike basic chatbots, AI Agents perceive environments, formulate multi-step ReAct plans, execute tool API calls (Search, Code Sandboxes, SQL), and self-correct output errors.";
    }

    // 8. Prompt Engineering Masterclass
    if (query.includes('prompting') || query.includes('prompt masterclass') || query.includes('few-shot') || query.includes('cot')) {
      document.getElementById('prompt-engineering-masterclass')?.scrollIntoView({ behavior: 'smooth' });
      return "Scrolled to the <strong>Prompt Engineering Masterclass</strong>! Master System Personas, Few-Shot Exemplars, Chain-of-Thought step-by-step reasoning, and 8 core prompt archetypes.";
    }

    // 9. Computer Vision
    if (query.includes('vision') || query.includes('yolo') || query.includes('sam 2') || query.includes('ocr')) {
      document.getElementById('computer-vision-section')?.scrollIntoView({ behavior: 'smooth' });
      return "Scrolled to <strong>Computer Vision Tasks</strong>! Test object detection with YOLOv8 bounding boxes, SAM 2 pixel instance segmentation, GOT-OCR 2.0 text extraction, and pose keypoint tracking.";
    }

    // 10. Speech AI Pipeline
    if (query.includes('speech') || query.includes('whisper') || query.includes('vad') || query.includes('tts')) {
      document.getElementById('speech-ai-section')?.scrollIntoView({ behavior: 'smooth' });
      return "Scrolled to the <strong>Speech AI Pipeline</strong>! Explore Whisper ASR for multilingual speech-to-text, Silero VAD noise filtering, Piper offline TTS, and XTTS v2 voice cloning.";
    }

    // 11. Model Comparison Matrix
    if (query.includes('comparison') || query.includes('matrix') || query.includes('table')) {
      document.getElementById('model-comparison-section')?.scrollIntoView({ behavior: 'smooth' });
      return "Navigated to the <strong>Model Comparison Matrix</strong>! Search, filter, and sort models by parameters, latency, speed ratings, input/output modalities, and open-source licenses.";
    }

    // 12. Model Selection Wizard
    if (query.includes('wizard') || query.includes('recommendation') || query.includes('stack')) {
      document.getElementById('model-wizard-section')?.scrollIntoView({ behavior: 'smooth' });
      return "Opened the <strong>Model Selection Wizard</strong>! Select what you are building (Chatbot, RAG, Voice Assistant, Agent) to receive an optimized tech stack recommendation.";
    }

    // 13. 12 Real-World Projects
    if (query.includes('12 projects') || query.includes('projects') || query.includes('blueprint')) {
      document.getElementById('real-world-projects')?.scrollIntoView({ behavior: 'smooth' });
      return "Scrolled to <strong>12 Real-World Projects</strong>! Click any project card to inspect its complete production architecture blueprint, model stack, and complexity ratings.";
    }

    // 14. AI Learning Roadmap
    if (query.includes('roadmap') || query.includes('learning roadmap') || query.includes('curriculum')) {
      document.getElementById('learning-roadmap')?.scrollIntoView({ behavior: 'smooth' });
      return "Navigated to the <strong>AI Learning Roadmap</strong>! Track your progress across 5 curriculum levels from Python & ML Fundamentals up to RAG, Agents, and Production Deployment.";
    }

    // 15. Software Engineering AI
    if (query.includes('software ai') || query.includes('software engineering') || query.includes('devops')) {
      document.getElementById('software-field')?.scrollIntoView({ behavior: 'smooth' });
      return "Scrolled to <strong>AI in Software Engineering</strong>! Learn how AI assists in automated code refactoring, system architecture design, and CI/CD DevOps automation.";
    }

    // 16. AI Tools Explorer
    if (query.includes('tools explorer') || query.includes('tools') || query.includes('copilot')) {
      document.getElementById('tools-explorer')?.scrollIntoView({ behavior: 'smooth' });
      return "Opened the <strong>AI Tools Explorer</strong>! Browse popular student and professional tools for Coding, Video Generation, Research, Image Synthesis, and Audio AI.";
    }

    // 17. Prompt Templates Library
    if (query.includes('prompt library') || query.includes('templates') || query.includes('copy prompt')) {
      document.getElementById('prompt-library')?.scrollIntoView({ behavior: 'smooth' });
      return "Navigated to the <strong>Prompt Examples Library</strong>! Access 15+ field-tested prompt templates for FastAPI refactoring, RAG guardrails, security audits, and agent planning.";
    }

    // 18. Interactive Lab Models
    if (query.includes('lab models') || query.includes('interactive lab') || query.includes('model 1') || query.includes('model 2')) {
      document.getElementById('interactive-lab')?.scrollIntoView({ behavior: 'smooth' });
      return "Navigated to the <strong>Interactive AI & Software Lab</strong>! Test 5 interactive browser models: LLM Temperature Predictor, Prompt Quality Analyzer, Chat Simulator, Architecture Request Flow, and Token Estimator.";
    }

    // 19. Quiz Section
    if (query.includes('quiz') || query.includes('start ai quiz') || query.includes('test knowledge')) {
      document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' });
      return "I've scrolled down to the <strong>AI & Software Engineering Quiz</strong>! Answer the 8 questions to test your AI knowledge! 🎯";
    }

    // Default responses tailored by active persona
    if (persona === 'coder') {
      return `<strong>[Code Architect]</strong> Key recommendation for "${escapeHTML(q)}": Ensure microservice modularity, use Async Python (FastAPI) or Node.js event loops, store embeddings in ChromaDB/Qdrant, and protect LLM endpoints with structured JSON schemas.`;
    } else if (persona === 'prompter') {
      return `<strong>[Prompt Engineer]</strong> For optimal results on "${escapeHTML(q)}", assign a clear System Persona ("Act as..."), provide 2-3 Few-Shot input/output pairs, and enforce strict format constraints like JSON schema output.`;
    } else if (persona === 'agent') {
      return `<strong>[AI Agent]</strong> Executing ReAct loop for target "${escapeHTML(q)}":<br>1. <code>SEARCH_KNOWLEDGE_BASE</code> ➔ Querying vector DB<br>2. <code>CALL_TOOL</code> ➔ Fetching real-time specs<br>3. <code>EVALUATE</code> ➔ Formulating final response.`;
    } else {
      return `<strong>[AI Scholar]</strong> "${escapeHTML(q)}" involves core principles of transformer architectures, multi-head self-attention mechanisms, dense vector embeddings, and cross-encoder relevance scoring. Explore our catalog sections for deep-dive diagrams!`;
    }
  }

  function speakText(text) {
    if (!('speechSynthesis' in window) || isMuted) return;

    const autoSpeakCheckbox = document.getElementById('voice-auto-speak');
    if (autoSpeakCheckbox && !autoSpeakCheckbox.checked) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    const pitchRange = document.getElementById('voice-pitch-range');
    const speedRange = document.getElementById('voice-speed-range');
    const voiceSelect = document.getElementById('voice-select-dropdown');

    if (pitchRange) utterance.pitch = parseFloat(pitchRange.value) || 1.0;
    if (speedRange) utterance.rate = parseFloat(speedRange.value) || 1.0;

    if (voiceSelect && availableVoices.length > 0) {
      const idx = parseInt(voiceSelect.value);
      if (!isNaN(idx) && availableVoices[idx]) {
        utterance.voice = availableVoices[idx];
      }
    }

    window.speechSynthesis.speak(utterance);
  }

  function setupSpeechRecognition() {
    const micBtn = document.getElementById('mic-toggle-btn');
    const input = document.getElementById('voice-text-input');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition && micBtn) {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        isListening = true;
        micBtn.classList.add('listening');
        CoreSystem.showToast("Listening to your voice...", "🎙️");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (input) input.value = transcript;
        handleUserMessage();
      };

      recognition.onend = () => {
        isListening = false;
        micBtn.classList.remove('listening');
      };

      micBtn.addEventListener('click', () => {
        if (isListening) {
          recognition.stop();
        } else {
          recognition.start();
        }
      });
    }
  }

  function setupVisualizer() {
    const canvas = document.getElementById('voice-canvas-visualizer');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    function drawWave() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const time = Date.now() * 0.005;
      for (let x = 0; x < canvas.width; x += 8) {
        const amp = isListening ? 22 : 8;
        const y = 32 + Math.sin(x * 0.04 + time) * amp * Math.cos(x * 0.01);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      requestAnimationFrame(drawWave);
    }
    drawWave();
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  function stripHTML(html) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  return { init };
})();

const Hero3DModule = { init() {} };

