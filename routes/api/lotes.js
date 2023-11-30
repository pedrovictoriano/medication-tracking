const express = require('express');
const router = express.Router();
const lotesAPIController = require('../../controllers/api/lotesAPIController');

router.get('/', lotesAPIController.listarLotes);
router.post('/', lotesAPIController.cadastrarLotes);
router.put('/:id', lotesAPIController.atualizarLotes);
router.get('/:loteId', lotesAPIController.obterLote);

module.exports = router;