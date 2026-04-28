const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

// ==========================================
// ROTAS DE CONSULTA (GET)
// ==========================================

router.get('/', produtosController.listarTodos);
router.get('/nome/:nome', produtosController.buscarPorNome);
router.get('/:id', produtosController.buscarPorId);

// ==========================================
// ROTAS DE MANIPULAÇÃO (POST, PUT, DELETE)
// ==========================================
router.post('/', produtosController.criar);
router.put('/:id', produtosController.atualizar);
router.delete('/:id', produtosController.deletar);

module.exports = router;