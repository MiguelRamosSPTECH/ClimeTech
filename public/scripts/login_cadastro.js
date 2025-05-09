const { text } = require("express")

function cadastrar() {
    let nomeCadastro = ipt_cadastro_nome.value
    let cnpjCadastro = ipt_cadastro_cnpj.value
    let emailCadastro = ipt_cadastro_email.value
    let senhaCadastro = ipt_cadastro_senha.value
    let mensagem = `` 

    if (cnpjCadastro.length != 14) {
        mensagem = `CNPJ deve conter 14 caracteres`
    } else if (!emailCadastro.includes("@") || !emailCadastro.includes(".")) {
        mensagem = `Email deve conter @ e .`
    } else if(nomeCadastro == "" || cnpjCadastro == "" || emailCadastro == "" || senhaCadastro == "") {
        mensagem = `Você deve preencher todos os campos do cadastro `
    } else {
        fetch("/empresas/cadastrar", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                nomeEmpresa: nomeCadastro,
                cnpjEmpresa: cnpjCadastro,
                emailEmpresa: emailCadastro,
                senhaEmpresa: senhaCadastro
            }),
        })
        .then(async function (resposta) {
            if(resposta.ok) {
                alert("Cadastro efetuado com sucesso! redirecionando para o login")
                setInterval(() => window.location = "login.html", 2000);
                //se quiser limpar form fodasse
            } else {
                const data = await resposta.text();
                mensagem = data;
            }
        })
        .catch(function (resposta) {
            console.log("#ERRO", resposta)
            mensagem = `${resposta}`
        })
    }
    div_notificacao_cadastro.innerHTML = `${mensagem}`;
}

function login() {
    var emailLogin = ipt_login_email.value;
    var senhaLogin = ipt_login_senha.value;
    let mensagem = ``
    if(emailLogin == "" || senhaLogin == "") {
        mensagem = `Preencha todos os campos!`
    } else {
        fetch("/empresas/validarLogin", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                emailEmpresa: emailLogin,
                senhaEmpresa: senhaLogin
            }),
        })
        .then(async function(resposta) {
            if(resposta.ok) {
                resposta.json().then(respostaJson => {
                    if(respostaJson[0].acessoLiberado == 0) {
                       alert("Espere até que seu acesso seja liberado!") 
                    } else {
                        alert("Login efetuado!") 
                        sessionStorage.NOME_FUNCIONARIO = respostaJson.nome;
                        setInterval(() => window.location = "./dashboard/index.html", 1000)
                    }
                })
            } else {
                resposta.text().then(texto => {
                    div_notificacao_login.innerHTML = `${texto}`
                });
            }
        })
    }
    div_notificacao_login.innerHTML = `${mensagem}`
}