const express = require('express');
const router = express.Router();
const estoqueAPIController = require('../../controllers/api/estoqueAPIController');

router.get('/', estoqueAPIController.listarEstoque);
router.post('/', estoqueAPIController.cadastrarEstoque);

module.exports = router;