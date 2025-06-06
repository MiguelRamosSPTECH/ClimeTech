const express = require('express');
const router = express.Router();
const graficoController = require('../controllers/graficoController');

router.get('/:idShow', graficoController.obterDados);

module.exports = router;
