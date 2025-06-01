const DATABASE_URL = process.env.DATABASE_SERVICE_URL || 'http://localhost:3001';

export async function fetchFromDB<T>(endpoint: string, options: RequestInit = {}, token?: string): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${DATABASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro na requisição ao banco de dados');
  }

  return response.json();
}

// Clientes específicos para cada entidade
export const servicoClient = {
  findAll: (token?: string) => fetchFromDB<any[]>('/api/servicos', {}, token),
  findById: (id: number, token?: string) => fetchFromDB<any>(`/api/servicos/${id}`, {}, token),
  create: (data: any, token?: string) => fetchFromDB<any>('/api/servicos', {
    method: 'POST',
    body: JSON.stringify(data),
  }, token),
  update: (id: number, data: any, token?: string) => fetchFromDB<any>(`/api/servicos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, token),
  delete: (id: number, token?: string) => fetchFromDB<any>(`/api/servicos/${id}`, {
    method: 'DELETE',
  }, token),
};

export const categoriaClient = {
  findAll: (token?: string) => fetchFromDB<any[]>('/api/categorias', {}, token),
  findById: (id: number, token?: string) => fetchFromDB<any>(`/api/categorias/${id}`, {}, token),
  create: (data: any, token?: string) => fetchFromDB<any>('/api/categorias', {
    method: 'POST',
    body: JSON.stringify(data),
  }, token),
  update: (id: number, data: any, token?: string) => fetchFromDB<any>(`/api/categorias/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, token),
};

export const avaliacaoClient = {
  findAll: (token?: string) => fetchFromDB<any[]>('/api/avaliacoes', {}, token),
  findById: (id: number, token?: string) => fetchFromDB<any>(`/api/avaliacoes/${id}`, {}, token),
  create: (data: any, token?: string) => fetchFromDB<any>('/api/avaliacoes', {
    method: 'POST',
    body: JSON.stringify(data),
  }, token),
  update: (id: number, data: any, token?: string) => fetchFromDB<any>(`/api/avaliacoes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, token),
};

export const usuarioClient = {
  async get(id: number, token: string) {
    return await $fetch(`${DATABASE_URL}/usuarios/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  async update(id: number, data: any, token: string) {
    return await $fetch(`${DATABASE_URL}/usuarios/${id}`, {
      method: 'PUT',
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}; 