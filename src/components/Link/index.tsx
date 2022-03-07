import { ReactChild } from 'react';
import Link from 'next/link';

export interface LinkProps {
  href: string;
  disabled?: boolean;
  children?: ReactChild;
  linkProps?: any;
}

export default function CustomLink({
  href,
  disabled,
  children,
  linkProps,
}: LinkProps): JSX.Element {
  return disabled ? (
    <span {...linkProps}>{children}</span>
  ) : (
    <Link href={href}>
      <a {...linkProps}>{children}</a>
    </Link>
  );
}
