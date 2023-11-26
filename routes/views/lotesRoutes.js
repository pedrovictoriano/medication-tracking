const express = require('express');
const router = express.Router();
const lotesController = require('../../controllers/views/lotesController');

router.get('/', lotesController.renderizarLotes);

module.exports = router;