
var mensagemErro = ''


function openCloseModal(tipoModal, idfuncionario, nomefuncionario) {

    idF.innerText = idfuncionario
    nomeFunc.innerText = nomefuncionario
    nomeFunc2.innerText = nomefuncionario
    confirmarDelete()

}

function confirmarDelete() {
    const id = document.getElementById("idF").innerText;

    fetch("/usuarios/deletarFuncionario", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idfuncionarioEmpresa: id
        }),
    })
        .then(async function (resposta) {
            if (resposta.ok) {
                const dadosUsuario = await resposta.json();
                mensagem_erro.innerHTML = 'Usuario Deletado Com sucesso'
                cardErro.style.display = "block";
                setTimeout(() => {
                    sumirMensagem();
                    window.location = "./index.html";
                }, 2000);

                // } 

            } else {
                const msgErro = await resposta.text();
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
        mensagemErro = 'Cadastro funcionario concluido com sucesso!'

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
    }





}

function confirmarEdicaoFuncionario() {
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
    }

}

function sumirMensagem() {
    cardErro.style.display = "none";
}