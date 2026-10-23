'use client';

import { useEffect, useRef } from 'react';
import { loadOuluSky, type OuluSky } from '@/app/lib/oulu';

/*
 * Background dust in depth: each grain's z (0 far, 1 near) sets its size,
 * brightness, drift speed and parallax. The drift follows Oulu's live wind,
 * falls as snow or rain when it does there, twinkles more at night, and fast
 * scrolling blows through it.
 */

interface Ribbon {
  y: number;
  amp: number;
  freq: number;
  phase: number;
  thick: number;
  bend: number; // radians per second
}

const RIBBONS: Ribbon[] = [
  { y: 0.22, amp: 0.1, freq: 0.8, phase: 0.4, thick: 0.034, bend: 0.05 },
  { y: 0.58, amp: 0.14, freq: 0.55, phase: 1.9, thick: 0.045, bend: -0.035 },
  { y: 0.95, amp: 0.1, freq: 0.7, phase: 3.3, thick: 0.036, bend: 0.04 },
];

const COUNT = 2600; // at a 1440x900 viewport
const LOOSE = 0.22;
const ACCENT_SHARE = 0.035;
const TONES = ['#2a2a29', '#3d3d3b', '#58574f', '#7a7870', '#a7a49a'];
const ACCENT = 'rgb(255 213 148 / 0.8)';
const TWINKLE = 0.08;
const VISIBILITY = 0.5; // dust recedes against the daylight sky

interface Grain {
  x: number;
  z: number;
  off: number;
  ribbon: number; // -1 = loose
  ly: number;
  seed: number;
  accent: boolean;
  dy: number;
}

function gaussian() {
  const u = 1 - Math.random();
  const v = Math.random();
  return Math.max(-3, Math.min(3, Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)));
}

function makeGrains(n: number): Grain[] {
  return Array.from({ length: n }, () => ({
    x: Math.random(),
    z: Math.pow(Math.random(), 1.8),
    off: gaussian(),
    ribbon: Math.random() < LOOSE ? -1 : Math.floor(Math.random() * RIBBONS.length),
    ly: Math.random() * 1.6 - 0.3,
    seed: Math.random() * Math.PI * 2,
    accent: Math.random() < ACCENT_SHARE,
    dy: 0,
  }));
}

export default function DustField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let W = 0;
    let H = 0;
    let grains: Grain[] = [];
    let raf = 0;
    let last = 0;
    let clock = 0;
    const look = { x: 0, y: 0, tx: 0, ty: 0 };
    let sky: OuluSky | null = window.__ouluSky ?? null;
    let gust = 0;
    let lastScrollY = window.scrollY;
    let lastScrollT = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grains = makeGrains(Math.round(COUNT * Math.max(0.4, Math.min(1.4, (W * H) / (1440 * 900)))));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const span = H * 1.6;
      const margin = H * 0.3;
      const scroll = window.scrollY;
      const paths = TONES.map(() => new Path2D());
      const accent = new Path2D();
      const overcast = (1 - (sky?.cloud ?? 0) * 0.0025) * VISIBILITY;

      for (const g of grains) {
        let x = g.x * W + look.x * g.z * 26;
        let y: number;
        let lum = g.z * overcast;

        if (g.ribbon < 0) {
          y = g.ly * H + Math.sin(clock * 0.35 + g.seed) * 5 * g.z;
          lum *= 0.75;
        } else {
          const r = RIBBONS[g.ribbon];
          const t = g.x * Math.PI * 2 * r.freq + r.phase + clock * r.bend;
          const swell = 0.65 + 0.35 * Math.sin(t * 0.6 + r.phase * 2 + clock * 0.05);
          y = (r.y + r.amp * Math.sin(t)) * H + g.off * r.thick * H * swell;
          lum *= 0.45 + 0.55 * Math.exp(-(g.off * g.off) / 2);
        }

        if (sky && sky.precip !== 'none') {
          x += Math.sin(clock * 0.9 + g.seed) * (sky.precip === 'snow' ? 6 : 1) * (0.3 + g.z);
          if (sky.precip === 'snow') lum = Math.min(1, lum + 0.2);
        }
        y += g.dy + look.y * g.z * 18 - scroll * (0.04 + g.z * 0.22);
        y = (((y + margin) % span) + span) % span - margin;
        if (y < -4 || y > H + 4) continue;
        x = ((x % W) + W) % W;

        const twinkle = g.z > 0.6 ? 1 - TWINKLE + TWINKLE * Math.sin(clock * 1.7 + g.seed * 3) : 1;
        const r = (0.6 + g.z * g.z * 2.6) / 2;
        const path = g.accent
          ? accent
          : paths[Math.max(0, Math.min(TONES.length - 1, Math.floor(lum * twinkle * TONES.length * 1.1)))];
        path.moveTo(x + r, y);
        path.arc(x, y, r, 0, Math.PI * 2);
      }

      TONES.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.fill(paths[i]);
      });
      ctx.fillStyle = ACCENT;
      ctx.fill(accent);
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      clock += dt;
      look.x += (look.tx - look.x) * 0.04;
      look.y += (look.ty - look.y) * 0.04;
      gust *= Math.exp(-dt * 2.2);

      // Blow toward where Oulu's wind is heading; without data, a calm easterly drift.
      let wx = 1;
      let wy = 0;
      let strength = 1;
      if (sky) {
        const toward = ((sky.windFrom + 180) * Math.PI) / 180;
        wx = Math.sin(toward);
        wy = -Math.cos(toward);
        strength = 0.5 + Math.min(sky.windSpeed, 15) / 4;
      }
      const fall = sky?.precip === 'snow' ? 1 : sky?.precip === 'rain' ? 2 : 0;
      const span = H * 1.6;

      for (const g of grains) {
        const v = dt * (4 + g.z * 14) * strength;
        g.x += (v * wx + gust * dt * 0.25 * Math.sin(g.seed) * (0.2 + g.z)) / W;
        g.x -= Math.floor(g.x);
        g.dy += v * wy * 0.6 - gust * dt * (0.15 + g.z * 0.9);
        if (fall === 1) g.dy += dt * (14 + g.z * 40);
        else if (fall === 2) g.dy += dt * (160 + g.z * 420);
        g.dy %= span;
      }
      draw();
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      draw();
      const still = reduce.matches || document.documentElement.hasAttribute('data-still');
      if (!still && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      const now = performance.now();
      const v = (window.scrollY - lastScrollY) / Math.max(now - lastScrollT, 8);
      lastScrollY = window.scrollY;
      lastScrollT = now;
      gust += (Math.max(-1200, Math.min(1200, v * 700)) - gust) * 0.5;
      if (!raf) draw();
    };
    const onSky = () => {
      sky = window.__ouluSky ?? null;
      if (!raf) draw();
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      look.tx = (e.clientX / W - 0.5) * 2;
      look.ty = (e.clientY / H - 0.5) * 2;
    };

    resize();
    sync();
    canvas.dataset.ready = '';

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        draw();
      }, 120);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('drift-change', sync);
    window.addEventListener('oulu-sky', onSky);
    document.addEventListener('visibilitychange', sync);
    reduce.addEventListener('change', sync);
    loadOuluSky();

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('drift-change', sync);
      window.removeEventListener('oulu-sky', onSky);
      document.removeEventListener('visibilitychange', sync);
      reduce.removeEventListener('change', sync);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden='true'
      className='pointer-events-none fixed inset-0 z-0 size-full opacity-0 transition-opacity duration-1800 ease-out-expo data-ready:opacity-100'
    />
  );
}
