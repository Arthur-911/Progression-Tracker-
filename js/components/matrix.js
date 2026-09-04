/**
 * Matrix Component (<app-matrix>)
 * Blended Sakura Progression Matrix Table with Time-of-Day Filters & Note Triggers
 */
class AppMatrix extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- Pillar & Time-of-Day Filter Tabs -->
      <div class="flex items-center justify-between gap-3 mt-6 flex-wrap">
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span class="font-bold text-[10px] uppercase tracking-wider text-pink-200/70 mr-0.5">Pillar:</span>
          <button onclick="filterPillar('all')" id="pill-all" class="pillar-filter-btn px-3 py-1 rounded-xl border font-bold transition-all text-white shadow-sm text-xs" style="background: var(--accent-pink); border-color: rgba(244, 114, 182, 0.4);">
            🌸 All
          </button>
          <div id="pillar-buttons" class="flex items-center gap-1.5">
            <!-- Populated dynamically by app.js -->
          </div>
        </div>

        <!-- Time of Day Filter -->
        <div class="flex items-center gap-1.5 text-xs">
          <span class="font-bold text-[10px] uppercase tracking-wider text-pink-200/70 mr-0.5">Time:</span>
          <div class="flex items-center theme-subcard rounded-xl p-0.5 border border-pink-400/20">
            <button onclick="filterTimeOfDay('all')" id="tod-all" class="tod-btn px-2 py-0.5 rounded-lg text-[11px] font-bold text-white bg-pink-500/30 transition">All</button>
            <button onclick="filterTimeOfDay('morning')" id="tod-morning" class="tod-btn px-2 py-0.5 rounded-lg text-[11px] font-medium text-pink-200/70 hover:text-white transition">🌅 Morn</button>
            <button onclick="filterTimeOfDay('afternoon')" id="tod-afternoon" class="tod-btn px-2 py-0.5 rounded-lg text-[11px] font-medium text-pink-200/70 hover:text-white transition">☀️ Focus</button>
            <button onclick="filterTimeOfDay('evening')" id="tod-evening" class="tod-btn px-2 py-0.5 rounded-lg text-[11px] font-medium text-pink-200/70 hover:text-white transition">🌙 Night</button>
          </div>
        </div>
      </div>

      <!-- Main Tabular Matrix -->
      <div class="mt-3 theme-card rounded-2xl shadow-2xl overflow-hidden">
        <div class="overflow-x-auto" id="table-scroll-wrapper" style="-webkit-overflow-scrolling: touch;">
          <table class="w-full text-left border-collapse" id="progression-table">
            <thead>
              <tr class="border-b border-[var(--border)] text-[11px] font-semibold select-none bg-[#120a18]/60">
                
                <!-- Frozen 1: Goal Title -->
                <th class="sticky-col-1 py-3 px-3.5 min-w-[190px] max-w-[190px] border-r border-[var(--border)] z-30 shadow-[2px_0_8px_rgba(0,0,0,0.4)]">
                  <div class="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-pink-100">
                    <span class="text-pink-400">🌸</span>
                    <span>Habit / Goal</span>
                  </div>
                </th>

                <!-- Frozen 2: Pillar & Effort -->
                <th class="sticky-col-2 py-3 px-3 min-w-[110px] max-w-[110px] border-r border-[var(--border)] z-30 shadow-[2px_0_8px_rgba(0,0,0,0.4)]">
                  <div class="font-bold uppercase tracking-wider text-[10px] text-pink-100">
                    Pillar
                  </div>
                </th>

                <!-- Days 1 to 28/30/31 columns generated dynamically -->

                <!-- Right Summaries -->
                <th class="py-3 px-3 text-center min-w-[85px] border-l border-[var(--border)]">
                  <span class="font-bold uppercase tracking-wider text-[10px] text-pink-100">Days</span>
                </th>
                <th class="py-3 px-3.5 text-center min-w-[125px] border-l border-[var(--border)]">
                  <span class="font-bold uppercase tracking-wider text-[10px] text-pink-100">Progress</span>
                </th>
                <th class="py-3 px-2 text-center min-w-[36px] border-l border-[var(--border)]"></th>
              </tr>
            </thead>

            <tbody id="table-body" class="divide-y divide-[var(--border-subtle)] text-xs font-medium">
              <!-- Rendered by app.js -->
            </tbody>

            <!-- Table Footer: Daily Completion Intensity -->
            <tfoot id="table-footer" class="border-t border-[var(--border)] font-semibold text-xs bg-[#100816]/75">
              <!-- Rendered by app.js -->
            </tfoot>
          </table>
        </div>
      </div>

      <!-- Helper Tip -->
      <div class="flex items-center justify-between mt-2 text-[10px] text-pink-200/60 px-1 font-mono-num">
        <span>💡 Tip: Right-click (or hold) any day tile to log micro-notes & mood reflections.</span>
        <span>🛡️ = Protected Rest Day</span>
      </div>

      <!-- Empty State -->
      <div id="empty-state" class="hidden text-center py-14 border border-dashed border-[var(--border)] rounded-2xl theme-card p-6 mt-4">
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-pink-400/30 bg-pink-400/10 text-xl shadow-lg shadow-pink-500/20">
          🌸
        </div>
        <h3 class="text-base font-bold text-white">No habits in this view</h3>
        <p class="text-xs text-pink-200/70 mt-1 max-w-xs mx-auto">Create a daily routine and watch your cherry blossom progression bloom.</p>
        <button onclick="document.getElementById('open-modal-btn').click()" class="mt-4 px-4 py-1.5 rounded-xl font-bold text-xs text-white shadow-md shadow-pink-500/25 transition hover:opacity-90" style="background: var(--accent-pink);">
          + Add Habit
        </button>
      </div>
    `;
  }
}

customElements.define('app-matrix', AppMatrix);
