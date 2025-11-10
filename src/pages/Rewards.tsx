import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { RewardCard } from '@/components/RewardCard';
import { PointsDisplay } from '@/components/PointsDisplay';
import { Confetti } from '@/components/Confetti';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

const Rewards = () => {
  const queryClient = useQueryClient();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [rewardName, setRewardName] = useState('');

  const { data: recompensas = [] } = useQuery({
    queryKey: ['recompensas'],
    queryFn: api.getRecompensas,
  });

  const { data: pontuacao } = useQuery({
    queryKey: ['pontuacao'],
    queryFn: api.getPontuacao,
    refetchInterval: 2000,
  });

  const resgatarMutation = useMutation({
    mutationFn: api.resgatarRecompensa,
    onSuccess: (data, id) => {
      const reward = recompensas.find(r => r.id === id);
      if (data.sucesso) {
        setRewardName(reward?.nome || '');
        setShowConfetti(true);
        setShowSuccessDialog(true);
        queryClient.invalidateQueries({ queryKey: ['pontuacao'] });
        queryClient.invalidateQueries({ queryKey: ['recompensas'] });
      } else {
        toast.error(data.mensagem || 'Erro ao resgatar recompensa');
      }
    },
    onError: () => {
      toast.error('Você não tem estrelas suficientes! 😢');
    },
  });

  const handleRedeem = (id: number) => {
    resgatarMutation.mutate(id);
  };

  const points = pontuacao?.total ?? 0;

  return (
    <div className="min-h-screen pb-24 pt-8 px-4">
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />
      
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl text-center">
              🎉 Parabéns! 🎉
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xl text-center py-6">
              Você conquistou: <br />
              <span className="text-2xl font-bold text-primary mt-2 block">{rewardName}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="w-full bg-gradient-primary text-lg py-6 rounded-2xl">
              Incrível! 🌟
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="max-w-screen-lg mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center space-y-6 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-primary bg-clip-text text-transparent animate-bounce-in">
            Meus Prêmios 🎁
          </h1>
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-semibold text-muted-foreground">Minhas Estrelas</p>
            <PointsDisplay points={points} size="md" />
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recompensas.map((recompensa) => (
            <RewardCard
              key={recompensa.id}
              reward={recompensa}
              canAfford={points >= recompensa.custo}
              onRedeem={() => handleRedeem(recompensa.id)}
            />
          ))}
        </div>

        {recompensas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-2xl text-muted-foreground">
              Nenhuma recompensa disponível no momento 😊
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rewards;
