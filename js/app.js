/**
 * Monthly Progression Matrix - Core Application Logic
 * Sakura Edition with Zen Bonsai, Micro-Notes, Petal Shields & Monthly Wrapped
 */

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
window.escapeHtml = escapeHtml;

// Life Pillars Configuration
const PILLARS = [
  { id: 'health', name: 'Health', emoji: '🌱', badge: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300', checkGradient: 'from-emerald-400 to-teal-400' },
  { id: 'career', name: 'Focus', emoji: '⚡', badge: 'border-purple-400/30 bg-purple-400/10 text-purple-300', checkGradient: 'from-purple-400 to-pink-400' },
  { id: 'learning', name: 'Grow', emoji: '📚', badge: 'border-sky-400/30 bg-sky-400/10 text-sky-300', checkGradient: 'from-sky-400 to-indigo-400' },
  { id: 'finance', name: 'Save', emoji: '✨', badge: 'border-amber-400/30 bg-amber-400/10 text-amber-300', checkGradient: 'from-amber-400 to-orange-400' },
  { id: 'personal', name: 'Mind', emoji: '🌸', badge: 'border-pink-400/30 bg-pink-400/10 text-pink-300', checkGradient: 'from-pink-400 to-rose-400' }
];

// Aesthetic Themes Gallery Configuration
const THEMES = {
  sakura: {
    id: 'sakura',
    name: 'Sakura Zen',
    icon: '🌸',
    tagline: 'Blossom your daily rhythm & monthly cadence',
    metaColor: '#0d0814',
    badge: 'Sakura Zen',
    confettiColors: ['#c084fc', '#f472b6', '#fb7185', '#ffffff', '#fde047'],
    accentGradient: 'linear-gradient(135deg, #f472b6, #fb7185)',
    companionTitle: 'Bonsai Tree',
    companionStages: ['Winter Branch 🌱', 'Budding Sprout 🌿', 'Half Bloom 🌸', 'Radiant Bloom 🌺✨'],
    companionRanks: ['Novice Sprout', 'Budding Apprentice 🌿', 'Blossom Warrior 🌸', 'Sakura Sage ✨'],
    companionQuotes: [
      'Quiet winter branches gather strength in the soil.',
      'Fresh spring buds awaken on patient branches.',
      'Pink petals unfurl with every promise kept to yourself.',
      'Radiant full bloom achieved! Your consistency shines brightly.'
    ],
    companionBloomIndicators: ['🌱', '🌿', '🌸', '🌺✨'],
    shieldName: 'Petal Shields',
    shieldEmoji: '🌸',
    coachName: 'Sakura Sensei',
    coachRole: 'Zen Habit Coach & Rhythm Guide',
    coachGreeting: 'Greetings! I am <strong>Sakura Sensei</strong>, your embedded Zen habit companion.<br><br>I continuously review your progression matrix, streaks, and time pacing. Tap any chip above or ask me anything to cultivate your daily cadence! 🍵'
  },
  matcha: {
    id: 'matcha',
    name: 'Matcha Garden',
    icon: '🍵',
    tagline: 'Steep your daily discipline in mindful calm',
    metaColor: '#07130b',
    badge: 'Matcha Garden',
    confettiColors: ['#10b981', '#34d399', '#6ee7b7', '#facc15', '#ffffff'],
    accentGradient: 'linear-gradient(135deg, #10b981, #059669)',
    companionTitle: 'Bamboo Grove',
    companionStages: ['Bamboo Seedling 🌱', 'Green Sprout 🎋', 'Lush Bamboo 🎍', 'Zen Sanctuary ⛩️✨'],
    companionRanks: ['Garden Novice', 'Verdant Keeper 🌿', 'Grove Guardian 🎋', 'Tea Master 🍵✨'],
    companionQuotes: [
      'Roots run deep in silence before bamboo leaps toward the sun.',
      'Each mindful habit bends like green bamboo without breaking.',
      'Quiet rhythm and pure focus nourish the entire grove.',
      'Tranquil mastery achieved! Your discipline is an oasis of calm.'
    ],
    companionBloomIndicators: ['🌱', '🎋', '🎍', '⛩️✨'],
    shieldName: 'Jade Stones',
    shieldEmoji: '🍵',
    coachName: 'Master Rin',
    coachRole: 'Tea Master & Habit Harmonizer',
    coachGreeting: 'Welcome to the garden. I am <strong>Master Rin</strong>.<br><br>Like preparing the finest matcha, cultivating lasting habits requires patience, warmth, and steady hands. Let us examine your rhythm today.'
  },
  celestial: {
    id: 'celestial',
    name: 'Celestial Nebula',
    icon: '🌌',
    tagline: 'Navigate your monthly horizon across the stars',
    metaColor: '#060714',
    badge: 'Celestial Nebula',
    confettiColors: ['#a855f7', '#38bdf8', '#c084fc', '#ffffff', '#fde047'],
    accentGradient: 'linear-gradient(135deg, #a855f7, #38bdf8)',
    companionTitle: 'Cosmic Core',
    companionStages: ['Stardust Seed ☄️', 'Planetoid 🪐', 'Protostar 🌟', 'Radiant Galaxy 🌌✨'],
    companionRanks: ['Stargazer', 'Orbit Navigator 🛰️', 'Pulsar Captain 🌟', 'Cosmic Sovereign 🌌✨'],
    companionQuotes: [
      'Stardust condenses in the dark before a star is born.',
      'Your orbital velocity is steadying into permanent rhythm.',
      'Pulsar ignition: daily habits burning with cosmic clarity.',
      'Supernova achievement! Your momentum bends space and time.'
    ],
    companionBloomIndicators: ['☄️', '🪐', '🌟', '🌌✨'],
    shieldName: 'Stasis Shields',
    shieldEmoji: '🌌',
    coachName: 'Astra',
    coachRole: 'Cosmic Navigator & Velocity AI',
    coachGreeting: 'Systems online! I am <strong>Astra</strong>, your celestial habit navigator.<br><br>I monitor your orbital trajectory, momentum delta, and execution velocity. All instruments are tuned to keep you on course.'
  },
  cafe: {
    id: 'cafe',
    name: 'Rainy Lo-Fi Café',
    icon: '☕',
    tagline: 'Warm brew, gentle rain, and unhurried consistency',
    metaColor: '#130e0a',
    badge: 'Rainy Lo-Fi Café',
    confettiColors: ['#f59e0b', '#fb923c', '#d97706', '#fed7aa', '#ffffff'],
    accentGradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    companionTitle: 'Café Houseplant',
    companionStages: ['Seed in Mug ☕', 'Small Sprout 🌱', 'Lush Monstera 🪴', 'Blooming Shrub ☕✨'],
    companionRanks: ['Warm Sipper', 'Corner Regular 🥐', 'Roast Specialist ☕', 'Café Connoisseur 🪴✨'],
    companionQuotes: [
      'Take a breath and enjoy the aroma. One sip, one step at a time.',
      'Growth comes from steady watering, not stormy rush.',
      'Your leaves are unfurling with cozy, unhurried discipline.',
      'Perfect blend achieved! A masterpiece of calm consistency.'
    ],
    companionBloomIndicators: ['☕', '🌱', '🪴', '☕✨'],
    shieldName: 'Rain Checks',
    shieldEmoji: '☕',
    coachName: 'Milo the Barista',
    coachRole: 'Warm Café Companion & Routine Specialist',
    coachGreeting: 'Hey there! Pull up a chair and grab a warm cup. I am <strong>Milo</strong>.<br><br>Habit tracking does not have to be stressful—let us take it one calm, steady step at a time while the rain falls outside.'
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk Horizon',
    icon: '⚡',
    tagline: 'Overclock your executive function in neon gridlock',
    metaColor: '#07070f',
    badge: 'Cyberpunk Horizon',
    confettiColors: ['#00f3ff', '#ff007f', '#00ff66', '#ffffff', '#ffe600'],
    accentGradient: 'linear-gradient(135deg, #00f3ff, #ff007f)',
    companionTitle: 'Cyber Core',
    companionStages: ['Dormant Chip 💾', 'Combat Drone 🛸', 'Sentient AI 🤖', 'Singularity Core ⚡💎'],
    companionRanks: ['Script Kiddie', 'Netrunner 🛸', 'Grid Architect 🤖', 'Cyber Singularity ⚡💎'],
    companionQuotes: [
      'Boot sequence initialized. Loading daily protocol stack.',
      'Bandwidth expanding: micro-routines firing without latency.',
      'Overclocked subsystem: productivity output exceeding baseline.',
      'Maximum throughput achieved! Cybernetic singularity unlocked.'
    ],
    companionBloomIndicators: ['💾', '🛸', '🤖', '⚡💎'],
    shieldName: 'Firewall Shields',
    shieldEmoji: '⚡',
    coachName: 'NEXUS-9',
    coachRole: 'Cybernetic Habit Optimizer & Tactical AI',
    coachGreeting: 'Jack in, Operator. <strong>NEXUS-9</strong> tactical interface initialized.<br><br>I analyze execution latency, route around friction, and optimize your monthly throughput. Ready for protocol sync.'
  },
  aurora: {
    id: 'aurora',
    name: 'Nordic Aurora',
    icon: '❄️',
    tagline: 'Crisp arctic focus under shimmering polar skies',
    metaColor: '#060e17',
    badge: 'Nordic Aurora',
    confettiColors: ['#38bdf8', '#34d399', '#bae6fd', '#ffffff', '#a7f3d0'],
    accentGradient: 'linear-gradient(135deg, #38bdf8, #34d399)',
    companionTitle: 'Frost Totem',
    companionStages: ['Frost Shard ❄️', 'Glacial Crystal 💎', 'Spirit Wolf 🐺', 'Aurora Crown 👑✨'],
    companionRanks: ['Snow Scout', 'Tundra Tracker ❄️', 'Glacier Sentinel 🐺', 'Aurora Monarch 👑✨'],
    companionQuotes: [
      'In the quiet chill of the north, great strength crystalizes.',
      'Pure focus cuts through distraction like winter wind.',
      'The northern lights ignite for those who brave the cold trail.',
      'Glacial majesty unlocked! Pure stoic mastery and crystal clarity.'
    ],
    companionBloomIndicators: ['❄️', '💎', '🐺', '👑✨'],
    shieldName: 'Glacier Wards',
    shieldEmoji: '❄️',
    coachName: 'Freja',
    coachRole: 'Nordic Habit Mentor & Stoic Guide',
    coachGreeting: 'Velkommen. I am <strong>Freja</strong>.<br><br>Like surviving the northern winter, discipline is about clarity, eliminating excess, and holding your ground through the storm. Let us see where your trail leads today.'
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset Mirage',
    icon: '🏜️',
    tagline: 'Golden hour calm and steadfast horizon pacing',
    metaColor: '#160e14',
    badge: 'Sunset Mirage',
    confettiColors: ['#fb7185', '#f59e0b', '#fb923c', '#ffffff', '#fecdd3'],
    accentGradient: 'linear-gradient(135deg, #fb7185, #f59e0b)',
    companionTitle: 'Desert Oasis',
    companionStages: ['Pebble & Seed 🪨', 'Flowering Saguaro 🌵', 'Hidden Spring 💧', 'Lush Oasis 🌴✨'],
    companionRanks: ['Dune Wanderer', 'Mirage Seeker 🌵', 'Caravan Leader 🐪', 'Oasis Custodian 🌴✨'],
    companionQuotes: [
      'A long desert journey begins with a single step across the dunes.',
      'Even in dry arid sands, patient roots always find life.',
      'The cool dusk brings refreshment to the determined traveler.',
      'Oasis discovered! A fertile sanctuary earned through enduring grit.'
    ],
    companionBloomIndicators: ['🪨', '🌵', '💧', '🌴✨'],
    shieldName: 'Oasis Sanctuaries',
    shieldEmoji: '🏜️',
    coachName: 'Sol',
    coachRole: 'Desert Guide & Philosophical Mentor',
    coachGreeting: 'Welcome, traveler. I am <strong>Sol</strong>.<br><br>The desert teaches us that haste leads to thirst, but steady pacing crosses any ocean of sand. Let us review the milestones on your journey today.'
  }
};

let currentThemeId = localStorage.getItem('progression_tracker_theme') || 'sakura';
window.THEMES = THEMES;
window.getCurrentTheme = () => currentThemeId;
window.getCurrentThemeData = () => THEMES[currentThemeId] || THEMES.sakura;
window.getCurrentThemeConfettiColors = () => (THEMES[currentThemeId] || THEMES.sakura).confettiColors;

function applyTheme(themeId) {
  if (!THEMES[themeId]) themeId = 'sakura';
  currentThemeId = themeId;
  const theme = THEMES[themeId];

  // 1. HTML Root & Body Attribute
  document.documentElement.setAttribute('data-theme', themeId);
  if (document.body) {
    document.body.setAttribute('data-theme', themeId);
  }

  // 2. Meta Theme Color
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute('content', theme.metaColor);

  // 3. Ambient Canvas Particles
  if (typeof window.setAmbientTheme === 'function') {
    window.setAmbientTheme(themeId);
  }

  // 4. Header Dynamic Updates
  const headerBrandBg = document.getElementById('header-brand-bg');
  if (headerBrandBg) headerBrandBg.style.background = theme.accentGradient;

  const headerBrandIcon = document.getElementById('header-brand-icon');
  if (headerBrandIcon) headerBrandIcon.textContent = theme.icon;

  const headerThemeName = document.getElementById('header-theme-name');
  if (headerThemeName) headerThemeName.textContent = theme.name.split(' ')[0];

  const headerThemeIcon = document.getElementById('header-theme-icon');
  if (headerThemeIcon) headerThemeIcon.textContent = theme.icon;

  const headerThemeBadge = document.getElementById('header-theme-badge');
  if (headerThemeBadge) headerThemeBadge.textContent = theme.badge;

  const headerSubtitle = document.getElementById('header-subtitle');
  if (headerSubtitle) headerSubtitle.textContent = theme.tagline;

  const headerMatrixSpan = document.getElementById('header-matrix-span');
  if (headerMatrixSpan) headerMatrixSpan.style.color = 'var(--accent-pink)';

  // 5. Footer Dynamic Update
  const footerThemeEdition = document.getElementById('footer-theme-edition');
  if (footerThemeEdition) footerThemeEdition.textContent = `${theme.name} Edition`;

  // 6. AI Coach Dynamic Updates
  const aiCoachLauncherIcon = document.getElementById('ai-coach-launcher-icon');
  if (aiCoachLauncherIcon) aiCoachLauncherIcon.textContent = theme.icon;

  const aiCoachLauncherName = document.getElementById('ai-coach-launcher-name');
  if (aiCoachLauncherName) aiCoachLauncherName.textContent = theme.coachName;

  const aiCoachDrawerAvatar = document.getElementById('ai-coach-drawer-avatar');
  if (aiCoachDrawerAvatar) aiCoachDrawerAvatar.textContent = theme.icon;

  const aiCoachDrawerName = document.getElementById('ai-coach-drawer-name');
  if (aiCoachDrawerName) aiCoachDrawerName.textContent = theme.coachName;

  const aiCoachDrawerRole = document.getElementById('ai-coach-drawer-role');
  if (aiCoachDrawerRole) aiCoachDrawerRole.textContent = theme.coachRole;

  const aiCoachInitialIcon = document.getElementById('ai-coach-initial-icon');
  if (aiCoachInitialIcon) aiCoachInitialIcon.textContent = theme.icon;

  const aiCoachInitialText = document.getElementById('ai-coach-initial-text');
  if (aiCoachInitialText) aiCoachInitialText.innerHTML = theme.coachGreeting;

  // 7. Bonsai Quote Icon
  const quoteIcon = document.getElementById('bonsai-quote-icon');
  if (quoteIcon) quoteIcon.textContent = theme.icon;

  // 8. Refresh Theme Dropdown List
  renderThemeMenuList();

  // 9. Re-render companion and shields
  if (typeof state !== 'undefined' && state.activeMonthId && state.months && state.months[state.activeMonthId]) {
    const activeMonth = state.months[state.activeMonthId];
    const { year, month } = parseMonthId(state.activeMonthId);
    const daysInMonth = getDaysInMonth(year, month);
    const { currentYear, currentMonth, currentDay } = getTodayInfo();
    const isActual = (year === currentYear && month === currentMonth);
    const stats = renderSummaryCards(activeMonth, daysInMonth, isActual, currentDay);
    renderBonsai(stats.monthProgressPct, stats.earnedEffortPoints, activeMonth);
  }

  if (window.lucide) lucide.createIcons();
}

window.selectTheme = function(themeId) {
  if (!THEMES[themeId]) return;
  localStorage.setItem('progression_tracker_theme', themeId);
  applyTheme(themeId);
  const menu = document.getElementById('theme-dropdown-menu');
  if (menu) menu.classList.add('hidden');
  if (window.playTickSound) playTickSound(true);
};

window.toggleThemeDropdown = function(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('theme-dropdown-menu');
  if (!menu) return;
  const isHidden = menu.classList.contains('hidden');
  if (isHidden) {
    renderThemeMenuList();
    menu.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  } else {
    menu.classList.add('hidden');
  }
};

function renderThemeMenuList() {
  const container = document.getElementById('theme-list-container');
  if (!container) return;
  container.innerHTML = Object.values(THEMES).map(t => {
    const isActive = t.id === currentThemeId;
    return `
      <button 
        type="button"
        onclick="selectTheme('${t.id}')" 
        class="w-full text-left p-2 rounded-xl flex items-center justify-between gap-2 transition theme-select-item ${isActive ? 'active border border-white/20' : 'border border-transparent'}"
      >
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center text-sm shadow-sm flex-shrink-0" style="background: ${t.accentGradient};">
            <span>${t.icon}</span>
          </div>
          <div class="truncate">
            <div class="text-xs font-bold text-white flex items-center gap-1.5">
              <span>${t.name}</span>
            </div>
            <div class="text-[10px] text-pink-200/60 truncate">${t.tagline}</div>
          </div>
        </div>
        <div class="flex items-center gap-1 flex-shrink-0">
          ${isActive ? `<span class="text-xs font-black text-emerald-400">✓</span>` : ''}
        </div>
      </button>
    `;
  }).join('');
}

// Initial Seed Data Generator (Dynamic to current month)
function getInitialDefaultData() {
  const now = new Date();
  const currentMonthId = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const currentMonthTitle = now.toLocaleString('default', { month: 'long', year: 'numeric' });

  return {
    activeMonthId: currentMonthId,
    months: {
      [currentMonthId]: {
        id: currentMonthId,
        title: currentMonthTitle,
        shieldsUsed: {},
        goals: [
          {
            id: "g1",
            title: "Morning Yoga / Cardio",
            pillarId: "health",
            timeOfDay: "morning",
            effort: 4,
            targetDays: 20,
            checks: { 1: true },
            notes: { 1: { mood: "🌸", text: "Felt rejuvenated and focused!" } }
          },
          {
            id: "g2",
            title: "Deep Work (2h Focus)",
            pillarId: "career",
            timeOfDay: "afternoon",
            effort: 5,
            targetDays: 22,
            checks: { 1: true },
            notes: {}
          },
          {
            id: "g3",
            title: "Read 20 Pages of Book",
            pillarId: "learning",
            timeOfDay: "evening",
            effort: 2,
            targetDays: 26,
            checks: { 1: true },
            notes: {}
          },
          {
            id: "g4",
            title: "Track Expenses & Cashflow",
            pillarId: "finance",
            timeOfDay: "evening",
            effort: 1,
            targetDays: 30,
            checks: {},
            notes: {}
          },
          {
            id: "g5",
            title: "10 Min Meditation & Journal",
            pillarId: "personal",
            timeOfDay: "morning",
            effort: 2,
            targetDays: 30,
            checks: { 1: true },
            notes: {}
          }
        ]
      }
    }
  };
}

const DEFAULT_DATA = getInitialDefaultData();

let state = loadState();
let currentPillarFilter = 'all';
let currentTimeFilter = 'all';

// Active Note Editing Target
let activeNoteTarget = null; // { goalId, day }

function loadState() {
  try {
    const saved = localStorage.getItem('monthly_sakura_all_features_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.months && typeof parsed.months === 'object') {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to load local state:", e);
  }
  return DEFAULT_DATA;
}

function saveState() {
  try {
    localStorage.setItem('monthly_sakura_all_features_state', JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state:", e);
  }
}

// Date Helpers
function parseMonthId(id) {
  if (!id || typeof id !== 'string') {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }
  const [year, month] = id.split('-').map(Number);
  return { year: year || new Date().getFullYear(), month: month || (new Date().getMonth() + 1) };
}

function formatMonthTitle(id) {
  const { year, month } = parseMonthId(id);
  const date = new Date(year, month - 1, 1);
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function getDayOfWeekAbbrev(year, month, day) {
  const date = new Date(year, month - 1, day);
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  return days[date.getDay()];
}

function ensureMonthExists(monthId) {
  if (!state.months[monthId]) {
    state.months[monthId] = {
      id: monthId,
      title: formatMonthTitle(monthId),
      shieldsUsed: {},
      goals: []
    };
    saveState();
  }
  if (!state.months[monthId].shieldsUsed) {
    state.months[monthId].shieldsUsed = {};
  }
}

function getTodayInfo() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();
  return { currentYear, currentMonth, currentDay, now };
}

// Trailing streak ending today (or last day of month)
function calculateStreak(goal, daysInMonth, isActualCurrentMonth, currentDay, shieldsUsed = {}) {
  const checks = goal.checks || {};
  let maxDay = isActualCurrentMonth ? currentDay : daysInMonth;
  let streak = 0;
  for (let d = maxDay; d >= 1; d--) {
    if (checks[d] || shieldsUsed[d]) {
      streak++;
    } else {
      if (d === maxDay && isActualCurrentMonth) continue;
      break;
    }
  }
  return streak;
}

// Maximum consecutive unbroken streak anywhere in the month
function calculateLongestStreak(goal, daysInMonth, shieldsUsed = {}) {
  const checks = goal.checks || {};
  let maxStreak = 0;
  let currentRun = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    if (checks[d] || shieldsUsed[d]) {
      currentRun++;
      if (currentRun > maxStreak) maxStreak = currentRun;
    } else {
      currentRun = 0;
    }
  }
  return maxStreak;
}

window.calculateStreak = calculateStreak;
window.calculateLongestStreak = calculateLongestStreak;

// Main Render Loop
function renderApp() {
  ensureMonthExists(state.activeMonthId);
  const activeMonth = state.months[state.activeMonthId];
  const { year, month } = parseMonthId(state.activeMonthId);
  const daysInMonth = getDaysInMonth(year, month);
  const { currentYear, currentMonth, currentDay } = getTodayInfo();
  const isActualCurrentMonth = (year === currentYear && month === currentMonth);

  document.getElementById('month-display').textContent = activeMonth.title;

  let goals = activeMonth.goals || [];
  if (currentPillarFilter !== 'all') {
    goals = goals.filter(g => g.pillarId === currentPillarFilter);
  }
  if (currentTimeFilter !== 'all') {
    goals = goals.filter(g => (g.timeOfDay || 'any') === currentTimeFilter);
  }

  renderPillarButtons();
  renderTable(activeMonth, goals, daysInMonth, isActualCurrentMonth, currentDay);
  const stats = renderSummaryCards(activeMonth, daysInMonth, isActualCurrentMonth, currentDay);
  
  // Render Extended Features
  renderBonsai(stats.monthProgressPct, stats.earnedEffortPoints, activeMonth);
  renderBriefing(activeMonth, daysInMonth, isActualCurrentMonth, currentDay, activeMonth.goals || []);

  if (window.lucide) {
    lucide.createIcons();
  }
}

function renderPillarButtons() {
  const container = document.getElementById('pillar-buttons');
  if (!container) return;
  container.innerHTML = '';

  const pillAll = document.getElementById('pill-all');
  if (currentPillarFilter === 'all') {
    pillAll.style.background = 'var(--accent-pink)';
    pillAll.style.borderColor = 'rgba(244, 114, 182, 0.5)';
    pillAll.style.color = '#fff';
  } else {
    pillAll.style.background = 'transparent';
    pillAll.style.borderColor = 'var(--border)';
    pillAll.style.color = 'var(--text-muted)';
  }

  PILLARS.forEach(pillar => {
    const btn = document.createElement('button');
    const isActive = currentPillarFilter === pillar.id;
    btn.className = `pillar-filter-btn px-2.5 py-1 rounded-xl border font-bold transition flex items-center gap-1 whitespace-nowrap text-xs`;
    
    if (isActive) {
      btn.style.background = 'var(--accent-pink)';
      btn.style.borderColor = 'rgba(244, 114, 182, 0.5)';
      btn.style.color = '#fff';
    } else {
      btn.style.background = 'transparent';
      btn.style.borderColor = 'var(--border)';
      btn.style.color = 'var(--text-muted)';
    }

    btn.onclick = () => filterPillar(pillar.id);
    btn.innerHTML = `<span>${pillar.emoji}</span> <span>${pillar.name}</span>`;
    container.appendChild(btn);
  });
}

function filterPillar(id) {
  currentPillarFilter = id;
  renderApp();
}

window.filterTimeOfDay = function(tod) {
  currentTimeFilter = tod;
  ['all', 'morning', 'afternoon', 'evening'].forEach(t => {
    const btn = document.getElementById(`tod-${t}`);
    if (btn) {
      if (t === tod) {
        btn.className = "tod-btn px-2 py-0.5 rounded-lg text-[11px] font-bold text-white bg-pink-500/30 transition";
      } else {
        btn.className = "tod-btn px-2 py-0.5 rounded-lg text-[11px] font-medium text-pink-200/70 hover:text-white transition";
      }
    }
  });
  renderApp();
};

function renderTable(activeMonth, goals, daysInMonth, isActualCurrentMonth, currentDay) {
  const tableHeadTr = document.querySelector('#progression-table thead tr');
  const tableBody = document.getElementById('table-body');
  const tableFooter = document.getElementById('table-footer');
  const emptyState = document.getElementById('empty-state');
  const tableWrapper = document.getElementById('table-scroll-wrapper');
  const shieldsUsed = activeMonth.shieldsUsed || {};

  if (goals.length === 0) {
    tableWrapper.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }

  tableWrapper.classList.remove('hidden');
  emptyState.classList.add('hidden');

  const { year, month } = parseMonthId(state.activeMonthId);

  // Table Headers
  let headerHtml = `
    <th class="sticky-col-1 py-2.5 px-3 min-w-[190px] max-w-[190px] border-r border-[var(--border)] z-30 shadow-[2px_0_8px_rgba(0,0,0,0.4)]">
      <div class="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-pink-100">
        <span class="text-pink-400">🌸</span>
        <span>Habit / Goal</span>
      </div>
    </th>
    <th class="sticky-col-2 py-2.5 px-2.5 min-w-[110px] max-w-[110px] border-r border-[var(--border)] z-30 shadow-[2px_0_8px_rgba(0,0,0,0.4)]">
      <div class="font-bold uppercase tracking-wider text-[10px] text-pink-100">
        Pillar
      </div>
    </th>
  `;

  for (let day = 1; day <= daysInMonth; day++) {
    const dow = getDayOfWeekAbbrev(year, month, day);
    const isToday = isActualCurrentMonth && (day === currentDay);
    const isShielded = !!shieldsUsed[day];

    headerHtml += `
      <th id="th-day-${day}" class="py-2 px-0.5 min-w-[32px] max-w-[32px] text-center border-r border-[var(--border-subtle)] select-none relative ${
        isToday ? 'border-x border-pink-400/50' : ''
      }" style="${isToday ? 'background: var(--today-col);' : ''}">
        ${isToday ? '<span class="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1 rounded-full bg-pink-400 shadow-sm shadow-pink-400"></span>' : ''}
        <div class="text-[9px] uppercase font-bold tracking-tight ${isToday ? 'font-black text-pink-300' : 'text-pink-200/60'}">${dow}</div>
        <div class="text-[11px] font-mono-num font-bold mt-0.5 flex items-center justify-center gap-0.5 ${isToday ? 'scale-105 text-white font-black' : 'text-pink-100'}">
          ${isShielded ? '<span title="Protected Rest Day" class="text-[9px]">🛡️</span>' : day}
        </div>
      </th>
    `;
  }

  headerHtml += `
    <th class="py-2.5 px-2 text-center min-w-[85px] border-l border-[var(--border)]">
      <span class="font-bold uppercase tracking-wider text-[10px] text-pink-100">Days</span>
    </th>
    <th class="py-2.5 px-3 text-center min-w-[125px] border-l border-[var(--border)]">
      <span class="font-bold uppercase tracking-wider text-[10px] text-pink-100">Progress</span>
    </th>
    <th class="py-2.5 px-2 text-center min-w-[36px] border-l border-[var(--border)]"></th>
  `;
  tableHeadTr.innerHTML = headerHtml;

  // Table Body Rows
  tableBody.innerHTML = '';
  goals.forEach(goal => {
    const pillar = PILLARS.find(p => p.id === goal.pillarId) || PILLARS[0];
    const checks = goal.checks || {};
    const notes = goal.notes || {};
    
    let checkedCount = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      if (checks[d] || shieldsUsed[d]) checkedCount++;
    }

    const targetDays = goal.targetDays || daysInMonth;
    const progressPct = Math.min(100, Math.round((checkedCount / targetDays) * 100));
    const isGoalMet = checkedCount >= targetDays;
    const streak = calculateStreak(goal, daysInMonth, isActualCurrentMonth, currentDay, shieldsUsed);

    const row = document.createElement('tr');
    row.className = 'hover:bg-pink-500/[0.06] transition-colors group';

    const todEmoji = goal.timeOfDay === 'morning' ? '🌅' : goal.timeOfDay === 'afternoon' ? '☀️' : goal.timeOfDay === 'evening' ? '🌙' : '';

    const safeGoalId = escapeHtml(goal.id);
    const safeGoalTitle = escapeHtml(goal.title);

    let rowHtml = `
      <td class="sticky-col-1 py-2.5 px-3 border-r border-[var(--border)] z-20 shadow-[2px_0_8px_rgba(0,0,0,0.4)]">
        <div class="flex items-center justify-between gap-1.5">
          <div class="font-semibold truncate text-xs text-white flex items-center gap-1" title="${safeGoalTitle}">
            ${todEmoji ? `<span class="text-[10px]">${todEmoji}</span>` : ''}
            <span>${safeGoalTitle}</span>
          </div>
          ${streak > 1 ? `<span class="flex items-center gap-0.5 text-[9px] font-bold text-amber-300 bg-amber-400/15 px-1 py-0.5 rounded-full border border-amber-400/25 font-mono-num">🔥${streak}d</span>` : ''}
        </div>
        <div class="text-[10px] text-pink-200/60 mt-0.5 font-mono-num font-medium">${targetDays}d target</div>
      </td>

      <td class="sticky-col-2 py-2.5 px-2.5 border-r border-[var(--border)] z-20 shadow-[2px_0_8px_rgba(0,0,0,0.4)]">
        <div class="flex items-center gap-1 flex-wrap">
          <span class="text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${pillar.badge}">
            ${pillar.emoji} ${pillar.name}
          </span>
          <span class="text-[9px] font-mono-num text-pink-200/60">
            ⚡${goal.effort}p
          </span>
        </div>
      </td>
    `;

    // Compact Day Cell Buttons
    for (let day = 1; day <= daysInMonth; day++) {
      const isChecked = !!checks[day];
      const isShielded = !!shieldsUsed[day];
      const isToday = isActualCurrentMonth && (day === currentDay);
      const note = notes[day];

      const rawCellTitle = isShielded 
        ? `Day ${day}: Rest Day (Shielded)`
        : (note ? `Day ${day} [${note.mood || '🌸'}]: ${note.text || ''}` : `Day ${day}: ${isChecked ? 'Completed' : 'Click to complete'}`);
      const safeCellTitle = escapeHtml(rawCellTitle);
      const safeNoteText = note ? escapeHtml(`Note: ${note.mood || ''} ${note.text || ''}`) : '';

      rowHtml += `
        <td class="py-1.5 px-0.5 text-center border-r border-[var(--border-subtle)] ${isToday ? 'border-x border-pink-400/40' : ''}" style="${isToday ? 'background: var(--today-col);' : ''}">
          <div class="relative inline-block">
            <button 
              type="button" 
              onclick="toggleCheck('${safeGoalId}', ${day}, event)"
              oncontextmenu="event.preventDefault(); openNoteModal('${safeGoalId}', ${day});"
              title="${safeCellTitle}"
              aria-label="${safeCellTitle}"
              class="matrix-cell-btn w-6 h-6 mx-auto rounded-md flex items-center justify-center font-bold text-slate-950 shadow-sm relative ${
                isShielded
                  ? 'bg-amber-400/80 border border-amber-300 scale-95'
                  : (isChecked 
                    ? `bg-gradient-to-tr ${pillar.checkGradient} scale-100 shadow-sm shadow-pink-500/25` 
                    : 'border border-pink-300/10 text-transparent opacity-30 hover:opacity-75 hover:border-pink-300/30 bg-black/30')
              }"
            >
              ${isShielded ? '<span class="text-[10px]">🛡️</span>' : `<i data-lucide="check" class="w-3.5 h-3.5 stroke-[3] ${isChecked ? 'opacity-100 text-slate-950' : 'opacity-0'}"></i>`}
            </button>
            ${note ? `<span class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-pink-400 ring-1 ring-black shadow-sm" title="${safeNoteText}"></span>` : ''}
          </div>
        </td>
      `;
    }

    // Summary columns
    rowHtml += `
      <td class="py-2.5 px-2 text-center border-l border-[var(--border)] font-mono-num text-xs">
        <span class="font-bold ${isGoalMet ? 'text-emerald-300' : 'text-white'}">${checkedCount}</span>
        <span class="text-pink-200/50 text-[11px]">/${targetDays}</span>
      </td>
      <td class="py-2.5 px-3 border-l border-[var(--border)]">
        <div class="flex items-center gap-2">
          <div class="w-full rounded-full h-1.5 overflow-hidden bg-black/40 border border-pink-400/20">
            <div class="h-full rounded-full transition-all duration-300 ${isGoalMet ? 'bg-emerald-400' : 'bg-gradient-to-r from-pink-400 to-rose-400'}" style="width: ${progressPct}%;"></div>
          </div>
          <span class="text-[11px] font-mono-num font-bold min-w-[32px] text-right ${isGoalMet ? 'text-emerald-300' : 'text-pink-200'}">${progressPct}%</span>
        </div>
      </td>
      <td class="py-2.5 px-2 text-center border-l border-[var(--border)]">
        <button onclick="deleteGoal('${safeGoalId}')" title="Delete Habit" aria-label="Delete Habit" class="text-pink-300/40 hover:text-rose-400 p-0.5 rounded transition opacity-50 group-hover:opacity-100">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </td>
    `;

    row.innerHTML = rowHtml;
    tableBody.appendChild(row);
  });

  // Table Footer: Daily Consistency Meter
  let footerHtml = `
    <tr class="py-3 bg-[#100816]/75">
      <td class="sticky-col-1 py-2 px-3 border-r border-[var(--border)] z-20 font-bold text-[10px] uppercase tracking-wider text-pink-100 shadow-[2px_0_8px_rgba(0,0,0,0.4)]">
        🌸 Daily Score
      </td>
      <td class="sticky-col-2 py-2 px-2.5 border-r border-[var(--border)] z-20 text-[10px] text-pink-200/70 font-medium shadow-[2px_0_8px_rgba(0,0,0,0.4)]">
        Consistency
      </td>
  `;

  for (let day = 1; day <= daysInMonth; day++) {
    let dayChecked = 0;
    const isShielded = !!shieldsUsed[day];
    goals.forEach(g => {
      if (g.checks && g.checks[day]) dayChecked++;
    });

    const dayPct = isShielded ? 100 : (goals.length > 0 ? Math.round((dayChecked / goals.length) * 100) : 0);
    const isToday = isActualCurrentMonth && (day === currentDay);

    footerHtml += `
      <td class="py-2 px-0.5 text-center font-mono-num text-[10px] border-r border-[var(--border-subtle)] ${isToday ? 'border-x border-pink-400/50 font-bold' : ''}" style="${isToday ? 'background: var(--today-col);' : ''}">
        <div style="${dayPct === 100 ? 'color: #34d399; font-weight: 700;' : dayPct >= 50 ? 'color: #f472b6;' : 'color: #d8b4e2;'}">${isShielded ? '🛡️' : `${dayPct}%`}</div>
        <div class="w-full rounded-full h-0.5 mt-0.5 overflow-hidden bg-black/50">
          <div class="h-full" style="width: ${dayPct}%; background: ${dayPct === 100 ? '#34d399' : 'linear-gradient(90deg, #f472b6, #fb7185)'};"></div>
        </div>
      </td>
    `;
  }

  footerHtml += `
    <td colspan="3" class="py-2 px-3 text-center border-l border-[var(--border)] text-[10px] text-pink-200/70 font-medium">
      Live rhythm
    </td>
  </tr>`;
  tableFooter.innerHTML = footerHtml;
}

function renderSummaryCards(activeMonth, daysInMonth, isActualCurrentMonth, currentDay) {
  const allGoals = activeMonth.goals || [];
  const shieldsUsed = activeMonth.shieldsUsed || {};

  let totalAvailableEffortPoints = 0;
  let earnedEffortPoints = 0;
  let totalTicks = 0;
  let targetTicks = 0;
  let bestStreak = 0;

  allGoals.forEach(g => {
    const effort = g.effort || 1;
    const target = g.targetDays || daysInMonth;
    let checksCount = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      if ((g.checks && g.checks[d]) || shieldsUsed[d]) checksCount++;
    }

    const ratio = Math.min(1.0, checksCount / target);
    totalAvailableEffortPoints += effort;
    earnedEffortPoints += ratio * effort;

    totalTicks += checksCount;
    targetTicks += target;

    const s = calculateLongestStreak(g, daysInMonth, shieldsUsed);
    if (s > bestStreak) bestStreak = s;
  });

  const monthProgressPct = totalAvailableEffortPoints > 0 
    ? Math.round((earnedEffortPoints / totalAvailableEffortPoints) * 100) 
    : 0;

  document.getElementById('stat-month-percentage').textContent = `${monthProgressPct}%`;
  document.getElementById('stat-points-ratio').textContent = `${Math.round(earnedEffortPoints)}/${totalAvailableEffortPoints} pts`;
  document.getElementById('stat-progress-bar').style.width = `${monthProgressPct}%`;
  document.getElementById('stat-best-streak').textContent = `${bestStreak}d`;

  let todayDone = 0;
  let todayTotal = allGoals.length;
  if (isActualCurrentMonth && todayTotal > 0) {
    allGoals.forEach(g => {
      if ((g.checks && g.checks[currentDay]) || shieldsUsed[currentDay]) todayDone++;
    });
    const todayPct = Math.round((todayDone / todayTotal) * 100);
    document.getElementById('stat-today-percentage').textContent = `${todayPct}%`;
    document.getElementById('stat-today-ratio').textContent = shieldsUsed[currentDay] 
      ? `Rest Day 🛡️` 
      : `${todayDone} of ${todayTotal}`;
    document.getElementById('stat-today-date-text').textContent = `Day ${currentDay} of ${daysInMonth}`;
  } else {
    document.getElementById('stat-today-percentage').textContent = `--`;
    document.getElementById('stat-today-ratio').textContent = `Other month`;
    document.getElementById('stat-today-date-text').textContent = `Pick current month`;
  }

  const { year: activeYear, month: activeMonthNum } = parseMonthId(state.activeMonthId);
  const { currentYear, currentMonth } = getTodayInfo();
  let elapsedDays = 0;
  if (isActualCurrentMonth) {
    elapsedDays = currentDay;
  } else if (activeYear < currentYear || (activeYear === currentYear && activeMonthNum < currentMonth)) {
    elapsedDays = daysInMonth;
  }
  let expectedPct = Math.round((elapsedDays / daysInMonth) * 100);
  let delta = monthProgressPct - expectedPct;

  const pacingBadge = document.getElementById('pacing-badge');
  const pacingDelta = document.getElementById('stat-pacing-delta');
  const pacingSubtext = document.getElementById('stat-pacing-subtext');
  const daysLeft = Math.max(0, daysInMonth - elapsedDays);

  document.getElementById('stat-days-left').textContent = `${daysLeft}d left`;

  if (delta >= 5) {
    pacingBadge.textContent = "Ahead 🌸";
    pacingBadge.className = "text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-pink-400/35 bg-pink-400/15 text-pink-200 font-mono-num";
    pacingDelta.textContent = `+${delta}%`;
    pacingDelta.style.color = "#f472b6";
  } else if (delta < -10) {
    pacingBadge.textContent = "Behind";
    pacingBadge.className = "text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-rose-400/30 bg-rose-400/10 text-rose-300 font-mono-num";
    pacingDelta.textContent = `${delta}%`;
    pacingDelta.style.color = "#fb7185";
  } else {
    pacingBadge.textContent = "On Track";
    pacingBadge.className = "text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-pink-400/25 bg-pink-400/10 text-pink-200 font-mono-num";
    pacingDelta.textContent = `${delta >= 0 ? '+' : ''}${delta}%`;
    pacingDelta.style.color = "#ffffff";
  }

  pacingSubtext.textContent = `Elapsed ${expectedPct}%`;
  document.getElementById('stat-total-target-ticks').textContent = `${targetTicks} ticks`;

  return { monthProgressPct, earnedEffortPoints, totalAvailableEffortPoints, bestStreak, delta };
}

// 🌸 Procedural Companion SVG Graphics Engine for 7 Themes
function generateCompanionSvg(themeId, stage, pct) {
  if (themeId === 'matcha') {
    let leavesSvg = '';
    if (stage === 1) {
      leavesSvg = `
        <ellipse cx="40" cy="22" rx="4" ry="2" fill="#34d399" transform="rotate(-30 40 22)"/>
        <ellipse cx="52" cy="14" rx="5" ry="2" fill="#34d399" transform="rotate(30 52 14)"/>
      `;
    } else if (stage === 2) {
      leavesSvg = `
        <ellipse cx="40" cy="22" rx="6" ry="2.5" fill="#34d399" transform="rotate(-35 40 22)"/>
        <ellipse cx="52" cy="14" rx="7" ry="3" fill="#6ee7b7" transform="rotate(35 52 14)"/>
        <ellipse cx="52" cy="24" rx="6" ry="2.5" fill="#10b981" transform="rotate(-25 52 24)"/>
        <ellipse cx="64" cy="30" rx="5" ry="2.5" fill="#34d399" transform="rotate(40 64 30)"/>
      `;
    } else if (stage === 3) {
      leavesSvg = `
        <ellipse cx="38" cy="22" rx="8" ry="3.5" fill="#34d399" transform="rotate(-35 38 22)"/>
        <ellipse cx="52" cy="14" rx="10" ry="4" fill="#6ee7b7" transform="rotate(35 52 14)"/>
        <ellipse cx="52" cy="24" rx="8" ry="3" fill="#10b981" transform="rotate(-25 52 24)"/>
        <ellipse cx="64" cy="30" rx="8" ry="3.5" fill="#34d399" transform="rotate(40 64 30)"/>
        <ellipse cx="40" cy="40" rx="7" ry="3" fill="#34d399" transform="rotate(-40 40 40)"/>
        <ellipse cx="64" cy="45" rx="7" ry="3" fill="#10b981" transform="rotate(30 64 45)"/>
      `;
    } else {
      leavesSvg = `
        <ellipse cx="38" cy="20" rx="10" ry="4" fill="#6ee7b7" transform="rotate(-35 38 20)"/>
        <ellipse cx="52" cy="12" rx="12" ry="5" fill="#34d399" transform="rotate(35 52 12)"/>
        <ellipse cx="52" cy="22" rx="10" ry="4" fill="#10b981" transform="rotate(-25 52 22)"/>
        <ellipse cx="64" cy="28" rx="10" ry="4" fill="#6ee7b7" transform="rotate(40 64 28)"/>
        <ellipse cx="40" cy="38" rx="9" ry="3.5" fill="#34d399" transform="rotate(-40 40 38)"/>
        <ellipse cx="64" cy="42" rx="9" ry="3.5" fill="#10b981" transform="rotate(30 64 42)"/>
        <circle cx="52" cy="12" r="2.5" fill="#fde047"/>
      `;
    }
    return `
      <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
        <rect x="25" y="80" width="50" height="12" rx="4" fill="#0c2415" stroke="rgba(52,211,153,0.4)" stroke-width="2"/>
        <path d="M40 80 L40 22" stroke="#10b981" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M52 80 L52 14" stroke="#34d399" stroke-width="5" stroke-linecap="round"/>
        <path d="M64 80 L64 30" stroke="#059669" stroke-width="4" stroke-linecap="round"/>
        <line x1="37" y1="60" x2="43" y2="60" stroke="#a7f3d0" stroke-width="2"/>
        <line x1="37" y1="40" x2="43" y2="40" stroke="#a7f3d0" stroke-width="2"/>
        <line x1="49" y1="62" x2="55" y2="62" stroke="#a7f3d0" stroke-width="2"/>
        <line x1="49" y1="38" x2="55" y2="38" stroke="#a7f3d0" stroke-width="2"/>
        <line x1="49" y1="20" x2="55" y2="20" stroke="#a7f3d0" stroke-width="2"/>
        <line x1="61" y1="55" x2="67" y2="55" stroke="#a7f3d0" stroke-width="2"/>
        ${leavesSvg}
      </svg>
    `;
  }

  if (themeId === 'celestial') {
    const coreR = 12 + stage * 3;
    return `
      <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]">
        <circle cx="20" cy="25" r="1.5" fill="#fff" opacity="0.8"/>
        <circle cx="82" cy="20" r="1.2" fill="#38bdf8" opacity="0.9"/>
        <circle cx="18" cy="75" r="1.2" fill="#c084fc" opacity="0.7"/>
        <defs>
          <radialGradient id="celestial-grad-${stage}" cx="40%" cy="40%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="45%" stop-color="#a855f7"/>
            <stop offset="100%" stop-color="#38bdf8"/>
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="rgba(56,189,248,0.7)" stroke-width="2" transform="rotate(-20 50 50)"/>
        <circle cx="50" cy="50" r="${coreR}" fill="url(#celestial-grad-${stage})"/>
        <circle cx="78" cy="40" r="${2 + stage * 0.8}" fill="#fde047" opacity="0.9"/>
      </svg>
    `;
  }

  if (themeId === 'cafe') {
    let cafeLeaves = '';
    if (stage === 1) {
      cafeLeaves = `<ellipse cx="50" cy="25" rx="4" ry="2" fill="#34d399" transform="rotate(-20 50 25)"/>`;
    } else if (stage === 2) {
      cafeLeaves = `
        <ellipse cx="46" cy="26" rx="6" ry="3" fill="#34d399" transform="rotate(-30 46 26)"/>
        <ellipse cx="54" cy="22" rx="7" ry="3.5" fill="#10b981" transform="rotate(25 54 22)"/>
      `;
    } else if (stage === 3) {
      cafeLeaves = `
        <ellipse cx="44" cy="28" rx="8" ry="4" fill="#34d399" transform="rotate(-35 44 28)"/>
        <ellipse cx="56" cy="22" rx="9" ry="4.5" fill="#10b981" transform="rotate(30 56 22)"/>
        <ellipse cx="50" cy="15" rx="8" ry="4" fill="#6ee7b7" transform="rotate(-10 50 15)"/>
      `;
    } else {
      cafeLeaves = `
        <ellipse cx="42" cy="28" rx="10" ry="5" fill="#34d399" transform="rotate(-35 42 28)"/>
        <ellipse cx="58" cy="22" rx="11" ry="5.5" fill="#10b981" transform="rotate(30 58 22)"/>
        <ellipse cx="50" cy="14" rx="10" ry="5" fill="#6ee7b7" transform="rotate(-10 50 14)"/>
        <circle cx="50" cy="14" r="2.5" fill="#f59e0b"/>
      `;
    }
    return `
      <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
        <rect x="30" y="55" width="40" height="32" rx="8" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
        <path d="M70 62 C78 62, 80 78, 70 78" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
        <path d="M50 55 Q48 40 50 25" fill="none" stroke="#15803d" stroke-width="3.5" stroke-linecap="round"/>
        ${cafeLeaves}
        <path d="M38 50 Q36 42 40 36" fill="none" stroke="rgba(254,215,170,0.5)" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M62 50 Q64 42 60 36" fill="none" stroke="rgba(254,215,170,0.5)" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `;
  }

  if (themeId === 'cyberpunk') {
    return `
      <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_0_10px_rgba(0,243,255,0.7)]">
        <polygon points="50,15 82,32 82,68 50,85 18,68 18,32" fill="#0d0d1f" stroke="#00f3ff" stroke-width="2.2"/>
        <circle cx="50" cy="50" r="${10 + stage * 2.5}" fill="none" stroke="#ff007f" stroke-width="2"/>
        <circle cx="50" cy="50" r="${4 + stage * 1.5}" fill="#00f3ff"/>
        <line x1="50" y1="15" x2="50" y2="30" stroke="#00f3ff" stroke-width="1.5"/>
        <line x1="50" y1="85" x2="50" y2="70" stroke="#00f3ff" stroke-width="1.5"/>
        <line x1="18" y1="50" x2="32" y2="50" stroke="#ff007f" stroke-width="1.5"/>
        <line x1="82" y1="50" x2="68" y2="50" stroke="#ff007f" stroke-width="1.5"/>
      </svg>
    `;
  }

  if (themeId === 'aurora') {
    return `
      <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]">
        <polygon points="50,12 80,45 50,88 20,45" fill="#082f49" stroke="#38bdf8" stroke-width="2"/>
        <polygon points="50,12 50,88 20,45" fill="rgba(52,211,153,0.3)"/>
        <polygon points="50,12 80,45 50,88" fill="rgba(56,189,248,0.35)"/>
        <circle cx="50" cy="45" r="${3 + stage * 2}" fill="#bae6fd"/>
        <line x1="50" y1="${40 - stage * 4}" x2="50" y2="${50 + stage * 4}" stroke="#fff" stroke-width="1.5"/>
        <line x1="${45 - stage * 4}" y1="45" x2="${55 + stage * 4}" y2="45" stroke="#fff" stroke-width="1.5"/>
      </svg>
    `;
  }

  if (themeId === 'sunset') {
    return `
      <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_0_8px_rgba(251,113,133,0.6)]">
        <defs>
          <linearGradient id="sunset-sun-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fb7185"/>
            <stop offset="100%" stop-color="#f59e0b"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="38" r="20" fill="url(#sunset-sun-grad)"/>
        <path d="M10 82 Q30 70 50 82 Q70 70 90 82 L90 90 L10 90 Z" fill="#7c2d12" stroke="#f59e0b" stroke-width="1.5"/>
        <path d="M50 78 L50 42" stroke="#10b981" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M42 56 L42 48 Q42 56 50 56" stroke="#10b981" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M58 52 L58 44 Q58 52 50 52" stroke="#10b981" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="50" cy="40" r="${1.5 + stage * 1.2}" fill="#fb7185"/>
      </svg>
    `;
  }

  // Default: Sakura Bonsai
  let blossomsSvg = '';
  if (stage === 1) {
    blossomsSvg = `
      <circle cx="28" cy="40" r="3" fill="#4ade80" opacity="0.8"/>
      <circle cx="50" cy="16" r="3" fill="#4ade80" opacity="0.8"/>
      <circle cx="72" cy="32" r="3" fill="#4ade80" opacity="0.8"/>
    `;
  } else if (stage === 2) {
    blossomsSvg = `
      <circle cx="28" cy="40" r="5" fill="#f472b6" opacity="0.85"/>
      <circle cx="25" cy="36" r="4" fill="#4ade80" opacity="0.8"/>
      <circle cx="50" cy="16" r="6" fill="#f472b6" opacity="0.85"/>
      <circle cx="54" cy="12" r="4" fill="#fb7185" opacity="0.8"/>
      <circle cx="72" cy="32" r="5" fill="#f472b6" opacity="0.85"/>
    `;
  } else if (stage === 3) {
    blossomsSvg = `
      <ellipse cx="26" cy="38" rx="9" ry="7" fill="#f472b6" opacity="0.9"/>
      <ellipse cx="50" cy="16" rx="12" ry="9" fill="#f472b6" opacity="0.9"/>
      <ellipse cx="72" cy="30" rx="9" ry="7" fill="#f472b6" opacity="0.9"/>
      <circle cx="48" cy="15" r="2.5" fill="#fde047"/>
    `;
  } else {
    blossomsSvg = `
      <ellipse cx="26" cy="36" rx="12" ry="9" fill="#f472b6" opacity="0.95"/>
      <ellipse cx="50" cy="14" rx="16" ry="12" fill="#fb7185" opacity="0.95"/>
      <ellipse cx="74" cy="28" rx="12" ry="9" fill="#f472b6" opacity="0.95"/>
      <circle cx="50" cy="14" r="3.5" fill="#fde047"/>
      <circle cx="26" cy="36" r="2.5" fill="#fde047"/>
      <circle cx="74" cy="28" r="2.5" fill="#fde047"/>
      <circle cx="58" cy="24" r="2" fill="#fff" opacity="0.8"/>
    `;
  }

  return `
    <svg id="bonsai-svg" viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]">
      <ellipse cx="50" cy="88" rx="28" ry="7" fill="#241434" stroke="rgba(244,114,182,0.4)" stroke-width="2"/>
      <rect x="26" y="80" width="48" height="10" rx="3" fill="#1b0e28" stroke="rgba(244,114,182,0.3)" stroke-width="1.5"/>
      <path d="M50 82 Q46 62 52 50 Q56 40 48 30 Q44 24 50 16" fill="none" stroke="#653528" stroke-width="6" stroke-linecap="round"/>
      <path d="M49 52 Q34 46 28 40" fill="none" stroke="#653528" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M51 42 Q66 36 72 32" fill="none" stroke="#653528" stroke-width="3.5" stroke-linecap="round"/>
      <g id="bonsai-foliage">${blossomsSvg}</g>
    </svg>
  `;
}

// 🌸 Avatar Growth Engine (Adapts to all 7 Themes)
function renderBonsai(pct, earnedPoints, activeMonth) {
  const container = document.getElementById('bonsai-tree-container');
  const stageTitle = document.getElementById('bonsai-stage-title');
  const rankBadge = document.getElementById('bonsai-rank-badge');
  const xpText = document.getElementById('bonsai-xp-text');
  const progressText = document.getElementById('bonsai-progress-text');
  const xpBar = document.getElementById('bonsai-xp-bar');
  const growthQuote = document.getElementById('bonsai-growth-quote');
  const nextRank = document.getElementById('bonsai-next-rank');
  const shieldsTitleLabel = document.getElementById('shields-title-label');
  const shieldsStatusText = document.getElementById('shields-status-text');
  const tokensContainer = document.getElementById('shield-tokens-container');

  if (!container) return;

  const theme = THEMES[currentThemeId] || THEMES.sakura;

  const xp = Math.round(earnedPoints * 15);
  if (xpText) xpText.textContent = `${xp} XP`;
  if (progressText) progressText.textContent = `${pct}% Bloom`;
  if (xpBar) {
    xpBar.style.width = `${Math.min(100, pct)}%`;
    xpBar.style.background = theme.accentGradient;
  }

  let stage = 1;
  if (pct >= 75) stage = 4;
  else if (pct >= 50) stage = 3;
  else if (pct >= 25) stage = 2;
  else stage = 1;

  const stageIdx = stage - 1;
  const stageName = theme.companionStages[stageIdx] || theme.companionStages[0];
  const rankName = theme.companionRanks[stageIdx] || theme.companionRanks[0];
  const quoteText = theme.companionQuotes[stageIdx] || theme.companionQuotes[0];
  const bloomEmoji = theme.companionBloomIndicators[stageIdx] || '✨';

  if (stageTitle) stageTitle.textContent = stageName;
  if (rankBadge) rankBadge.textContent = rankName;
  if (growthQuote) growthQuote.textContent = `"${quoteText}"`;
  if (nextRank) nextRank.textContent = `Stage ${stage}/4`;

  // Procedural SVG graphics
  const svgMarkup = generateCompanionSvg(currentThemeId, stage, pct);
  container.innerHTML = `
    ${svgMarkup}
    <div id="bonsai-bloom-indicator" class="absolute -top-1 -right-1 text-xs">${bloomEmoji}</div>
  `;

  // Rest Shields Render
  if (shieldsTitleLabel) {
    shieldsTitleLabel.textContent = `${theme.shieldName} 🛡️`;
  }

  const shieldsUsed = activeMonth.shieldsUsed || {};
  const usedCount = Object.keys(shieldsUsed).length;
  const remaining = Math.max(0, 3 - usedCount);

  if (shieldsStatusText) {
    shieldsStatusText.textContent = `${remaining} of 3 ready`;
  }

  if (tokensContainer) {
    let tokensHtml = '';
    for (let i = 0; i < 3; i++) {
      if (i < remaining) {
        tokensHtml += `<span class="w-7 h-7 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-xs shadow-sm" title="${theme.shieldName} Available">${theme.shieldEmoji}</span>`;
      } else {
        tokensHtml += `<span class="w-7 h-7 rounded-xl bg-black/40 border border-pink-400/10 flex items-center justify-center text-xs opacity-40" title="Shield Used">🛡️</span>`;
      }
    }
    tokensContainer.innerHTML = tokensHtml;
  }
}

window.celebrateBonsai = function() {
  if (window.playTickSound) playTickSound(true);
  fireGrandCelebration();
};

window.usePetalShieldToday = function() {
  const theme = THEMES[currentThemeId] || THEMES.sakura;
  const { currentDay, currentMonth, currentYear } = getTodayInfo();
  const { year, month } = parseMonthId(state.activeMonthId);

  if (year !== currentYear || month !== currentMonth) {
    alert(`Please navigate to the current month to activate a ${theme.shieldName.slice(0, -1)}.`);
    return;
  }

  const activeMonth = state.months[state.activeMonthId];
  if (!activeMonth.shieldsUsed) activeMonth.shieldsUsed = {};

  if (activeMonth.shieldsUsed[currentDay]) {
    if (confirm(`Remove today's ${theme.shieldName.slice(0, -1)}?`)) {
      delete activeMonth.shieldsUsed[currentDay];
      saveState();
      renderApp();
    }
    return;
  }

  const usedCount = Object.keys(activeMonth.shieldsUsed).length;
  if (usedCount >= 3) {
    alert(`You have used all 3 ${theme.shieldName} for this month! Cherish your rest and keep showing up.`);
    return;
  }

  if (confirm(`Activate a ${theme.shieldName.slice(0, -1)} for today (Day ${currentDay})? This protects your streaks for all habits as a mindful Rest Day ${theme.shieldEmoji}`)) {
    activeMonth.shieldsUsed[currentDay] = true;
    if (typeof playFanfareSound === 'function') playFanfareSound();
    if (typeof fireGrandCelebration === 'function') fireGrandCelebration();
    saveState();
    renderApp();
  }
};

// ☀️ Zen Morning Briefing & Quick Tap Chips
function renderBriefing(activeMonth, daysInMonth, isActualCurrentMonth, currentDay, allGoals) {
  const briefingMsg = document.getElementById('briefing-message');
  const briefingBadge = document.getElementById('briefing-time-badge');
  const chipsContainer = document.getElementById('today-quick-chips');

  if (!briefingMsg || !chipsContainer) return;

  const hour = new Date().getHours();
  const timeName = hour < 12 ? "Morning Flow 🌅" : hour < 18 ? "Afternoon Focus ☀️" : "Evening Cadence 🌙";
  briefingBadge.textContent = timeName;

  if (isActualCurrentMonth && allGoals.length > 0) {
    const isTodayShielded = !!activeMonth.shieldsUsed && !!activeMonth.shieldsUsed[currentDay];
    if (isTodayShielded) {
      briefingMsg.textContent = "🛡️ Rest Day active! Streaks for all habits are peacefully protected today.";
      chipsContainer.innerHTML = '';
      return;
    }

    const uncompletedToday = allGoals.filter(g => !g.checks || !g.checks[currentDay]);
    if (uncompletedToday.length === 0) {
      briefingMsg.textContent = "🌸 All habits completed for today! Your bonsai is in full serene bloom.";
      chipsContainer.innerHTML = '';
    } else {
      briefingMsg.textContent = `${uncompletedToday.length} habit${uncompletedToday.length > 1 ? 's' : ''} remaining today. Tap to check off or type below:`;
      // Populate interactive quick-tap chips safely escaped
      chipsContainer.innerHTML = uncompletedToday.slice(0, 3).map(g => `
        <button onclick="toggleCheck('${escapeHtml(g.id)}', ${currentDay}, event)" class="px-2 py-1 rounded-lg border border-pink-400/25 bg-pink-500/10 hover:bg-pink-500/25 text-[10px] font-bold text-pink-200 transition flex items-center gap-1 whitespace-nowrap shadow-sm">
          <span>+</span> <span>${escapeHtml(g.title.split(' ')[0])}</span>
        </button>
      `).join('');
    }
  } else {
    briefingMsg.textContent = "Browse your historical rhythms or add new habits to cultivate your progression.";
    chipsContainer.innerHTML = '';
  }
}

window.handleNaturalInputKey = function(event) {
  if (event.key !== 'Enter') return;
  const input = document.getElementById('natural-check-input');
  const query = (input.value || '').trim().toLowerCase();
  if (!query) return;

  const { currentDay, currentMonth, currentYear } = getTodayInfo();
  const { year, month } = parseMonthId(state.activeMonthId);

  if (year !== currentYear || month !== currentMonth) {
    alert("Please navigate to the current month to log check-ins.");
    return;
  }

  const activeMonth = state.months[state.activeMonthId];
  let matchedCount = 0;

  (activeMonth.goals || []).forEach(g => {
    if (g.title.toLowerCase().includes(query)) {
      if (!g.checks) g.checks = {};
      if (!g.checks[currentDay]) {
        g.checks[currentDay] = true;
        matchedCount++;
      }
    }
  });

  if (matchedCount > 0) {
    playTickSound(true);
    fireTileSparks();
    input.value = '';
    saveState();
    renderApp();
  } else {
    alert(`No matching habit found for "${query}". Try typing a keyword from your goal title.`);
  }
};

// 📓 Cell Micro-Notes & Mood Modal
window.openNoteModal = function(goalId, day) {
  const month = state.months[state.activeMonthId];
  if (!month) return;
  const goal = (month.goals || []).find(g => g.id === goalId);
  if (!goal) return;

  activeNoteTarget = { goalId, day };
  const modal = document.getElementById('cell-note-modal');
  const title = document.getElementById('note-modal-title');
  const textarea = document.getElementById('cell-note-text');
  const deleteBtn = document.getElementById('delete-note-btn');

  title.textContent = `${goal.title} — Day ${day}`;
  
  const existingNote = (goal.notes && goal.notes[day]) || { mood: '🌸', text: '' };
  textarea.value = existingNote.text || '';
  selectMood(existingNote.mood || '🌸');

  if (existingNote.text) {
    deleteBtn.classList.remove('hidden');
  } else {
    deleteBtn.classList.add('hidden');
  }

  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
};

window.closeNoteModal = function() {
  const modal = document.getElementById('cell-note-modal');
  if (modal) modal.classList.add('hidden');
  activeNoteTarget = null;
};

window.selectMood = function(mood) {
  document.getElementById('selected-mood-input').value = mood;
  document.querySelectorAll('.mood-btn').forEach(btn => {
    if (btn.getAttribute('data-mood') === mood) {
      btn.className = "mood-btn w-8 h-8 rounded-xl border border-pink-400 bg-pink-500/30 flex items-center justify-center text-sm transition scale-110 shadow-sm";
    } else {
      btn.className = "mood-btn w-8 h-8 rounded-xl border border-pink-400/20 hover:bg-pink-500/20 flex items-center justify-center text-sm transition";
    }
  });
};

window.saveCellNote = function(event) {
  event.preventDefault();
  if (!activeNoteTarget) return;

  const month = state.months[state.activeMonthId];
  const goal = (month.goals || []).find(g => g.id === activeNoteTarget.goalId);
  if (!goal) return;

  if (!goal.notes) goal.notes = {};
  const mood = document.getElementById('selected-mood-input').value;
  const text = document.getElementById('cell-note-text').value.trim();

  goal.notes[activeNoteTarget.day] = { mood, text };
  saveState();
  closeNoteModal();
  renderApp();
};

window.deleteCellNote = function() {
  if (!activeNoteTarget) return;
  const month = state.months[state.activeMonthId];
  const goal = (month.goals || []).find(g => g.id === activeNoteTarget.goalId);
  if (!goal) return;

  if (goal.notes && goal.notes[activeNoteTarget.day]) {
    delete goal.notes[activeNoteTarget.day];
    saveState();
    closeNoteModal();
    renderApp();
  }
};

// 🎁 Monthly Wrapped Engine
window.openWrappedModal = function() {
  const activeMonth = state.months[state.activeMonthId];
  const { year, month } = parseMonthId(state.activeMonthId);
  const daysInMonth = getDaysInMonth(year, month);
  const allGoals = activeMonth.goals || [];
  const shieldsUsed = activeMonth.shieldsUsed || {};

  let totalAvailableEffortPoints = 0;
  let earnedEffortPoints = 0;
  let bestStreak = 0;
  let mvpHabit = null;
  let maxChecked = -1;

  allGoals.forEach(g => {
    const effort = g.effort || 1;
    const target = g.targetDays || daysInMonth;
    let checkedCount = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      if ((g.checks && g.checks[d]) || shieldsUsed[d]) checkedCount++;
    }

    if (checkedCount > maxChecked) {
      maxChecked = checkedCount;
      mvpHabit = g;
    }

    const ratio = Math.min(1.0, checkedCount / target);
    totalAvailableEffortPoints += effort;
    earnedEffortPoints += ratio * effort;

    const s = calculateLongestStreak(g, daysInMonth, shieldsUsed);
    if (s > bestStreak) bestStreak = s;
  });

  const monthProgressPct = totalAvailableEffortPoints > 0 
    ? Math.round((earnedEffortPoints / totalAvailableEffortPoints) * 100) 
    : 0;
  const xp = Math.round(earnedEffortPoints * 15);

  document.getElementById('wrapped-month-title').textContent = activeMonth.title;
  document.getElementById('wrapped-percentage').textContent = `${monthProgressPct}%`;
  document.getElementById('wrapped-subtext').textContent = `${Math.round(earnedEffortPoints)} of ${totalAvailableEffortPoints} effort points`;

  if (mvpHabit) {
    document.getElementById('wrapped-mvp-habit').textContent = mvpHabit.title;
    document.getElementById('wrapped-mvp-days').textContent = `${maxChecked} days completed`;
  } else {
    document.getElementById('wrapped-mvp-habit').textContent = "No habits logged";
    document.getElementById('wrapped-mvp-days').textContent = "0 days";
  }

  document.getElementById('wrapped-peak-streak').textContent = `${bestStreak} Days`;
  document.getElementById('wrapped-bonsai-rank').textContent = monthProgressPct >= 75 ? "Sakura Sage ✨" : monthProgressPct >= 50 ? "Blossom Warrior 🌸" : monthProgressPct >= 25 ? "Budding Apprentice 🌿" : "Novice Sprout 🌱";
  document.getElementById('wrapped-total-xp').textContent = `${xp} XP Earned`;

  const pacingBadge = document.getElementById('pacing-badge');
  document.getElementById('wrapped-velocity').textContent = pacingBadge ? pacingBadge.textContent : "On Track";

  const modal = document.getElementById('wrapped-modal');
  modal.classList.remove('hidden');
  playFanfareSound();
  fireGrandCelebration();

  if (window.lucide) lucide.createIcons();
};

window.closeWrappedModal = function() {
  document.getElementById('wrapped-modal').classList.add('hidden');
};

window.copyWrappedSummary = function() {
  const activeMonth = state.months[state.activeMonthId];
  const pct = document.getElementById('wrapped-percentage').textContent;
  const mvp = document.getElementById('wrapped-mvp-habit').textContent;
  const streak = document.getElementById('wrapped-peak-streak').textContent;
  const rank = document.getElementById('wrapped-bonsai-rank').textContent;

  const text = `🌸 **My ${activeMonth.title} Sakura Wrapped** 🌸\n` +
               `✨ Total Completion: ${pct}\n` +
               `🏆 MVP Habit: ${mvp}\n` +
               `🔥 Peak Streak: ${streak}\n` +
               `🌿 Bonsai Rank: ${rank}\n` +
               `Cultivated with Progression Matrix.`;

  navigator.clipboard.writeText(text).then(() => {
    alert("Wrapped summary copied to clipboard! 📋🌸");
  }).catch(() => {
    alert("Summary: \n" + text);
  });
};

// User Actions
window.toggleCheck = function(goalId, day, event) {
  const month = state.months[state.activeMonthId];
  if (!month) return;
  const goal = (month.goals || []).find(g => g.id === goalId);
  if (!goal) return;

  if (!goal.checks) goal.checks = {};
  const newStatus = !goal.checks[day];
  goal.checks[day] = newStatus;

  playTickSound(newStatus);
  if (newStatus && event) {
    fireTileSparks(event);
  }

  saveState();
  renderApp();

  // 100% Day completion celebration
  const { currentDay, currentMonth, currentYear } = getTodayInfo();
  const { year, month: mNum } = parseMonthId(state.activeMonthId);
  if (year === currentYear && mNum === currentMonth && day === currentDay && newStatus) {
    const allDone = (month.goals || []).every(g => (g.checks && g.checks[currentDay]) || (month.shieldsUsed && month.shieldsUsed[currentDay]));
    if (allDone && (month.goals || []).length > 0) {
      fireGrandCelebration();
    }
  }
};

window.quickCheckAllToday = function() {
  const { currentDay, currentMonth, currentYear } = getTodayInfo();
  const { year, month: mNum } = parseMonthId(state.activeMonthId);
  if (year !== currentYear || mNum !== currentMonth) {
    alert("Please navigate to the current month to check today's habits!");
    return;
  }
  const month = state.months[state.activeMonthId];
  if (!month) return;

  (month.goals || []).forEach(g => {
    if (!g.checks) g.checks = {};
    g.checks[currentDay] = true;
  });

  playTickSound(true);
  fireGrandCelebration();
  saveState();
  renderApp();
};

window.deleteGoal = function(goalId) {
  if (!confirm("Remove this habit from your matrix?")) return;
  const month = state.months[state.activeMonthId];
  if (month) {
    month.goals = month.goals.filter(g => g.id !== goalId);
    saveState();
    renderApp();
  }
};

function changeMonth(delta) {
  const { year, month } = parseMonthId(state.activeMonthId);
  const newDate = new Date(year, month - 1 + delta, 1);
  const newMonthId = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}`;
  state.activeMonthId = newMonthId;
  saveState();
  renderApp();
}

// Modal Form & Controls Setup
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('prev-month-btn').onclick = () => changeMonth(-1);
  document.getElementById('next-month-btn').onclick = () => changeMonth(1);

  document.getElementById('jump-today-btn').onclick = () => {
    const now = new Date();
    const currentMonthId = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    state.activeMonthId = currentMonthId;
    saveState();
    renderApp();

    setTimeout(() => {
      const todayTh = document.getElementById(`th-day-${now.getDate()}`);
      if (todayTh) {
        todayTh.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 150);
  };

  const modal = document.getElementById('goal-modal');
  const openModalBtn = document.getElementById('open-modal-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-modal-btn');
  const goalForm = document.getElementById('goal-form');

  function populatePillarSelect() {
    const select = document.getElementById('goal-pillar');
    select.innerHTML = PILLARS.map(p => `<option value="${p.id}">${p.emoji} ${p.name}</option>`).join('');
  }

  openModalBtn.onclick = () => {
    populatePillarSelect();
    goalForm.reset();
    const { year, month } = parseMonthId(state.activeMonthId);
    document.getElementById('goal-target-days').value = getDaysInMonth(year, month);
    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  };

  function closeModal() {
    modal.classList.add('hidden');
  }

  closeModalBtn.onclick = closeModal;
  cancelModalBtn.onclick = closeModal;

  goalForm.onsubmit = (e) => {
    e.preventDefault();
    const title = document.getElementById('goal-title').value.trim();
    const pillarId = document.getElementById('goal-pillar').value;
    const timeOfDay = document.getElementById('goal-tod') ? document.getElementById('goal-tod').value : 'any';
    const effort = parseInt(document.getElementById('goal-effort').value, 10);
    const targetDays = parseInt(document.getElementById('goal-target-days').value, 10) || 30;

    const newGoal = {
      id: 'g-' + Date.now(),
      title,
      pillarId,
      timeOfDay,
      effort,
      targetDays,
      checks: {},
      notes: {}
    };

    state.months[state.activeMonthId].goals.push(newGoal);
    saveState();
    closeModal();
    renderApp();
  };

  // Export / Import Handlers
  document.getElementById('export-json-btn').onclick = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sakura-matrix-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  function sanitizeImportedData(data) {
    if (!data || typeof data !== 'object' || !data.months || typeof data.months !== 'object') {
      throw new Error('Invalid backup structure');
    }

    const validPillars = ['health', 'career', 'learning', 'finance', 'personal'];
    const validTimes = ['morning', 'afternoon', 'evening', 'any'];

    const sanitizedMonths = {};
    for (const [mId, mObj] of Object.entries(data.months)) {
      if (!mObj || typeof mObj !== 'object') continue;
      const cleanId = String(mObj.id || mId).trim().slice(0, 10);
      const cleanTitle = String(mObj.title || cleanId).trim().slice(0, 60);
      const shieldsUsed = {};
      if (mObj.shieldsUsed && typeof mObj.shieldsUsed === 'object') {
        for (const [dStr, val] of Object.entries(mObj.shieldsUsed)) {
          const d = parseInt(dStr, 10);
          if (d >= 1 && d <= 31 && val) shieldsUsed[d] = true;
        }
      }
      const cleanGoals = [];
      if (Array.isArray(mObj.goals)) {
        mObj.goals.forEach((g, idx) => {
          if (!g || typeof g !== 'object') return;
          const id = String(g.id || 'g-' + idx).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 32);
          const title = String(g.title || 'Habit').trim().slice(0, 100);
          const pillarId = validPillars.includes(g.pillarId) ? g.pillarId : 'health';
          const timeOfDay = validTimes.includes(g.timeOfDay) ? g.timeOfDay : 'any';
          const effort = Math.max(1, Math.min(5, parseInt(g.effort, 10) || 1));
          const targetDays = Math.max(1, Math.min(31, parseInt(g.targetDays, 10) || 30));
          const checks = {};
          if (g.checks && typeof g.checks === 'object') {
            for (const [dStr, val] of Object.entries(g.checks)) {
              const d = parseInt(dStr, 10);
              if (d >= 1 && d <= 31 && val) checks[d] = true;
            }
          }
          const notes = {};
          if (g.notes && typeof g.notes === 'object') {
            for (const [dStr, n] of Object.entries(g.notes)) {
              const d = parseInt(dStr, 10);
              if (d >= 1 && d <= 31 && n && typeof n === 'object') {
                notes[d] = {
                  mood: String(n.mood || '🌸').slice(0, 6),
                  text: String(n.text || '').trim().slice(0, 300)
                };
              }
            }
          }
          cleanGoals.push({ id, title, pillarId, timeOfDay, effort, targetDays, checks, notes });
        });
      }
      sanitizedMonths[cleanId] = {
        id: cleanId,
        title: cleanTitle,
        shieldsUsed,
        goals: cleanGoals
      };
    }

    if (Object.keys(sanitizedMonths).length === 0) {
      throw new Error('No valid months found');
    }

    const activeMonthId = (typeof data.activeMonthId === 'string' && sanitizedMonths[data.activeMonthId])
      ? data.activeMonthId
      : Object.keys(sanitizedMonths)[0];

    return { activeMonthId, months: sanitizedMonths };
  }

  document.getElementById('import-json-input').onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        const validated = sanitizeImportedData(imported);
        state = validated;
        saveState();
        renderApp();
        alert("Sakura matrix data successfully imported! 🌸");
      } catch (err) {
        alert("Invalid or corrupt backup file format.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  document.getElementById('reset-data-btn').onclick = () => {
    if (confirm("Reset to default demonstration matrix?")) {
      state = getInitialDefaultData();
      saveState();
      renderApp();
    }
  };

  // Close Theme Dropdown on outside click
  document.addEventListener('click', (e) => {
    const wrapper = document.getElementById('theme-selector-wrapper');
    const menu = document.getElementById('theme-dropdown-menu');
    if (menu && !menu.classList.contains('hidden')) {
      if (!wrapper || !wrapper.contains(e.target)) {
        menu.classList.add('hidden');
      }
    }
  });

  // Global Escape key handler to close all modals and drawers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const goalModal = document.getElementById('goal-modal');
      if (goalModal && !goalModal.classList.contains('hidden')) goalModal.classList.add('hidden');

      if (typeof closeNoteModal === 'function') closeNoteModal();
      if (typeof closeWrappedModal === 'function') closeWrappedModal();

      const aiDrawer = document.getElementById('ai-coach-drawer');
      if (aiDrawer && !aiDrawer.classList.contains('hidden')) aiDrawer.classList.add('hidden');

      const aiSettings = document.getElementById('ai-settings-modal');
      if (aiSettings && !aiSettings.classList.contains('hidden')) aiSettings.classList.add('hidden');

      const themeMenu = document.getElementById('theme-dropdown-menu');
      if (themeMenu && !themeMenu.classList.contains('hidden')) themeMenu.classList.add('hidden');
    }
  });

  // Apply Stored Theme on Startup
  applyTheme(currentThemeId);

  // Initial App Render
  renderApp();

  // Auto-scroll to today
  const { currentDay, currentYear, currentMonth } = getTodayInfo();
  const { year, month } = parseMonthId(state.activeMonthId);
  if (year === currentYear && month === currentMonth) {
    setTimeout(() => {
      const todayTh = document.getElementById(`th-day-${currentDay}`);
      if (todayTh) {
        todayTh.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 200);
  }
});
