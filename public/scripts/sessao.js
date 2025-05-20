function validarSessao() {
    let email = sessionStorage.EMAIL_FUNCIONARIO;
    let senha = sessionStorage.SENHA_FUNCIONARIO;
    console.log(sessionStorage.ID_EMPRESA);
    if(email == undefined || senha == undefined) {
        window.location = "../site/login.html?=AcessoNegado";
    }
}

function excluirSessao() {
    sessionStorage.clear();
    window.location = "../../site/login.html"
}