var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController");

router.get("/alertas-calor", kpiController.qtdSetoresEmAlerta);
router.get("/sensacao-termica/:setor", kpiController.sensacaoTermicaAtual);
router.get("/setor-mais-quente", kpiController.setorMaisQuente);

module.exports = router;