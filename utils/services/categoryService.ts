import { useToken } from '~/composables/useToken';

const DATABASE_SERVICE_URL = 'http://localhost:3001/api';

export const categoryService = {
  async getAll() {
    const { getToken } = useToken();
    const token = getToken();
    
    if (!token) {
      throw new Error('Token não encontrado');
    }

    return await $fetch(`${DATABASE_SERVICE_URL}/categorias`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}; 