import { Router } from 'express';
import { AvaliacaoService } from '../services/avaliacao.service';

const router = Router();
const avaliacaoService = new AvaliacaoService();

router.get('/', async (req, res) => {
  try {
    const avaliacoes = await avaliacaoService.findAll();
    res.json(avaliacoes);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao buscar avaliações.'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const avaliacao = await avaliacaoService.findById(id);

    if (!avaliacao) {
      return res.status(404).json({
        error: 'Avaliação não encontrada.'
      });
    }

    res.json(avaliacao);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao buscar avaliação.'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nota, comentario, usuarioId, servicoId } = req.body;

    if (!nota || !usuarioId || !servicoId) {
      return res.status(400).json({
        error: 'Nota, usuário e serviço são obrigatórios.'
      });
    }

    const avaliacao = await avaliacaoService.create({
      nota,
      comentario,
      usuarioId,
      servicoId
    });

    res.status(201).json(avaliacao);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao criar avaliação.'
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nota, comentario } = req.body;

    const avaliacao = await avaliacaoService.update(id, {
      nota,
      comentario
    });

    res.json(avaliacao);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao atualizar avaliação.'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await avaliacaoService.delete(id);
    res.json({ message: 'Avaliação deletada com sucesso.' });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao deletar avaliação.'
    });
  }
});

router.get('/servico/:servicoId', async (req, res) => {
  try {
    const servicoId = parseInt(req.params.servicoId);
    const avaliacoes = await avaliacaoService.findByServico(servicoId);
    res.json(avaliacoes);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao buscar avaliações do serviço.'
    });
  }
});

router.get('/usuario/:usuarioId', async (req, res) => {
  try {
    const usuarioId = parseInt(req.params.usuarioId);
    const avaliacoes = await avaliacaoService.findByUsuario(usuarioId);
    res.json(avaliacoes);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao buscar avaliações do usuário.'
    });
  }
});

export const avaliacaoRoutes = router; 