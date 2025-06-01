import { defineEventHandler, createError, H3Event } from 'h3';

export const isAuthed = (async (event : H3Event) => {
  const user = (await getUserSession(event)).user; 

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Usuário não autenticado',
    });
  }

//   return event;
});
