/**
 * Footer Component (<app-footer>)
 * Blended Sakura Theme Footer
 */
class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="mt-8 pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-pink-200/60">
        <div class="flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse"></span>
          <span>Tokyo Sakura Walkway Edition &bull; Auto-saved locally</span>
        </div>
        <div class="flex items-center gap-3">
          <button id="export-json-btn" class="hover:text-pink-300 transition flex items-center gap-1 font-semibold">
            <i data-lucide="download" class="w-3 h-3 text-pink-400"></i> Export JSON
          </button>
          <span>&bull;</span>
          <label class="hover:text-pink-300 transition flex items-center gap-1 font-semibold cursor-pointer">
            <i data-lucide="upload" class="w-3 h-3 text-pink-400"></i> Import JSON
            <input type="file" id="import-json-input" accept=".json" class="hidden" />
          </label>
          <span>&bull;</span>
          <button id="reset-data-btn" class="hover:text-rose-400 transition font-semibold">Reset Demo</button>
        </div>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);
