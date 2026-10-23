'use client';

import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';

/*
 * The typeset name stretches in, then the name is signed by hand in the corner
 * like a signed print. The pen's edge leans with the script and moves at a
 * writing pace: slower through capitals, lifting between words, and the fresh
 * ink catches the light just behind the nib before it dries to signal.
 * Clicking the signature signs it again.
 */

const SIZE = 120;
// Let the name settle before the pen touches down: the stretch-in's last letter lands by about 1.3s.
const LEAD_MS = 1150;
const PEN_MS = 1500;
// The pen lifts between words.
const LIFT_MS = 150;
const ERASE_MS = 160;
// Mrs Saint Delafield's lean, so the pen's edge runs along the downstrokes instead of across them.
const SLANT = 28;
// Capitals take more strokes than their width suggests; the flourishes either side take fewer.
const CAPITAL = 1.4;
const FLOURISH = 0.6;
// The soft edge of the nib, and how far behind it the ink is still wet, in viewBox units.
const NIB = 14;
const WET = 150;

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Ink {
  box: Box;
  // Where the wipe starts, hidden, and the span of the masks' rects.
  start: number;
  reach: number;
  frames: Keyframe[];
  duration: number;
}

/*
 * The pen's path as wipe keyframes: the nib's position along the baseline,
 * timed by how much writing each letter takes. Spaces hold the pen still for
 * a beat and then jump it to the next word.
 */
function penPath(box: Box, signature: string, measure: (text: string) => number) {
  const tan = Math.tan((SLANT * Math.PI) / 180);
  // Hidden while the top of the slanted edge is left of the ink, done once the bottom has cleared it.
  const start = box.x + box.y * tan;
  const end = box.x + box.w + (box.y + box.h) * tan + NIB;
  const chars = [...signature];
  const bounds = chars.map((_, i) => measure(chars.slice(0, i).join('')));
  bounds.push(measure(signature));

  const moves: { x: number; weight: number; ms: number }[] = [
    { x: bounds[0], weight: (bounds[0] - start) * FLOURISH, ms: 0 },
  ];
  chars.forEach((char, i) => {
    const next = bounds[i + 1];
    if (char.trim()) {
      const caps = char !== char.toLowerCase() ? CAPITAL : 1;
      moves.push({ x: next, weight: (next - bounds[i]) * caps, ms: 0 });
    } else {
      moves.push({ x: bounds[i], weight: 0, ms: LIFT_MS }, { x: next, weight: 0, ms: 0 });
    }
  });
  moves.push({ x: end, weight: (end - bounds[bounds.length - 1]) * FLOURISH, ms: 0 });

  const ink = moves.reduce((sum, m) => sum + m.weight, 0);
  const times = moves.map((m) => m.ms + (m.weight / ink) * PEN_MS);
  const duration = times.reduce((sum, t) => sum + t, 0);
  let elapsed = 0;
  const frames: Keyframe[] = [{ offset: 0, transform: `translateX(${start}px)` }];
  moves.forEach((m, i) => {
    elapsed += times[i];
    frames.push({ offset: Math.min(1, elapsed / duration), transform: `translateX(${m.x}px)` });
  });
  return { start, reach: box.w * 2 + box.h * tan, frames, duration };
}

