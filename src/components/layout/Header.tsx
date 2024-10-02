'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiRiceCooker } from 'react-icons/gi';

const Header = () => {
  const pathname = usePathname();

  const linkBaseStyle = 'rounded-md px-3 py-2 transition hover:bg-emerald-500';
  const linkActiveStyle = 'border-none bg-emerald-600 text-white';

  return (
    <header className="bg-emerald-700 text-slate-50">
      <div className="app-container flex items-center justify-between">
        <Link href="/">
          <GiRiceCooker className="text-7xl text-emerald-100" />
        </Link>
        <nav className="xs:flex mt-6 hidden items-center gap-6">
          <Link
            href="/"
            className={cn(
              linkBaseStyle,
              pathname === '/' ? linkActiveStyle : ''
            )}
          >
            Home
          </Link>
          <Link
            href="/recipes"
            className={cn(
              linkBaseStyle,
              pathname === '/recipes' ? linkActiveStyle : ''
            )}
          >
            Recepten
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
