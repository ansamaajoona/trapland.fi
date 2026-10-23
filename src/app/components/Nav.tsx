'use client';

import { useEffect, useState } from 'react';
import { NAV } from '@/app/content';

export default function Nav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = NAV.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    sections.forEach((el) => observer.observe(el));

    const onScroll = () => {
      const { scrollY, innerHeight } = window;
      if (scrollY < innerHeight * 0.5) setActive(null);
      else if (scrollY + innerHeight >= document.documentElement.scrollHeight - 40)
        setActive(NAV[NAV.length - 1].id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <nav aria-label='Sections'>
      <ul className='flex items-baseline gap-x-6 sm:gap-x-9'>
        {NAV.map(({ id, label }) => {
          const current = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={current ? 'location' : undefined}
                className={`text-small font-medium transition-colors duration-150 hover:text-signal ${
                  current ? 'text-signal' : 'text-haze'
                }`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
