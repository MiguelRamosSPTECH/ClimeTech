var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT idEmpresa, nome, cnpj, email, acessoLiberado FROM empresa`;

  return database.executar(instrucaoSql);
}

function checarCredenciais(email, senha) {
  var instrucaoSql = `SELECT * FROM empresa WHERE email = '${email}' AND senha = '${senha}'`;

  return database.executar(instrucaoSql);
}
function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(nome, cnpj, email, senha) {
  var instrucaoSql = `INSERT INTO empresa (nome, cnpj, email, senha, acessoLiberado) VALUES ('${nome}', '${cnpj}', '${email}', '${senha}', 0)`;

  return database.executar(instrucaoSql);
}

module.exports = { checarCredenciais, buscarPorCnpj, buscarPorId, cadastrar, listar };
