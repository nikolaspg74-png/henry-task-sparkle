import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Mascot } from '@/components/Mascot';
import { PointsDisplay } from '@/components/PointsDisplay';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { data: pontuacao } = useQuery({
    queryKey: ['pontuacao'],
    queryFn: api.getPontuacao,
    refetchInterval: 2000,
  });

  const points = pontuacao?.total ?? 0;

  return (
    <div className="min-h-screen pb-24 pt-8 px-4">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col items-center space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-bounce-in">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Olá, Henry! 👋
            </h1>
            <p className="text-xl text-muted-foreground">
              Continue fazendo suas tarefas para ganhar mais estrelas!
            </p>
          </div>

          {/* Mascot */}
          <Mascot mood={points > 10 ? 'excited' : points > 5 ? 'happy' : 'neutral'} className="animate-float" />

          {/* Points Display */}
          <div className="space-y-2 text-center">
            <p className="text-lg font-semibold text-muted-foreground">Suas Estrelas</p>
            <PointsDisplay points={points} size="lg" animated />
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-md space-y-4 mt-8">
            <Button
              onClick={() => navigate('/tarefas')}
              className="w-full bg-gradient-primary hover:scale-105 transition-transform text-xl py-8 rounded-2xl group"
              size="lg"
            >
              <span>Fazer Tarefas</span>
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              onClick={() => navigate('/recompensas')}
              className="w-full bg-gradient-warning hover:scale-105 transition-transform text-xl py-8 rounded-2xl group"
              size="lg"
            >
              <span>Ver Prêmios</span>
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Level Indicator */}
          <div className="mt-8 p-6 bg-gradient-card rounded-3xl shadow-soft w-full max-w-md">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Nível</span>
                <span className="text-2xl font-bold text-primary">{Math.floor(points / 10) + 1}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-primary transition-all duration-500 rounded-full"
                  style={{ width: `${(points % 10) * 10}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {10 - (points % 10)} estrelas para o próximo nível!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
