import { PrismaClient } from '@prisma/client';
import { defineEventHandler } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try { 
    const categories = await prisma.categoria.findMany({
      include: {
        servicos: {
          include: {
            usuario: true,
            avaliacoes: true,
          },
        },
      },
    });

    const users = await prisma.usuario.findMany({
      include: {
        servicos: true,
        avaliacoes: true,
      },
    });

    return {
      categories, 
      users,
    };
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao buscar dados do banco.',
    });
  } finally {
    await prisma.$disconnect();
  }
});
