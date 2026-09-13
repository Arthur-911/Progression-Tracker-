/**
 * Header Component (<app-header>)
 * Adaptive Multi-Theme Header with Theme Gallery, Wrapped & Install triggers
 */
class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border)]">
        
        <!-- Brand & Title -->
        <div class="flex items-center gap-2.5">
          <div id="header-brand-bg" class="w-9 h-9 rounded-xl flex items-center justify-center p-0.5 shadow-lg shadow-pink-500/25 transition-all" style="background: var(--theme-gradient);">
            <div class="w-full h-full rounded-[10px] flex items-center justify-center bg-[#150d1e]/90 backdrop-blur-sm">
              <span id="header-brand-icon" class="text-sm">🌸</span>
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Progression <span id="header-matrix-span" style="color: var(--accent-pink);">Matrix</span>
              </h1>
              <span id="header-theme-badge" class="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-pink-400/30 bg-pink-400/10 text-pink-300 font-mono-num transition-all">
                Sakura Zen
              </span>
            </div>
            <p id="header-subtitle" class="text-[11px] text-pink-200/70 font-medium transition-all">Blossom your daily rhythm & monthly cadence</p>
          </div>
        </div>

        <!-- Controls & Quick Actions -->
        <div class="flex flex-wrap items-center gap-2 text-xs">
          
          <!-- Theme Gallery Selector -->
          <div class="relative" id="theme-selector-wrapper">
            <button 
              id="theme-toggle-btn" 
              onclick="toggleThemeDropdown(event)" 
              title="Change Aesthetic Theme" 
              class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl theme-subcard hover:border-[var(--accent-pink)]/40 transition font-medium text-pink-100 text-[11px]"
            >
              <span id="header-theme-icon">🌸</span>
              <span id="header-theme-name" class="hidden sm:inline font-semibold">Sakura</span>
              <i data-lucide="palette" class="w-3.5 h-3.5" style="color: var(--accent-pink);"></i>
            </button>

            <!-- Theme Dropdown Menu -->
            <div 
              id="theme-dropdown-menu" 
              class="hidden absolute right-0 top-full mt-2 w-64 rounded-2xl theme-card border border-[var(--border)] shadow-2xl p-2 z-50 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div class="flex items-center justify-between px-2.5 py-1.5 border-b border-[var(--border)] mb-1">
                <span class="text-[10px] font-bold uppercase tracking-wider text-pink-200/70">Aesthetic Gallery</span>
                <span class="text-[9px] font-mono-num text-pink-300 font-bold">7 Themes</span>
              </div>
              <div class="space-y-1 max-h-72 overflow-y-auto" id="theme-list-container">
                <!-- Dynamically filled with interactive preview cards -->
              </div>
            </div>
          </div>

          <!-- Monthly Wrapped Button -->
          <button onclick="openWrappedModal()" title="View Monthly Wrapped Summary" class="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-pink-400/30 bg-pink-500/15 text-pink-200 hover:bg-pink-500/25 transition active:scale-95 font-semibold text-[11px]">
            <span>🎁</span>
            <span class="hidden sm:inline">Wrapped</span>
          </button>

          <!-- Confetti Celebration Button -->
          <button onclick="fireGrandCelebration()" title="Confetti celebration" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-white shadow-md shadow-pink-500/20 transition active:scale-95 hover:opacity-90 text-[11px]" style="background: var(--theme-gradient);">
            <span>✨</span>
            <span class="hidden sm:inline font-bold">Celebrate</span>
          </button>

          <!-- Audio FX Toggle -->
          <button id="sound-toggle-btn" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl theme-subcard hover:border-pink-400/40 transition font-medium text-pink-100 text-[11px]">
            <i data-lucide="volume-2" id="sound-icon" class="w-3.5 h-3.5" style="color: var(--accent-pink);"></i>
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
            <span>🎯</span>
            <span>Today</span>
          </button>

          <!-- Add Goal Button -->
          <button id="open-modal-btn" class="px-3 py-1.5 rounded-xl font-bold text-[11px] text-white shadow-md shadow-pink-500/25 transition active:scale-95 flex items-center gap-1.5" style="background: var(--theme-gradient);">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Add Goal</span>
          </button>

          <!-- PWA Install Button -->
          <button id="pwa-install-btn" class="hidden px-2.5 py-1.5 rounded-xl border border-pink-400/30 bg-pink-500/20 text-pink-200 font-bold text-[11px] hover:bg-pink-500/30 transition">
            📲 Install
          </button>

        </div>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);
