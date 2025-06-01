import { Router } from 'express';
import { UsuarioService } from '../services/usuario.service';

const router = Router();
const usuarioService = new UsuarioService();

router.get('/', async (req, res) => {
  try {
    const usuarios = await usuarioService.findAll();
    res.json(usuarios);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao buscar usuários.'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuario = await usuarioService.findById(id);

    if (!usuario) {
      return res.status(404).json({
        error: 'Usuário não encontrado.'
      });
    }

    res.json(usuario);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao buscar usuário.'
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, telefone, localizacao, bio, avatarUrl } = req.body;

    const usuario = await usuarioService.update(id, {
      nome,
      telefone,
      localizacao,
      bio,
      avatarUrl
    });

    res.json(usuario);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao atualizar usuário.'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await usuarioService.delete(id);
    res.json({ message: 'Usuário deletado com sucesso.' });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao deletar usuário.'
    });
  }
});

export const usuarioRoutes = router; 