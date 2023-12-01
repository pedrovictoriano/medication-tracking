const express = require('express');
const router = express.Router();
const tipoMovimentacoesAPIController = require('../../controllers/api/tipoMovimentacoesAPIController');

router.get('/', tipoMovimentacoesAPIController.listarTiposMovimentacoes);

module.exports = router;