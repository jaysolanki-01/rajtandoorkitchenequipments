'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentPropsWithoutRef } from 'react';

type NavLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'className'> & {
  to: string;
  className?: string | ((props: { isActive: boolean }) => string);
  end?: boolean;
};

export function NavLink({ to, className, end = false, children, ...rest }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = end ? pathname === to : pathname === to || pathname.startsWith(to + '/');
  const resolvedClass = typeof className === 'function' ? className({ isActive }) : className;
  return (
    <Link href={to} className={resolvedClass} {...rest}>
      {children}
    </Link>
  );
}
