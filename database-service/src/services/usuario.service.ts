import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UsuarioService {
  async findAll() {
    return prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        localizacao: true,
        bio: true,
        avatarUrl: true,
        criadoEm: true,
        servicos: true,
        avaliacoes: true
      }
    });
  }

  async findById(id: number) {
    return prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        localizacao: true,
        bio: true,
        avatarUrl: true,
        criadoEm: true,
        servicos: true,
        avaliacoes: true
      }
    });
  }

  async update(id: number, data: {
    nome?: string;
    telefone?: string;
    localizacao?: string;
    bio?: string;
    avatarUrl?: string;
  }) {
    return prisma.usuario.update({
      where: { id },
      data,
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        localizacao: true,
        bio: true,
        avatarUrl: true,
        criadoEm: true
      }
    });
  }

  async delete(id: number) {
    return prisma.usuario.delete({
      where: { id }
    });
  }
} 