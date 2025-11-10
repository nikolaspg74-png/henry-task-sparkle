import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PointsDisplayProps {
  points: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const PointsDisplay = ({ points, size = 'md', animated = false }: PointsDisplayProps) => {
  const sizeClasses = {
    sm: 'text-2xl px-4 py-2',
    md: 'text-4xl px-6 py-3',
    lg: 'text-6xl px-8 py-4',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 bg-gradient-warning rounded-full font-bold text-warning-foreground shadow-soft',
        sizeClasses[size],
        animated && 'animate-bounce-in'
      )}
    >
      <Star className="fill-current" />
      <span>{points}</span>
    </div>
  );
};
