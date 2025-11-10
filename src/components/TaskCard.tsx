import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tarefa } from '@/lib/api';

interface TaskCardProps {
  task: Tarefa;
  onCorrect: () => void;
  onWrong: () => void;
  disabled?: boolean;
}

export const TaskCard = ({ task, onCorrect, onWrong, disabled = false }: TaskCardProps) => {
  return (
    <Card className={`p-6 bg-gradient-card shadow-soft transition-all animate-bounce-in ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-elevated'
    }`}>
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">{task.nome}</h3>
        {task.descricao && (
          <p className="text-muted-foreground">{task.descricao}</p>
        )}
        <div className="flex gap-3">
          <Button
            onClick={onCorrect}
            disabled={disabled}
            className="flex-1 bg-gradient-success hover:scale-105 transition-transform text-lg py-6 rounded-2xl"
            size="lg"
          >
            <Check className="w-6 h-6 mr-2" />
            Acertei! +1
          </Button>
          <Button
            onClick={onWrong}
            disabled={disabled}
            className="flex-1 bg-gradient-to-br from-error to-error/80 hover:from-error/90 hover:to-error/70 hover:scale-105 transition-transform text-lg py-6 rounded-2xl"
            size="lg"
          >
            <X className="w-6 h-6 mr-2" />
            Errei -2
          </Button>
        </div>
      </div>
    </Card>
  );
};
