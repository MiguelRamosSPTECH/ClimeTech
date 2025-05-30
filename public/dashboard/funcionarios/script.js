
var mensagemErro = ''

function openCloseModal(tipoModal) {

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
     const params = new URLSearchParams(window.location.search);
    
    const id = params.get('id');
    var nomeFuncionario = ipt_nome.value
    var emailFuncionario = ipt_email.value
    var senhaFuncionario = ipt_senha.value
    var acessoFucionario = ipt_acesso.value
    console.log("to aqui")

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
                    alert("Alteração efetuada com sucesso!")
                    setInterval(() => window.location = "index.html", 2000);
                    //se quiser limpar form
                } else {
                    mensagem = await resposta.text();
                                   }
            })
            .catch(function (resposta) {
                console.log("#ERRO", resposta)
            })
    }

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

