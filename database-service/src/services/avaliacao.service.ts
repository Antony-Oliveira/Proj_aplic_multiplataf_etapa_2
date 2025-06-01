import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AvaliacaoService {
  async findAll() {
    return prisma.avaliacao.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            avatarUrl: true
          }
        },
        servico: {
          include: {
            usuario: {
              select: {
                id: true,
                nome: true,
                avatarUrl: true
              }
            }
          }
        }
      }
    });
  }

  async findById(id: number) {
    return prisma.avaliacao.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            avatarUrl: true
          }
        },
        servico: {
          include: {
            usuario: {
              select: {
                id: true,
                nome: true,
                avatarUrl: true
              }
            }
          }
        }
      }
    });
  }

  async create(data: {
    nota: number;
    comentario?: string;
    usuarioId: number;
    servicoId: number;
  }) {
    return prisma.avaliacao.create({
      data,
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            avatarUrl: true
          }
        },
        servico: true
      }
    });
  }

  async update(id: number, data: {
    nota?: number;
    comentario?: string;
  }) {
    return prisma.avaliacao.update({
      where: { id },
      data,
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            avatarUrl: true
          }
        },
        servico: true
      }
    });
  }

  async delete(id: number) {
    return prisma.avaliacao.delete({
      where: { id }
    });
  }

  async findByServico(servicoId: number) {
    return prisma.avaliacao.findMany({
      where: { servicoId },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            avatarUrl: true
          }
        }
      }
    });
  }

  async findByUsuario(usuarioId: number) {
    return prisma.avaliacao.findMany({
      where: { usuarioId },
      include: {
        servico: {
          include: {
            usuario: {
              select: {
                id: true,
                nome: true,
                avatarUrl: true
              }
            }
          }
        }
      }
    });
  }
} 