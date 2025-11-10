import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

const Admin = () => {
  const queryClient = useQueryClient();
  const [nome, setNome] = useState('');
  const [custo, setCusto] = useState('');

  const criarRecompensaMutation = useMutation({
    mutationFn: ({ nome, custo }: { nome: string; custo: number }) =>
      api.criarRecompensa(nome, custo),
    onSuccess: () => {
      toast.success('Recompensa criada com sucesso! 🎉');
      queryClient.invalidateQueries({ queryKey: ['recompensas'] });
      setNome('');
      setCusto('');
    },
    onError: () => {
      toast.error('Erro ao criar recompensa 😢');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim() || !custo) {
      toast.error('Preencha todos os campos!');
      return;
    }

    const custoNumber = parseInt(custo, 10);
    if (custoNumber <= 0) {
      toast.error('O custo deve ser maior que zero!');
      return;
    }

    criarRecompensaMutation.mutate({ nome: nome.trim(), custo: custoNumber });
  };

  return (
    <div className="min-h-screen pb-24 pt-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-bounce-in">
            Área Admin ⚙️
          </h1>
          <p className="text-xl text-muted-foreground">
            Crie novas recompensas para o Henry
          </p>
        </div>

        {/* Form */}
        <Card className="p-8 bg-gradient-card shadow-soft">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-lg font-semibold">
                Nome da Recompensa
              </Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Sorvete, Parque, Filme..."
                className="text-lg py-6 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="custo" className="text-lg font-semibold">
                Custo em Estrelas
              </Label>
              <Input
                id="custo"
                type="number"
                value={custo}
                onChange={(e) => setCusto(e.target.value)}
                placeholder="Ex: 10"
                min="1"
                className="text-lg py-6 rounded-xl"
              />
            </div>

            <Button
              type="submit"
              disabled={criarRecompensaMutation.isPending}
              className="w-full bg-gradient-primary hover:scale-105 transition-transform text-xl py-8 rounded-2xl"
              size="lg"
            >
              <Plus className="w-6 h-6 mr-2" />
              {criarRecompensaMutation.isPending ? 'Criando...' : 'Criar Recompensa'}
            </Button>
          </form>
        </Card>

        {/* Info Card */}
        <Card className="mt-8 p-6 bg-muted/50">
          <h3 className="font-semibold text-lg mb-2">💡 Dicas</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Recompensas baratas (5-10 estrelas): lanches, tempo de tela</li>
            <li>• Recompensas médias (15-25 estrelas): brinquedos pequenos, passeios</li>
            <li>• Recompensas caras (30+ estrelas): brinquedos grandes, viagens</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
