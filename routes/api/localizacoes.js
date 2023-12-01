const express = require('express');
const router = express.Router();
const localizacoesAPIController = require('../../controllers/api/localizacoesAPIController');

router.get('/', localizacoesAPIController.listarLocalizacoes);

module.exports = router;