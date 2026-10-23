'use client';

import { useEffect, useRef, useState } from 'react';
import OutLink from '@/app/components/OutLink';
import { ROLES, type Role } from '@/app/content';

/*
 * On large screens the section pins and scroll scrubs through one chapter per
 * role: the year rolls like an odometer and a playhead travels a 2022–2026
 * track where every role is drawn to its real length.
 */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const FROM = { year: 2022, month: 1 };
const TO = { year: 2026, month: 6 };
const SPAN = (TO.year - FROM.year) * 12 + (TO.month - FROM.month);
const YEARS = [2022, 2023, 2024, 2025, 2026];

const LEGS = [...ROLES].reverse();

function parse(stamp: string) {
  const [year, month] = stamp.split('.').map(Number);
  return { year, month, label: `${MONTHS[month - 1]} ${year}`, iso: `${year}-${String(month).padStart(2, '0')}` };
}

const at = (year: number, month: number) => (((year - FROM.year) * 12 + (month - FROM.month)) / SPAN) * 100;

function spanOf(role: Role) {
  const s = parse(role.start);
  const e = parse(role.end);
  const left = at(s.year, s.month);
  const right = at(e.year, e.month + 1); // the end month is inclusive
  return { left, width: right - left, mid: (left + right) / 2 };
}

function Odometer({ value }: { value: number }) {
  return (
    <span className='display inline-flex leading-none tabular-nums' aria-hidden='true'>
      {String(value)
        .split('')
        .map((d, i) => (
          <span key={i} className='odometer-col'>
            <span className='odometer-strip' style={{ transform: `translateY(${-Number(d) * 10}%)` }}>
              {Array.from({ length: 10 }, (_, k) => (
                <span key={k}>{k}</span>
              ))}
            </span>
          </span>
        ))}
    </span>
  );
}

function Track({ active, playhead }: { active: number; playhead: number }) {
  return (
    <div className='relative h-14' aria-hidden='true'>
      {YEARS.map((year) => (
        <span key={year} className='absolute top-0 h-full' style={{ left: `${at(year, 1)}%` }}>
          <span className='absolute top-9 h-3 w-px bg-dust' />
          <span className='label absolute top-0 -translate-x-1/2'>{year}</span>
        </span>
      ))}
      <span className='absolute inset-x-0 top-10.5 h-px bg-dust' />
      {LEGS.map((role, i) => {
        const { left, width } = spanOf(role);
        return (
          <span
            key={role.start}
            className={`track-bar absolute top-10 h-1.25 ${i === active ? 'is-active' : ''}`}
            style={{ left: `${left}%`, width: `${width}%` }}
          />
        );
      })}
      <span className='absolute top-6 h-8 w-px bg-ivory' style={{ left: `${playhead}%` }}>
        <span className='absolute -top-1 -left-0.75 size-1.75 rounded-full bg-ivory' />
      </span>
    </div>
  );
}

function RoleDetail({ role }: { role: Role }) {
  const s = parse(role.start);
  const e = parse(role.end);
  return (
    <>
      <h3 className='text-role font-bold text-ivory'>{role.title}</h3>
      <p className='mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-small font-medium'>
        <OutLink href={role.url}>{role.company}</OutLink>
        <span className='text-frost'>
          <time dateTime={s.iso}>{s.label}</time> – <time dateTime={e.iso}>{e.label}</time>
        </span>
      </p>
      <p className='mt-6 max-w-[60ch] text-haze'>{role.description}</p>
      <p className='mt-5 text-small text-frost'>{role.stack.join('  ·  ')}</p>
    </>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const wide = window.matchMedia('(min-width: 64rem)');
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!wide.matches) return;
      const r = section.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      setProgress(travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    wide.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      wide.removeEventListener('change', schedule);
    };
  }, []);

  const chapter = progress * LEGS.length;
  const active = Math.min(LEGS.length - 1, Math.floor(chapter));
  // The playhead rests on a role, then eases to the next one over the last part of its chapter.
  const t = Math.min(1, Math.max(0, (chapter - active - 0.55) / 0.45));
  const here = spanOf(LEGS[active]).mid;
  const next = spanOf(LEGS[Math.min(LEGS.length - 1, active + 1)]).mid;
  const playhead = here + (next - here) * t * t * (3 - 2 * t);
  const year = Number(LEGS[active].start.slice(0, 4));

  return (
    <section
      ref={sectionRef}
      id='route'
      aria-labelledby='route-title'
      className='route relative'
      style={{ '--legs': LEGS.length } as React.CSSProperties}
    >
      <h2 id='route-title' className='sr-only'>
        Route
      </h2>

      <div className='mx-auto hidden h-svh w-full max-w-360 flex-col justify-center px-14 lg:sticky lg:top-0 lg:flex'>
        <div className='grid grid-cols-12 items-start gap-8'>
          <div className='col-span-5'>
            <p className='text-odometer text-ivory'>
              <span className='sr-only'>Started {year}</span>
              <Odometer value={year} />
            </p>
            <p className='label mt-6'>
              Role {active + 1} of {LEGS.length} · scroll to travel
            </p>
          </div>

          <div className='col-span-7 col-start-6 grid pt-3'>
            {LEGS.map((role, k) => (
              <article
                key={role.start}
                className={`route-panel col-start-1 row-start-1 ${k === active ? 'is-active' : ''}`}
                aria-hidden={k === active ? undefined : true}
              >
                <RoleDetail role={role} />
              </article>
            ))}
          </div>
        </div>

        <div className='mt-20'>
          <Track active={active} playhead={playhead} />
        </div>
      </div>

      <ol className='mx-auto flex max-w-360 flex-col gap-y-20 px-5 pt-20 pb-32 sm:px-10 lg:hidden'>
        {ROLES.map((role) => {
          const { left, width } = spanOf(role);
          return (
            <li key={role.start}>
              <p aria-hidden='true' className='display text-year text-ivory'>
                {role.start.slice(0, 4)}
              </p>
              <div className='relative mt-4 mb-6 h-1.25 bg-dust/40' aria-hidden='true'>
                <span className='absolute inset-y-0 bg-signal' style={{ left: `${left}%`, width: `${width}%` }} />
              </div>
              <RoleDetail role={role} />
            </li>
          );
        })}
      </ol>
    </section>
  );
}
