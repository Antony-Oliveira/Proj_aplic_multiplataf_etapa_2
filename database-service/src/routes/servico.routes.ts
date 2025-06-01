import { Router } from 'express';
import { ServicoService } from '../services/servico.service';

const router = Router();
const servicoService = new ServicoService();

router.get('/', async (req, res) => {
  try {
    const servicos = await servicoService.findAll();
    res.json(servicos);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao buscar serviços.'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const servico = await servicoService.findById(id);

    if (!servico) {
      return res.status(404).json({
        error: 'Serviço não encontrado.'
      });
    }

    res.json(servico);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao buscar serviço.'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      titulo,
      descricao,
      tipo,
      preco,
      disponibilidade,
      usuarioId,
      categoriaId
    } = req.body;

    const servico = await servicoService.create({
      titulo,
      descricao,
      tipo,
      preco,
      disponibilidade: new Date(disponibilidade),
      usuarioId,
      categoriaId
    });

    res.status(201).json(servico);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao criar serviço.'
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      titulo,
      descricao,
      tipo,
      preco,
      disponibilidade,
      categoriaId
    } = req.body;

    const servico = await servicoService.update(id, {
      titulo,
      descricao,
      tipo,
      preco,
      disponibilidade: disponibilidade ? new Date(disponibilidade) : undefined,
      categoriaId
    });

    res.json(servico);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao atualizar serviço.'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await servicoService.delete(id);
    res.json({ message: 'Serviço deletado com sucesso.' });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao deletar serviço.'
    });
  }
});

router.get('/usuario/:usuarioId', async (req, res) => {
  try {
    const usuarioId = parseInt(req.params.usuarioId);
    const servicos = await servicoService.findByUsuario(usuarioId);
    res.json(servicos);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao buscar serviços do usuário.'
    });
  }
});

router.get('/categoria/:categoriaId', async (req, res) => {
  try {
    const categoriaId = parseInt(req.params.categoriaId);
    const servicos = await servicoService.findByCategoria(categoriaId);
    res.json(servicos);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao buscar serviços da categoria.'
    });
  }
});

export const servicoRoutes = router; 