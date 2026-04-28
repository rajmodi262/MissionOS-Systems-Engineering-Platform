/* ============================================================
   Deep Space Particle Field Engine
   Renders thousands of drifting stars with nebula clouds
   ============================================================ */

export class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.radius = Math.random() * 1.5 + 0.3;
    this.baseOpacity = Math.random() * 0.6 + 0.15;
    this.opacity = this.baseOpacity;
    this.vx = (Math.random() - 0.5) * 0.15;
    this.vy = (Math.random() - 0.5) * 0.1;
    this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    this.twinkleOffset = Math.random() * Math.PI * 2;
    this.hue = Math.random() > 0.92 ? (Math.random() > 0.5 ? 160 : 220) : 0;
    this.saturation = this.hue > 0 ? 60 : 0;
  }

  update(time, speedMultiplier = 1) {
    this.x += this.vx * speedMultiplier;
    this.y += this.vy * speedMultiplier;
    this.opacity = this.baseOpacity + Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.2;
    this.opacity = Math.max(0.05, Math.min(1, this.opacity));

    if (this.x < -10) this.x = this.canvas.width + 10;
    if (this.x > this.canvas.width + 10) this.x = -10;
    if (this.y < -10) this.y = this.canvas.height + 10;
    if (this.y > this.canvas.height + 10) this.y = -10;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    if (this.hue > 0) {
      ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, 75%, ${this.opacity})`;
    } else {
      ctx.fillStyle = `rgba(220, 225, 240, ${this.opacity})`;
    }
    ctx.fill();

    if (this.radius > 1.2 && this.opacity > 0.4) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 210, 255, ${this.opacity * 0.08})`;
      ctx.fill();
    }
  }
}

export class NebulaCloud {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 300 + 200;
    this.hue = Math.random() > 0.5 ? 240 : 200;
    this.saturation = 40 + Math.random() * 30;
    this.opacity = 0.015 + Math.random() * 0.02;
    this.vx = (Math.random() - 0.5) * 0.05;
    this.vy = (Math.random() - 0.5) * 0.03;
    this.pulseSpeed = Math.random() * 0.003 + 0.001;
    this.pulseOffset = Math.random() * Math.PI * 2;
  }

  update(time) {
    this.x += this.vx;
    this.y += this.vy;
    this.currentOpacity = this.opacity + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.008;
    if (this.x < -this.radius) this.x = this.canvas.width + this.radius;
    if (this.x > this.canvas.width + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = this.canvas.height + this.radius;
    if (this.y > this.canvas.height + this.radius) this.y = -this.radius;
  }

  draw(ctx) {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    gradient.addColorStop(0, `hsla(${this.hue}, ${this.saturation}%, 25%, ${this.currentOpacity})`);
    gradient.addColorStop(0.5, `hsla(${this.hue}, ${this.saturation}%, 15%, ${this.currentOpacity * 0.5})`);
    gradient.addColorStop(1, `hsla(${this.hue}, ${this.saturation}%, 10%, 0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
  }
}

export class ParticleField {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.nebulae = [];
    this.animationId = null;
    this.time = 0;
    this.speedMultiplier = 1;
    this.ripples = [];
    this.resizeHandler = this.resize.bind(this);

    this.resize();
    window.addEventListener('resize', this.resizeHandler);
    this.init();
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
    this.ctx.scale(dpr, dpr);
    this.canvasW = window.innerWidth;
    this.canvasH = window.innerHeight;
  }

  init() {
    const particleCount = Math.min(2000, Math.floor((this.canvasW * this.canvasH) / 600));
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle({ width: this.canvasW, height: this.canvasH }));
    }
    for (let i = 0; i < 5; i++) {
      this.nebulae.push(new NebulaCloud({ width: this.canvasW, height: this.canvasH }));
    }
  }

  addRipple(x, y) {
    this.ripples.push({
      x, y,
      radius: 0,
      maxRadius: 80,
      opacity: 0.3,
      speed: 3
    });
  }

  setSpeed(multiplier) {
    this.speedMultiplier = multiplier;
  }

  update() {
    this.time++;
    for (const p of this.particles) {
      p.update(this.time, this.speedMultiplier);

      for (const r of this.ripples) {
        const dx = p.x - r.x;
        const dy = p.y - r.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < r.radius + 20 && dist > r.radius - 20) {
          const force = (1 - Math.abs(dist - r.radius) / 20) * 0.8;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }
    }
    for (const n of this.nebulae) {
      n.update(this.time);
    }

    this.ripples = this.ripples.filter(r => {
      r.radius += r.speed;
      r.opacity -= 0.004;
      return r.opacity > 0 && r.radius < r.maxRadius;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);

    for (const n of this.nebulae) {
      n.draw(this.ctx);
    }
    for (const p of this.particles) {
      p.draw(this.ctx);
    }

    for (const r of this.ripples) {
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(0, 255, 157, ${r.opacity})`;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
    }
  }

  start() {
    const loop = () => {
      this.update();
      this.draw();
      this.animationId = requestAnimationFrame(loop);
    };
    loop();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this.resizeHandler);
  }
}
