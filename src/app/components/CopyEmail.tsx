'use client';

import { useEffect, useState } from 'react';

type State = 'idle' | 'copied' | 'failed';

export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<State>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const t = window.setTimeout(() => setState('idle'), 2400);
    return () => window.clearTimeout(t);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState('copied');
    } catch {
      setState('failed');
    }
  };

  return (
    <button
      type='button'
      onClick={copy}
      className='cursor-pointer text-small font-semibold text-haze underline decoration-dust decoration-1 underline-offset-[0.3em] transition-colors duration-150 hover:text-signal'
    >
      <span aria-live='polite'>
        {state === 'copied'
          ? 'Copied to clipboard'
          : state === 'failed'
            ? 'Copy failed. Select the address above.'
            : 'Copy address'}
      </span>
    </button>
  );
}
