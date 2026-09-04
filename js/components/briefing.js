/**
 * Briefing Component (<app-briefing>)
 * Daily Zen Morning Briefing & One-Tap / Natural Language Quick Check-in
 */
class AppBriefing extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="mt-4 theme-card rounded-2xl p-3 sm:p-3.5 border border-pink-400/20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 relative overflow-hidden">
        
        <!-- Zen Daily Intelligence -->
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-pink-500/15 border border-pink-400/30 flex items-center justify-center text-sm shadow-sm">
            ☀️
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold uppercase tracking-wider text-pink-300 font-mono-num">Zen Briefing</span>
              <span id="briefing-time-badge" class="text-[9px] px-1.5 py-0.2 rounded-full border border-pink-400/20 text-pink-200/70 font-mono-num">Morning Flow</span>
            </div>
            <p id="briefing-message" class="text-xs font-medium text-pink-100 mt-0.5">
              Welcome back! Complete your habits today to keep your bonsai tree flourishing.
            </p>
          </div>
        </div>

        <!-- Natural Language / Quick Tap Chips for Today -->
        <div class="flex items-center gap-2 flex-wrap md:flex-nowrap">
          <div class="relative flex-1 md:w-56">
            <input 
              type="text" 
              id="natural-check-input" 
              placeholder="Type habit e.g. 'gym, read'..." 
              class="w-full theme-subcard border border-pink-400/25 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-pink-200/40 focus:outline-none focus:border-pink-400 font-medium"
              onkeydown="handleNaturalInputKey(event)"
            />
          </div>
          <div id="today-quick-chips" class="flex items-center gap-1.5 overflow-x-auto max-w-xs">
            <!-- Dynamically populated chips for habits remaining today -->
          </div>
        </div>

      </div>
    `;
  }
}

customElements.define('app-briefing', AppBriefing);
