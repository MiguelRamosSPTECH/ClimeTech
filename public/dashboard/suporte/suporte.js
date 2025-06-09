function validarSuporte() {
    var suporte = sessionStorage.ACESSO_FUNCIONARIO;

    document.getElementById('container_ia').style.display = 'none'
    console.log("Salve fiote:", suporte);

    if (suporte == "suporteN1") {
        nivelSuporte.innerText = "N1";
        nivelSuporte2.innerText = "N1";
        document.getElementById('container_ia').style.display = 'none';
        document.getElementById('botao-bobia').style.display = 'none';
    } else if (suporte == "suporteN2") {
        nivelSuporte.innerText = "N2";
        nivelSuporte2.innerText = "N2";
        document.getElementById('container_ia').style.display = 'none';
        document.getElementById('botao-bobia').style.display = 'none';

    } else if (suporte == "suporteN3") {
        nivelSuporte.innerText = "N3";
        nivelSuporte2.innerText = "N3";
    }

    // Esconde a div ao carregar
    document.getElementById("reposta").classList.add("hide");
}


function suporteDashBoard() {
    diagramaSelecionado.classList.remove("hide");
    resposta.style.border = '2px solid #055cd1';


    resposta.innerHTML = `
        <div class="button-fechar">
            <button onclick="fecharDiagrama()">X</button>
        </div>
        <img class="imgDiagrama" src="./diagramas/dashboard.drawio.png" alt="Diagrama TI"> `;
}




function suporteFuncionarios() {
    diagramaSelecionado.classList.remove("hide");
    resposta.style.border = '2px solid #055cd1';


    resposta.innerHTML = `
        <div class="button-fechar">
            <button onclick="fecharDiagrama()">X</button>
        </div>
        <img class="imgDiagrama" src="./diagramas/Funcionarios.drawio.png" alt="Diagrama TI"> `;
}

function suporteAlertas() {
    diagramaSelecionado.classList.remove("hide");
    resposta.style.border = '2px solid #055cd1';


    resposta.innerHTML = `
        <div class="button-fechar">
            <button onclick="fecharDiagrama()">X</button>
        </div>
        <img class="imgDiagrama" src="./diagramas/alertas.drawio.png" alt="Diagrama TI"> `;
}


function excluirSessao() {
    sessionStorage.clear();
    window.location = "../../site/login.html"
}



function fecharDiagrama() {
    resposta.innerHTML = "";
    resposta.style.border = '';
    diagramaSelecionado.classList.add("hide");
}

function ia() {
    document.getElementById('container_ia').style.display = 'block';
    document.getElementById('botao-bobia').style.display = 'none';
}

function fecharBobIa() {
    document.getElementById('container_ia').style.display = 'none';
    document.getElementById('botao-bobia').style.display = 'block';

}


async function gerarResposta() {
    const pergunta = document.getElementById('pergunta-ia').value;

    const response = await fetch('http://localhost:3000/perguntar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pergunta })
    });

    const data = await response.json();

    respostaIa.style.display = 'block';
    document.getElementById('respostaIa').innerText = data.resultado;
}
