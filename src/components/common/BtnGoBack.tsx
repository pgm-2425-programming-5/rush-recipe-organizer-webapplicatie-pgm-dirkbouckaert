import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FaChevronCircleLeft } from 'react-icons/fa';

type BtnGoBackProps = {
  href: string;
  className?: string;
};

const BtnGoBack = ({ href, className }: BtnGoBackProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-1 text-sm text-slate-500 hover:text-slate-600',
        className
      )}
    >
      <FaChevronCircleLeft className="h-4 w-4" />
      <p>Terug</p>
    </Link>
  );
};

export default BtnGoBack;
