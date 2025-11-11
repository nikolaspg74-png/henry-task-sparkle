const API_BASE_URL = import.meta.env.PROD 
  ? 'https://points-children.instatunnel.my'  // Produção: usa o tunnel diretamente
  : '/api';      // Será redirecionado pelo proxy para http://localhost:3001

export interface Tarefa {
  id: number;
  nome: string;
  descricao?: string;
}

export interface Recompensa {
  id: number;
  nome: string;
  custo: number;
  resgatada?: boolean;
}

export interface Pontuacao {
  total: number;
}

export const api = {
  async getTarefas(): Promise<Tarefa[]> {
    const response = await fetch(`${API_BASE_URL}/tarefas`);
    if (!response.ok) throw new Error('Erro ao buscar tarefas');
    return response.json();
  },

  async getRecompensas(): Promise<Recompensa[]> {
    const response = await fetch(`${API_BASE_URL}/recompensas`);
    if (!response.ok) throw new Error('Erro ao buscar recompensas');
    return response.json();
  },

  async getPontuacao(): Promise<Pontuacao> {
    const response = await fetch(`${API_BASE_URL}/pontuacao`);
    if (!response.ok) throw new Error('Erro ao buscar pontuação');
    return response.json();
  },

  async pontuar(valor: number): Promise<Pontuacao> {
    const response = await fetch(`${API_BASE_URL}/pontuar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valor }),
    });
    if (!response.ok) throw new Error('Erro ao pontuar');
    return response.json();
  },

  async resgatarRecompensa(id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/resgatar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) throw new Error('Erro ao resgatar recompensa');
    return response.json();
  },

  async criarRecompensa(nome: string, custo: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/recompensas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, custo }),
    });
    if (!response.ok) throw new Error('Erro ao criar recompensa');
    return response.json();
  },
};