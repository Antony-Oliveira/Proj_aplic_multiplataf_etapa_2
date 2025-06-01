import { defineEventHandler } from 'h3';

const DATABASE_SERVICE_URL = 'http://localhost:3001/api';

export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch(`${DATABASE_SERVICE_URL}/categorias`);
    return { categories: response }; 
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
    return { categories: [] }; 
  }
});
