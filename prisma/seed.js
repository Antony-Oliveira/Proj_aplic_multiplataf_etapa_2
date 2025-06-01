import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Criação de Categorias
  const categorias = await prisma.categoria.createMany({
    data: [
      { nome: 'Jardinagem', descricao: 'Serviços de jardinagem e paisagismo.' },
      { nome: 'Aulas Particulares', descricao: 'Aulas e reforço escolar.' },
      { nome: 'Consertos Domésticos', descricao: 'Pequenos consertos e reparos.' },
      { nome: 'Cuidados Pessoais', descricao: 'Serviços como cabeleireiro, manicure, etc.' },
      { nome: 'Transporte', descricao: 'Serviços de transporte e mudanças.' },
    ],
  });
  console.log(`Categorias criadas: ${categorias.count}`);

  // Mapeamento das Categorias
  const categoriaMap = await prisma.categoria.findMany();
  const getCategoriaId = (nome) => categoriaMap.find((c) => c.nome === nome)?.id;

  // Criação de Usuários
  const usuarios = await prisma.usuario.createMany({
    data: [
      {
        nome: 'João Silva',
        email: 'joao1@example.com',
        senha: 'hashed-password', 
        telefone: '123456789',
        localizacao: 'Fortaleza',
        bio: 'Adoro ajudar com pequenos serviços.',
        avatarUrl: 'https://via.placeholder.com/150',
      },
      {
        nome: 'Maria Oliveira',
        email: 'maria1@example.com',
        senha: 'hashed-password', 
        telefone: '987654321',
        localizacao: 'Fortaleza',
        bio: 'Especialista em aulas de matemática.',
        avatarUrl: 'https://via.placeholder.com/150',
      },
      {
        nome: 'Carlos Mendes',
        email: 'carlo1s@example.com',
        senha: 'hashed-password', 
        telefone: '1122334455',
        localizacao: 'São Paulo',
        bio: 'Faço pequenos reparos e consertos domésticos.',
        avatarUrl: 'https://via.placeholder.com/150',
      },
      {
        nome: 'Ana Souza',
        email: 'ana1@example.com',
        senha: 'hashed-password', 
        telefone: '9988776655',
        localizacao: 'Rio de Janeiro',
        bio: 'Cabeleireira com 10 anos de experiência.',
        avatarUrl: 'https://via.placeholder.com/150',
      },
    ],
  });
  console.log(`Usuários criados: ${usuarios.count}`);

  // Mapeamento dos Usuários
  const usuarioMap = await prisma.usuario.findMany();
  const getUsuarioId = (nome) => usuarioMap.find((u) => u.nome === nome)?.id;

  // Criação de Serviços
  const servicos = await prisma.servico.createMany({
    data: [
      {
        titulo: 'Manutenção de Jardim',
        descricao: 'Cuido do seu jardim, podas e limpeza.',
        tipo: 'oferta',
        categoriaId: getCategoriaId('Jardinagem'),
        preco: 50,
        disponibilidade: new Date(),
        usuarioId: getUsuarioId('João Silva'),
      },
      {
        titulo: 'Aula de Matemática',
        descricao: 'Aulas particulares para ensino médio.',
        tipo: 'oferta',
        categoriaId: getCategoriaId('Aulas Particulares'),
        preco: 70,
        disponibilidade: new Date(),
        usuarioId: getUsuarioId('Maria Oliveira'),
      },
      {
        titulo: 'Reparos Elétricos',
        descricao: 'Troca de lâmpadas, instalação de tomadas e outros reparos elétricos.',
        tipo: 'oferta',
        categoriaId: getCategoriaId('Consertos Domésticos'),
        preco: 100,
        disponibilidade: new Date(),
        usuarioId: getUsuarioId('Carlos Mendes'),
      },
      {
        titulo: 'Corte de Cabelo',
        descricao: 'Corte de cabelo masculino e feminino.',
        tipo: 'oferta',
        categoriaId: getCategoriaId('Cuidados Pessoais'),
        preco: 30,
        disponibilidade: new Date(),
        usuarioId: getUsuarioId('Ana Souza'),
      },
    ],
  });
  console.log(`Serviços criados: ${servicos.count}`);

  // Mapeamento dos Serviços
  const servicoMap = await prisma.servico.findMany();
  const getServicoId = (titulo) => servicoMap.find((s) => s.titulo === titulo)?.id;

  // Criação de Avaliações
  await prisma.avaliacao.createMany({
    data: [
      {
        nota: 5,
        comentario: 'Excelente trabalho, muito atencioso.',
        usuarioId: getUsuarioId('Maria Oliveira'),
        servicoId: getServicoId('Manutenção de Jardim'),
      },
      {
        nota: 4,
        comentario: 'Boa aula, muito paciente.',
        usuarioId: getUsuarioId('João Silva'),
        servicoId: getServicoId('Aula de Matemática'),
      },
      {
        nota: 3,
        comentario: 'O serviço foi bom, mas poderia ser mais rápido.',
        usuarioId: getUsuarioId('Ana Souza'),
        servicoId: getServicoId('Reparos Elétricos'),
      },
      {
        nota: 5,
        comentario: 'Muito profissional, corte perfeito!',
        usuarioId: getUsuarioId('Carlos Mendes'),
        servicoId: getServicoId('Corte de Cabelo'),
      },
    ],
  });
  console.log('Avaliações criadas.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
