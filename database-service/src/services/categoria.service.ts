import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CategoriaService {
  async findAll() {
    return prisma.categoria.findMany({
      include: {
        servicos: {
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
    return prisma.categoria.findUnique({
      where: { id },
      include: {
        servicos: {
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
    nome: string;
    descricao?: string;
  }) {
    return prisma.categoria.create({
      data,
      include: {
        servicos: true
      }
    });
  }

  async update(id: number, data: {
    nome?: string;
    descricao?: string;
  }) {
    return prisma.categoria.update({
      where: { id },
      data,
      include: {
        servicos: true
      }
    });
  }

  async delete(id: number) {
    return prisma.categoria.delete({
      where: { id }
    });
  }
} 