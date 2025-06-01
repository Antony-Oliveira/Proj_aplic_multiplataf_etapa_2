import { useToken } from '~/composables/useToken';
import { useRouter } from 'vue-router';

const DATABASE_SERVICE_URL = 'http://localhost:3001/api';

const handleError = (error: any) => {
  if (error.response?.status === 401) {
    const router = useRouter();
    router.push('/login');
    throw new Error('Sessão expirada. Por favor, faça login novamente.');
  }
  throw error;
};

export const serviceService = {
  async getById(id: string) {
    try {
      const { getToken } = useToken();
      const token = getToken();
      
      if (!token) {
        throw new Error('Token não encontrado');
      }

      return await $fetch(`${DATABASE_SERVICE_URL}/servicos/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      handleError(error);
    }
  },

  async getByUserId(userId: string) {
    try {
      const { getToken } = useToken();
      const token = getToken();
      
      if (!token) {
        throw new Error('Token não encontrado');
      }

      return await $fetch(`${DATABASE_SERVICE_URL}/servicos/usuario/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      handleError(error);
    }
  },

  async create(data: any) {
    try {
      const { getToken } = useToken();
      const token = getToken();
      
      if (!token) {
        throw new Error('Token não encontrado');
      }

      return await $fetch(`${DATABASE_SERVICE_URL}/servicos`, {
        method: "POST",
        body: data,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      handleError(error);
    }
  },

  async update(id: string, data: any) {
    try {
      const { getToken } = useToken();
      const token = getToken();
      
      if (!token) {
        throw new Error('Token não encontrado');
      }

      return await $fetch(`${DATABASE_SERVICE_URL}/servicos/${id}`, {
        method: "PUT",
        body: data,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      handleError(error);
    }
  },

  async delete(id: string) {
    try {
      const { getToken } = useToken();
      const token = getToken();
      
      if (!token) {
        throw new Error('Token não encontrado');
      }

      return await $fetch(`${DATABASE_SERVICE_URL}/servicos/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      handleError(error);
    }
  }
}; 