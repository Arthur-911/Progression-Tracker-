/**
 * Note Modal Component (<app-note-modal>)
 * Micro-journaling and mood reflection for any day cell
 */
class AppNoteModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="cell-note-modal" class="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm hidden flex items-center justify-center p-4">
        <div class="theme-card border border-pink-400/30 w-full max-w-sm rounded-2xl p-5 shadow-2xl relative shadow-pink-950/50">
          
          <div class="flex items-center justify-between pb-2.5 border-b border-pink-400/20">
            <h3 class="text-xs font-bold text-white flex items-center gap-1.5">
              <span>📓</span>
              <span id="note-modal-title">Day Note</span>
            </h3>
            <button onclick="closeNoteModal()" class="text-pink-200/60 hover:text-white p-1 rounded-lg">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <form id="cell-note-form" onsubmit="saveCellNote(event)" class="mt-3.5 space-y-3">
            
            <!-- Mood Emoji Picker -->
            <div>
              <label class="block text-[10px] font-bold uppercase tracking-wider text-pink-200/80 mb-1.5">Today's Mood</label>
              <div class="flex items-center justify-between gap-1" id="mood-picker">
                <button type="button" onclick="selectMood('🌸')" class="mood-btn w-8 h-8 rounded-xl border border-pink-400/20 hover:bg-pink-500/20 flex items-center justify-center text-sm transition" data-mood="🌸">🌸</button>
                <button type="button" onclick="selectMood('⚡')" class="mood-btn w-8 h-8 rounded-xl border border-pink-400/20 hover:bg-pink-500/20 flex items-center justify-center text-sm transition" data-mood="⚡">⚡</button>
                <button type="button" onclick="selectMood('🔥')" class="mood-btn w-8 h-8 rounded-xl border border-pink-400/20 hover:bg-pink-500/20 flex items-center justify-center text-sm transition" data-mood="🔥">🔥</button>
                <button type="button" onclick="selectMood('🧘')" class="mood-btn w-8 h-8 rounded-xl border border-pink-400/20 hover:bg-pink-500/20 flex items-center justify-center text-sm transition" data-mood="🧘">🧘</button>
                <button type="button" onclick="selectMood('😊')" class="mood-btn w-8 h-8 rounded-xl border border-pink-400/20 hover:bg-pink-500/20 flex items-center justify-center text-sm transition" data-mood="😊">😊</button>
                <button type="button" onclick="selectMood('🌧️')" class="mood-btn w-8 h-8 rounded-xl border border-pink-400/20 hover:bg-pink-500/20 flex items-center justify-center text-sm transition" data-mood="🌧️">🌧️</button>
              </div>
              <input type="hidden" id="selected-mood-input" value="🌸" />
            </div>

            <!-- Micro Reflection Note -->
            <div>
              <label class="block text-[10px] font-bold uppercase tracking-wider text-pink-200/80 mb-1">Micro Reflection</label>
              <textarea 
                id="cell-note-text" 
                rows="2" 
                placeholder="What made this day memorable? e.g. Finished 5k in rain!"
                class="w-full theme-subcard border border-pink-400/20 rounded-xl px-3 py-2 text-xs text-white placeholder-pink-200/30 focus:outline-none focus:border-pink-400 resize-none font-medium"
              ></textarea>
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-pink-400/20 text-xs">
              <button type="button" onclick="deleteCellNote()" id="delete-note-btn" class="text-[11px] font-bold text-rose-400 hover:text-rose-300 transition">
                Clear Note
              </button>
              <div class="flex items-center gap-2">
                <button type="button" onclick="closeNoteModal()" class="px-3 py-1.5 font-semibold text-pink-200/60 hover:text-white transition text-xs">Cancel</button>
                <button type="submit" class="px-4 py-1.5 rounded-xl font-bold text-xs text-white shadow-md transition hover:opacity-90" style="background: linear-gradient(135deg, var(--accent-pink), var(--accent-rose));">
                  Save Note ✨
                </button>
              </div>
            </div>

          </form>

        </div>
      </div>
    `;
  }
}

customElements.define('app-note-modal', AppNoteModal);
