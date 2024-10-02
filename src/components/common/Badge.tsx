import { BADGE_COLORS } from '@/lib/consts';
import { cn } from '@/lib/utils';

type BadgeProps = {
  title: string;
  className?: string;
  onClick?: (title: string) => void;
};

const Badge = ({ title, className, onClick }: BadgeProps) => {
  const bgColor: string = BADGE_COLORS[title];

  if (!onClick) {
    return (
      <div
        className={cn(
          'rounded-xl px-2 py-1 text-xs text-white',
          bgColor,
          className
        )}
      >
        {title}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-xl px-2 py-1 text-xs text-white',
        bgColor,
        className
      )}
      onClick={() => onClick && onClick(title)}
    >
      {title}
    </div>
  );
};

export default Badge;
