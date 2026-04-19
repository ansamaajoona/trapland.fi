import { FC } from 'react';

const TECHNOLOGIES = [
  'JavaScript / TypeScript',
  'React',
  'Node.js',
  'Next.js',
];

const About: FC = () => {
  return (
    <section
      id='about'
      className='mb-32 scroll-mt-16 md:mb-40 lg:mb-52 lg:scroll-mt-24'
      aria-label='About me'
    >
      <div className='sticky top-0 z-20 -mx-6 mb-6 w-screen bg-primary/80 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:hidden'>
        <h2 className='text-sm font-bold uppercase tracking-widest text-slate-200'>
          About
        </h2>
      </div>

      <div className='space-y-4 leading-relaxed'>
        <p>
          I&apos;m a software engineer from Finland with a focus on frontend
          development. I got into coding through a love of video games, taught
          myself web development alongside vocational school, and eventually
          landed a traineeship at{' '}
          <span className='font-medium text-secondary'>Qt Group</span> where I
          was later promoted to Software Engineer.
        </p>
        <p>
          I care about the details: clean code, good performance, and interfaces
          that actually feel good to use.
        </p>

        <div className='pt-2'>
          <p className='mb-3 text-sm'>Here are a few technologies I work with:</p>
          <ul className='grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-sm'>
            {TECHNOLOGIES.map((tech) => (
              <li key={tech} className='flex items-center gap-2'>
                <span className='text-xs text-secondary'>▹</span>
                <span>{tech}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
