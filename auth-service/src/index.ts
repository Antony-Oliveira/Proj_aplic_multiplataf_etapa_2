import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { authRoutes } from './routes/auth.routes';
import { validateRoutes } from './routes/validate.routes';
import chalk from 'chalk';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware de logging
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Log ao receber a requisição
  console.log(chalk.cyan(`[${new Date().toISOString()}] ${req.method} ${req.url}`));
  console.log(chalk.gray('Headers:'), JSON.stringify(req.headers, null, 2));
  if (req.body && Object.keys(req.body).length > 0) {
    // Remove senha dos logs por segurança
    const safeBody = { ...req.body };
    if (safeBody.password) safeBody.password = '[REDACTED]';
    console.log(chalk.gray('Body:'), JSON.stringify(safeBody, null, 2));
  }

  // Intercepta a resposta para logar quando finalizar
  const oldSend = res.send;
  res.send = function(data: any) {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? chalk.red : chalk.green;
    
    console.log(statusColor(`[${new Date().toISOString()}] ${req.method} ${req.url} - Status: ${res.statusCode} - ${duration}ms`));
    
    if (res.statusCode >= 400) {
      console.log(chalk.red('Error Response:'), typeof data === 'string' ? data : JSON.stringify(data, null, 2));
    }
    
    return oldSend.call(res, data);
  };

  next();
});

// Middleware de erro global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(chalk.red('Error:'), err);
  console.error(chalk.red('Stack:'), err.stack);
  
  res.status(500).json({
    error: {
      message: err.message || 'Erro interno no servidor',
      status: 500,
      timestamp: new Date().toISOString(),
      path: req.url,
      method: req.method
    }
  });
});

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/auth', validateRoutes);

app.listen(PORT, () => {
  console.log(chalk.blue(`🚀 Serviço de Autenticação rodando na porta ${PORT}`));
}); 