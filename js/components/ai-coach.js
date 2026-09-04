/**
 * AI Coach Component (<app-ai-coach>)
 * Floating Sakura Sensei Zen Habit Coach & Advisor
 */
class AppAiCoach extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- Floating AI Coach Launcher Button (Bottom-Right) -->
      <div class="fixed bottom-5 right-5 z-40">
        <button 
          id="ai-coach-toggle-btn" 
          onclick="toggleAiCoach()"
          title="Open Sakura Sensei (AI Habit Coach)"
          class="flex items-center gap-2 px-4 py-2.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-white font-bold text-xs border border-pink-400/40 relative group"
          style="background: linear-gradient(135deg, rgba(244, 114, 182, 0.95), rgba(192, 132, 252, 0.95)); box-shadow: 0 10px 25px rgba(244, 114, 182, 0.4);"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-base">🌸</span>
          <span class="font-brand tracking-wide">Sakura Sensei</span>
          <span class="text-[10px] bg-black/30 px-1.5 py-0.5 rounded-full border border-white/20 font-mono-num">AI</span>
        </button>
      </div>

      <!-- AI Coach Slide-over Chat Drawer -->
      <div id="ai-coach-drawer" class="fixed bottom-20 right-5 z-50 w-full max-w-sm sm:max-w-md hidden transition-all duration-300">
        <div class="theme-card border border-pink-400/35 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px] shadow-pink-950/80 backdrop-blur-2xl bg-[#160d20]/95">
          
          <!-- Drawer Top Header -->
          <div class="p-3.5 border-b border-pink-400/20 flex items-center justify-between bg-black/40">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-400 to-purple-400 p-0.5 shadow-md shadow-pink-500/30">
                <div class="w-full h-full rounded-[10px] bg-[#120818] flex items-center justify-center text-sm">
                  🌸
                </div>
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <h3 class="text-xs font-black text-white font-brand">Sakura Sensei</h3>
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span class="text-[9px] text-emerald-300 font-mono-num font-bold">Online</span>
                </div>
                <p class="text-[10px] text-pink-200/60 font-medium">Zen Habit Coach & Rhythm Guide</p>
              </div>
            </div>

            <div class="flex items-center gap-1">
              <!-- API Key Settings Button -->
              <button onclick="toggleAiSettingsModal()" title="AI Settings / API Key" class="p-1.5 text-pink-200/70 hover:text-white rounded-lg hover:bg-white/10 transition">
                <i data-lucide="settings" class="w-3.5 h-3.5"></i>
              </button>
              <!-- Close Drawer -->
              <button onclick="toggleAiCoach()" class="p-1.5 text-pink-200/70 hover:text-white rounded-lg hover:bg-white/10 transition">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <!-- Quick Suggestion Action Chips -->
          <div class="p-2 border-b border-pink-400/15 bg-black/20 overflow-x-auto flex items-center gap-1.5 text-[10px] select-none">
            <button onclick="askSenseiPreset('Analyze my rhythm and give me a diagnostic review')" class="px-2.5 py-1 rounded-full border border-pink-400/25 bg-pink-500/10 hover:bg-pink-500/20 text-pink-200 whitespace-nowrap transition">
              📊 Analyze Rhythm
            </button>
            <button onclick="askSenseiPreset('Give me advice on my pacing and velocity')" class="px-2.5 py-1 rounded-full border border-pink-400/25 bg-pink-500/10 hover:bg-pink-500/20 text-pink-200 whitespace-nowrap transition">
              🎯 Pacing Tips
            </button>
            <button onclick="askSenseiPreset('How can I overcome procrastination on my habits?')" class="px-2.5 py-1 rounded-full border border-pink-400/25 bg-pink-500/10 hover:bg-pink-500/20 text-pink-200 whitespace-nowrap transition">
              🧘 Procrastination
            </button>
            <button onclick="askSenseiPreset('How balanced are my habits across life pillars?')" class="px-2.5 py-1 rounded-full border border-pink-400/25 bg-pink-500/10 hover:bg-pink-500/20 text-pink-200 whitespace-nowrap transition">
              ⚖️ Pillar Balance
            </button>
          </div>

          <!-- Chat Messages Area -->
          <div id="ai-chat-messages" class="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs">
            <!-- Initial Greeting -->
            <div class="flex items-start gap-2.5">
              <div class="w-6 h-6 rounded-lg bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-xs flex-shrink-0">🌸</div>
              <div class="p-3 rounded-2xl rounded-tl-none bg-pink-500/10 border border-pink-400/20 text-pink-100 leading-relaxed max-w-[85%]">
                Greetings! I am <strong>Sakura Sensei</strong>, your embedded Zen habit companion.
                <br><br>
                I continuously review your progression matrix, streaks, and time pacing. Tap any chip above or ask me anything to cultivate your daily cadence! 🍵
              </div>
            </div>
          </div>

          <!-- Input Bar -->
          <form id="ai-chat-form" onsubmit="handleSendAiMessage(event)" class="p-2.5 border-t border-pink-400/20 bg-black/40 flex items-center gap-2">
            <input 
              type="text" 
              id="ai-chat-input" 
              placeholder="Ask Sensei for habit advice or tips..." 
              autocomplete="off"
              class="flex-1 bg-[#100718] border border-pink-400/25 rounded-xl px-3 py-2 text-xs text-white placeholder-pink-200/40 focus:outline-none focus:border-pink-400 font-medium"
            />
            <button 
              type="submit" 
              id="ai-send-btn"
              class="px-3 py-2 rounded-xl text-white font-bold text-xs shadow-md transition hover:opacity-90 active:scale-95 flex items-center justify-center"
              style="background: linear-gradient(135deg, var(--accent-pink), var(--accent-rose));"
            >
              <i data-lucide="send" class="w-3.5 h-3.5"></i>
            </button>
          </form>

        </div>
      </div>

      <!-- Settings Modal (Optional Gemini API Key) -->
      <div id="ai-settings-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm hidden flex items-center justify-center p-4">
        <div class="theme-card border border-pink-400/30 w-full max-w-sm rounded-2xl p-5 shadow-2xl relative shadow-pink-950/60">
          <div class="flex items-center justify-between pb-2.5 border-b border-pink-400/20">
            <h3 class="text-xs font-bold text-white flex items-center gap-1.5">
              <span>⚙️</span>
              <span>Sakura Sensei Settings</span>
            </h3>
            <button onclick="toggleAiSettingsModal()" class="text-pink-200/60 hover:text-white p-1 rounded-lg">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <div class="mt-3.5 space-y-3 text-xs">
            <p class="text-pink-200/80 leading-relaxed">
              By default, Sakura Sensei runs on a <strong>fast, 100% offline Zen intelligence engine</strong> that knows your real matrix data without requiring any API keys.
            </p>
            <div>
              <label class="block text-[10px] font-bold uppercase tracking-wider text-pink-300 mb-1">
                Optional: Google Gemini API Key
              </label>
              <input 
                type="password" 
                id="gemini-api-key-input" 
                placeholder="AIzaSy..." 
                class="w-full theme-subcard border border-pink-400/25 rounded-xl px-3 py-2 text-xs text-white placeholder-pink-200/30 focus:outline-none focus:border-pink-400"
              />
              <p class="text-[10px] text-pink-200/50 mt-1">
                Stored purely inside your browser's private local storage.
              </p>
            </div>

            <div class="flex items-center justify-end gap-2 pt-2 border-t border-pink-400/20">
              <button type="button" onclick="clearAiApiKey()" class="text-[11px] font-bold text-rose-400 hover:text-rose-300 px-2 py-1">Clear Key</button>
              <button type="button" onclick="saveAiApiKey()" class="px-4 py-1.5 rounded-xl font-bold text-xs text-white shadow-md transition" style="background: linear-gradient(135deg, var(--accent-pink), var(--accent-rose));">
                Save & Close
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-ai-coach', AppAiCoach);

