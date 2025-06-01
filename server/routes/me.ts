import { User } from "#auth-utils";

const DATABASE_SERVICE_URL = 'http://localhost:3001/api';

export default defineEventHandler(async (event) => {
  const {id} = await readBody(event);
  if (event.method !== "POST") {
    throw createError({
      statusCode: 405,
      message: "Método não permitido. Apenas POST é aceito.",
    });
  }

  try {
    const response = await $fetch(`${DATABASE_SERVICE_URL}/usuarios/${id}`, {
      headers: {
        'Authorization': event.headers.get('Authorization') || ''
      }
    });

    if (!response) {
      throw createError({ statusCode: 404, message: "Usuário não encontrado" });
    }

    return { user: response };
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw createError({ statusCode: 500, message: "Erro interno no servidor" });
  }
});
