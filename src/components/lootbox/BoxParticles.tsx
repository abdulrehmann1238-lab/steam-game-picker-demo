import React, { useEffect, useRef } from 'react';

interface BoxParticlesProps {
  active: boolean;
  reducedMotion?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  color: string;
}

export const BoxParticles: React.FC<BoxParticlesProps> = ({
  active,
  reducedMotion = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const colors = ['#B89A69', '#d4b47d', '#F0EBDD', '#80694A'];

    const width = (canvas.width = canvas.offsetWidth || 500);
    const height = (canvas.height = canvas.offsetHeight || 400);

    // Spawn 65 golden glowing ember particles rising from center bottom
    for (let i = 0; i < 70; i++) {
      const angle = (Math.PI / 2) + (Math.random() - 0.5) * 1.2;
      const speed = Math.random() * 4 + 2;
      particles.push({
        x: width / 2 + (Math.random() - 0.5) * 120,
        y: height * 0.65 + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: -Math.sin(angle) * speed,
        radius: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.8 + 0.3,
        decay: Math.random() * 0.012 + 0.006,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy *= 0.98; // slight drag
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (particles.length > 0) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [active, reducedMotion]);

  if (!active || reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 25
      }}
    />
  );
};
