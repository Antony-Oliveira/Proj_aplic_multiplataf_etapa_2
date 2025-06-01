const AUTH_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3002';

export async function fetchFromAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${AUTH_URL}/api/auth${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro na requisição ao serviço de autenticação');
  }

  return response.json();
}

export const authClient = {
  register: (data: {
    nome: string;
    email: string;
    senha: string;
    telefone?: string;
    localizacao?: string;
  }) => fetchFromAuth<any>('/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  login: (data: { email: string; senha: string }) => fetchFromAuth<any>('/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  validate: () => fetchFromAuth<any>('/validate', {
    method: 'POST',
  }),

  logout: () => fetchFromAuth<any>('/logout', {
    method: 'POST',
  }),
}; 