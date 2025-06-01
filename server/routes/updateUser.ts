import { User } from "#auth-utils";
import { isAuthed } from "../../helpers/auth";

const DATABASE_SERVICE_URL = 'http://localhost:3001/api';

interface UserResponse {
    id: number;
    nome: string;
    email: string;
    telefone?: string;
    localizacao?: string;
    bio?: string;
    avatarUrl?: string;
    criadoEm: Date;
}

export default defineEventHandler(async (event) => {
    await isAuthed(event);
    const userId = (await getUserSession(event)).user!.id;
    const body = await readBody(event); 

    try {
        const response = await $fetch<UserResponse>(`${DATABASE_SERVICE_URL}/usuarios/${userId}`, {
            method: 'PUT',
            body,
            headers: {
                'Authorization': event.headers.get('Authorization') || ''
            }
        });

        const safeUser: User = {
            ...response,
            senha: undefined,
            telefone: response.telefone || undefined,
            localizacao: response.localizacao || undefined,
            bio: response.bio || undefined,
            avatarUrl: response.avatarUrl || undefined,
        };

        await replaceUserSession(event, {
            user: safeUser, 
        });

        return { message: "Usuário atualizado com sucesso", user: safeUser };
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        throw createError({ statusCode: 500, statusMessage: "Erro ao atualizar usuário" });
    }
});
