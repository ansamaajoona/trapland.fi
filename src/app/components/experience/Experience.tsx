import { ExternalLink } from 'lucide-react';
import { FC } from 'react';

interface ExperienceItem {
  company: string;
  url: string;
  title: string;
  period: string;
  description: string;
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'Qt Group',
    url: 'https://www.qt.io',
    title: 'Software Engineer',
    period: 'May 2025 — Mar 2026',
    description:
      'Developed React/TypeScript frontend features across multiple projects after promotion from trainee. Contributed to backend services with bug fixes and minor changes. Participated in trainee recruitment, including technical evaluation and code review of candidate projects.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
  },
  {
    company: 'Qt Group',
    url: 'https://www.qt.io',
    title: 'Software Engineer Trainee',
    period: 'Feb 2024 — May 2025',
    description:
      'Joined the Qt Web Development team and worked on the frontend of an analytics web application — planning and developing features, fixing bugs. After 6 months, took full ownership of a new project\'s frontend architecture, development, and documentation.',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
    ],
  },
  {
    company: 'Netproce Oy',
    url: 'https://www.netproce.com',
    title: 'Intern',
    period: 'Feb 2022 — Apr 2022',
    description:
      'Manual testing of the company\'s CRM application. Conducted a comprehensive review of program functions, identified UI inconsistencies and interface illogicalities, and presented findings and improvement proposals to the development team.',
    technologies: ['Manual Testing', 'QA', 'CRM'],
  },
];

const ExperienceCard: FC<ExperienceItem> = ({
  company,
  url,
  title,
  period,
  description,
  technologies,
}) => {
  return (
    <a
      href={url}
      target='_blank'
      rel='noreferrer'
      className='group flex flex-col gap-1 rounded-lg p-4 -mx-4
        transition-all duration-200
        hover:bg-slate-800/40 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]
        hover:drop-shadow-lg'
    >
      <p className='text-xs font-semibold uppercase tracking-widest text-slate-500'>
        {period}
      </p>

      <h3 className='font-medium leading-snug text-slate-200 flex flex-wrap items-center gap-x-1 group-hover:text-secondary transition-colors duration-200'>
        <span>{title}</span>
        <span className='text-slate-400'>·</span>
        <span>{company}</span>
        <ExternalLink className='h-3.5 w-3.5 ml-0.5 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200' />
      </h3>

      <p className='mt-1 text-sm leading-relaxed'>{description}</p>

      {technologies.length > 0 && (
        <ul className='mt-3 flex flex-wrap gap-2'>
          {technologies.map((tech) => (
            <li key={tech}>
              <span className='inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary'>
                {tech}
              </span>
            </li>
          ))}
        </ul>
      )}
    </a>
  );
};

const Experience: FC = () => {
  return (
    <section
      id='experience'
      className='mb-32 scroll-mt-16 md:mb-40 lg:mb-52 lg:scroll-mt-24'
      aria-label='Work experience'
    >
      <div className='sticky top-0 z-20 -mx-6 mb-6 w-screen bg-primary/80 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:hidden'>
        <h2 className='text-sm font-bold uppercase tracking-widest text-slate-200'>
          Experience
        </h2>
      </div>

      <div className='flex flex-col gap-1'>
        {experiences.map((exp, i) => (
          <ExperienceCard key={i} {...exp} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
