import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Limpar dados existentes
  await prisma.avaliacao.deleteMany();
  await prisma.servico.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.usuario.deleteMany();

  // Criar categorias
  const categorias = await Promise.all([
    prisma.categoria.create({
      data: {
        nome: 'Limpeza',
        descricao: 'Serviços de limpeza residencial e comercial'
      }
    }),
    prisma.categoria.create({
      data: {
        nome: 'Manutenção',
        descricao: 'Serviços de manutenção e reparos gerais'
      }
    }),
    prisma.categoria.create({
      data: {
        nome: 'Tecnologia',
        descricao: 'Serviços de informática e tecnologia'
      }
    }),
    prisma.categoria.create({
      data: {
        nome: 'Educação',
        descricao: 'Aulas particulares e reforço escolar'
      }
    })
  ]);

  // Criar usuários
  const senhaHash = await bcrypt.hash('123456', 10);
  const usuarios = await Promise.all([
    prisma.usuario.create({
      data: {
        nome: 'Admin Sistema',
        email: 'admin@conectafortaleza.com',
        senha: senhaHash,
        telefone: '85999999999',
        localizacao: 'Fortaleza, CE',
        bio: 'Administrador do sistema',
        avatarUrl: 'https://ui-avatars.com/api/?name=Admin+Sistema'
      }
    }),
    prisma.usuario.create({
      data: {
        nome: 'João Prestador',
        email: 'joao@email.com',
        senha: senhaHash,
        telefone: '85988888888',
        localizacao: 'Fortaleza, CE',
        bio: 'Profissional com 10 anos de experiência',
        avatarUrl: 'https://ui-avatars.com/api/?name=Joao+Prestador'
      }
    }),
    prisma.usuario.create({
      data: {
        nome: 'Maria Cliente',
        email: 'maria@email.com',
        senha: senhaHash,
        telefone: '85977777777',
        localizacao: 'Fortaleza, CE',
        bio: 'Cliente em busca de serviços de qualidade',
        avatarUrl: 'https://ui-avatars.com/api/?name=Maria+Cliente'
      }
    })
  ]);

  // Criar serviços
  const servicos = await Promise.all([
    prisma.servico.create({
      data: {
        titulo: 'Limpeza Residencial Completa',
        descricao: 'Limpeza completa de residências com produtos de qualidade',
        tipo: 'PRESENCIAL',
        preco: 150.00,
        disponibilidade: new Date(),
        categoriaId: categorias[0].id,
        usuarioId: usuarios[1].id
      }
    }),
    prisma.servico.create({
      data: {
        titulo: 'Manutenção de Computadores',
        descricao: 'Formatação, instalação de programas e limpeza de hardware',
        tipo: 'PRESENCIAL',
        preco: 120.00,
        disponibilidade: new Date(),
        categoriaId: categorias[2].id,
        usuarioId: usuarios[1].id
      }
    }),
    prisma.servico.create({
      data: {
        titulo: 'Aulas de Matemática Online',
        descricao: 'Aulas particulares de matemática para ensino médio',
        tipo: 'ONLINE',
        preco: 80.00,
        disponibilidade: new Date(),
        categoriaId: categorias[3].id,
        usuarioId: usuarios[1].id
      }
    })
  ]);

  // Criar avaliações
  await Promise.all([
    prisma.avaliacao.create({
      data: {
        nota: 5,
        comentario: 'Excelente serviço! Muito profissional.',
        usuarioId: usuarios[2].id,
        servicoId: servicos[0].id
      }
    }),
    prisma.avaliacao.create({
      data: {
        nota: 4,
        comentario: 'Bom serviço, mas poderia ser mais rápido.',
        usuarioId: usuarios[2].id,
        servicoId: servicos[1].id
      }
    }),
    prisma.avaliacao.create({
      data: {
        nota: 5,
        comentario: 'Ótimas aulas, professor muito paciente!',
        usuarioId: usuarios[2].id,
        servicoId: servicos[2].id
      }
    })
  ]);

  console.log('Dados de exemplo criados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 