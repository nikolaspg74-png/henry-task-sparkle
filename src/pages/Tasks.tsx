import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { TaskCard } from '@/components/TaskCard';
import { PointsDisplay } from '@/components/PointsDisplay';
import { Confetti } from '@/components/Confetti';
import { Mascot } from '@/components/Mascot';
import { useState } from 'react';
import { toast } from 'sonner';
import { DatePicker } from '@/components/DatePicker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Tasks = () => {
  const queryClient = useQueryClient();
  const [showConfetti, setShowConfetti] = useState(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'sad' | 'excited' | 'neutral'>('neutral');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const { data: tarefas = [] } = useQuery({
    queryKey: ['tarefas'],
    queryFn: api.getTarefas,
  });

  const { data: pontuacao } = useQuery({
    queryKey: ['pontuacao'],
    queryFn: api.getPontuacao,
    refetchInterval: 2000,
  });

  const pontuarMutation = useMutation({
    mutationFn: api.pontuar,
    onSuccess: (data, valor) => {
      queryClient.invalidateQueries({ queryKey: ['pontuacao'] });
      
      if (valor > 0) {
        setShowConfetti(true);
        setMascotMood('excited');
        toast.success('Muito bem! +1 estrela! ⭐', {
          duration: 2000,
        });
      } else {
        setMascotMood('sad');
        toast.error('Ops! Tente novamente! -2 estrelas 😢', {
          duration: 2000,
        });
      }

      setTimeout(() => setMascotMood('neutral'), 3000);
    },
  });

  const handleCorrect = (taskId: number) => {
    setCompletedTasks(prev => new Set(prev).add(taskId));
    pontuarMutation.mutate(1);
  };

  const handleWrong = (taskId: number) => {
    setCompletedTasks(prev => new Set(prev).add(taskId));
    pontuarMutation.mutate(-2);
  };

  return (
    <div className="min-h-screen pb-24 pt-8 px-4">
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />
      
      <div className="max-w-screen-lg mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center space-y-6 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-primary bg-clip-text text-transparent animate-bounce-in">
            Minhas Tarefas 📝
          </h1>
          
          <div className="flex items-center gap-6">
            <Mascot mood={mascotMood} />
            <PointsDisplay points={pontuacao?.total ?? 0} size="md" />
          </div>

           <div className="w-full max-w-md">
            <DatePicker date={selectedDate} onDateChange={(date) => setSelectedDate(date || new Date())} />
            <p className="text-center mt-2 text-sm text-muted-foreground">
              Avaliando tarefas de: {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </p>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tarefas.map((tarefa) => (
            <TaskCard
              key={tarefa.id}
              task={tarefa}
              onCorrect={() => handleCorrect(tarefa.id)}
              onWrong={() => handleWrong(tarefa.id)}
              disabled={completedTasks.has(tarefa.id)}
            />
          ))}
        </div>

        {tarefas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-2xl text-muted-foreground">
              Nenhuma tarefa disponível no momento 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
