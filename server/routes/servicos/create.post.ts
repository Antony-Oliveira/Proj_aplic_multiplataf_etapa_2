import { AuthService } from '~/server/utils/services/auth.service';
import { DatabaseService } from '~/server/utils/services/database.service';

export default defineEventHandler(async (event) => {
  try {
    // Valida o token e obtém o usuário
    const token = getCookie(event, 'token');
    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'Não autorizado.'
      });
    }

    const { user } = await AuthService.validateToken();

    // Cria o serviço
    const body = await readBody(event);
    const servico = await DatabaseService.createServico({
      ...body,
      usuarioId: user.id
    });

    return servico;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro ao criar serviço.'
    });
  }
}); 