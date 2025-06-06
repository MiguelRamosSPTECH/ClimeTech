var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idFuncionarioEmpresa, fe.nome, fe.email, fe.senha, fe.idEmpresa as empresaId, tipoAcesso
        FROM funcionarioEmpresa fe
        INNER JOIN empresa e ON
        fe.idEmpresa = e.idEmpresa
        WHERE fe.email = '${email}' AND fe.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, acesso, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, fkEmpresa);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    // e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO funcionarioEmpresa (nome, email, senha, tipoAcesso, idEmpresa, dtCriacao) 
        VALUES ('${nome}', '${email}', '${senha}', '${acesso}', ${fkEmpresa}, curdate());
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function selectAllFuncionarios(idEmpresa) {
    var instrucaoSql = `
        SELECT idFuncionarioEmpresa, nome, email, senha, tipoAcesso, dtCriacao
        FROM funcionarioEmpresa
        WHERE idEmpresa = ${idEmpresa};
        `;

    console.log("Exeucutando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function editarFuncionario(nomeFuncionario, emailFuncionario, senhaFuncionario, acessoFuncionario, idFuncionario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarFuncionario():", nomeFuncionario, emailFuncionario, senhaFuncionario, acessoFuncionario, idFuncionario);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    // e na ordem de inserção dos dados.
    var instrucaoSql = `
        UPDATE funcionarioEmpresa 
        SET 
            nome = '${nomeFuncionario}', 
            email = '${emailFuncionario}', 
            senha = '${senhaFuncionario}',
            tipoAcesso = '${acessoFuncionario}' 
        WHERE idFuncionarioEmpresa = ${idFuncionario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function deletarFuncionario(idFuncionario) {
    var instrucaoSql = `
        DELETE FROM funcionarioEmpresa WHERE idFuncionarioEmpresa = ${idFuncionario};
    `;

    console.log("Exeucutando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);


}

function listarFuncionarioUpdate(idFuncionario) {
    var instrucaoSql = `
        SELECT idFuncionarioEmpresa, nome, email, senha, tipoAcesso, dtCriacao
        FROM funcionarioEmpresa WHERE idFuncionarioEmpresa = ${idFuncionario};
    `;

    console.log("Exeucutando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    selectAllFuncionarios,
    deletarFuncionario,
    editarFuncionario,
    listarFuncionarioUpdate
};
