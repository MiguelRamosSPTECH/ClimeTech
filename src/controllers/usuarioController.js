var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailEmpresa;
    var senha = req.body.senhaEmpresa;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 0) {
                        res.status(401).send("E-mail ou senha incorreto(s)");
                    } else {
                        res.status(200).json(resultadoAutenticar);
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.idEmpresaVincularServer;
    var acesso = req.body.acessoServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, acesso, fkEmpresa)
            .then(
                function (resultado) {
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function mostrarTodosFuncionarios(req, res) {
    var empresaId = req.body.fkEmpresa
    if (empresaId) {
        usuarioModel.selectAllFuncionarios(empresaId)
            .then(resposta => {
                res.status(200).json(resposta)
            })
            .catch(function (erro) {
                console.log("#ERRO", erro);
                res.status(401).send("Erro ao listar usuarios!")
            })
    }
}

function editarFuncionario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idFuncionario = req.body.idFuncionario;
    var nomeFuncionario = req.body.nomeFuncionario;
    var emailFuncionario = req.body.emailFuncionario;
    var senhaFuncionario = req.body.senhaFuncionario;
    var acessoFucionario = req.body.acessoFuncionario;

    // Faça as validações dos valores
    if (nomeFuncionario == undefined) {
        res.status(400).send("Seu nome está indefinido!");
    } else if (emailFuncionario == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senhaFuncionario == undefined) {
        res.status(400).send("Sua senha está indefinido!");
    } else if (acessoFucionario == undefined) {
        res.status(400).send("Seu acesso está indefinido!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.editarFuncionario(nomeFuncionario, emailFuncionario, senhaFuncionario, acessoFucionario, idFuncionario)
            .then(
                function (resultado) {
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function deletarFuncionario(req, res) {
    var idFuncionario = req.body.idfuncionarioEmpresa;
    if (idFuncionario) {
        usuarioModel.deletarFuncionario(idFuncionario).then(resposta => {
            res.status(200).json(resposta)
        })
            .catch(function (erro) {
                console.log("#ERRO", erro);
                res.status(401).send("Erro ao deetar o usuario!")
            })
    }


}

function listarFuncionarioUpdate(req, res) {
    var idFuncionario = req.body.idFuncionario

    if (idFuncionario) {
        usuarioModel.listarFuncionarioUpdate(idFuncionario)
            .then(resposta => {
                res.status(200).json(resposta)
            })
            .catch(function (erro) {
                console.log("#ERRO", erro);
                res.status(401).send("Erro ao listar o usuario!")
            })
    }
}

module.exports = {
    autenticar,
    cadastrar,
    mostrarTodosFuncionarios,
    deletarFuncionario,
    editarFuncionario,
    listarFuncionarioUpdate
}