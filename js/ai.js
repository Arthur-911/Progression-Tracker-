/**
 * Sakura Sensei - AI Habit Coach & Advisory Engine
 * Provides context-aware habit analysis, pacing tips, and optional Gemini API integration
 */

const AI_STORAGE_KEY = 'sakura_gemini_api_key';

/**
 * Extracts a complete real-time diagnostic of the user's matrix
 */
function buildMatrixContext() {
  if (typeof state === 'undefined') return null;
  const month = state.months[state.activeMonthId];
  if (!month) return null;

  const { year, month: mNum } = parseMonthId(state.activeMonthId);
  const daysInMonth = getDaysInMonth(year, month);
  const { currentDay, currentMonth, currentYear } = getTodayInfo();
  const isActualCurrentMonth = (year === currentYear && mNum === currentMonth);
  const goals = month.goals || [];
  const shieldsUsed = month.shieldsUsed || {};

  let totalAvailableEffort = 0;
  let earnedEffort = 0;
  let todayDone = 0;
  let bestStreak = 0;
  let mvpHabit = null;
  let maxChecked = -1;

  const habitsSummary = goals.map(g => {
    let checkedCount = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      if ((g.checks && g.checks[d]) || shieldsUsed[d]) checkedCount++;
    }
    const streak = calculateStreak(g, daysInMonth, isActualCurrentMonth, currentDay, shieldsUsed);
    if (streak > bestStreak) bestStreak = streak;
    if (checkedCount > maxChecked) {
      maxChecked = checkedCount;
      mvpHabit = g.title;
    }

    const ratio = Math.min(1.0, checkedCount / (g.targetDays || daysInMonth));
    totalAvailableEffort += g.effort || 1;
    earnedEffort += ratio * (g.effort || 1);

    const doneToday = isActualCurrentMonth && g.checks && g.checks[currentDay];
    if (doneToday) todayDone++;

    return {
      title: g.title,
      pillar: g.pillarId,
      timeOfDay: g.timeOfDay || 'any',
      effort: g.effort || 1,
      target: g.targetDays || daysInMonth,
      completedDays: checkedCount,
      streak,
      doneToday
    };
  });

  const monthProgressPct = totalAvailableEffort > 0 
    ? Math.round((earnedEffort / totalAvailableEffort) * 100) 
    : 0;

  const elapsedDays = isActualCurrentMonth ? currentDay : (year < new Date().getFullYear() ? daysInMonth : 0);
  const expectedPct = Math.round((elapsedDays / daysInMonth) * 100);
  const delta = monthProgressPct - expectedPct;

  return {
    monthTitle: month.title,
    day: currentDay,
    daysInMonth,
    monthProgressPct,
    expectedPct,
    delta,
    totalGoals: goals.length,
    todayDone,
    bestStreak,
    mvpHabit,
    habits: habitsSummary,
    shieldsUsedCount: Object.keys(shieldsUsed).length
  };
}

/**
 * Intelligent built-in Zen Advisor (works 100% offline)
 */
