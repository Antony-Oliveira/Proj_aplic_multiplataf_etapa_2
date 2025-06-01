import { AuthService, type AuthResponse } from '~/server/utils/services/auth.service';
import { useToken } from './useToken';

export const useAuth = () => {
  const loading = useState<boolean>('loading', () => false);
  const error = useState<string | null>('authError', () => null);
  const user = useState<AuthResponse['user'] | null>('user', () => null);
  const isAuthenticated = computed(() => !!user.value);
  const { setToken, removeToken, getToken } = useToken();

  const setUser = (userData: AuthResponse['user'] | null) => {
    user.value = userData;
    
    // Persiste o usuário no localStorage
    if (process.client) {
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        localStorage.removeItem('user');
      }
    }
  };

  const login = async (email: string, senha: string) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await AuthService.login({ email, senha });
      
      if (response.token) {
        setToken(response.token);
      }
      
      setUser(response.user);
      return { success: true, message: 'Login realizado com sucesso.' };
    } catch (err: any) {
      error.value = err.message || 'Erro ao realizar login';
      setUser(null);
      removeToken();
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const register = async (data: { 
    nome: string; 
    email: string; 
    senha: string; 
    telefone?: string; 
    localizacao?: string 
  }) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await AuthService.register(data);
      
      if (response.token) {
        setToken(response.token);
      }
      
      setUser(response.user);
      return { success: true, message: 'Cadastro realizado com sucesso.' };
    } catch (err: any) {
      error.value = err.message || 'Erro ao realizar cadastro';
      setUser(null);
      removeToken();
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      await AuthService.logout();
      setUser(null);
      removeToken();
      return { success: true, message: 'Logout realizado com sucesso.' };
    } catch (err: any) {
      error.value = err.message || 'Erro ao realizar logout';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const checkAuth = async () => {
    const token = getToken();
    
    // Se não há token ou usuário já está autenticado, não faz nada
    if (!token || (isAuthenticated.value && user.value)) {
      return;
    }
    
    loading.value = true;
    error.value = null;
    
    try {
      const response = await AuthService.validateToken(token);
      setUser(response.user);
    } catch (err: any) {
      error.value = err.message || 'Erro ao validar autenticação';
      setUser(null);
      removeToken();
    } finally {
      loading.value = false;
    }
  };

  // Inicializa o estado de autenticação do localStorage quando no cliente
  if (process.client) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }

  return {
    user: computed(() => user.value),
    isAuthenticated,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    login,
    register,
    logout,
    checkAuth
  };
}; 