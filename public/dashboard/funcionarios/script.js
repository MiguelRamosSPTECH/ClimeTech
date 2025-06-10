
var mensagemErro = ''

function openCloseModal(tipoModal, idfuncionario, nomefuncionario) {

    confirmarDelete(idfuncionario, nomefuncionario)

}
function excluirSessao() {
    sessionStorage.clear();
    window.location = "../../site/login.html"
}

function confirmarDelete(idFunc, nomefuncionario) {

    fetch("/usuarios/deletarFuncionario", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idfuncionarioEmpresa: idFunc
        }),
    })
        .then(async function (resposta) {
            if (resposta.ok) {
                mensagem_erro.innerHTML = `Usuario ${nomefuncionario} Deletado Com sucesso`
                cardErro.style.display = "block";
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);

                // } 

            } else {
                mensagem_erro.innerHTML = 'Erro ao Deletar.'
            }
        })


}

function confirmarAddFuncionario() {
    var nameFuncionario = ipt_nome.value
    var emailFuncionario = ipt_email.value
    var senhaFuncionario = ipt_senha.value
    var acessoFucionario = ipt_acesso.value

    if (nameFuncionario == '' || emailFuncionario == '' ||
        senhaFuncionario == '' || acessoFucionario == '') {
        mensagemErro = 'Preencha todos os campos!'
        const alertaErro = document.querySelector(".alerta_erro");
        const cardErro = document.getElementById("cardErro");

        alertaErro.style.display = "flex";
        cardErro.style.display = "flex";
        mensagem_erro.innerHTML = mensagemErro
        setTimeout(() => {
            alertaErro.style.display = "none";
            cardErro.style.display = "none";

        }, 4000);

    } else {
        fetch('/usuarios/cadastrar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nameFuncionario,
                emailServer: emailFuncionario,
                senhaServer: senhaFuncionario,
                acessoServer: acessoFucionario,
                idEmpresaVincularServer: Number(JSON.parse(sessionStorage.ID_EMPRESA))
            })
        })
            .then(resposta => {
                if (resposta.ok) {
                    const alertaErro = document.querySelector(".alerta_erro");
                    const cardErro = document.getElementById("cardErro");
                    alertaErro.style.display = "flex";
                    cardErro.style.display = "flex";
                    mensagem_erro.innerHTML = "Funcionário cadastrado com sucesso!"

                    setTimeout(() => {
                        alertaErro.style.display = "none";
                        cardErro.style.display = "none";
                        window.location.href = 'index.html';
                    }, 2000);
                }
            })
    }





}

function confirmarEdicaoFuncionario() {
    const params = new URLSearchParams(window.location.search);

    const id = params.get('id');
    var nomeFuncionario = ipt_nome.value
    var emailFuncionario = ipt_email.value
    var senhaFuncionario = ipt_senha.value
    var acessoFucionario = ipt_acesso.value

    if (nomeFuncionario == '' || emailFuncionario == '' ||
        senhaFuncionario == '' || acessoFucionario == '') {
        mensagemErro = 'Preencha todos os campos!'
        const alertaErro = document.querySelector(".alerta_erro");
        const cardErro = document.getElementById("cardErro");

        alertaErro.style.display = "flex";
        cardErro.style.display = "flex";
        mensagem_erro.innerHTML = mensagemErro
        setTimeout(() => {
            alertaErro.style.display = "none";
            cardErro.style.display = "none";

        }, 4000);

    } else {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        //  fetch com post
        fetch(`/usuarios/editarFuncionario/${id}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                idFuncionario: id,
                nomeFuncionario: nomeFuncionario,
                emailFuncionario: emailFuncionario,
                senhaFuncionario: senhaFuncionario,
                acessoFuncionario: acessoFucionario
            }),
        })
            .then(async function (resposta) {
                if (resposta.ok) {
                        mensagemErro = 'Atualização de funcionario concluido com sucesso!'
                        const alertaErro = document.querySelector(".alerta_erro");
                        const cardErro = document.getElementById("cardErro");
                        alertaErro.style.display = "flex";
                        cardErro.style.display = "flex";
                        mensagem_erro.innerHTML = mensagemErro
                        setTimeout(() => {
                            alertaErro.style.display = "none";
                            cardErro.style.display = "none";
                            window.location.href = 'index.html';
                        }, 2000);                                       
                } else {
                    mensagem = await resposta.text();
                }
            })
            .catch(function (resposta) {
                console.log("#ERRO", resposta)
            })
    }

}

function listarFuncionarioUpdate() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        mensagemErro = 'ID não definido'
        const alertaErro = document.querySelector(".alerta_erro");
        const cardErro = document.getElementById("cardErro");

        alertaErro.style.display = "flex";
        cardErro.style.display = "flex";
        mensagem_erro.innerHTML = mensagemErro
        setTimeout(() => {
            alertaErro.style.display = "none";
            cardErro.style.display = "none";

        }, 4000);

    } else {
        //  fetch com post
        fetch(`/usuarios/listarFuncionarioUpdate/${id}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                idFuncionario: id
            }),
        })
            .then(res => res.json())
            .then(dados => {
                if (dados && dados.length > 0) {
                    const funcionario = dados[0];

                    document.getElementById("ipt_nome").value = funcionario.nome;
                    document.getElementById("ipt_email").value = funcionario.email;
                    document.getElementById("ipt_senha").value = funcionario.senha;
                } else {
                    console.log("Nenhum dado retornado.");
                }
            })
            .catch(function (resposta) {
                console.log("#ERRO", resposta)
            })
    }
}




