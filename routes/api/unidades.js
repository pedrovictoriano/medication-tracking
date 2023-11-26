const express = require('express');
const router = express.Router();
const UnidadesAPIController = require('../../controllers/api/UnidadesAPIController');

router.get('/', UnidadesAPIController.listarUnidades);

module.exports = router;