export const SITE = {
  name: 'Joona Ansamaa',
  url: 'https://trapland.fi',
  title: 'Joona Ansamaa — Software Engineer',
  description:
    'Joona Ansamaa is a software engineer from Finland: full-stack, with a focus on the frontend. Experience and contact.',
};

export const NAV = [
  { id: 'route', label: 'Route' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const;

export const STACK = ['TypeScript', 'React', 'Next.js', 'Node.js', 'JavaScript', 'Tailwind CSS'];

export interface Role {
  company: string;
  url: string;
  title: string;
  start: string;
  end: string;
  description: string;
  stack: string[];
}

export const ROLES: Role[] = [
  {
    company: 'Qt Group',
    url: 'https://www.qt.io',
    title: 'Software Engineer',
    start: '2025.05',
    end: '2026.03',
    description:
      'Developed React and TypeScript frontend features across multiple projects after promotion from trainee. Contributed bug fixes and smaller changes to backend services. Took part in trainee recruitment, including technical evaluation and code review of candidate projects.',
    stack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
  },
  {
    company: 'Qt Group',
    url: 'https://www.qt.io',
    title: 'Software Engineer Trainee',
    start: '2024.02',
    end: '2025.05',
    description:
      'Joined the Qt Web Development team on the frontend of an analytics web application: planning and building features, fixing bugs. After six months, took full ownership of a new project’s frontend architecture, development and documentation.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    company: 'Netproce Oy',
    url: 'https://www.netproce.com',
    title: 'Intern',
    start: '2022.02',
    end: '2022.04',
    description:
      'Manual testing of the company’s CRM application. Reviewed the program’s functions end to end, identified UI inconsistencies and illogical flows, and presented findings and improvement proposals to the development team.',
    stack: ['Manual testing', 'QA', 'CRM'],
  },
];
