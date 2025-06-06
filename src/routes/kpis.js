var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController");

router.get("/alertas-calor/:setor/:idShow", kpiController.qtdSetoresEmAlerta);
router.get("/sensacao-termica/:setor/:idShow", kpiController.sensacaoTermicaAtual);
router.get("/setor-mais-quente/:idShow", kpiController.setorMaisQuente);

router.get('/allShows', (req,res) => {
    kpiController.allShows(req,res);
})
module.exports = router;