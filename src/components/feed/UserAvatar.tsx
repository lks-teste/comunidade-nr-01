import type { User } from '@/data/mockData';

const colorMap: Record<string, string> = {
  A: 'bg-primary', B: 'bg-accent', C: 'bg-warning', D: 'bg-success',
  E: 'bg-destructive', F: 'bg-primary', G: 'bg-accent', H: 'bg-warning',
  I: 'bg-success', J: 'bg-primary', K: 'bg-accent', L: 'bg-warning',
  M: 'bg-success', N: 'bg-primary', O: 'bg-accent', P: 'bg-warning',
  Q: 'bg-success', R: 'bg-destructive', S: 'bg-primary', T: 'bg-accent',
  U: 'bg-warning', V: 'bg-success', W: 'bg-primary', X: 'bg-accent',
  Y: 'bg-warning', Z: 'bg-success',
};

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
};

export function UserAvatar({ user, size = 'md', onClick }: UserAvatarProps) {
  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const bgColor = colorMap[initials[0]?.toUpperCase() || 'A'] || 'bg-primary';

  return (
    <div
      onClick={onClick}
      className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center text-primary-foreground font-semibold cursor-pointer ring-2 ring-background shrink-0`}
    >
      {initials}
    </div>
  );
}
