/**
 * Monthly Wrapped Component (<app-wrapped>)
 * Aesthetic "Monthly Wrapped" Summary Card for sharing achievements
 */
class AppWrapped extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="wrapped-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md hidden flex items-center justify-center p-4">
        <div class="theme-card border border-pink-400/30 w-full max-w-md rounded-3xl p-6 shadow-2xl relative overflow-hidden shadow-pink-950/70" id="wrapped-card-content">
          
          <!-- Decorative Top Glow -->
          <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <!-- Header -->
          <div class="flex items-center justify-between pb-3 border-b border-pink-400/20 relative z-10">
            <div class="flex items-center gap-2">
              <span class="text-xl">🌸</span>
              <div>
                <h3 class="text-sm font-black tracking-tight text-white uppercase font-brand">Monthly Wrapped</h3>
                <p id="wrapped-month-title" class="text-[10px] text-pink-300 font-mono-num font-bold">September 2026</p>
              </div>
            </div>
            <button onclick="closeWrappedModal()" class="text-pink-200/60 hover:text-white p-1 rounded-lg">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Main Stats Grid -->
          <div class="mt-4 space-y-3 relative z-10">
            
            <!-- Hero Stat: Total Score -->
            <div class="p-4 rounded-2xl bg-gradient-to-r from-pink-500/20 via-rose-500/15 to-purple-500/20 border border-pink-400/30 text-center">
              <div class="text-[10px] uppercase font-bold tracking-wider text-pink-300">Total Completion</div>
              <div id="wrapped-percentage" class="text-4xl sm:text-5xl font-black font-mono-num tracking-tight text-white my-1">0%</div>
              <div id="wrapped-subtext" class="text-xs font-mono-num text-pink-200/80">0 of 0 points earned</div>
            </div>

            <!-- Bento Mini Grid -->
            <div class="grid grid-cols-2 gap-2.5">
              
              <!-- MVP Habit -->
              <div class="p-3 rounded-xl bg-black/40 border border-pink-400/20">
                <div class="text-[10px] font-bold text-pink-300/80 flex items-center gap-1">
                  <span>🏆</span> MVP Habit
                </div>
                <div id="wrapped-mvp-habit" class="text-xs font-bold text-white mt-1 truncate">Morning Yoga</div>
                <div id="wrapped-mvp-days" class="text-[10px] text-pink-200/60 font-mono-num">0 days checked</div>
              </div>

              <!-- Longest Streak -->
              <div class="p-3 rounded-xl bg-black/40 border border-pink-400/20">
                <div class="text-[10px] font-bold text-amber-300/80 flex items-center gap-1">
                  <span>🔥</span> Peak Streak
                </div>
                <div id="wrapped-peak-streak" class="text-xs font-bold text-white mt-1">0 Days Unbroken</div>
                <div class="text-[10px] text-pink-200/60 font-mono-num">Consistent rhythm</div>
              </div>

              <!-- Bonsai Rank -->
              <div class="p-3 rounded-xl bg-black/40 border border-pink-400/20">
                <div class="text-[10px] font-bold text-purple-300/80 flex items-center gap-1">
                  <span>🌿</span> Bonsai Rank
                </div>
                <div id="wrapped-bonsai-rank" class="text-xs font-bold text-white mt-1">Novice Sprout</div>
                <div id="wrapped-total-xp" class="text-[10px] text-pink-200/60 font-mono-num">0 XP Earned</div>
              </div>

              <!-- Pacing Status -->
              <div class="p-3 rounded-xl bg-black/40 border border-pink-400/20">
                <div class="text-[10px] font-bold text-emerald-300/80 flex items-center gap-1">
                  <span>🎯</span> Final Velocity
                </div>
                <div id="wrapped-velocity" class="text-xs font-bold text-white mt-1">On Track</div>
                <div class="text-[10px] text-pink-200/60 font-mono-num">Cadence maintained</div>
              </div>

            </div>

          </div>

          <!-- Bottom Actions -->
          <div class="flex items-center justify-between gap-3 mt-5 pt-3 border-t border-pink-400/20 relative z-10">
            <button onclick="copyWrappedSummary()" class="flex-1 px-3 py-2 rounded-xl border border-pink-400/30 hover:bg-pink-500/20 text-xs font-bold text-pink-100 transition flex items-center justify-center gap-1.5 active:scale-95">
              <i data-lucide="copy" class="w-3.5 h-3.5 text-pink-400"></i>
              <span>Copy Summary</span>
            </button>
            <button onclick="closeWrappedModal()" class="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md shadow-pink-500/30 transition hover:opacity-90 active:scale-95" style="background: linear-gradient(135deg, var(--accent-pink), var(--accent-rose));">
              Done 🌸
            </button>
          </div>

        </div>
      </div>
    `;
  }
}

customElements.define('app-wrapped', AppWrapped);
