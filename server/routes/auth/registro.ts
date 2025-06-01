import { defineEventHandler, readBody } from 'h3';
import { authClient } from '../../utils/auth-client';

export default defineEventHandler(async (event) => {
    try {
        if (event.method !== 'POST') {
            return {
                status: 405,
                message: 'Método não permitido.',
            };
        }
        const { nome, email, senha, telefone, localizacao } = await readBody(event);

        if (!nome || !email || !senha) {
            return {
                status: 400,
                message: 'Nome, email e senha são obrigatórios.',
            };
        }

        const result = await authClient.register({
            nome,
            email,
            senha,
            telefone,
            localizacao,
        });

        return {
            success: true,
            status: 201,
            message: 'Usuário registrado com sucesso!',
            user: result.user,
        };
    } catch (error: any) {
        return {
            success: false,
            status: error.status || 500,
            message: error.message || 'Erro ao registrar usuário.',
        };
    }
});
