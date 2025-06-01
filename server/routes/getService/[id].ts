import { defineEventHandler, createError } from "h3";
import { DatabaseService } from "../../utils/services/database.service";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as any;

    const servico = await DatabaseService.getServico(parseInt(id));

    if (!servico) {
      throw createError({
        statusCode: 404,
        message: "Serviço não encontrado"
      });
    }

    if (!servico.usuario || !servico.categoria) {
      throw createError({
        statusCode: 500,
        message: "Dados do serviço incompletos"
      });
    }

    return { servico };
  } catch (error: any) {
    console.error("Erro ao buscar serviço:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Erro ao buscar serviço"
    });
  }
});
