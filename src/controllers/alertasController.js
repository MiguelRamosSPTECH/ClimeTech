var alertasModel = require("../models/alertasModel");

function mostrarTodosAlertas(req, res) {
    const idShow = req.params.idShow;

    if (!idShow) {
        return res.status(400).send("ID do show não foi fornecido.");
    }

    alertasModel.selectTodosAlertas(idShow)
        .then(resposta => {
            res.status(200).json(resposta)
            console.log(resposta)
        })
        .catch(function (erro) {
            console.log("#ERRO", erro);
            res.status(401).send("Erro ao listar alertas!")
        })
}

module.exports = {
    mostrarTodosAlertas
};
