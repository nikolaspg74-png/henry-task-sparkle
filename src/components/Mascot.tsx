import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MascotProps {
  mood?: 'happy' | 'sad' | 'excited' | 'neutral';
  className?: string;
}

export const Mascot = ({ mood = 'neutral', className }: MascotProps) => {
  const expressions = {
    happy: '😊',
    sad: '😢',
    excited: '🎉',
    neutral: '🌟',
  };

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <div className={cn(
        'relative w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center shadow-elevated',
        mood === 'excited' && 'animate-bounce-in',
        mood === 'happy' && 'animate-float'
      )}>
        <Star className="w-12 h-12 text-primary-foreground fill-current" />
        <div className="absolute -bottom-2 right-0 text-3xl animate-bounce-in">
          {expressions[mood]}
        </div>
      </div>
      {mood === 'excited' && (
        <div className="absolute inset-0 rounded-full border-4 border-primary animate-pulse-ring" />
      )}
    </div>
  );
};