function getOfflineSenseiAdvice(query, ctx) {
  const q = query.toLowerCase();

  if (!ctx || ctx.totalGoals === 0) {
    return "🌸 **Greetings, traveler!** Your matrix is currently waiting for seeds to be planted. Head over to **'+ Add Goal'** to log your first 2 or 3 daily habits, and I will gladly craft a tailored rhythm for you!";
  }

  // 1. Analyze My Rhythm / Diagnostic
  if (q.includes('analyze') || q.includes('rhythm') || q.includes('diagnostic') || q.includes('review')) {
    let paceNote = ctx.delta >= 5 
      ? `✨ **You are Ahead of Pace by +${ctx.delta}%!** Your consistency is nurturing your bonsai into a vibrant bloom.`
      : ctx.delta < -10 
        ? `🌱 **You are ${Math.abs(ctx.delta)}% behind calendar pace.** Don't worry—focus on shrinking your habit friction today rather than trying to do everything at once.`
        : `🍵 **You are perfectly On Track (${ctx.delta >= 0 ? '+' : ''}${ctx.delta}%).** Steady cadence is the heart of zen progression.`;

    const remainingToday = ctx.totalGoals - ctx.todayDone;
    const todayNote = remainingToday === 0 
      ? "🎉 **All habits completed for today!** Rest deeply tonight knowing you honored your commitments."
      : `🎯 **Today's Status:** You have **${remainingToday} habit${remainingToday > 1 ? 's' : ''} remaining** (${ctx.todayDone} of ${ctx.totalGoals} completed).`;

    const mvpNote = ctx.mvpHabit 
      ? `🏆 **Star Habit:** *${ctx.mvpHabit}* is leading your momentum with the highest consistency.`
      : '';

    return `🌸 **Sakura Sensei Diagnostic for ${ctx.monthTitle}**:\n\n` +
           `• **Completion Rate:** **${ctx.monthProgressPct}%** (Day ${ctx.day} of ${ctx.daysInMonth})\n` +
           `• **Velocity:** ${paceNote}\n` +
           `• **Daily Cadence:** ${todayNote}\n` +
           `• **Peak Streak:** 🔥 **${ctx.bestStreak} days** unbroken\n` +
           `${mvpNote ? `• ${mvpNote}\n\n` : '\n'}` +
           `💡 **Sensei's Kaizen Tip:** Pick your highest-effort task (⚡4p or ⚡5p) early in your day when mental willpower is freshest!`;
  }

  // 2. Pacing & Momentum Advice
  if (q.includes('pace') || q.includes('pacing') || q.includes('behind') || q.includes('ahead') || q.includes('velocity')) {
    if (ctx.delta >= 5) {
      return `🌸 **Magnificent Momentum!** You are **${ctx.delta}% ahead** of calendar expectations.\n\n` +
             `*Sensei's Wisdom:*\n` +
             `1. **Protect Against Burnout:** When you are ahead, resist the urge to suddenly double your workload. Consistency over intensity.\n` +
             `2. **Bank Rest Days:** Remember you have **${3 - ctx.shieldsUsedCount} Petal Shields 🛡️** left this month if you ever need a guilt-free recovery day.\n` +
             `3. Celebrate this milestone with a tea break or a walk outside! 🍵`;
    } else if (ctx.delta < -10) {
      return `🌱 **Gentle Reset Time.** You are currently **${Math.abs(ctx.delta)}% behind pace**, which is completely natural during busy seasons of life.\n\n` +
             `*3 Steps to Realign:*\n` +
             `1. **The 2-Minute Rule:** Drop the barrier to entry. If a workout feels daunting, commit to putting on your shoes and doing just 5 minutes.\n` +
             `2. **Use a Petal Shield 🛡️:** If today was exhausting, activate a Petal Shield to protect your streak and start fresh tomorrow.\n` +
             `3. **Pick Just ONE Habit Today:** Win back your momentum by checking just one key box today!`;
    } else {
      return `🍵 **Golden Cadence:** You are right on track with **${ctx.monthProgressPct}%** completion versus **${ctx.expectedPct}%** expected.\n\n` +
             `Maintaining an exact rhythm requires grace and discipline. Keep focusing on today's single steps without projecting too far ahead.`;
    }
  }

  // 3. Procrastination / Friction / Motivation
  if (q.includes('procrastinat') || q.includes('lazy') || q.includes('tired') || q.includes('hard') || q.includes('motivation') || q.includes('stuck')) {
    return `🧘 **Overcoming Resistance (The Zen Approach):**\n\n` +
           `Procrastination is rarely a lack of willpower; it is an emotional reaction to friction and overwhelm.\n\n` +
           `Try the **"Rule of 3 Breaths & 1 Tiny Action"**:\n` +
           `1. Close your eyes, take 3 slow breaths, and exhale the mental tension.\n` +
           `2. Ask yourself: *"What is the smallest, easiest slice of this habit I can do right now?"*\n` +
           `   • Instead of "2h Deep Work", write down 1 bullet point.\n` +
           `   • Instead of "Gym Session", do 5 gentle bodyweight squats.\n` +
           `3. Once started, momentum will carry you effortlessly. Action creates motivation, not vice-versa! ✨`;
  }

  // 4. Life Pillar Balance
  if (q.includes('pillar') || q.includes('balance') || q.includes('health') || q.includes('career') || q.includes('finance')) {
    const pillarsCount = {};
    ctx.habits.forEach(h => {
      pillarsCount[h.pillar] = (pillarsCount[h.pillar] || 0) + 1;
    });

    const missingPillars = ['health', 'career', 'learning', 'finance', 'personal'].filter(p => !pillarsCount[p]);

    let feedback = `⚖️ **Your Life Pillar Balance Analysis:**\n\n`;
    feedback += `You have **${ctx.habits.length} habits** distributed across your pillars.\n`;
    if (missingPillars.length > 0) {
      const names = missingPillars.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(', ');
      feedback += `\n🌱 **Uncultivated Areas:** You currently don't have any habits in: **${names}**.\nConsider adding a micro-habit in these areas to build holistic life harmony.`;
    } else {
      feedback += `\n✨ **Well-Rounded Garden!** You have active habits spanning Health, Focus, Growth, Finance, and Mindset.`;
    }
    return feedback;
  }

  // Default Inspiring Zen Advice
  return `🌸 **Wisdom from Sakura Sensei:**\n\n` +
         `*"A tree that can fill the span of a man's arms grows from a tiny sprout. A journey of a thousand miles begins with a single step."*\n\n` +
         `You currently have **${ctx.todayDone} of ${ctx.totalGoals} habits completed today**. How can I help you today? Try asking:\n` +
         `• *"Analyze my rhythm"* for a full pacing review\n` +
         `• *"Help me with procrastination"* for actionable Kaizen tricks\n` +
         `• *"How is my pillar balance?"* to evaluate life harmony`;
}

/**
 * Sends prompt to live Gemini API (if user entered API key in settings),
 * otherwise falls back gracefully to the offline Sensei engine.
 */
async function querySakuraSensei(prompt) {
  const ctx = buildMatrixContext();
  const apiKey = localStorage.getItem(AI_STORAGE_KEY);

  if (!apiKey) {
    // Return high-quality instant offline intelligence
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getOfflineSenseiAdvice(prompt, ctx));
      }, 350);
    });
  }

  // Query live Google Gemini API
  try {
    const systemPrompt = `You are Sakura Sensei 🌸, a supportive, poetic, and highly practical Zen Habit Coach in a web app called Progression Matrix. 
You speak warmly with emojis like 🌸, 🍵, ✨, 🌱. Keep your advice concise, structured with bullet points, and directly tailored to the user's real data.

User's Real-time Matrix Data:
- Month: ${ctx.monthTitle} (Day ${ctx.day} of ${ctx.daysInMonth})
- Overall Completion: ${ctx.monthProgressPct}% (Calendar expected: ${ctx.expectedPct}%, Velocity Delta: ${ctx.delta}%)
- Today's Progress: ${ctx.todayDone}/${ctx.totalGoals} habits completed
- Longest Streak: ${ctx.bestStreak} days
- MVP Habit: ${ctx.mvpHabit}
- Active Habits: ${JSON.stringify(ctx.habits)}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser asks: "${prompt}"` }] }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (reply) return reply;
  } catch (err) {
    console.warn("Gemini API fallback to offline engine:", err);
  }

  // Fallback to offline engine if API fails
  return getOfflineSenseiAdvice(prompt, ctx);
}
