import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserInfo } from '../services/api/auth';

export interface User {
  id: number;
  nome: string;
  nomeUsuario: string;
  email: string;
  dataNascimento: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  triggerTokenChange: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Função para carregar os dados do usuário
  async function loadUser() {
    try {
      const userData = await getUserInfo();
      setUser(userData);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      setUser(null);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  }

  // Função para inicializar ou limpar o usuário com base no token
  const initializeUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setLoading(true);
        await loadUser();
      } else {
        setUser(null); // Limpa o usuário se o token não estiver presente
        setLoading(false);
      }
    } catch {
      setUser(null);
      setLoading(false);
    }
  };

  // useEffect para inicializar o usuário quando o componente for montado
  useEffect(() => {
    initializeUser();
  }, []);

  // useEffect para monitorar mudanças no token
  useEffect(() => {
    const handleTokenChange = () => {
      initializeUser();
    };

    // Adiciona event listener para mudanças no localStorage
    window.addEventListener('storage', handleTokenChange);

    // Adiciona um evento customizado para mudanças locais no token
    window.addEventListener('tokenChanged', handleTokenChange);

    // Cleanup ao desmontar o componente
    return () => {
      window.removeEventListener('storage', handleTokenChange);
      window.removeEventListener('tokenChanged', handleTokenChange);
    };
  }, []);

  // Função para disparar o evento personalizado
  const triggerTokenChange = () => {
    window.dispatchEvent(new Event('tokenChanged'));
  };

  const value = { user, loading, triggerTokenChange }; // Adiciona `triggerTokenChange` ao contexto para ser usado externamente

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
