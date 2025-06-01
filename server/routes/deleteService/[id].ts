import { defineEventHandler, createError } from "h3";
import { servicoClient } from "../../utils/database-client";

export default defineEventHandler(async (event) => {
  try {
    const user = (await getUserSession(event)).user;
    if (!user) {
      throw createError({ statusCode: 401, statusMessage: "Usuário não autenticado." });
    }

    const { id } = event.context.params as any;

    const service = await servicoClient.findById(parseInt(id));
    if (!service || service.usuarioId !== user.id) {
      return { message: "Serviço não encontrado." };
    }

    await servicoClient.delete(parseInt(id));

    return { message: "Serviço excluído com sucesso." };
  } catch (error) {
    console.error("Erro ao excluir serviço:", error);
    throw createError({ statusCode: 500, statusMessage: "Erro ao excluir serviço." });
  }
});
