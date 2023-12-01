const express = require('express');
const router = express.Router();
const estoqueController = require('../../controllers/views/estoqueController');

router.get('/', estoqueController.renderizarEstoqe);

module.exports = router;