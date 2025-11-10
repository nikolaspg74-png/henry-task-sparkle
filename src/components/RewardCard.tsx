import { Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Recompensa } from '@/lib/api';
import { PointsDisplay } from './PointsDisplay';

interface RewardCardProps {
  reward: Recompensa;
  canAfford: boolean;
  onRedeem: () => void;
}

export const RewardCard = ({ reward, canAfford, onRedeem }: RewardCardProps) => {
  return (
    <Card className="p-6 bg-gradient-card shadow-soft hover:shadow-elevated transition-all animate-bounce-in relative overflow-hidden">
      <div className="absolute top-2 right-2">
        <PointsDisplay points={reward.custo} size="sm" />
      </div>
      
      <div className="flex flex-col items-center space-y-4 mt-8">
        <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
          <Gift className="w-10 h-10 text-primary-foreground" />
        </div>
        
        <h3 className="text-2xl font-bold text-center text-foreground">{reward.nome}</h3>
        
        <Button
          onClick={onRedeem}
          disabled={!canAfford || reward.resgatada}
          className="w-full bg-gradient-primary hover:scale-105 transition-transform text-lg py-6 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
        >
          {reward.resgatada ? '✓ Resgatada' : canAfford ? '🎁 Resgatar' : '🔒 Bloqueada'}
        </Button>
      </div>
    </Card>
  );
};
