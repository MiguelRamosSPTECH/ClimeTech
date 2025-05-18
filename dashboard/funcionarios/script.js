
var mensagemErro = ''


function openCloseModal(tipoModal) {

    if (tipoModal == "delete") {
        if (modal_delete.classList == "hide" && fade.classList == "hide") {
            modal_delete.classList.remove("hide");
            fade.classList.remove("hide");
        } else {
            modal_delete.classList.add("hide");
            fade.classList.add("hide");
        }
    } else {

        if (tipoModal == "insert") {
            textRequisicao.innerHTML = `Criando um perfil`
            input_nome.value = ``
            input_email.value = ``
            input_senha.value = ``
        } else {
            textRequisicao.innerHTML = titleEdit
            input_nome.value = nameFuncionario
            input_email.value = emailFuncionario
            input_senha.value = senhaFuncionario
        }

        if (modal_update.classList == "hide" && fade.classList == "hide") {
            modal_update.classList.remove("hide");
            fade.classList.remove("hide");
        } else {
            modal_update.classList.add("hide");
            fade.classList.add("hide");
        }
    }
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