import axiosInstance from '../config/axiosConfig';

// Interface Nota para tipagem dos dados
interface Nota {
  id: number;
  titulo: string;
  descricao: string;
  ehFavorito: boolean;
  cor: string;
}

// Função para buscar todas as notas
export async function buscarNotas(favorito?: boolean | null, cor?: string | null, filtro?: string | null): Promise<Nota[]> {
  try {
    const resposta = await axiosInstance.get<Nota[]>('/notas', {
      params: {
        favorito: favorito !== undefined ? favorito : null,
        cor: cor || null,
        filtro: filtro || null,
      },
    });
    return resposta.data;
  } catch (erro) {
    throw erro;
  }
}

// Função para criar uma nova nota
export async function criarNota(nota: Omit<Nota, 'id'>): Promise<Nota> {
  try {
    const resposta = await axiosInstance.post<Nota>('/notas', nota);
    return resposta.data;
  } catch (erro) { 
    throw erro;
  }
}

// Função para atualizar uma nota existente
export async function atualizarNota(id: number, nota: Partial<Nota>): Promise<Nota> {
  try {
    const resposta = await axiosInstance.put<Nota>(`/notas/${id}`, nota);
    return resposta.data;
  } catch (erro) { 
    throw erro;
  }
}

// Função para excluir uma nota
export async function excluirNota(id: number): Promise<void> {
  try {
    await axiosInstance.delete(`/notas/${id}`);
  } catch (erro) { 
    throw erro;
  }
}
