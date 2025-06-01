import { defineEventHandler } from 'h3';
export default defineEventHandler(async (event) => {
  try {
    await clearUserSession(event);

    return {
      message: 'Usuário desconectado com sucesso.',
    };
  } catch (error) {
    console.error('Erro ao desconectar usuário:', error);
    return {
      message: 'Ocorreu um erro ao tentar desconectar.',
    };
  }
});
