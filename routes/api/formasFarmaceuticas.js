const express = require('express');
const router = express.Router();
const formasFarmaceuticasAPIController = require('../../controllers/api/formasFarmaceuticasAPIController');

router.get('/', formasFarmaceuticasAPIController.listarFormasFarmaceuticas);

module.exports = router;