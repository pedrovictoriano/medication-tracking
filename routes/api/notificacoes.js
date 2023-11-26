const express = require('express');
const router = express.Router();
const notificacoesAPIController = require('../../controllers/api/notificacoesAPIController');

router.get('/', notificacoesAPIController.listarNotificacoes);
router.post('/visualizar/:id', notificacoesAPIController.atualizarNotificacoes);

module.exports = router;