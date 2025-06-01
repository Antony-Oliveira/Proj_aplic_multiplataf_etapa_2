import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ServicoService {
  async findAll() {
    return prisma.servico.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true,
            avatarUrl: true
          }
        },
        categoria: true,
        avaliacoes: {
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
    return prisma.servico.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true,
            avatarUrl: true
          }
        },
        categoria: true,
        avaliacoes: {
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
    titulo: string;
    descricao: string;
    tipo: string;
    preco: number;
    disponibilidade: Date;
    usuarioId: number;
    categoriaId: number;
  }) {
    return prisma.servico.create({
      data,
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true,
            avatarUrl: true
          }
        },
        categoria: true
      }
    });
  }

  async update(id: number, data: {
    titulo?: string;
    descricao?: string;
    tipo?: string;
    preco?: number;
    disponibilidade?: Date;
    categoriaId?: number;
  }) {
    return prisma.servico.update({
      where: { id },
      data,
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true,
            avatarUrl: true
          }
        },
        categoria: true
      }
    });
  }

  async delete(id: number) {
    return prisma.servico.delete({
      where: { id }
    });
  }

  async findByUsuario(usuarioId: number) {
    return prisma.servico.findMany({
      where: { usuarioId },
      include: {
        categoria: true,
        avaliacoes: {
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

  async findByCategoria(categoriaId: number) {
    return prisma.servico.findMany({
      where: { categoriaId },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true,
            avatarUrl: true
          }
        },
        avaliacoes: {
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