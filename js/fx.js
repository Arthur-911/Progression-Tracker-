/**
 * Effects Engine: Cute Kalimba Audio Synthesis + Pastel Sparkle Confetti
 */

let soundEnabled = true;

/**
 * Cute, gentle marimba/kalimba chime on tick
 */
function playTickSound(completed) {
  if (!soundEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    if (completed) {
      // Cute pleasant high chime (E5 -> G#5)
      osc.frequency.setValueAtTime(659.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(830.61, ctx.currentTime + 0.07);
    } else {
      // Soft gentle tap
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.05);
    }

    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  } catch (e) {}
}

/**
 * Cute fanfare arpeggio on 100% completion
 */
function playFanfareSound() {
  if (!soundEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Cute major pentatonic arpeggio (C5, D5, E5, G5, A5, C6)
    const notes = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const start = ctx.currentTime + (idx * 0.06);
      gain.gain.setValueAtTime(0.09, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.38);
    });
  } catch (e) {}
}

/**
 * Cute micro-sparks on tile click
 */
function fireTileSparks(event) {
  if (typeof confetti !== 'function') return;
  const x = event ? (event.clientX / window.innerWidth) : 0.5;
  const y = event ? (event.clientY / window.innerHeight) : 0.5;

  confetti({
    particleCount: 14,
    spread: 45,
    startVelocity: 16,
    ticks: 30,
    origin: { x, y },
    colors: ['#c084fc', '#f472b6', '#4ade80', '#38bdf8', '#fde047'],
    shapes: ['circle']
  });
}

/**
 * Full celebratory confetti shower with pastel sparkles
 */
function fireGrandCelebration() {
  if (typeof confetti !== 'function') return;
  playFanfareSound();

  const duration = 2.2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ['#c084fc', '#f472b6', '#38bdf8', '#4ade80', '#fde047']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ['#c084fc', '#f472b6', '#38bdf8', '#4ade80', '#fde047']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());

  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#c084fc', '#f472b6', '#ffffff', '#38bdf8', '#fde047'],
      shapes: ['circle', 'star']
    });
  }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    soundBtn.onclick = () => {
      soundEnabled = !soundEnabled;
      const icon = document.getElementById('sound-icon');
      if (soundEnabled) {
        icon.setAttribute('data-lucide', 'volume-2');
      } else {
        icon.setAttribute('data-lucide', 'volume-x');
      }
      if (window.lucide) {
        lucide.createIcons();
      }
    };
  }
});
