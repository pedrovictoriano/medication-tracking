const express = require('express');
const router = express.Router();
const medicamentosController = require('../../controllers/views/medicamentosController');

router.get('/', medicamentosController.renderizarMedicamentos);

module.exports = router;