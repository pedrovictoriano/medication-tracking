const express = require('express');
const router = express.Router();
const fabricantesAPIController = require('../../controllers/api/fabricantesAPIController');

router.get('/', fabricantesAPIController.listarFabricantes);

module.exports = router;