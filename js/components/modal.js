/**
 * Modal Component (<app-modal>)
 * Blended Sakura Goal Creation & Tweak Modal with Time of Day and Habit Management
 */
class AppModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="goal-modal" class="fixed inset-0 z-50 bg-black/75 backdrop-blur-md hidden flex items-center justify-center p-4">
        <div class="theme-card border border-pink-400/30 w-full max-w-sm rounded-2xl p-5 shadow-2xl relative shadow-pink-950/50">
          <div class="flex items-center justify-between pb-3 border-b border-pink-400/20">
            <h3 class="text-sm font-bold flex items-center gap-1.5 text-white">
              <span id="goal-modal-icon">🌸</span>
              <span id="goal-modal-heading">New Habit Goal</span>
            </h3>
            <button id="close-modal-btn" class="text-pink-200/60 hover:text-white p-1 rounded-lg">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <form id="goal-form" class="mt-4 space-y-3.5">
            <!-- Hidden Edit ID -->
            <input type="hidden" id="goal-edit-id" value="" />

            <div>
              <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1 text-pink-200/80">Habit Name *</label>
              <input type="text" id="goal-title" required placeholder="e.g. Morning Yoga / Read 20 mins / Code" class="w-full theme-subcard border border-pink-400/20 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-pink-400 transition" />
            </div>

            <div class="grid grid-cols-2 gap-2.5">
              <div>
                <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1 text-pink-200/80">Pillar *</label>
                <select id="goal-pillar" class="w-full theme-subcard border border-pink-400/20 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-pink-400">
                  <!-- Rendered dynamically -->
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1 text-pink-200/80">Time of Day</label>
                <select id="goal-tod" class="w-full theme-subcard border border-pink-400/20 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-pink-400">
                  <option value="any">✨ Anytime</option>
                  <option value="morning">🌅 Morning</option>
                  <option value="afternoon">☀️ Afternoon</option>
                  <option value="evening">🌙 Evening</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2.5">
              <div>
                <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1 text-pink-200/80">Effort Weight</label>
                <select id="goal-effort" class="w-full theme-subcard border border-pink-400/20 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none font-mono-num font-bold">
                  <option value="1">⚡ 1 pt (Quick)</option>
                  <option value="2">⚡⚡ 2 pts (Light)</option>
                  <option value="3" selected>⚡⚡⚡ 3 pts (Standard)</option>
                  <option value="4">⚡⚡⚡⚡ 4 pts (Focus)</option>
                  <option value="5">⚡⚡⚡⚡⚡ 5 pts (Milestone)</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1 text-pink-200/80">Target Days</label>
                <input type="number" id="goal-target-days" min="1" max="31" value="30" class="w-full theme-subcard border border-pink-400/20 rounded-xl px-2.5 py-1.5 text-xs font-mono-num font-bold text-center text-white focus:outline-none focus:border-pink-400" />
              </div>
            </div>

            <!-- Tweak-Only Stats & Actions Section -->
            <div id="goal-tweak-section" class="hidden p-2.5 rounded-xl border border-pink-400/20 bg-pink-500/5 space-y-2">
              <div class="flex items-center justify-between text-[11px]">
                <span class="text-pink-200/70 font-medium">Month Progress:</span>
                <span id="goal-tweak-progress-text" class="font-mono-num font-bold text-pink-200">0/30 (0%)</span>
              </div>
              <div class="flex items-center justify-between pt-1 border-t border-pink-400/10">
                <span class="text-[10px] text-pink-200/60">Reset this habit's checkmarks?</span>
                <button type="button" id="reset-goal-checks-btn" class="text-[10px] text-amber-300 hover:text-amber-200 font-semibold px-2 py-0.5 rounded border border-amber-400/25 bg-amber-400/10 hover:bg-amber-400/20 transition">
                  Clear Checks
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between gap-2 pt-3 border-t border-pink-400/20">
              <button type="button" id="delete-goal-modal-btn" class="hidden px-2.5 py-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/15 rounded-xl border border-rose-400/20 transition flex items-center gap-1.5">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                <span>Remove Habit</span>
              </button>

              <div class="flex items-center gap-2 ml-auto">
                <button type="button" id="cancel-modal-btn" class="px-3 py-1.5 text-xs font-semibold text-pink-200/60 hover:text-white transition">Cancel</button>
                <button type="submit" id="submit-goal-btn" class="px-4 py-1.5 rounded-xl font-bold text-xs text-white shadow-md shadow-pink-500/30 transition hover:opacity-90" style="background: linear-gradient(135deg, var(--accent-pink), var(--accent-rose));">
                  Save Goal 🌸
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define('app-modal', AppModal);