export default function SignedName({ lines, signature }: { lines: string[]; signature: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const inkRef = useRef<SVGGElement>(null);
  const wipeRefs = useRef<(SVGRectElement | null)[]>([]);
  const shownAt = useRef(0);
  const signRef = useRef<() => void>(() => {});
  const [ink, setInk] = useState<Ink | null>(null);

  // The name doesn't wait on the script face.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.dataset.phase = 'enter';
    shownAt.current = performance.now();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const group = inkRef.current;
    if (!group) return;
    // The script face only loads once requested, so measuring after fonts.ready alone would use the fallback.
    const family = getComputedStyle(group).fontFamily;
    Promise.all([document.fonts.load(`${SIZE}px ${family}`, signature), document.fonts.ready]).then(() => {
      const ctx = document.createElement('canvas').getContext('2d');
      if (cancelled || !ctx) return;
      ctx.font = `${SIZE}px ${family}`;
      // Script glyphs reach well outside their em box, so measure the actual ink rather than getBBox().
      const m = ctx.measureText(signature);
      const pad = 12;
      const box = {
        x: -m.actualBoundingBoxLeft - pad,
        y: -m.actualBoundingBoxAscent - pad,
        w: m.actualBoundingBoxLeft + m.actualBoundingBoxRight + pad * 2,
        h: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent + pad * 2,
      };
      setInk({ box, ...penPath(box, signature, (text) => ctx.measureText(text).width) });
    });
    return () => {
      cancelled = true;
    };
  }, [signature]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    const wipes = wipeRefs.current.filter((el): el is SVGRectElement => !!el);
    if (!ink || !wrap || !svg || !wipes.length) return;

    let pen: Animation[] = [];
    let erase: Animation | null = null;
    const setPhase = (phase: 'sign' | 'done') => {
      wrap.dataset.phase = phase;
    };
    const stop = () => {
      clearTimeout(timer);
      erase?.cancel();
      pen.forEach((a) => a.cancel());
    };

    const sign = () => {
      stop();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setPhase('done');
        return;
      }
      setPhase('sign');
      const timing = { duration: ink.duration, easing: 'cubic-bezier(0.4, 0, 0.55, 1)', fill: 'forwards' as const };
      pen = wipes.map((el) => el.animate(ink.frames, timing));
      pen[0].finished.then(() => setPhase('done')).catch(() => {});
    };

    signRef.current = () => {
      if (wrap.dataset.phase !== 'done') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      erase = svg.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ERASE_MS, easing: 'ease-in', fill: 'forwards' });
      erase.finished.then(sign).catch(() => {});
    };

    const timer = setTimeout(sign, Math.max(0, LEAD_MS - (performance.now() - shownAt.current)));
    return stop;
  }, [ink]);

  const box = ink?.box;
  const wipe = (i: number, gradient: string) =>
    ink && (
      <g transform={`skewX(${-SLANT})`}>
        <rect
          ref={(el) => {
            wipeRefs.current[i] = el;
          }}
          x={-ink.reach}
          y={ink.box.y}
          width={ink.reach * 2}
          height={ink.box.h}
          fill={`url(#${gradient})`}
          style={{ transform: `translateX(${ink.start}px)` }}
        />
      </g>
    );
  // Gradient stops along a wipe rect, given as distance behind its edge.
  const behind = (d: number) => (ink ? (ink.reach - d) / (ink.reach * 2) : 0);

  return (
    <div ref={wrapRef} data-phase='idle' className='signed relative w-fit'>
      <h1 className='signed-name display text-[min(15.5vw,5.5rem)]/[0.84] text-ivory max-sm:font-stretch-normal sm:text-mega'>
        <span className='sr-only'>{lines.join(' ')}</span>
        {/* Each letter stretches in on its own width and weight axes; see .signed-letter. */}
        {lines.map((line, l) => (
          <span key={line} aria-hidden='true' className='signed-line'>
            {[...line].map((char, i) => (
              <span key={i} className='signed-letter' style={{ '--line': l, '--i': i } as CSSProperties}>
                {char}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <button
        type='button'
        aria-label='Sign again'
        title='Sign again'
        onClick={() => signRef.current()}
        className='absolute -right-[4%] -bottom-[40%] w-[62%] cursor-pointer sm:-right-[6%] sm:-bottom-[44%] sm:w-[50%]'
      >
        <svg
          ref={svgRef}
          aria-hidden='true'
          viewBox={box ? `${box.x} ${box.y} ${box.w} ${box.h}` : '0 -120 1000 160'}
          className={`signature block w-full overflow-visible ${box ? '' : 'invisible'}`}
        >
          <defs>
            <linearGradient id='sign-nib' x1='0' x2='1' y1='0' y2='0'>
              <stop offset={behind(NIB)} stopColor='#fff' />
              <stop offset='0.5' stopColor='#000' />
            </linearGradient>
            <linearGradient id='sign-wet' x1='0' x2='1' y1='0' y2='0'>
              <stop offset={behind(WET)} stopColor='#000' />
              <stop offset={behind(NIB)} stopColor='#fff' />
              <stop offset='0.5' stopColor='#000' />
            </linearGradient>
            {box && (
              <Fragment>
                <mask id='sign-mask' maskUnits='userSpaceOnUse' x={box.x} y={box.y} width={box.w} height={box.h}>
                  {wipe(0, 'sign-nib')}
                </mask>
                <mask id='sign-wet-mask' maskUnits='userSpaceOnUse' x={box.x} y={box.y} width={box.w} height={box.h}>
                  {wipe(1, 'sign-wet')}
                </mask>
              </Fragment>
            )}
          </defs>
          <g ref={inkRef} fontSize={SIZE} className='font-signature'>
            {/* One run of text, so the script's joins are shaped as the face intends. */}
            <g className='sign-ink' mask='url(#sign-mask)'>
              <text x='0' y='0' fill='#000' stroke='#000' strokeWidth='7'>
                {signature}
              </text>
              <text x='0' y='0' fill='currentColor'>
                {signature}
              </text>
            </g>
            <text x='0' y='0' mask='url(#sign-wet-mask)' className='sign-wet'>
              {signature}
            </text>
          </g>
        </svg>
      </button>
    </div>
  );
}
