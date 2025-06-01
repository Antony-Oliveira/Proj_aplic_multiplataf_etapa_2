const DATABASE_SERVICE_URL = process.env.DATABASE_SERVICE_URL || 'http://localhost:3001/api';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  localizacao?: string;
  bio?: string;
  avatarUrl?: string;
  criadoEm: Date;
  atualizadoEm: Date;
  servicos?: Servico[];
  avaliacoes?: Avaliacao[];
}

export interface Servico {
  id: number;
  titulo: string;
  descricao: string;
  tipo: string;
  preco: number;
  disponibilidade: Date;
  criadoEm: Date;
  atualizadoEm: Date;
  usuarioId: number;
  categoriaId: number;
  usuario?: Usuario;
  categoria?: Categoria;
  avaliacoes?: Avaliacao[];
}

export interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  criadoEm: Date;
  atualizadoEm: Date;
  servicos?: Servico[];
}

export interface Avaliacao {
  id: number;
  nota: number;
  comentario: string;
  criadoEm: Date;
  atualizadoEm: Date;
  usuarioId: number;
  servicoId: number;
  usuario?: Usuario;
  servico?: Servico;
}

export class DatabaseService {
  // Serviços
  static async getServicos(): Promise<Servico[]> {
    return await $fetch(`${DATABASE_SERVICE_URL}/servicos`);
  }

  static async getServico(id: number): Promise<Servico> {
    return await $fetch(`${DATABASE_SERVICE_URL}/servicos/${id}`);
  }

  static async getServicosByUsuario(usuarioId: number): Promise<Servico[]> {
    return await $fetch(`${DATABASE_SERVICE_URL}/servicos/usuario/${usuarioId}`);
  }

  static async getServicosByCategoria(categoriaId: number): Promise<Servico[]> {
    return await $fetch(`${DATABASE_SERVICE_URL}/servicos/categoria/${categoriaId}`);
  }

  static async createServico(data: Omit<Servico, 'id' | 'criadoEm' | 'usuario' | 'categoria' | 'avaliacoes'> & { usuarioId: number; categoriaId: number }): Promise<Servico> {
    return await $fetch(`${DATABASE_SERVICE_URL}/servicos`, {
      method: 'POST',
      body: data
    });
  }

  static async updateServico(id: number, data: Partial<Omit<Servico, 'id' | 'criadoEm' | 'usuario' | 'categoria' | 'avaliacoes'>>): Promise<Servico> {
    return await $fetch(`${DATABASE_SERVICE_URL}/servicos/${id}`, {
      method: 'PUT',
      body: data
    });
  }

  static async deleteServico(id: number): Promise<{ message: string }> {
    return await $fetch(`${DATABASE_SERVICE_URL}/servicos/${id}`, {
      method: 'DELETE'
    });
  }

  // Categorias
  static async getCategorias(): Promise<Categoria[]> {
    return await $fetch(`${DATABASE_SERVICE_URL}/categorias`);
  }

  static async getCategoria(id: number): Promise<Categoria> {
    return await $fetch(`${DATABASE_SERVICE_URL}/categorias/${id}`);
  }

  static async createCategoria(data: Omit<Categoria, 'id' | 'servicos'>): Promise<Categoria> {
    return await $fetch(`${DATABASE_SERVICE_URL}/categorias`, {
      method: 'POST',
      body: data
    });
  }

  static async updateCategoria(id: number, data: Partial<Omit<Categoria, 'id' | 'servicos'>>): Promise<Categoria> {
    return await $fetch(`${DATABASE_SERVICE_URL}/categorias/${id}`, {
      method: 'PUT',
      body: data
    });
  }

  static async deleteCategoria(id: number): Promise<{ message: string }> {
    return await $fetch(`${DATABASE_SERVICE_URL}/categorias/${id}`, {
      method: 'DELETE'
    });
  }

  // Avaliações
  static async getAvaliacoes(): Promise<Avaliacao[]> {
    return await $fetch(`${DATABASE_SERVICE_URL}/avaliacoes`);
  }

  static async getAvaliacao(id: number): Promise<Avaliacao> {
    return await $fetch(`${DATABASE_SERVICE_URL}/avaliacoes/${id}`);
  }

