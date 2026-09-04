/**
 * Metrics Component (<app-metrics>)
 * Bento Cards Blended with Sakura Frosted Glass
 */
class AppMetrics extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        
        <!-- 1. Month Completion -->
        <div class="theme-card rounded-2xl p-3.5 sm:p-4 relative overflow-hidden">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[11px] font-semibold flex items-center gap-1 text-pink-300">
              <span>🌸</span> Month Completion
            </span>
            <span id="stat-points-ratio" class="text-[10px] font-mono-num text-pink-200/60">0/0 pts</span>
          </div>
          <div class="flex items-baseline gap-1.5">
            <span id="stat-month-percentage" class="text-2xl sm:text-3xl font-black font-mono-num tracking-tight text-pink-200">0%</span>
          </div>
          <div class="w-full rounded-full h-1.5 mt-2.5 overflow-hidden bg-black/40 border border-pink-400/20">
            <div id="stat-progress-bar" class="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 shadow-sm shadow-pink-500/30" style="width: 0%;"></div>
          </div>
        </div>

        <!-- 2. Today's Focus -->
        <div class="theme-card rounded-2xl p-3.5 sm:p-4 relative overflow-hidden">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[11px] font-semibold flex items-center gap-1 text-emerald-300">
              <span>🌱</span> Today's Focus
            </span>
            <button onclick="quickCheckAllToday()" class="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition underline">
              All Done ✓
            </button>
          </div>
          <div class="flex items-baseline gap-1.5">
            <span id="stat-today-percentage" class="text-2xl sm:text-3xl font-black font-mono-num tracking-tight text-emerald-300">0%</span>
            <span id="stat-today-ratio" class="text-[11px] font-mono-num text-pink-200/60">0 of 0</span>
          </div>
          <div class="mt-2 text-[10px] text-pink-200/70 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span id="stat-today-date-text">Day 1 of 30</span>
          </div>
        </div>

        <!-- 3. Velocity & Pacing -->
        <div class="theme-card rounded-2xl p-3.5 sm:p-4 relative overflow-hidden">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[11px] font-semibold flex items-center gap-1 text-sky-300">
              <span>☁️</span> Pacing Delta
            </span>
            <span id="pacing-badge" class="text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-pink-400/25 bg-pink-400/10 text-pink-200 font-mono-num">
              On Track
            </span>
          </div>
          <div class="flex items-baseline gap-1.5">
            <span id="stat-pacing-delta" class="text-2xl sm:text-3xl font-black font-mono-num tracking-tight text-white">+0%</span>
          </div>
          <div class="mt-2 flex items-center justify-between text-[10px] text-pink-200/70 font-mono-num">
            <span id="stat-pacing-subtext">Elapsed 3%</span>
            <span id="stat-days-left">29d left</span>
          </div>
        </div>

        <!-- 4. Peak Streak -->
        <div class="theme-card rounded-2xl p-3.5 sm:p-4 relative overflow-hidden">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[11px] font-semibold flex items-center gap-1 text-amber-300">
              <span>🏮</span> Best Streak
            </span>
            <span id="stat-total-target-ticks" class="text-[10px] font-mono-num text-pink-200/60">0 goal</span>
          </div>
          <div class="flex items-baseline gap-1.5">
            <span id="stat-best-streak" class="text-2xl sm:text-3xl font-black font-mono-num tracking-tight text-amber-300">0d</span>
            <span class="text-[11px] text-pink-200/60 font-medium">consecutive</span>
          </div>
          <div class="mt-2 text-[10px] text-pink-200/70 flex items-center gap-1">
            <span>✨ Blossom your momentum</span>
          </div>
        </div>

      </section>
    `;
  }
}

customElements.define('app-metrics', AppMetrics);
