import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { usuarioRoutes } from './routes/usuario.routes';
import { servicoRoutes } from './routes/servico.routes';
import { categoriaRoutes } from './routes/categoria.routes';
import { avaliacaoRoutes } from './routes/avaliacao.routes';
import { authMiddleware } from './middleware/auth.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração do CORS - deve vir antes de qualquer middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Middleware de logging
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Log ao receber a requisição
  console.log(chalk.cyan(`[${new Date().toISOString()}] ${req.method} ${req.url}`));
  console.log(chalk.gray('Headers:'), JSON.stringify(req.headers, null, 2));
  
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(chalk.gray('Body:'), JSON.stringify(req.body, null, 2));
  }

  // Intercepta a resposta para logar quando finalizar
  const oldSend = res.send;
  res.send = function(data: any) {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? chalk.red : chalk.green;
    
    console.log(statusColor(`[${new Date().toISOString()}] ${req.method} ${req.url} - Status: ${res.statusCode} - ${duration}ms`));
    
    if (res.statusCode >= 400) {
      console.log(chalk.red('Error Response:'), typeof data === 'string' ? data : JSON.stringify(data, null, 2));
    } else if (data) {
      // Log resumido do response para sucesso
      const summary = typeof data === 'string' ? data : JSON.stringify(data, null, 2).slice(0, 200) + '...';
      console.log(chalk.green('Response Summary:'), summary);
    }
    
    return oldSend.call(res, data);
  };

  next();
});

const publicRoutes = [
  { path: '/api/servicos', method: 'GET' },
  { path: '/api/categorias', method: 'GET' },
  { path: '/api/servicos/:id', method: 'GET' }
];

// Middleware para verificar rotas públicas
app.use((req: Request, res: Response, next: NextFunction) => {
  // Se for uma requisição OPTIONS, permite passar
  if (req.method === 'OPTIONS') {
    return next();
  }

  const isPublicRoute = publicRoutes.some(route => {
    // Verifica se é uma rota com parâmetro dinâmico
    if (route.path.includes(':')) {
      const routeRegex = new RegExp('^' + route.path.replace(/:[\w-]+/g, '[\\w-]+') + '$');
      return routeRegex.test(req.path) && (!route.method || route.method === req.method);
    }
    // Verifica rota exata
    return route.path === req.path && (!route.method || route.method === req.method);
  });

  if (isPublicRoute) {
    console.log(chalk.blue(`[${new Date().toISOString()}] Rota pública acessada: ${req.method} ${req.path}`));
    next();
  } else {
    console.log(chalk.yellow(`[${new Date().toISOString()}] Rota protegida acessada: ${req.method} ${req.path}`));
    authMiddleware(req, res, next);
  }
});

// Middleware de erro global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(chalk.red('Error:'), err);
  console.error(chalk.red('Stack:'), err.stack);
  
  // Tratamento específico para erros do Prisma
  if (err.name === 'PrismaClientKnownRequestError') {
    console.error(chalk.yellow('Prisma Error Details:'), JSON.stringify(err, null, 2));
  }
  
  res.status(500).json({
    error: {
      message: err.message || 'Erro interno no servidor',
      status: 500,
      timestamp: new Date().toISOString(),
      path: req.url,
      method: req.method,
      type: err.name || 'UnknownError'
    }
  });
});

// Rotas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);

app.listen(PORT, () => {
  console.log(chalk.blue(`🚀 Serviço de Banco de Dados rodando na porta ${PORT}`));
  console.log(chalk.green('Rotas públicas:'));
  publicRoutes.forEach(route => {
    console.log(chalk.green(`- ${route.method || 'ALL'} ${route.path}`));
  });
}); 