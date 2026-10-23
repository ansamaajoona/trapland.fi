import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import CopyEmail from '@/app/components/CopyEmail';
import DriftToggle from '@/app/components/DriftToggle';
import DustField from '@/app/components/DustField';
import Experience from '@/app/components/Experience';
import Nav from '@/app/components/Nav';
import { OuluNow, SkyNote } from '@/app/components/OuluNow';
import OuluSky from '@/app/components/OuluSky';
import OutLink from '@/app/components/OutLink';
import SignedName from '@/app/components/SignedName';
import StackField from '@/app/components/StackField';
import { SOCIAL_LINKS } from '@/app/social';

const shell = 'mx-auto w-full max-w-360 px-5 sm:px-10 lg:px-14';

function Leader() {
  return <div aria-hidden='true' className='leader mb-14 sm:mb-20' />;
}

function Hero() {
  return (
    <section aria-label='Introduction' className={`${shell} hero flex flex-col pt-6 pb-10 lg:min-h-svh`}>
      <header className='flex items-center justify-between gap-6'>
        <a href='#top' className='label whitespace-nowrap text-ivory'>
          trapland.fi <span aria-hidden='true' className='text-signal'>■</span>
        </a>
        <Nav />
      </header>

      <div className='flex flex-col justify-center pt-20 sm:pt-24 lg:flex-1 lg:py-16'>
        <SignedName lines={['Joona', 'Ansamaa']} signature='Joona Ansamaa' />

        <div className='mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:items-end lg:gap-8'>
          <div className='lg:col-span-7'>
            <p className='hero-follow max-w-[40ch] text-body text-haze [--d:0] sm:text-lead'>
              Software engineer from Oulu, Finland. Full-stack, frontend at heart: I build web things
              that are fast, tidy and actually nice to use.
            </p>
            <div className='hero-follow mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 [--d:1]'>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className='group inline-flex items-center gap-2 text-lead font-semibold text-signal underline decoration-signal/40 decoration-1 underline-offset-[0.3em] transition-colors duration-150 hover:decoration-signal'
              >
                Email me
                <ArrowRight
                  aria-hidden='true'
                  className='size-[1em] transition-transform duration-200 ease-out-expo group-hover:translate-x-1'
                  strokeWidth={2}
                />
              </a>
              <span className='flex gap-x-8'>
                <OutLink href={SOCIAL_LINKS.github} className='font-medium'>
                  GitHub
                </OutLink>
                <OutLink href={SOCIAL_LINKS.linkedin} className='font-medium'>
                  LinkedIn
                </OutLink>
              </span>
            </div>
          </div>
          <div className='hero-follow [--d:2] lg:col-span-5 lg:justify-self-end'>
            <OuluNow />
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id='about' aria-labelledby='about-title' className={`${shell} pb-32 sm:pb-40`}>
      <Leader />
      <div className='grid gap-y-12 lg:grid-cols-12 lg:gap-x-8'>
        <div className='max-w-88 lg:col-span-4 lg:max-w-none'>
          {/* Lighten lets the photo's black backdrop fall away into the dust behind it. */}
          <Image
            src='/headshot.jpg'
            alt='Portrait of Joona Ansamaa'
            width={1024}
            height={1024}
            sizes='(min-width: 1024px) 420px, 352px'
            className='h-auto w-full mix-blend-lighten'
          />
        </div>
        <div className='lg:col-span-7 lg:col-start-6 lg:self-center'>
          <h2 id='about-title' className='text-statement font-semibold text-ivory'>
            I care about the details: clean code, good performance, and interfaces that actually feel
            good to use.
          </h2>
          <p className='mt-8 max-w-[58ch] text-haze'>
            Video games got me hooked on computers, and the computers got me hooked on code. I taught
            myself web development on the side of vocational school, landed a traineeship at{' '}
            <span className='text-ivory'>Qt Group</span>, and got promoted to Software Engineer.
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [user, domain] = SOCIAL_LINKS.email.split('@');
  return (
    <section id='contact' aria-labelledby='contact-title' className={`${shell} pb-28 sm:pb-36`}>
      <h2 id='contact-title' className='sr-only'>
        Contact
      </h2>
      <Leader />
      <p className='max-w-[46ch] text-lead text-haze'>
        Got a full-time role, a part-time gig, or just want to talk shop? I’m always up for a chat.
        Poke the inbox.
      </p>
      <p className='mt-12 sm:mt-16'>
        <a
          href={`mailto:${SOCIAL_LINKS.email}`}
          className='text-close font-extrabold tracking-[-0.01em] text-ivory transition-colors duration-150 font-stretch-expanded hover:text-signal'
        >
          <span className='whitespace-nowrap'>{user}@</span>
          <wbr />
          <span className='whitespace-nowrap'>{domain}</span>
        </a>
      </p>
      <div className='mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-small font-medium'>
        <CopyEmail email={SOCIAL_LINKS.email} />
        <OutLink href={SOCIAL_LINKS.github}>GitHub</OutLink>
        <OutLink href={SOCIAL_LINKS.linkedin}>LinkedIn</OutLink>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className={`${shell} flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 pt-8 pb-10`}>
      <p className='label'>© {new Date().getFullYear()} Joona Ansamaa · Built in Oulu</p>
      <div className='flex flex-wrap items-baseline gap-x-8 gap-y-2'>
        <SkyNote />
        <DriftToggle />
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <OuluSky />
      <DustField />
      <div id='top' className='relative overflow-x-clip'>
        <a
          href='#route'
          className='label sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-30 focus:bg-void focus:px-2 focus:py-1 focus:text-signal'
        >
          Skip to content
        </a>
        <main>
          <Hero />
          <Experience />
          <StackField />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
