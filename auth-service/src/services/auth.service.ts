import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta';

export class AuthService {
  async register(data: {
    nome: string;
    email: string;
    senha: string;
    telefone?: string;
    localizacao?: string;
  }) {
    const existingUser = await prisma.usuario.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('Email já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(data.senha, 10);

    const user = await prisma.usuario.create({
      data: {
        ...data,
        senha: hashedPassword
      },
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

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { user, token };
  }

  async login(email: string, senha: string) {
    const user = await prisma.usuario.findUnique({
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
        senha: true,
        telefone: true,
        localizacao: true,
        bio: true,
        avatarUrl: true,
        criadoEm: true
      }
    });

    if (!user) {
      throw new Error('Email ou senha inválidos.');
    }

    const validPassword = await bcrypt.compare(senha, user.senha);

    if (!validPassword) {
      throw new Error('Email ou senha inválidos.');
    }

    const { senha: _, ...userWithoutPassword } = user;

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { user: userWithoutPassword, token };
  }

  async validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        userId: number;
        email: string;
      };

      const user = await prisma.usuario.findUnique({
        where: { id: decoded.userId },
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

      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      return user;
    } catch (error) {
      throw new Error('Token inválido.');
    }
  }
} 