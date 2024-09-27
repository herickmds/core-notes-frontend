import { useState, useEffect } from 'react';
import { buscarNotas, criarNota, atualizarNota, excluirNota as excluirNotaAPI } from '@/services/api/nota';
import { messages } from '../constants/validationMessages.js';  
import { Nota } from '@/types/models.js';

export function useNotas() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [notasFiltradas, setNotasFiltradas] = useState<Nota[]>([]);

  useEffect(() => {
    const obterNotas = async () => {
      try {
        const notasDoServidor: Nota[] = await buscarNotas();
        setNotas(notasDoServidor);
      } catch (erro) {
        setErro(messages.notas.buscarErro);  
      }
    };
    obterNotas();
  }, []);

 
  const filtrarNotas = async (favorito?: boolean | null, cor?: string | null, filtro?: string | null) => {
    try {
      const notas: Nota[] = await buscarNotas(favorito, cor, filtro);
      setNotas(notas);
    } catch (erro) {
      setErro(messages.notas.buscarErro);
    }
  };

  const adicionarNota = async (nota: Omit<Nota, 'id'>) => {
    try {
      const novaNota: Nota = await criarNota(nota);
      setNotas([...notas, novaNota]);
    } catch (erro) {
      setErro(messages.notas.criarErro); 
    }
  };

  const excluirNota = async (id: number) => {
    try {
      await excluirNotaAPI(id);
      setNotas(notas.filter((nota) => nota.id !== id));
    } catch (erro) {
      setErro(messages.notas.excluirErro);
    }
  };

  const editarNota = async (id: number, notaAtualizada: Partial<Nota>) => {
    try {
      const nota: Nota = await atualizarNota(id, notaAtualizada);
      setNotas(notas.map((t) => (t.id === nota.id ? nota : t)));
    } catch (erro) {
      setErro(messages.notas.atualizarErro);
    }
  };

  return {
    notas,
    erro,
    filtrarNotas,
    adicionarNota,
    excluirNota,
    editarNota,
  };
}
