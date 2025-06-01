import { Router } from 'express';
import { CategoriaService } from '../services/categoria.service';

const router = Router();
const categoriaService = new CategoriaService();

router.get('/', async (req, res) => {
  try {
    const categorias = await categoriaService.findAll();
    res.json(categorias);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao buscar categorias.'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const categoria = await categoriaService.findById(id);

    if (!categoria) {
      return res.status(404).json({
        error: 'Categoria não encontrada.'
      });
    }

    res.json(categoria);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao buscar categoria.'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({
        error: 'Nome é obrigatório.'
      });
    }

    const categoria = await categoriaService.create({
      nome,
      descricao
    });

    res.status(201).json(categoria);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao criar categoria.'
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, descricao } = req.body;

    const categoria = await categoriaService.update(id, {
      nome,
      descricao
    });

    res.json(categoria);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao atualizar categoria.'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await categoriaService.delete(id);
    res.json({ message: 'Categoria deletada com sucesso.' });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao deletar categoria.'
    });
  }
});

export const categoriaRoutes = router; 