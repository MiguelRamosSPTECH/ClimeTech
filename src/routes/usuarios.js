var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/listarFuncionarios", function (req, res) {
    usuarioController.mostrarTodosFuncionarios(req, res);
})

router.post(`/editarFuncionario/:idFuncionarioEmpresa`, function (req, res) {
    usuarioController.editarFuncionario(req, res);
})

router.post(`/deletarFuncionario`, function (req, res) {
    usuarioController.deletarFuncionario(req, res);
})

router.post(`/listarFuncionarioUpdate/:idFuncionarioEmpresa`, function (req, res) {
    usuarioController.listarFuncionarioUpdate(req, res);
})

module.exports = router;