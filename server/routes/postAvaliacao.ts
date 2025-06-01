import { defineEventHandler, readBody, createError } from "h3";
import { AuthService } from "../utils/services/auth.service";
import { avaliacaoClient } from "../utils/database-client";

const DATABASE_SERVICE_URL = process.env.DATABASE_SERVICE_URL || 'http://localhost:3001/api';

export default defineEventHandler(async (event) => {
  try {
    const token = event.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      throw createError({ statusCode: 401, statusMessage: "Token não fornecido." });
    }

    // Validar o token e obter o usuário
    const userData = await AuthService.validateToken(token);
    if (!userData.user) {
      throw createError({ statusCode: 401, statusMessage: "Usuário não autenticado." });
    }

    const body = await readBody(event);
    const { servicoId, nota, comentario } = body;

    if (!servicoId || nota === undefined || !comentario) {
      throw createError({ statusCode: 400, statusMessage: "Campos obrigatórios faltando." });
    }

    const novaAvaliacao = await avaliacaoClient.create({
      servicoId,
      usuarioId: userData.user.id,
      nota,
      comentario,
    }, token);

    return { success: true, novaAvaliacao };
  } catch (error: any) {
    console.error("Erro ao enviar avaliação:", error);
    throw createError({ 
      statusCode: error.statusCode || 500, 
      statusMessage: error.message || "Erro ao enviar avaliação." 
    });
  }
});
