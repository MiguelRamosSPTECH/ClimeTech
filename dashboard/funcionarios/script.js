var nameFuncionario = input_nome.value;
var emailFuncionario = input_email.value;
var senhaFuncionario = input_senha.value;
var titleEdit = textRequisicao.innerHTML;

function openCloseModal(tipoModal) {

    if(tipoModal == "delete") {
        if(modal_delete.classList == "hide" && fade.classList == "hide") {
            modal_delete.classList.remove("hide");
            fade.classList.remove("hide");
        } else {
            modal_delete.classList.add("hide");
            fade.classList.add("hide");
        }
    } else {

        if(tipoModal == "insert") {
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
        
        if(modal_update.classList == "hide" && fade.classList == "hide") {
            modal_update.classList.remove("hide");
            fade.classList.remove("hide");
        } else {
            modal_update.classList.add("hide");
            fade.classList.add("hide");
        }
    } 
}