// Window Actions for AI Coach
window.toggleAiCoach = function() {
  const drawer = document.getElementById('ai-coach-drawer');
  if (!drawer) return;
  const isHidden = drawer.classList.contains('hidden');
  if (isHidden) {
    drawer.classList.remove('hidden');
    playTickSound(true);
    setTimeout(() => {
      const input = document.getElementById('ai-chat-input');
      if (input) input.focus();
    }, 150);
  } else {
    drawer.classList.add('hidden');
  }
  if (window.lucide) lucide.createIcons();
};

window.askSenseiPreset = function(presetPrompt) {
  const input = document.getElementById('ai-chat-input');
  if (input) {
    input.value = presetPrompt;
    document.getElementById('ai-chat-form').dispatchEvent(new Event('submit'));
  }
};

window.handleSendAiMessage = async function(e) {
  e.preventDefault();
  const input = document.getElementById('ai-chat-input');
  const messagesContainer = document.getElementById('ai-chat-messages');
  const prompt = (input.value || '').trim();
  if (!prompt) return;

  // Append User Message
  input.value = '';
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = "flex items-start justify-end gap-2";
  userMsgDiv.innerHTML = `
    <div class="p-3 rounded-2xl rounded-tr-none bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-xs leading-relaxed max-w-[85%] shadow-md">
      ${escapeHtml(prompt)}
    </div>
  `;
  messagesContainer.appendChild(userMsgDiv);

  // Append Typing / Thinking Bubble
  const typingDiv = document.createElement('div');
  typingDiv.className = "flex items-start gap-2.5";
  typingDiv.id = "ai-typing-indicator";
  typingDiv.innerHTML = `
    <div class="w-6 h-6 rounded-lg bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-xs flex-shrink-0">🌸</div>
    <div class="p-2.5 rounded-2xl rounded-tl-none bg-pink-500/10 border border-pink-400/20 text-pink-200/70 text-xs italic flex items-center gap-1.5">
      <span class="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping"></span>
      <span>Sensei is analyzing your rhythm...</span>
    </div>
  `;
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Query AI Engine
  const reply = await querySakuraSensei(prompt);

  // Remove typing bubble
  const typingElem = document.getElementById('ai-typing-indicator');
  if (typingElem) typingElem.remove();

  // Append Sensei Response
  const senseiMsgDiv = document.createElement('div');
  senseiMsgDiv.className = "flex items-start gap-2.5";
  senseiMsgDiv.innerHTML = `
    <div class="w-6 h-6 rounded-lg bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-xs flex-shrink-0">🌸</div>
    <div class="p-3 rounded-2xl rounded-tl-none bg-pink-500/10 border border-pink-400/20 text-pink-100 leading-relaxed max-w-[85%]">
      ${formatAiMarkdown(reply)}
    </div>
  `;
  messagesContainer.appendChild(senseiMsgDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  playTickSound(true);
};

window.toggleAiSettingsModal = function() {
  const modal = document.getElementById('ai-settings-modal');
  if (!modal) return;
  const isHidden = modal.classList.contains('hidden');
  if (isHidden) {
    const savedKey = localStorage.getItem('sakura_gemini_api_key') || '';
    document.getElementById('gemini-api-key-input').value = savedKey;
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
  }
};

window.saveAiApiKey = function() {
  const key = document.getElementById('gemini-api-key-input').value.trim();
  if (key) {
    localStorage.setItem('sakura_gemini_api_key', key);
    alert("Gemini API Key saved! Sakura Sensei is now powered by live Gemini AI. 🌸✨");
  } else {
    localStorage.removeItem('sakura_gemini_api_key');
  }
  toggleAiSettingsModal();
};

window.clearAiApiKey = function() {
  localStorage.removeItem('sakura_gemini_api_key');
  document.getElementById('gemini-api-key-input').value = '';
  alert("API key removed. Sakura Sensei will use the built-in offline Zen engine.");
  toggleAiSettingsModal();
};

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function formatAiMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
    .replace(/• (.*?)(<br>|$)/g, '<div class="flex items-start gap-1 my-0.5"><span>•</span><span>$1</span></div>');
}
