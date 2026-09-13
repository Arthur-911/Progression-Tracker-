/**
 * Ambient Atmosphere Engine
 * Multi-Theme Canvas Particle Physics supporting 7 distinct aesthetics:
 * 1. Sakura: 3D fluttering cherry blossom petals
 * 2. Matcha: Curved tea/bamboo leaves & gentle glowing fireflies
 * 3. Celestial: Twinkling stardust & shooting stars
 * 4. Café: Rainy windowpane streaks with subtle splash ripples
 * 5. Cyberpunk: Neon digital matrix rain & cyber spark particles
 * 6. Aurora: Soft polar aurora curtain waves & falling snowflakes
 * 7. Sunset: Golden sand grains & warm twilight embers
 */
(function initAmbientEngine() {
  const canvas = document.getElementById('sakura-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let currentTheme = localStorage.getItem('progression_tracker_theme') || 'sakura';
  let particles = [];
  let secondaryParticles = [];
  let shootingStar = null;
  let auroraPhase = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // ==================== 1. SAKURA PARTICLES ====================
  class SakuraPetal {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * (canvas.width + 120) - 60;
      this.y = initial ? Math.random() * canvas.height : -30;
      this.size = Math.random() * 8 + 9;
      this.speedY = Math.random() * 1.1 + 0.7;
      this.speedX = Math.random() * 0.9 + 0.3;
      this.angle = Math.random() * Math.PI * 2;
      this.rotateSpeed = (Math.random() - 0.5) * 0.025;
      this.flip = Math.random() * Math.PI * 2;
      this.flipSpeed = Math.random() * 0.025 + 0.015;
      this.sway = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.018 + 0.008;

      const colors = [
        'rgba(255, 183, 197, 0.85)',
        'rgba(251, 207, 232, 0.9)',
        'rgba(244, 114, 182, 0.7)',
        'rgba(255, 228, 230, 0.8)'
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.sway) * 0.75;
      this.sway += this.swaySpeed;
      this.angle += this.rotateSpeed;
      this.flip += this.flipSpeed;
      if (this.y > canvas.height + 30 || this.x > canvas.width + 60) this.reset();
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.scale(Math.cos(this.flip), 1);
      ctx.beginPath();
      const w = this.size;
      const h = this.size * 1.35;
      ctx.moveTo(0, -h / 2);
      ctx.bezierCurveTo(w / 1.7, -h / 2.2, w / 1.5, h / 3, 0, h / 2);
      ctx.bezierCurveTo(-w / 1.5, h / 3, -w / 1.7, -h / 2.2, 0, -h / 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 5;
      ctx.shadowColor = 'rgba(255, 183, 197, 0.45)';
      ctx.fill();
      ctx.restore();
    }
  }

  // ==================== 2. MATCHA PARTICLES ====================
  class BambooLeaf {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * (canvas.width + 100) - 50;
      this.y = initial ? Math.random() * canvas.height : -30;
      this.size = Math.random() * 9 + 8;
      this.speedY = Math.random() * 0.8 + 0.5;
      this.speedX = Math.random() * 0.7 + 0.2;
      this.angle = Math.random() * Math.PI * 2;
      this.rotateSpeed = (Math.random() - 0.5) * 0.02;
      this.sway = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.015 + 0.006;
      const colors = ['rgba(52, 211, 153, 0.7)', 'rgba(16, 185, 129, 0.65)', 'rgba(110, 231, 183, 0.8)'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.sway) * 0.8;
      this.sway += this.swaySpeed;
      this.angle += this.rotateSpeed;
      if (this.y > canvas.height + 30 || this.x > canvas.width + 60) this.reset();
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 0.35, this.size * 1.2, 0.3, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(52, 211, 153, 0.35)';
      ctx.fill();
      ctx.restore();
    }
  }

  class Firefly {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.03 + 0.015;
      this.radius = Math.random() * 2 + 1.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += this.pulseSpeed;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      const alpha = 0.2 + 0.6 * ((Math.sin(this.pulse) + 1) / 2);
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(167, 243, 208, ${alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(52, 211, 153, ${alpha})`;
      ctx.fill();
      ctx.restore();
    }
  }

  // ==================== 3. CELESTIAL PARTICLES ====================
  class Star {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.8;
      this.alpha = Math.random() * 0.7 + 0.2;
      this.alphaSpeed = (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1);
      const hues = ['rgba(255, 255, 255,', 'rgba(196, 181, 253,', 'rgba(56, 189, 248,'];
      this.hue = hues[Math.floor(Math.random() * hues.length)];
    }
    update() {
      this.alpha += this.alphaSpeed;
      if (this.alpha > 0.95 || this.alpha < 0.15) {
        this.alphaSpeed = -this.alphaSpeed;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `${this.hue}${this.alpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(168, 85, 247, 0.4)';
      ctx.fill();
    }
  }

  class ShootingStar {
    constructor() {
      this.active = false;
      this.timer = Math.random() * 200 + 150;
    }
    trigger() {
      this.active = true;
      this.x = Math.random() * (canvas.width * 0.75);
      this.y = Math.random() * (canvas.height * 0.35);
      this.length = Math.random() * 110 + 90;
      this.speed = Math.random() * 14 + 16;
      this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2;
      this.alpha = 1;
    }
    update() {
      if (!this.active) {
        this.timer--;
        if (this.timer <= 0) {
          this.trigger();
          this.timer = Math.random() * 300 + 200;
        }
        return;
      }
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.alpha -= 0.025;
      if (this.alpha <= 0) {
        this.active = false;
      }
    }
    draw() {
      if (!this.active) return;
      ctx.save();
      const tailX = this.x - Math.cos(this.angle) * this.length;
      const tailY = this.y - Math.sin(this.angle) * this.length;
      const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
      grad.addColorStop(0, 'rgba(168, 85, 247, 0)');
      grad.addColorStop(0.6, `rgba(56, 189, 248, ${this.alpha * 0.7})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${this.alpha})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
      ctx.stroke();
      ctx.restore();
    }
  }

  // ==================== 4. CAFÉ PARTICLES (Rain) ====================
  class RainDrop {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * (canvas.width + 100) - 50;
      this.y = initial ? Math.random() * canvas.height : -20;
      this.length = Math.random() * 22 + 14;
      this.speedY = Math.random() * 6 + 10;
      this.speedX = -1.2;
      this.alpha = Math.random() * 0.35 + 0.15;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y > canvas.height + 20) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.speedX * 1.5, this.y + this.length);
      ctx.strokeStyle = `rgba(217, 119, 6, ${this.alpha * 0.35})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }

  // ==================== 5. CYBERPUNK PARTICLES ====================
  class CyberBit {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : -20;
      this.speedY = Math.random() * 2.5 + 1.2;
      this.chars = ['0', '1', '⚡', '◇', '▲', 'λ', '::'];
      this.char = this.chars[Math.floor(Math.random() * this.chars.length)];
      this.color = Math.random() > 0.4 ? 'rgba(0, 243, 255, 0.65)' : 'rgba(255, 0, 127, 0.65)';
      this.size = Math.random() * 5 + 9;
    }
    update() {
      this.y += this.speedY;
      if (this.y > canvas.height + 20) this.reset();
    }
    draw() {
      ctx.save();
      ctx.font = `${this.size}px monospace`;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fillText(this.char, this.x, this.y);
      ctx.restore();
    }
  }

  class CyberSpark {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.speedY = -(Math.random() * 1.8 + 0.8);
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.size = Math.random() * 3 + 2;
      this.color = Math.random() > 0.5 ? 'rgba(0, 243, 255, 0.7)' : 'rgba(255, 0, 127, 0.7)';
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.restore();
    }
  }

  // ==================== 6. AURORA PARTICLES ====================
  class Snowflake {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : -15;
      this.size = Math.random() * 3.5 + 1.5;
      this.speedY = Math.random() * 0.9 + 0.4;
      this.sway = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.02 + 0.01;
      this.alpha = Math.random() * 0.5 + 0.4;
    }
    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.sway) * 0.6;
      this.sway += this.swaySpeed;
      if (this.y > canvas.height + 15) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224, 242, 254, ${this.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
      ctx.fill();
    }
  }

  function drawAuroraCurtain() {
    auroraPhase += 0.008;
    const h = canvas.height * 0.35;
    ctx.save();
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(52, 211, 153, 0.14)');
    grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.08)');
    grad.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.moveTo(0, 0);
    for (let x = 0; x <= canvas.width; x += 50) {
      const y = h * 0.5 + Math.sin(x * 0.003 + auroraPhase) * 45 + Math.cos(x * 0.006 + auroraPhase * 0.7) * 25;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, 0);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  // ==================== 7. SUNSET PARTICLES ====================
  class SunsetEmber {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 15;
      this.size = Math.random() * 2.8 + 1.2;
      this.speedY = -(Math.random() * 0.8 + 0.3);
      this.speedX = Math.random() * 0.6 - 0.1;
      this.alpha = Math.random() * 0.6 + 0.3;
      this.pulse = Math.random() * Math.PI * 2;
      const colors = ['rgba(251, 113, 133,', 'rgba(245, 158, 11,', 'rgba(253, 186, 116,'];
      this.colorBase = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.pulse) * 0.3;
      this.pulse += 0.025;
      if (this.y < -15) this.reset();
    }
    draw() {
      const a = this.alpha * (0.6 + 0.4 * Math.sin(this.pulse));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `${this.colorBase}${a})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
      ctx.fill();
    }
  }

  // ==================== ENGINE SETUP & THEME SWITCHING ====================
  function initParticles(theme) {
    particles = [];
    secondaryParticles = [];
    shootingStar = null;

    if (theme === 'sakura') {
      for (let i = 0; i < 42; i++) particles.push(new SakuraPetal());
    } else if (theme === 'matcha') {
      for (let i = 0; i < 24; i++) particles.push(new BambooLeaf());
      for (let i = 0; i < 16; i++) secondaryParticles.push(new Firefly());
    } else if (theme === 'celestial') {
      for (let i = 0; i < 55; i++) particles.push(new Star());
      shootingStar = new ShootingStar();
    } else if (theme === 'cafe') {
      for (let i = 0; i < 60; i++) particles.push(new RainDrop());
    } else if (theme === 'cyberpunk') {
      for (let i = 0; i < 28; i++) particles.push(new CyberBit());
      for (let i = 0; i < 18; i++) secondaryParticles.push(new CyberSpark());
    } else if (theme === 'aurora') {
      for (let i = 0; i < 35; i++) particles.push(new Snowflake());
    } else if (theme === 'sunset') {
      for (let i = 0; i < 40; i++) particles.push(new SunsetEmber());
    } else {
      for (let i = 0; i < 42; i++) particles.push(new SakuraPetal());
    }
  }

  initParticles(currentTheme);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentTheme === 'aurora') {
      drawAuroraCurtain();
    }

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    for (let i = 0; i < secondaryParticles.length; i++) {
      secondaryParticles[i].update();
      secondaryParticles[i].draw();
    }

    if (shootingStar) {
      shootingStar.update();
      shootingStar.draw();
    }

    requestAnimationFrame(animate);
  }
  animate();

  window.setAmbientTheme = function(newTheme) {
    currentTheme = newTheme;
    initParticles(newTheme);
  };
})();
