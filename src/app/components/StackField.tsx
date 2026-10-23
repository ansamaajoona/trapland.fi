'use client';

import { useEffect, useRef } from 'react';
import { STACK } from '@/app/content';

/*
 * A scanline sits across the middle of the viewport. As the wall scrolls
 * through it, each word swells from a condensed, lighter rest to expanded
 * black ivory, starting from the edge it is aligned to, and thins again as
 * it leaves. The cursor swells the letters near it on top of that.
 */

const STRETCH = [62, 125]; // Archivo's width axis, in %
const WEIGHT = [300, 900];
// Where a letter rests outside the scanline, so the wall stays readable.
const REST = 0.28;
// The scanline's reach in line heights, and how far behind its aligned edge a word's far end swells.
const BAND = 1.5;
const SWEEP = 1.1;
// How closely letters follow the scroll and the cursor each frame; smooths out stepped wheel scrolling.
const FOLLOW = 0.18;

interface Glyph {
  x: number;
  y: number;
  // 0 at the edge the word is aligned to, 1 at its far end.
  u: number;
  row: number;
}

function paint(el: HTMLElement, t: number) {
  el.style.fontStretch = `${(STRETCH[0] + (STRETCH[1] - STRETCH[0]) * t).toFixed(1)}%`;
  el.style.fontWeight = (WEIGHT[0] + (WEIGHT[1] - WEIGHT[0]) * t).toFixed(0);
  el.style.color = `color-mix(in oklab, var(--color-ivory) ${(25 + t * 75).toFixed(0)}%, var(--color-dust))`;
}

export default function StackField() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const rows = Array.from(list.children) as HTMLElement[];
    const words = rows.map((row) => row.querySelector<HTMLElement>('[aria-hidden]')!);
    const letters = Array.from(list.querySelectorAll<HTMLElement>('[data-line]'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: 0, y: 0, mouse: false, strength: 0 };
    const current = letters.map(() => REST);
    let glyphs: Glyph[] = [];
    // The most each row may swell and still fit its line; long words outgrow narrow screens at full width.
    let fit: number[] = [];
    let line = 1;
    let raf = 0;
    let visible = false;

    const measure = () => {
      letters.forEach((el) => el.removeAttribute('style'));
      const box = list.getBoundingClientRect();
      line = rows[0]?.getBoundingClientRect().height || 1;
      const spans = words.map((word) => word.getBoundingClientRect());
      glyphs = letters.map((el) => {
        const row = Number(el.dataset.line);
        const r = el.getBoundingClientRect();
        const s = spans[row];
        const cx = r.left + r.width / 2;
        const u = (row % 2 ? s.right - cx : cx - s.left) / (s.width || 1);
        return { x: cx - box.left, y: r.top + r.height / 2 - box.top, u, row };
      });

      letters.forEach((el) => paint(el, 1));
      fit = rows.map((row, i) => {
        const ratio = (row.clientWidth / words[i].getBoundingClientRect().width) * 0.98;
        if (ratio >= 1) return 1;
        const stretch = STRETCH[1] * ratio;
        return Math.max(REST, (stretch - STRETCH[0]) / (STRETCH[1] - STRETCH[0]));
      });
      letters.forEach((el, i) => paint(el, current[i]));
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const box = list.getBoundingClientRect();
      const px = pointer.x - box.left;
      const py = pointer.y - box.top;
      const inside = pointer.mouse && px > -80 && py > -80 && px < box.width + 80 && py < box.height + 80;
      pointer.strength += ((inside ? 1 : 0) - pointer.strength) * 0.08;
      const reach = Math.max(160, list.clientWidth * 0.16);
      const band = line * BAND;
      const focus = window.innerHeight / 2 - box.top;

      letters.forEach((el, i) => {
        const g = glyphs[i];
        if (!g) return;
        const d = g.y - focus + g.u * band * SWEEP;
        const scan = REST + (1 - REST) * Math.exp(-((d / band) ** 2));
        const near = Math.exp(-((Math.hypot(g.x - px, g.y - py) / reach) ** 2)) * pointer.strength;
        const target = Math.min(fit[g.row] ?? 1, Math.max(scan, near));
        // Font axes re-lay out the line, so leave settled letters alone.
        if (Math.abs(target - current[i]) < 0.002) return;
        current[i] += (target - current[i]) * FOLLOW;
        paint(el, current[i]);
      });
    };

    const run = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (reduce.matches || document.documentElement.hasAttribute('data-still')) {
        current.fill(REST);
        letters.forEach((el) => el.removeAttribute('style'));
        return;
      }
      if (!visible || document.hidden) return;
      // Coming back from still, letters hold the stylesheet's rest until repainted.
      letters.forEach((el, i) => paint(el, current[i]));
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.mouse = e.pointerType === 'mouse';
    };
    const onLeave = () => {
      pointer.mouse = false;
    };

    // Start a little before the wall scrolls in, so letters have settled to rest by the time they are seen.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) measure();
        run();
      },
      { rootMargin: '25% 0px' },
    );
    io.observe(list);
    const ro = new ResizeObserver(() => visible && measure());
    ro.observe(list);
    document.fonts?.ready.then(() => visible && measure());

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', run);
    window.addEventListener('drift-change', run);
    reduce.addEventListener('change', run);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', run);
      window.removeEventListener('drift-change', run);
      reduce.removeEventListener('change', run);
    };
  }, []);

  return (
    <section aria-labelledby='stack-title' className='mx-auto w-full max-w-360 px-5 py-28 sm:px-10 sm:py-36 lg:px-14'>
      <h2 id='stack-title' className='label mb-10 sm:mb-14'>
        Works with
      </h2>
      <ul ref={listRef} className='text-stack tracking-[-0.01em] uppercase'>
        {STACK.map((word, line) => (
          <li key={word} className={line % 2 ? 'text-right' : undefined}>
            <span className='sr-only'>{word}</span>
            <span aria-hidden='true' className='whitespace-nowrap'>
              {word.split('').map((ch, i) => (
                <span key={i} data-line={line} className='stack-glyph'>
                  {ch === ' ' ? ' ' : ch}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
