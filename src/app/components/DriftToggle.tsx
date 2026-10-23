'use client';

import { useEffect, useState } from 'react';

const KEY = 'trapland:drift';

function apply(on: boolean) {
  const root = document.documentElement;
  if (on) root.removeAttribute('data-still');
  else root.setAttribute('data-still', '');
  window.dispatchEvent(new Event('drift-change'));
}

export default function DriftToggle() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(KEY);
    } catch {}
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const initial = stored ? stored === 'on' : !reduce;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOn(initial);
    apply(initial);
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    apply(next);
    try {
      window.localStorage.setItem(KEY, next ? 'on' : 'off');
    } catch {}
  };

  return (
    <button
      type='button'
      onClick={toggle}
      aria-pressed={on}
      className='label cursor-pointer transition-colors duration-150 hover:text-ivory'
    >
      Drift <span className={on ? 'text-signal' : 'text-ivory'}>{on ? 'on' : 'off'}</span>
    </button>
  );
}
