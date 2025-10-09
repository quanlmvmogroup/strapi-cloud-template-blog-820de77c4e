'use client';

import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  href: never;
  children: ReactNode;
  active?: boolean;
  className?: string;
  target?: string;
};

export function NavbarItem({
  children,
  href,
  active,
  target,
  className,
}: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        'px-3 py-2 rounded-full hover:bg-[#F5F5F5] text-xs font-medium',
        (active || `${pathname}/`?.includes(href)) && 'bg-[#F5F5F5]',
        className
      )}
      target={target}
    >
      {children}
    </Link>
  );
}
