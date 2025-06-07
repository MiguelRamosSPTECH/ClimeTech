
function openCloseIndice() {
    if(modal_indice.classList == "hide" && fade.classList == "hide") {
        modal_indice.classList.remove("hide");
        fade.classList.remove("hide");
    } else {
        modal_indice.classList.add("hide");
        fade.classList.add("hide");
    }
}


function allShows() {
    fetch('/kpis/allShows', {
        method: "GET"
    })
    .then(async resposta => {
        if(resposta.ok) {
            const allShows = await resposta.json();
            const selectShows = document.getElementById('filtro_evento');
            let textoShows = ``
            allShows.forEach(show => {
                textoShows+=`
                    <option value="${show.idEvento}">${show.nome}</option>
                `
            });
            selectShows.innerHTML+= textoShows
        }
    })
}


    // Atualizar o setor serve tanto para especificar a sensação térmica quanto para os gráficos.
    function atualizarSetor(setor) {
        atualizarSensacaoTermicaPorSetor(filtro_setor.value);
        qtdAlertas(filtro_setor.value)
        setorMaisQuente()
        setInterval(() => {
            setorMaisQuente()
            atualizarSensacaoTermicaPorSetor(filtro_setor.value);
            qtdAlertas(filtro_setor.value)
        }, 5000)
    }

    // Exibir quantidade de alertas por filtro também
    function qtdAlertas(setor) {
        let setorAtual = setor;
        const idShow = Number(filtro_evento.value);
        fetch(`/kpis/alertas-calor/${setorAtual}/${idShow}`, {
            method: "GET"
        })
        .then(async resposta => {
            const qtdAlertas = await resposta.json();
            showing_qtd_alertas.innerText = qtdAlertas[0].qtdAlertas;
        })      
    }

    // Sensação térmica por filtro
    function atualizarSensacaoTermicaPorSetor(setor) {
        let setorAtual = setor;
        const idShow = Number(filtro_evento.value);
        fetch(`/kpis/sensacao-termica/${setorAtual}/${idShow}`, {
            method: "GET"
        })
        .then(async resposta => {
            const dadosSensacao = await resposta.json();
            showing_sensacao_termica_atual.innerText = `${dadosSensacao[0].sensacaoTermica}ºC`
        })
    }

    function setorMaisQuente() {
        let idShow = Number(filtro_evento.value);
        fetch(`/kpis/setor-mais-quente/${idShow}`, {
            method: "GET"
        })
        .then(async resposta => {
            let nomeSetor = await resposta.json();
            nomeSetor = nomeSetor[0].ala;
            showing_setor_mais_quente.innerText = `Setor ${nomeSetor}`
            console.log(nomeSetor)
        })
    }

function chamarDadosGraficos() {
    let idShow = Number(filtro_evento.value);
    fetch(`/graficos/${idShow}`, {
        method: "GET"
    })
    .then(async resposta => {
        const dados = await resposta.json();
        plotarGrafico(dados, "umidade")
        plotarGrafico(dados, "temperatura")
    })
}
let grafico = null
function plotarGrafico(respostaFuncao, tipoDado) {
        let horas = []
        let dados = []
        let contador = 0;
        for(let i=0;i<respostaFuncao.length;i++) {
            const dadosSetor = []
            let trataData = respostaFuncao[i][contador].dtHoraColeta.split("T")[1].split(".")[0]
            console.log(trataData);
            for(let j=0;j<respostaFuncao[i].length;j++) {
                dadosSetor.push(Number(tipoDado == "temperatura" ? respostaFuncao[i][j].temperaturaAtual : respostaFuncao[i][j].umidadeAtual))
            }
            horas.push(trataData)
            contador++
            dados.push(dadosSetor);
        }
        if(grafico) {
            grafico.destroy()
        }
        grafico  = new Chart(tipoDado == "temperatura" ? ctx : ctx2, {
            type: 'line',
            data: {
                labels: horas,
                datasets:[{
                    label: "Norte",
                    data: dados[0],
                    fill: false,
                    borderColor: '#1073da',
                    tension: 0.1
                },
                {
                    label: "Sul",
                    data: dados[1],
                    fill: false,
                    borderColor: '#2b3d7b',
                    tension: 0.1
                },
                {
                    label: "Leste",
                    data: dados[2],
                    fill: false,
                    borderColor: 'seagreen',
                    tension: 0.1
                },
                {
                    label: "Oeste",
                    data: dados[3],
                    fill: false,
                    borderColor: 'purple',
                    tension: 0.1
                }                                
            ]  
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'start'
                    }
                }
            }
        })    
}
function trazerAlerta() {
    let idShow = Number(filtro_evento.value);
    fetch(`/kpis/trazerAlertas/${idShow}`, {
        method: "GET"
    })
    .then(async resposta => {
        const alerta = await resposta.json()
        alerta_div.style.display = "flex"
        sensacao_alerta.innerText = `${alerta[0].sensacaoTermica}ºC`
        setor_alerta.innerText = `Setor ${alerta[0].ala}`
        if(alerta[0].sensacaoTermica > 38 && alerta[0].sensacaoTermica < 45.00) {
            alerta_div.style.backgroundColor = "orange"
            descricao_alerta.innerText = `Sexo ficando quente`
        } else if(alerta[0].sensacaoTermica > 45.00) {
            alerta_div.style.backgroundColor = "red"
            descricao_alerta.innerText = `Alerta de fornicação`
        }
    })
    setTimeout(() => {
        alerta_div.style.display = "none"
    }, 4000)
    
    setTimeout(() => {
        trazerAlerta()
    }, 7000) 
}

function changeAllDados() {
    atualizarSetor(filtro_setor.value)
    trazerAlerta()
    chamarDadosGraficos()
    setInterval(() => {
        chamarDadosGraficos()
    }, 5000)
}

// Chamada inicial para Setor Norte (ID = 1)
carregarDadosGrafico(1);