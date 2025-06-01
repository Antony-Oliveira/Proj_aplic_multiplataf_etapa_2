import { Router } from 'express';
import { AuthService } from '../services/auth.service';

const router = Router();
const authService = new AuthService();

router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha, telefone, localizacao } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        error: 'Nome, email e senha são obrigatórios.'
      });
    }

    const result = await authService.register({
      nome,
      email,
      senha,
      telefone,
      localizacao
    });

    res.status(201).json({
      message: 'Usuário registrado com sucesso.',
      user: result.user,
      token: result.token
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Erro ao registrar usuário.'
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        error: 'Email e senha são obrigatórios.'
      });
    }

    const result = await authService.login(email, senha);

    res.json({
      message: 'Login realizado com sucesso.',
      user: result.user,
      token: result.token
    });
  } catch (error: any) {
    res.status(401).json({
      error: error.message || 'Erro ao fazer login.'
    });
  }
});

router.post('/validate', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Token não fornecido.'
      });
    }

    const user = await authService.validateToken(token);
    res.json({ user });
  } catch (error: any) {
    res.status(401).json({
      error: error.message || 'Token inválido.'
    });
  }
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logout realizado com sucesso.' });
});

export const authRoutes = router; 