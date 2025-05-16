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
                setInterval(() => window.location = "../site/login.html", 2000);
                //se quiser limpar form fodasse
            } else {
                mensagem = await resposta.text();
                div_notificacao_cadastro.innerHTML = `${mensagem}`;
            }
        })
        .catch(function (resposta) {
            console.log("#ERRO", resposta)
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
        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                emailEmpresa: emailLogin,
                senhaEmpresa: senhaLogin
            }),
        })
        .then(async function (resposta) {
            if(resposta.ok) {
                const dadosUsuario = await resposta.json();
                // if(dadosUsuario[0].tipoAcesso != "admin") {
                    sessionStorage.EMAIL_FUNCIONARIO = dadosUsuario[0].email;
                    sessionStorage.SENHA_FUNCIONARIO = dadosUsuario[0].senha;
                    sessionStorage.ACESSO_FUNCIONARIO = dadosUsuario[0].tipoAcesso;
                    sessionStorage.ID_EMPRESA = dadosUsuario[0].empresaId;
                    window.location = "../dashboard/index.html";
                // } 

            } else {
                const msgErro = await resposta.text();
                div_notificacao_login.innerHTML = `${msgErro}`
            }
        })
    }
    div_notificacao_login.innerHTML = `${mensagem}`
}