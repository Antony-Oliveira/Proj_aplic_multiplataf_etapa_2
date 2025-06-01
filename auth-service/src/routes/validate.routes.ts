import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/validate', async (req, res) => {
  try {
    // Tenta pegar o token do corpo ou do cabeçalho
    const token = req.body.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    res.json({ valid: true, user: decoded });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    console.error('Erro ao validar token:', error);
    res.status(500).json({ error: 'Erro ao validar token' });
  }
});

export const validateRoutes = router; 