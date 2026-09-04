/**
 * Header Component (<app-header>)
 * Blended Sakura Theme Header with Wrapped & Install triggers
 */
class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border)]">
        
        <!-- Brand & Title -->
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center p-0.5 shadow-lg shadow-pink-500/25" style="background: linear-gradient(135deg, var(--accent-pink), var(--accent-rose));">
            <div class="w-full h-full rounded-[10px] flex items-center justify-center bg-[#150d1e]/90 backdrop-blur-sm">
              <span class="text-sm">🌸</span>
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Progression <span style="color: var(--accent-pink);">Matrix</span>
              </h1>
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-pink-400/30 bg-pink-400/10 text-pink-300 font-mono-num">
                Sakura Zen
              </span>
            </div>
            <p class="text-[11px] text-pink-200/70 font-medium">Blossom your daily rhythm & monthly cadence</p>
          </div>
        </div>

        <!-- Controls & Quick Actions -->
        <div class="flex flex-wrap items-center gap-2 text-xs">
          
          <!-- Monthly Wrapped Button -->
          <button onclick="openWrappedModal()" title="View Monthly Wrapped Summary" class="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-pink-400/30 bg-pink-500/15 text-pink-200 hover:bg-pink-500/25 transition active:scale-95 font-semibold text-[11px]">
            <span>🎁</span>
            <span class="hidden sm:inline">Wrapped</span>
          </button>

          <!-- Confetti Celebration Button -->
          <button onclick="fireGrandCelebration()" title="Confetti celebration" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-white shadow-md shadow-pink-500/20 transition active:scale-95 hover:opacity-90 text-[11px]" style="background: linear-gradient(135deg, var(--accent-pink), var(--accent-rose));">
            <span>✨</span>
            <span class="hidden sm:inline font-bold">Celebrate</span>
          </button>

          <!-- Audio FX Toggle -->
          <button id="sound-toggle-btn" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl theme-subcard hover:border-pink-400/40 transition font-medium text-pink-100 text-[11px]">
            <i data-lucide="volume-2" id="sound-icon" class="w-3.5 h-3.5 text-pink-400"></i>
            <span class="hidden sm:inline">Audio</span>
          </button>

          <!-- Month Navigator -->
          <div class="flex items-center theme-subcard rounded-xl p-0.5 border border-pink-400/20">
            <button id="prev-month-btn" title="Previous Month" class="p-1 rounded-lg hover:bg-white/10 text-pink-200 hover:text-white transition">
              <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
            </button>
            <div id="month-display" class="px-2.5 py-0.5 font-bold text-xs min-w-[125px] text-center font-mono-num text-pink-100">
              September 2026
            </div>
            <button id="next-month-btn" title="Next Month" class="p-1 rounded-lg hover:bg-white/10 text-pink-200 hover:text-white transition">
              <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>

          <!-- Jump to Today -->
          <button id="jump-today-btn" class="px-2.5 py-1.5 rounded-xl theme-subcard hover:border-pink-400/40 text-[11px] font-semibold transition flex items-center gap-1 text-pink-200">
            <span class="text-pink-400">🎯</span>
            <span>Today</span>
          </button>

          <!-- Add Goal Button -->
          <button id="open-modal-btn" class="px-3 py-1.5 rounded-xl font-bold text-[11px] text-white shadow-md shadow-pink-500/25 transition active:scale-95 flex items-center gap-1.5" style="background: linear-gradient(135deg, var(--accent-pink), #e11d48);">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Add Goal</span>
          </button>

          <!-- PWA Install Button (Hidden unless browser supports install prompt) -->
          <button id="pwa-install-btn" class="hidden px-2.5 py-1.5 rounded-xl border border-pink-400/30 bg-pink-500/20 text-pink-200 font-bold text-[11px] hover:bg-pink-500/30 transition">
            📲 Install
          </button>

        </div>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);
