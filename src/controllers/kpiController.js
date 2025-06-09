var kpiModel = require('../models/kpiModel');

function qtdSetoresEmAlerta(req, res) {
  const { setor, idShow } = req.params;
    kpiModel.qtdSetoresEmAlerta(setor, idShow)
      .then(resposta => res.status(200).json(resposta))
      .catch(err => res.status(500).json(err));
}

function sensacaoTermicaAtual(req, res) {
    var setor = req.params.setor;
    var idShow = req.params.idShow;
    kpiModel.sensacaoTermicaAtual(setor, idShow)
      .then(resposta => res.status(200).json(resposta))
      .catch(err => res.status(500).json(err));
  }

function setorMaisQuente(req, res) {
    const idShow = req.params.idShow;
    kpiModel.setorMaisQuente(idShow)
      .then(resposta => res.status(200).json(resposta))
      .catch(err => res.status(500).json(err));
  }

function allShows(req,res) {
    kpiModel.allShows().then(resposta => {
      res.status(200).json(resposta);
    }).catch(erro => res.status(401).json(erro));
  }

function trazerAlertas(req,res) {
    const {idShow, horaAcesso} = req.params;
    kpiModel.trazerAlerta(idShow, horaAcesso).then(resposta => {
      console.log("controller: ",resposta)
      //resposta.length > 0 tava dando merda seila por que
      res.status(200).json(resposta);
    })
}  


module.exports = {
  qtdSetoresEmAlerta,
  sensacaoTermicaAtual,
  setorMaisQuente,
  allShows,
  trazerAlertas
}