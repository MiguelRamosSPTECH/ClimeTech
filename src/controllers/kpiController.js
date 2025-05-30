var kpiModel = require('../models/kpiModel');

module.exports = {
  qtdSetoresEmAlerta(req, res) {
    kpiModel.qtdSetoresEmAlerta()
      .then(resposta => res.status(200).json(resposta))
      .catch(err => res.status(500).json(err));
  },

  sensacaoTermicaAtual(req, res) {
    var setor = req.params.setor;
    kpiModel.sensacaoTermicaAtual(setor)
      .then(resposta => res.status(200).json(resposta))
      .catch(err => res.status(500).json(err));
  },

  setorMaisQuente(req, res) {
    kpiModel.setorMaisQuente()
      .then(resposta => res.status(200).json(resposta))
      .catch(err => res.status(500).json(err));
  }
}