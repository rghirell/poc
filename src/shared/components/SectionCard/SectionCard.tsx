import type { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const SectionCard = ({ children, className = '', ...props }: Props) => (
  <div
    className={`flex flex-col gap-3 bg-white rounded-lg border border-gray-200 p-6 ${className}`}
    {...props}
  >
    {children}
  </div>
);
