'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/app/components/sidebar/Sidebar';
import About from '@/app/components/about/About';
import Experience from '@/app/components/experience/Experience';
import Projects from '@/app/components/projects/Projects';
import Contact from '@/app/components/contact/Contact';
import ReactGA from 'react-ga4';

const SECTIONS = ['about', 'experience', 'projects', 'contact'];

export default function HomeClient() {
  ReactGA.send({ hitType: "pageview", page: "/", title: "Home page visit" });

  const [mousePosition, setMousePosition] = useState({ x: -9999, y: -9999 });
  const [activeSection, setActiveSection] = useState('about');

  // Track mouse for spotlight gradient
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll-spy: update active nav item based on visible section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-20% 0px -60% 0px' },
      );
      observer.observe(el);
      observers.push(observer);
    });

    // When scrolled to the bottom of the page, always highlight the last section
    const handleScroll = () => {
      const nearBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 80;
      if (nearBottom) setActiveSection(SECTIONS[SECTIONS.length - 1]);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='relative min-h-screen bg-primary'>
      {/* Spotlight overlay */}
      <div
        className='pointer-events-none fixed inset-0 z-30 transition duration-300'
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.12), transparent 80%)`,
        }}
      />

      <div className='mx-auto min-h-screen max-w-7xl px-6 md:px-12 lg:px-24'>
        <div className='lg:flex lg:justify-between lg:gap-4 lg:mt-0 mt-12'>
          <Sidebar activeSection={activeSection} />

          <main className='pt-24 pb-16 lg:w-[52%] lg:py-24'>
            <About />
            <Experience />
            <Projects />
            <Contact />

            <footer className='mt-20 pb-4' />
          </main>
        </div>
      </div>
    </div>
  );
}