  static async getAvaliacoesByServico(servicoId: number): Promise<Avaliacao[]> {
    return await $fetch(`${DATABASE_SERVICE_URL}/avaliacoes/servico/${servicoId}`);
  }

  static async getAvaliacoesByUsuario(usuarioId: number): Promise<Avaliacao[]> {
    return await $fetch(`${DATABASE_SERVICE_URL}/avaliacoes/usuario/${usuarioId}`);
  }

  static async createAvaliacao(data: { nota: number; comentario?: string; usuarioId: number; servicoId: number }): Promise<Avaliacao> {
    return await $fetch(`${DATABASE_SERVICE_URL}/avaliacoes`, {
      method: 'POST',
      body: data
    });
  }

  static async updateAvaliacao(id: number, data: { nota?: number; comentario?: string }): Promise<Avaliacao> {
    return await $fetch(`${DATABASE_SERVICE_URL}/avaliacoes/${id}`, {
      method: 'PUT',
      body: data
    });
  }

  static async deleteAvaliacao(id: number): Promise<{ message: string }> {
    return await $fetch(`${DATABASE_SERVICE_URL}/avaliacoes/${id}`, {
      method: 'DELETE'
    });
  }

  // Usuários (apenas operações permitidas)
  static async getUsuario(id: number): Promise<Usuario> {
    return await $fetch(`${DATABASE_SERVICE_URL}/usuarios/${id}`);
  }

  static async updateUsuario(id: number, data: Partial<Omit<Usuario, 'id' | 'email' | 'criadoEm'>>): Promise<Usuario> {
    return await $fetch(`${DATABASE_SERVICE_URL}/usuarios/${id}`, {
      method: 'PUT',
      body: data
    });
  }

  static async createService(data: Partial<Servico>, token: string): Promise<Servico> {
    const response = await $fetch<Servico>(`${DATABASE_SERVICE_URL}/servicos`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }

  static async getService(id: number, token: string): Promise<Servico> {
    const response = await $fetch<Servico>(`${DATABASE_SERVICE_URL}/servicos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }

  static async updateService(id: number, data: Partial<Servico>, token: string): Promise<Servico> {
    const response = await $fetch<Servico>(`${DATABASE_SERVICE_URL}/servicos/${id}`, {
      method: 'PUT',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }

  static async deleteService(id: number, token: string): Promise<void> {
    await $fetch(`${DATABASE_SERVICE_URL}/servicos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  static async getCategories(token: string): Promise<Categoria[]> {
    const response = await $fetch<Categoria[]>(`${DATABASE_SERVICE_URL}/categorias`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }

  static async getCategory(id: number, token: string): Promise<Categoria> {
    const response = await $fetch<Categoria>(`${DATABASE_SERVICE_URL}/categorias/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }

  static async createCategory(data: Partial<Categoria>, token: string): Promise<Categoria> {
    const response = await $fetch<Categoria>(`${DATABASE_SERVICE_URL}/categorias`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }

  static async createReview(data: Partial<Avaliacao>, token: string): Promise<Avaliacao> {
    const response = await $fetch<Avaliacao>(`${DATABASE_SERVICE_URL}/avaliacoes`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }

  static async getReview(id: number, token: string): Promise<Avaliacao> {
    const response = await $fetch<Avaliacao>(`${DATABASE_SERVICE_URL}/avaliacoes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }

  static async updateReview(id: number, data: Partial<Avaliacao>, token: string): Promise<Avaliacao> {
    const response = await $fetch<Avaliacao>(`${DATABASE_SERVICE_URL}/avaliacoes/${id}`, {
      method: 'PUT',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }

  static async deleteReview(id: number, token: string): Promise<void> {
    await $fetch(`${DATABASE_SERVICE_URL}/avaliacoes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  static async getUser(id: number, token: string): Promise<Usuario> {
    const response = await $fetch<Usuario>(`${DATABASE_SERVICE_URL}/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }

  static async updateUser(id: number, data: Partial<Usuario>, token: string): Promise<Usuario> {
    const response = await $fetch<Usuario>(`${DATABASE_SERVICE_URL}/usuarios/${id}`, {
      method: 'PUT',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  }
} 