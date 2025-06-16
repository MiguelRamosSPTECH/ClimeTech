function validarSessao() {
    let email = sessionStorage.EMAIL_FUNCIONARIO;
    let senha = sessionStorage.SENHA_FUNCIONARIO;
    console.log("sessionStorage.ACESSO_FUNCIONARIO: ", sessionStorage.ACESSO_FUNCIONARIO);
    console.log("sessionStorage.ID_EMPRESA: ", sessionStorage.ID_EMPRESA);
    if(email == undefined || senha == undefined) {
        window.location = "../site/login.html?=AcessoNegado";
    }

  
var suporte = sessionStorage.ACESSO_FUNCIONARIO


if (suporte == "suporteN1" || suporte == "suporteN2" || suporte == "suporteN3" ){

window.location = "./suporte/index.html"}

}



function excluirSessao() {
    sessionStorage.clear();
    window.location = "../../site/login.html"
}
