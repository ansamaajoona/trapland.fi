import { ArrowUpRight } from 'lucide-react';

export default function OutLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target='_blank' rel='noreferrer' className={`link inline-flex items-center gap-1 ${className}`}>
      {children}
      <ArrowUpRight aria-hidden='true' className='size-[0.95em]' strokeWidth={2} />
    </a>
  );
}
