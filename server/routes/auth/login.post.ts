import { AuthService, LoginData } from '~/server/utils/services/auth.service';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<LoginData>(event);
    const response = await AuthService.login(body);
    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro ao fazer login.'
    });
  }
}); 