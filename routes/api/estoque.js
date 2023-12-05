const express = require('express');
const router = express.Router();
const estoqueAPIController = require('../../controllers/api/estoqueAPIController');

router.get('/', estoqueAPIController.listarEstoque);
router.post('/', estoqueAPIController.cadastrarEstoque);
router.post('/itens', estoqueAPIController.cadastrarEstoqueItens);

module.exports = router;