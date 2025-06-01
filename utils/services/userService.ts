import { useToken } from '~/composables/useToken';
import { User } from '~/types';

const DATABASE_SERVICE_URL = 'http://localhost:3001/api';

export const userService = {
  async update(userId: string, data: Partial<User>) {
    const { getToken } = useToken();
    const token = getToken();
    
    if (!token) {
      throw new Error('Token não encontrado');
    }

    const response = await $fetch(`${DATABASE_SERVICE_URL}/usuarios/${userId}`, {
      method: "PUT",
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response;
  }
}; 