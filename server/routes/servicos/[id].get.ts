import { DatabaseService } from '~/server/utils/services/database.service';

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '');
    
    if (!id || isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: 'ID do serviço é obrigatório.'
      });
    }

    const servico = await DatabaseService.getServico(id);
    return servico;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro ao buscar serviço.'
    });
  }
}); 