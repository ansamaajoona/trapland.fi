import { ArrowUpRight, Github } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

interface ProjectItem {
  title: string;
  url: string;
  description: string;
  image: string;
  technologies: string[];
  repository: string;
}

const projects: ProjectItem[] = [
  {
    title: 'FACEIT Finder',
    url: 'https://faceitfinder.trapland.fi/',
    description: "A full-stack web app for looking up FACEIT statistics. Search by Steam ID, Steam vanity URL, or FACEIT nickname to view player stats, ELO, match history, K/D ratios, ban status, and performance charts. Utilizes FACEIT and Steam API's.",
    image: '/project-faceitfinder.png',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    repository: 'https://github.com/ansamaajoona/faceit-finder',
  },
  {
    title: 'Image Pixelator',
    url: 'https://trapland.fi/imagepixelator',
    description:
      'A browser-based tool for transforming photos into pixel art. Upload any image, dial in the pixel size and colour palette, and optionally strip the background with AI-powered removal.',
    image: '/project-imagepixelator.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    repository: 'https://github.com/ansamaajoona/image_pixelator',
  },
  {
    title: 'trapland.fi -website',
    url: 'https://trapland.fi/',
    description:
      'My personal website, built from scratch with React, TypeScript, and Tailwind CSS. A hub for my work, projects, and online presence.',
    image: '/project-traplandfi.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    repository: 'https://github.com/ansamaajoona/trapland.fi',
  },
];

const ProjectCard: FC<ProjectItem> = ({ title, url, description, image, technologies, repository }) => {
  return (
    <div
      className='group flex gap-4 rounded-lg p-4 -mx-4
        transition-all duration-200
        hover:bg-slate-800/40 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]
        hover:drop-shadow-lg'
    >
      {/* Thumbnail — links to live site */}
      <a
        href={url}
        target='_blank'
        rel='noreferrer'
        className='relative shrink-0 w-32 h-24 rounded overflow-hidden bg-navy-light border border-slate-700/50'
        tabIndex={-1}
        aria-hidden='true'
      >
        <Image
          src={image}
          alt={`${title} preview`}
          fill
          className='object-cover'
          unoptimized
        />
      </a>

      {/* Content */}
      <div className='flex flex-col gap-1 min-w-0'>
        {/* Title row */}
        <div className='flex items-center justify-between gap-2'>
          <a
            href={url}
            target='_blank'
            rel='noreferrer'
            className='flex items-center gap-1 font-medium leading-snug text-slate-200 group-hover:text-secondary transition-colors duration-200'
          >
            <span>{title}</span>
            <ArrowUpRight className='h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
          </a>

          <a
            href={repository}
            target='_blank'
            rel='noreferrer'
            aria-label={`${title} GitHub repository`}
            className='shrink-0 text-slate-400 hover:text-slate-200 transition-colors duration-200'
          >
            <Github className='h-4 w-4' />
          </a>
        </div>

        {/* Description */}
        <p className='text-sm leading-relaxed text-slate-400'>{description}</p>

        {/* Tech tags */}
        {technologies.length > 0 && (
          <ul className='mt-2 flex flex-wrap gap-2'>
            {technologies.map((tech) => (
              <li key={tech}>
                <span className='inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary'>
                  {tech}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const Projects: FC = () => {
  return (
    <section
      id='projects'
      className='mb-32 scroll-mt-16 md:mb-40 lg:mb-52 lg:scroll-mt-24'
      aria-label='Projects'
    >
      <div className='sticky top-0 z-20 -mx-6 mb-6 w-screen bg-primary/80 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:hidden'>
        <h2 className='text-sm font-bold uppercase tracking-widest text-slate-200'>
          Projects
        </h2>
      </div>

      <div className='flex flex-col gap-1'>
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
