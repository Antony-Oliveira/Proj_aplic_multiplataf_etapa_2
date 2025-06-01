import { useToken } from '~/composables/useToken';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3002/api/auth';

export interface AuthResponse {
  user: {
    id: number;
    nome: string;
    email: string;
    telefone?: string;
    localizacao?: string;
    bio?: string;
    avatarUrl?: string;
    criadoEm: Date;
  };
  token?: string;
  message?: string;
}

export interface LoginData {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  localizacao?: string;
}

export class AuthService {
  static async register(data: RegisterData): Promise<AuthResponse> {
    const response = await $fetch<AuthResponse>(`${AUTH_SERVICE_URL}/register`, {
      method: 'POST',
      body: data
    });
    return response;
  }

  static async login(data: LoginData): Promise<AuthResponse> {
    const response = await $fetch<AuthResponse>(`${AUTH_SERVICE_URL}/login`, {
      method: 'POST',
      body: data
    });
    return response;
  }

  static async validateToken(token?: string): Promise<AuthResponse> {
    // Se não receber token como parâmetro, tenta pegar do cookie
    if (!token) {
      const { getToken } = useToken();
      token = getToken();
    }

    if (!token) {
      throw new Error('Token não encontrado');
    }

    const response = await $fetch<AuthResponse>(`${AUTH_SERVICE_URL}/validate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }

  static async logout(): Promise<{ message: string }> {
    const { removeToken } = useToken();
    removeToken();
    
    return { message: 'Logout realizado com sucesso' };
  }
} 