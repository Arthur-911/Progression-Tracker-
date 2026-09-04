/**
 * Monthly Progression Matrix - Core Application Logic
 * Sakura Edition with Zen Bonsai, Micro-Notes, Petal Shields & Monthly Wrapped
 */

// Life Pillars Configuration
const PILLARS = [
  { id: 'health', name: 'Health', emoji: '🌱', badge: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300', checkGradient: 'from-emerald-400 to-teal-400' },
  { id: 'career', name: 'Focus', emoji: '⚡', badge: 'border-purple-400/30 bg-purple-400/10 text-purple-300', checkGradient: 'from-purple-400 to-pink-400' },
  { id: 'learning', name: 'Grow', emoji: '📚', badge: 'border-sky-400/30 bg-sky-400/10 text-sky-300', checkGradient: 'from-sky-400 to-indigo-400' },
  { id: 'finance', name: 'Save', emoji: '✨', badge: 'border-amber-400/30 bg-amber-400/10 text-amber-300', checkGradient: 'from-amber-400 to-orange-400' },
  { id: 'personal', name: 'Mind', emoji: '🌸', badge: 'border-pink-400/30 bg-pink-400/10 text-pink-300', checkGradient: 'from-pink-400 to-rose-400' }
];

// Initial Seed Data
const DEFAULT_DATA = {
  activeMonthId: "2026-09",
  months: {
    "2026-09": {
      id: "2026-09",
      title: "September 2026",
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
          checks: { 1: false },
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

let state = loadState();
let currentPillarFilter = 'all';
let currentTimeFilter = 'all';

// Active Note Editing Target
let activeNoteTarget = null; // { goalId, day }

function loadState() {
  try {
    const saved = localStorage.getItem('monthly_sakura_all_features_state');
    if (saved) return JSON.parse(saved);
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
  const [year, month] = id.split('-').map(Number);
  return { year, month };
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

    let rowHtml = `
      <td class="sticky-col-1 py-2.5 px-3 border-r border-[var(--border)] z-20 shadow-[2px_0_8px_rgba(0,0,0,0.4)]">
        <div class="flex items-center justify-between gap-1.5">
          <div class="font-semibold truncate text-xs text-white flex items-center gap-1" title="${goal.title}">
            ${todEmoji ? `<span class="text-[10px]">${todEmoji}</span>` : ''}
            <span>${goal.title}</span>
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

      const cellTitle = isShielded 
        ? `Day ${day}: Rest Day (Shielded)`
        : (note ? `Day ${day} [${note.mood}]: ${note.text}` : `Day ${day}: ${isChecked ? 'Completed' : 'Click to complete'}`);

      rowHtml += `
        <td class="py-1.5 px-0.5 text-center border-r border-[var(--border-subtle)] ${isToday ? 'border-x border-pink-400/40' : ''}" style="${isToday ? 'background: var(--today-col);' : ''}">
          <div class="relative inline-block">
            <button 
              type="button" 
              onclick="toggleCheck('${goal.id}', ${day}, event)"
              oncontextmenu="event.preventDefault(); openNoteModal('${goal.id}', ${day});"
              title="${cellTitle}"
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
            ${note ? `<span class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-pink-400 ring-1 ring-black shadow-sm" title="Note: ${note.mood} ${note.text}"></span>` : ''}
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
        <button onclick="deleteGoal('${goal.id}')" title="Delete Habit" class="text-pink-300/40 hover:text-rose-400 p-0.5 rounded transition opacity-50 group-hover:opacity-100">
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

    const s = calculateStreak(g, daysInMonth, isActualCurrentMonth, currentDay, shieldsUsed);
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
      if (g.checks && g.checks[currentDay]) todayDone++;
    });
    const todayPct = Math.round((todayDone / todayTotal) * 100);
    document.getElementById('stat-today-percentage').textContent = `${todayPct}%`;
    document.getElementById('stat-today-ratio').textContent = `${todayDone} of ${todayTotal}`;
    document.getElementById('stat-today-date-text').textContent = `Day ${currentDay} of ${daysInMonth}`;
  } else {
    document.getElementById('stat-today-percentage').textContent = `--`;
    document.getElementById('stat-today-ratio').textContent = `Other month`;
    document.getElementById('stat-today-date-text').textContent = `Pick current month`;
  }

  let elapsedDays = isActualCurrentMonth ? currentDay : (parseMonthId(state.activeMonthId).year < new Date().getFullYear() ? daysInMonth : 0);
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

// 🌸 Bonsai Avatar Growth Engine
function renderBonsai(pct, earnedPoints, activeMonth) {
  const foliageGroup = document.getElementById('bonsai-foliage');
  const stageTitle = document.getElementById('bonsai-stage-title');
  const rankBadge = document.getElementById('bonsai-rank-badge');
  const xpText = document.getElementById('bonsai-xp-text');
  const progressText = document.getElementById('bonsai-progress-text');
  const xpBar = document.getElementById('bonsai-xp-bar');
  const growthQuote = document.getElementById('bonsai-growth-quote');
  const bloomIndicator = document.getElementById('bonsai-bloom-indicator');

  if (!foliageGroup) return;

  const xp = Math.round(earnedPoints * 15);
  xpText.textContent = `${xp} XP`;
  progressText.textContent = `${pct}% Bloom`;
  xpBar.style.width = `${Math.min(100, pct)}%`;

  let rank = "Novice Sprout";
  let quote = "Every small step brings branches closer to the spring sun.";
  let stage = 1;

  if (pct >= 75) {
    stage = 4;
    rank = "Sakura Sage ✨";
    quote = "Radiant full bloom achieved! Your consistency shines brightly.";
    bloomIndicator.textContent = "🌺✨";
  } else if (pct >= 50) {
    stage = 3;
    rank = "Blossom Warrior 🌸";
    quote = "Pink petals unfurl with every promise kept to yourself.";
    bloomIndicator.textContent = "🌸";
  } else if (pct >= 25) {
    stage = 2;
    rank = "Budding Apprentice 🌿";
    quote = "Fresh spring buds awaken on patient branches.";
    bloomIndicator.textContent = "🌿";
  } else {
    stage = 1;
    rank = "Novice Sprout 🌱";
    quote = "Quiet winter branches gather strength in the soil.";
    bloomIndicator.textContent = "🌱";
  }

  stageTitle.textContent = stage === 4 ? "Radiant Bloom 🌺" : stage === 3 ? "Half Bloom 🌸" : stage === 2 ? "Budding Sprout 🌿" : "Winter Branch 🌱";
  rankBadge.textContent = rank;
  growthQuote.textContent = `"${quote}"`;

  // Draw procedural blossoms on the SVG Bonsai
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
    // Full radiant bloom
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
  foliageGroup.innerHTML = blossomsSvg;

  // Petal Shields Render
  const shieldsUsed = activeMonth.shieldsUsed || {};
  const usedCount = Object.keys(shieldsUsed).length;
  const remaining = Math.max(0, 3 - usedCount);

  const shieldsStatusText = document.getElementById('shields-status-text');
  if (shieldsStatusText) {
    shieldsStatusText.textContent = `${remaining} of 3 ready`;
  }

  const tokensContainer = document.getElementById('shield-tokens-container');
  if (tokensContainer) {
    let tokensHtml = '';
    for (let i = 0; i < 3; i++) {
      if (i < remaining) {
        tokensHtml += `<span class="w-7 h-7 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-xs shadow-sm shadow-pink-500/20" title="Petal Shield Available">🌸</span>`;
      } else {
        tokensHtml += `<span class="w-7 h-7 rounded-xl bg-black/40 border border-pink-400/10 flex items-center justify-center text-xs opacity-40" title="Shield Used">🛡️</span>`;
      }
    }
    tokensContainer.innerHTML = tokensHtml;
  }
}

window.celebrateBonsai = function() {
  playTickSound(true);
  fireGrandCelebration();
};

window.usePetalShieldToday = function() {
  const { currentDay, currentMonth, currentYear } = getTodayInfo();
  const { year, month } = parseMonthId(state.activeMonthId);

  if (year !== currentYear || month !== currentMonth) {
    alert("Please navigate to the current month to activate a rest shield.");
    return;
  }

  const activeMonth = state.months[state.activeMonthId];
  if (!activeMonth.shieldsUsed) activeMonth.shieldsUsed = {};

  if (activeMonth.shieldsUsed[currentDay]) {
    if (confirm("Remove today's Petal Shield?")) {
      delete activeMonth.shieldsUsed[currentDay];
      saveState();
      renderApp();
    }
    return;
  }

  const usedCount = Object.keys(activeMonth.shieldsUsed).length;
  if (usedCount >= 3) {
    alert("You have used all 3 Petal Shields for this month! Cherish your rest and keep showing up.");
    return;
  }

  if (confirm(`Activate a Petal Shield for today (Day ${currentDay})? This protects your streaks for all habits as a mindful Rest Day 🌸`)) {
    activeMonth.shieldsUsed[currentDay] = true;
    playFanfareSound();
    fireTileSparks();
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
    const uncompletedToday = allGoals.filter(g => !g.checks || !g.checks[currentDay]);
    if (uncompletedToday.length === 0) {
      briefingMsg.textContent = "🌸 All habits completed for today! Your bonsai is in full serene bloom.";
    } else {
      briefingMsg.textContent = `${uncompletedToday.length} habits remaining today. Tap to check off or type below:`;
    }

    // Populate interactive quick-tap chips
    chipsContainer.innerHTML = uncompletedToday.slice(0, 3).map(g => `
      <button onclick="toggleCheck('${g.id}', ${currentDay}, event)" class="px-2 py-1 rounded-lg border border-pink-400/25 bg-pink-500/10 hover:bg-pink-500/25 text-[10px] font-bold text-pink-200 transition flex items-center gap-1 whitespace-nowrap shadow-sm">
        <span>+</span> <span>${g.title.split(' ')[0]}</span>
      </button>
    `).join('');
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

    const s = calculateStreak(g, daysInMonth, false, daysInMonth, shieldsUsed);
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

  document.getElementById('import-json-input').onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.months) {
          state = imported;
          saveState();
          renderApp();
          alert("Sakura matrix data successfully imported! 🌸");
        } else {
          alert("Invalid backup file format.");
        }
      } catch (err) {
        alert("Error parsing JSON file.");
      }
    };
    reader.readAsText(file);
  };

  document.getElementById('reset-data-btn').onclick = () => {
    if (confirm("Reset to default demonstration matrix?")) {
      state = JSON.parse(JSON.stringify(DEFAULT_DATA));
      saveState();
      renderApp();
    }
  };

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
