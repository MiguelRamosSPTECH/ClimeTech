var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var nome = req.body.nomeEmpresa;
  var cnpj = req.body.cnpjEmpresa;
  var email = req.body.emailEmpresa;
  var senha = req.body.senhaEmpresa;
  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res.status(401).send(`Este CNPJ já está em uso!`);
    } else {
      empresaModel.cadastrar(nome, cnpj, email, senha).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  })
}

function validarLogin(req, res) {
  var email = req.body.emailEmpresa;
  var senha = req.body.senhaEmpresa;
  empresaModel.checarCredenciais(email, senha).then((resultado) => { //funcao callback, usando outra funcao como parametro
      if(resultado.length > 0) {
        res.status(201).json(resultado);
      } else {
        res.status(401).send("Email e/ou senha incorreto(s)!")
      }    
  })
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
  validarLogin
};
