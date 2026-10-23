'use client';

import { useEffect, useRef, useState } from 'react';
import { loadOuluSky, type OuluSky as Sky } from '@/app/lib/oulu';

// Icy below zero, warm above +15, neutral ivory in between.
function tintFor(temp: number) {
  const ivory = [230, 226, 214];
  const ice = [176, 206, 255];
  const warm = [255, 214, 160];
  const mix = (to: number[], k: number) => ivory.map((c, i) => Math.round(c + (to[i] - c) * k)).join(' ');
  if (temp < 0) return mix(ice, Math.min(1, -temp / 15));
  if (temp > 15) return mix(warm, Math.min(1, (temp - 15) / 12));
  return ivory.join(' ');
}

function Aurora({ strength }: { strength: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || strength <= 0) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sprite = document.createElement('canvas');
    sprite.width = 1;
    sprite.height = 64;
    const s = sprite.getContext('2d');
    if (!s) return;
    const g = s.createLinearGradient(0, 0, 0, 64);
    g.addColorStop(0, 'rgb(130 90 255 / 0)');
    g.addColorStop(0.5, 'rgb(120 100 255 / 0.18)');
    g.addColorStop(0.86, 'rgb(90 255 170 / 0.9)');
    g.addColorStop(1, 'rgb(90 255 170 / 0)');
    s.fillStyle = g;
    s.fillRect(0, 0, 1, 64);

    let raf = 0;
    let last = 0;
    const resize = () => {
      // Drawn at quarter resolution and blurred up: aurora has no hard edges.
      canvas.width = Math.ceil(window.innerWidth / 4);
      canvas.height = Math.ceil(window.innerHeight / 4);
    };

    const draw = (t: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (let k = 0; k < 3; k++) {
        for (let x = 0; x < w; x++) {
          const base =
            h * (0.2 + 0.07 * k) +
            Math.sin(x * 0.012 + t * 0.00011 + k * 1.7) * h * 0.06 +
            Math.sin(x * 0.037 - t * 0.00019 + k) * h * 0.02;
          const ray = Math.pow(0.5 + 0.5 * Math.sin(x * 0.09 + t * 0.0006 + k * 2.3), 2);
          const len = h * (0.1 + 0.16 * ray);
          ctx.globalAlpha = (0.25 + 0.75 * ray) * (1 - k * 0.25);
          ctx.drawImage(sprite, x, base - len, 1, len);
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < 1000 / 30) return;
      last = now;
      draw(now);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      draw(performance.now());
      const still = reduce.matches || document.documentElement.hasAttribute('data-still');
      if (!still && !document.hidden) raf = requestAnimationFrame(tick);
    };

    resize();
    sync();
    const onResize = () => {
      resize();
      draw(performance.now());
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('drift-change', sync);
    document.addEventListener('visibilitychange', sync);
    reduce.addEventListener('change', sync);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('drift-change', sync);
      document.removeEventListener('visibilitychange', sync);
      reduce.removeEventListener('change', sync);
    };
  }, [strength]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden='true'
      className='pointer-events-none fixed inset-0 z-0 size-full mix-blend-screen blur-md transition-opacity duration-3000 ease-out-expo'
      style={{ opacity: strength * 0.6 }}
    />
  );
}

export default function OuluSky() {
  const [sky, setSky] = useState<Sky | null>(null);

  useEffect(() => {
    loadOuluSky().then(setSky);
  }, []);

  const style = sky
    ? {
        '--tint': tintFor(sky.temp),
        '--fog': sky.fog ? 0.07 : sky.cloud > 80 ? 0.02 : 0,
      }
    : undefined;

  return (
    <>
      <div aria-hidden='true' className='atmosphere pointer-events-none fixed inset-0 z-0' style={style as React.CSSProperties} />
      {sky && sky.aurora > 0 && <Aurora strength={sky.aurora} />}
    </>
  );
}
