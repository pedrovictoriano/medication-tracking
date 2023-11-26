const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/views/dashboardController');

router.get('/', dashboardController.renderizarDashboard);

module.exports = router;