let nome = [];
let cnpj = [];
let email = [];
let senha = [];

function cadastrar() {
    let nomeCadastro = ipt_cadastro_nome.value
    let cnpjCadastro = ipt_cadastro_cnpj.value
    let emailCadastro = ipt_cadastro_email.value
    let senhaCadastro = ipt_cadastro_senha.value

    if (nomeCadastro == "" || cnpjCadastro == "" || emailCadastro == "" || senhaCadastro == "") {
        div_notificacao_cadastro.innerHTML =
        `
            <h3>Você deve preencher todos os campos do cadastro.</h3>
        `;
    } else if (cnpjCadastro.length != 14) {
        alert("CNPJ inválido.")
    } else if (!emailCadastro.includes("@")) {
        alert("Email inválido.")
    } else {
        nome.push(nomeCadastro);
        cnpj.push(cnpjCadastro);
        email.push(emailCadastro);
        senha.push(senhaCadastro);

        div_notificacao_cadastro.innerHTML =
        `
            <h3><span>Parabéns</span>! Você concluiu o seu cadastro.</h3>
        `;
    }
}

function login() {
    nome = ['Brandão','Clara'];
    email = ['brandao@hotmail.com','clara@gmail.com'];
    senha = ['123','456'];

    let emailLogin = ipt_login_email.value;
    let senhaLogin = ipt_login_senha.value;

    for (let i = 0; i <= email.length; i++) {
        if (email[i] === emailLogin && senha[i] === senhaLogin) {
            div_notificacao_login.innerHTML =
            `
                <h3>Login feito com sucesso! Seja bem-vindo <span>${nome[i]}</span>.</h3>
            `;
            return;
        }
    }

    div_notificacao_login.innerHTML =
        `
            <h3>Email ou senha incorretos.</h3>
        `;
}