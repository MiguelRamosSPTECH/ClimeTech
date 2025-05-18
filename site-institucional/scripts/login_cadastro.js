let nome = [];
let cnpj = [];
let email = [];
let senha = [];

function cadastrar() {
    let nomeCadastro = ipt_cadastro_nome.value
    let cnpjCadastro = ipt_cadastro_cnpj.value
    let emailCadastro = ipt_cadastro_email.value
    let senhaCadastro = ipt_cadastro_senha.value
    var mensagem = `` 

    if (cnpjCadastro.length != 14) {
        mensagem = `CNPJ deve conter 14 caracteres`
    } else if (!emailCadastro.includes("@")) {
        mensagem = `Email deve conter @`
    } else if(nomeCadastro == "" || cnpjCadastro == "" || emailCadastro == "" || senhaCadastro == "") {
        mensagem = `Você deve preencher todos os campos do cadastro `
    } else {
    nome.push(nomeCadastro);
    cnpj.push(cnpjCadastro);
    email.push(emailCadastro);
    senha.push(senhaCadastro);

        const alertaErro = document.querySelector(".alerta_erro");
        const cardErro = document.getElementById("cardErro");
        const mensagemErro = document.getElementById("mensagem_erro");

        alertaErro.style.display = "flex";
        cardErro.style.display = "flex";
        mensagemErro.innerHTML = "Cadastro enviado para análise.";
    
    setTimeout(() => {
            alertaErro.style.display = "none";
            cardErro.style.display = "none";
            window.location.href = 'login.html?=CadastroEnviadoParaAnálise';
    }, 2000);
}
 div_notificacao_cadastro.innerHTML = `<h3>${mensagem}</h3>`;
}

function login() {
    nome = ['Brandão','Clara'];
    email = ['brandao@climetech.com','clara@climetech.com'];
    senha = ['123','456'];

    let emailLogin = ipt_login_email.value;
    let senhaLogin = ipt_login_senha.value;

    for (let i = 0; i <= email.length; i++) {
        if (email[i] != emailLogin || senha[i] != senhaLogin) {
            div_notificacao_login.innerHTML =
            `
                <h3>Email ou senha incorretos.</h3>
            `;

        } else {
            window.location.href = "../dashboard/index.html?=LoginEfetuado";
            
            break; /*A função return: caso a condição seja verdadeira ela para o funcionamento da função login */ 
        }
    }

}