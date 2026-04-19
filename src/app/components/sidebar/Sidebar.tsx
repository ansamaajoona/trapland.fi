'use client';

import { FC } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import { SOCIAL_LINKS } from '@/app/config/social';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

interface SidebarProps {
  activeSection: string;
}

const Sidebar: FC<SidebarProps> = ({ activeSection }) => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className='lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl'>
          <a href='/'>Joona Ansamaa</a>
        </h1>

        <h2 className='mt-3 text-lg font-medium tracking-tight text-secondary sm:text-xl'>
          Software Engineer
        </h2>

        <p className='mt-4 max-w-xs leading-normal text-slate-400'>
          I build maintainable pixel-perfect experiences for the web.
        </p>

        <div className='group relative mt-8 w-56 h-56 sm:w-64 sm:h-64'>
          <div className='group-hover:translate-x-0 group-hover:translate-y-0 duration-300 absolute w-5/6 h-5/6 border-2 border-secondary translate-x-5 translate-y-5 rounded' />
          <div className='absolute w-5/6 h-5/6 rounded overflow-hidden'>
            <div className='absolute w-full h-full group-hover:opacity-0 bg-secondary opacity-10 duration-300 rounded overflow-hidden' />
            <Image
              src='/headshot.png'
              className='object-cover rounded-lg p-0.5'
              alt='Joona Ansamaa'
              fill
              sizes='(max-width: 640px) 176px, 208px'
              unoptimized
            />
          </div>
        </div>

        <nav className='hidden lg:block mt-16' aria-label='In-page navigation'>
          <ul>
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className='group flex items-center py-3 cursor-pointer'
                    aria-current={isActive ? 'location' : undefined}
                  >
                    <span
                      className={`mr-4 h-px transition-all duration-300 motion-reduce:transition-none ${
                        isActive
                          ? 'w-16 bg-slate-200'
                          : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200'
                      }`}
                    />
                    <span
                      className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 motion-reduce:transition-none ${
                        isActive
                          ? 'text-slate-200'
                          : 'text-slate-500 group-hover:text-slate-200'
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <ul
        className='ml-1 mt-8 flex items-center gap-5 lg:mt-0'
        aria-label='Social media links'
      >
        <li>
          <a
            href={SOCIAL_LINKS.github}
            target='_blank'
            rel='noreferrer'
            aria-label='GitHub'
            className='block text-slate-400 hover:text-slate-200 transition-colors duration-200 hover:-translate-y-0.5 transform'
          >
            <Github className='h-5 w-5' />
          </a>
        </li>
        <li>
          <a
            href={SOCIAL_LINKS.linkedin}
            target='_blank'
            rel='noreferrer'
            aria-label='LinkedIn'
            className='block text-slate-400 hover:text-slate-200 transition-colors duration-200 hover:-translate-y-0.5 transform'
          >
            <Linkedin className='h-5 w-5' />
          </a>
        </li>
        <li>
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            aria-label='Send me an email'
            className='block text-slate-400 hover:text-slate-200 transition-colors duration-200 hover:-translate-y-0.5 transform'
          >
            <Mail className='h-5 w-5' />
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Sidebar;
