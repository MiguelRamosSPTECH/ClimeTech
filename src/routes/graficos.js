const express = require('express');
const router = express.Router();
const graficoController = require('../controllers/graficoController');

router.get('/grafico/:setor', graficoController.obterDados);

module.exports = router;
