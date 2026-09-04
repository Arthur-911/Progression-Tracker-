/**
 * Bonsai Component (<app-bonsai>)
 * Interactive Blooming Sakura Bonsai Tree with XP, Mastery Titles, and Petal Shields
 */
class AppBonsai extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="theme-card rounded-2xl p-4 mt-4 border border-pink-400/25 relative overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <!-- Left: Bonsai Visual Avatar -->
          <div class="flex items-center gap-3.5">
            <div id="bonsai-tree-container" class="w-16 h-16 rounded-2xl flex items-center justify-center p-1 bg-black/40 border border-pink-400/20 shadow-inner relative group cursor-pointer transition-transform hover:scale-105" onclick="celebrateBonsai()">
              <!-- Dynamic SVG Tree -->
              <svg id="bonsai-svg" viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]">
                <!-- Pot -->
                <ellipse cx="50" cy="88" rx="28" ry="7" fill="#241434" stroke="rgba(244,114,182,0.4)" stroke-width="2"/>
                <rect x="26" y="80" width="48" height="10" rx="3" fill="#1b0e28" stroke="rgba(244,114,182,0.3)" stroke-width="1.5"/>
                <!-- Trunk -->
                <path d="M50 82 Q46 62 52 50 Q56 40 48 30 Q44 24 50 16" fill="none" stroke="#653528" stroke-width="6" stroke-linecap="round"/>
                <path d="M49 52 Q34 46 28 40" fill="none" stroke="#653528" stroke-width="3.5" stroke-linecap="round"/>
                <path d="M51 42 Q66 36 72 32" fill="none" stroke="#653528" stroke-width="3.5" stroke-linecap="round"/>
                <!-- Foliage / Blossom Clouds (Populated by JS) -->
                <g id="bonsai-foliage"></g>
              </svg>
              <div id="bonsai-bloom-indicator" class="absolute -top-1 -right-1 text-xs">✨</div>
            </div>

            <div>
              <div class="flex items-center gap-2">
                <span id="bonsai-stage-title" class="text-sm font-black text-pink-200">Bare Branch 🌱</span>
                <span id="bonsai-rank-badge" class="text-[9px] font-bold px-2 py-0.5 rounded-full border border-pink-400/30 bg-pink-500/15 text-pink-300 font-mono-num">
                  Novice Sprout
                </span>
              </div>
              <div class="flex items-center gap-3 mt-1 text-[11px] text-pink-200/70 font-mono-num">
                <span id="bonsai-xp-text">0 XP</span>
                <span>&bull;</span>
                <span id="bonsai-progress-text">0% Bloom</span>
              </div>
            </div>
          </div>

          <!-- Center: Zen Quote / Growth Meter -->
          <div class="flex-1 max-w-md w-full">
            <div class="flex items-center justify-between text-[11px] text-pink-200/80 mb-1">
              <span class="font-semibold flex items-center gap-1">
                <span>🌸</span>
                <span id="bonsai-growth-quote">"Small steps everyday nurture the deepest bloom."</span>
              </span>
              <span id="bonsai-next-rank" class="font-mono-num text-[10px] text-pink-300">Stage 1/4</span>
            </div>
            <div class="w-full rounded-full h-2 overflow-hidden bg-black/40 border border-pink-400/20 p-0.5">
              <div id="bonsai-xp-bar" class="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 shadow-sm shadow-pink-500/30" style="width: 10%;"></div>
            </div>
          </div>

          <!-- Right: Petal Shields (Rest Day Streak Protection) -->
          <div class="flex items-center gap-3 self-end md:self-center">
            <div class="text-right">
              <div class="text-[10px] uppercase tracking-wider font-bold text-pink-200/70">Petal Shields 🛡️</div>
              <div class="text-[11px] font-bold text-pink-200 font-mono-num mt-0.5" id="shields-status-text">
                3 of 3 ready
              </div>
            </div>
            <div class="flex items-center gap-1" id="shield-tokens-container">
              <span class="w-7 h-7 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-xs" title="Petal Shield Available">🌸</span>
              <span class="w-7 h-7 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-xs" title="Petal Shield Available">🌸</span>
              <span class="w-7 h-7 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-xs" title="Petal Shield Available">🌸</span>
            </div>
            <button onclick="usePetalShieldToday()" id="use-shield-btn" class="px-2.5 py-1.5 rounded-xl border border-pink-400/30 hover:bg-pink-500/20 text-[10px] font-bold text-pink-200 transition active:scale-95" title="Use a rest day shield to protect today's streak">
              Rest Day
            </button>
          </div>

        </div>
      </div>
    `;
  }
}

customElements.define('app-bonsai', AppBonsai);
