/**
 * Ambient Sakura Petals Engine
 * Realistic, gently fluttering cherry blossom petals with 3D tumbling physics
 */
(function initSakuraParticles() {
  const canvas = document.getElementById('sakura-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let petals = [];
  const PETAL_COUNT = 45; // Delicate, beautiful density without cluttering UI

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class SakuraPetal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * (canvas.width + 120) - 60;
      this.y = initial ? Math.random() * canvas.height : -30;
      // Charming petal size: 9px to 17px
      this.size = Math.random() * 8 + 9;
      this.speedY = Math.random() * 1.1 + 0.7;
      this.speedX = Math.random() * 0.9 + 0.3; // gentle rightward spring breeze
      
      // 3D Tumbling, Flipping & Rotation
      this.angle = Math.random() * Math.PI * 2;
      this.rotateSpeed = (Math.random() - 0.5) * 0.025;
      
      this.flip = Math.random() * Math.PI * 2;
      this.flipSpeed = Math.random() * 0.025 + 0.015;
      
      this.sway = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.018 + 0.008;

      // Soft aesthetic sakura petal color palette
      const colors = [
        'rgba(255, 183, 197, 0.85)', // Classic cherry blossom pink
        'rgba(251, 207, 232, 0.9)',  // Soft pastel blush
        'rgba(244, 114, 182, 0.7)',  // Rose blush
        'rgba(255, 228, 230, 0.8)'   // Pale white-pink
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.sway) * 0.75;
      
      this.sway += this.swaySpeed;
      this.angle += this.rotateSpeed;
      this.flip += this.flipSpeed;

      // Wrap around screen edges
      if (this.y > canvas.height + 30 || this.x > canvas.width + 60) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      // 3D flutter: scale horizontal axis by cosine of flip angle
      ctx.scale(Math.cos(this.flip), 1);

      ctx.beginPath();
      const w = this.size;
      const h = this.size * 1.35;
      
      // Organic curved sakura petal shape
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

  for (let i = 0; i < PETAL_COUNT; i++) {
    petals.push(new SakuraPetal());
  }

  function animateSakura() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(petal => {
      petal.update();
      petal.draw();
    });
    requestAnimationFrame(animateSakura);
  }
  animateSakura();
})();
