import { FC } from 'react';
import { SOCIAL_LINKS } from '@/app/config/social';

const Contact: FC = () => {
  return (
    <section
      id='contact'
      className='mb-32 scroll-mt-16 md:mb-40 lg:scroll-mt-24'
      aria-label='Contact'
    >
      {/* Mobile-only sticky section header */}
      <div className='sticky top-0 z-20 -mx-6 mb-6 w-screen bg-primary/80 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:hidden'>
        <h2 className='text-sm font-bold uppercase tracking-widest text-slate-200'>
          Contact
        </h2>
      </div>

      <div className='max-w-md'>
        <h2 className='mb-5 text-2xl font-bold tracking-tight text-slate-200 sm:text-3xl'>
          Get In Touch
        </h2>
        <p className='mb-10 leading-relaxed'>
          I&apos;m always open to discussing new opportunities — whether it&apos;s
          a part-time gig or a full-time role. Feel free to reach out!
        </p>
        <div className='flex flex-wrap gap-6 items-center'>
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className='inline-block rounded border border-secondary px-8 py-4 font-mono text-sm text-secondary
              transition-all duration-300 hover:bg-secondary/10 focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-secondary'
          >
            Send me an email
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target='_blank'
            rel='noreferrer'
            className='text-slate-400 text-sm hover:text-secondary transition-all duration-300'
          >
            or connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
