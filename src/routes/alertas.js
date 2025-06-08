var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");

router.get("/listarAlertas/:idShow", function (req, res) {
    alertasController.mostrarTodosAlertas(req, res);
})

module.exports = router;