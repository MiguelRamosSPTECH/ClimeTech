
function dataAtual() {
    let dataAcesso = new Date().toLocaleString().split(",")[0].split("/")
    dataAcesso = dataAcesso[2]+"-"+dataAcesso[1]+"-"+dataAcesso[0]
    return dataAcesso+" "+new Date().toLocaleTimeString()
}
let dataAtualAcesso = dataAtual();
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
            changeAllDados(filtro_evento.value);
        }
    })
}


    // Atualizar o setor serve tanto para especificar a sensação térmica quanto para os gráficos.
    function atualizarSetor() {
        atualizarSensacaoTermicaPorSetor(filtro_setor.value);
        qtdAlertas(filtro_setor.value)
        setorMaisQuente()
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
            let corKpi = ``
            if(dadosSensacao[0].sensacaoTermica >= 33 && dadosSensacao[0].sensacaoTermica <= 39) {
                corKpi = '#FFCF00'
            } else if(dadosSensacao[0].sensacaoTermica > 39 && dadosSensacao[0].sensacaoTermica <= 45) {
                corKpi = '#FF8C00'
            } else if(dadosSensacao[0].sensacaoTermica > 45) {
                corKpi = `rgb(219, 28, 28)`
            } 
            showing_sensacao_termica_atual.style.color = corKpi
            showing_sensacao_termica_atual.innerText = `${dadosSensacao[0].sensacaoTermica}ºC`
        })
    }

    function setorMaisQuente() {
        let idShow = Number(filtro_evento.value);
        fetch(`/kpis/setor-mais-quente/${idShow}`, {
            method: "GET"
        })
        .then(async resposta => {
            let dadosSetor = await resposta.json();
            let sensacao = Number(dadosSetor[0].sensacaoTermica);
            let corKpi = ``
            if(sensacao >= 33 && sensacao <= 39) {
                corKpi = '#FFCF00'
            } else if(sensacao > 39 && sensacao <= 45) {
                corKpi = '#FF8C00'
            } else if(sensacao > 45) {
                corKpi = `rgb(219, 28, 28)`
            } 
            showing_setor_mais_quente.style.color = corKpi
            showing_setor_mais_quente.innerText = `Setor ${dadosSetor[0].ala}`
        })

    }

function chamarDadosGraficos(grafico, tipoDado) {
    let idShow = Number(filtro_evento.value);
    fetch(`/graficos/${tipoDado}/${idShow}`, {
        method: "GET"
    })
    .then(async resposta => {
        const dadosR = await resposta.json();
        let tpDado = `${tipoDado}Atual`
        let horas = []
        let dados = []
        let contador = 0;
        for(let i=0;i<dadosR.length;i++) {
            const dadosSetor = []
            let trataData = dadosR[i][contador].dtHoraColeta.split("T")[1].split(".")[0]
            for(let j=0;j<dadosR[i].length;j++) {
                dadosSetor.push(Number(dadosR[i][j][`${tpDado}`]))
            }
            horas.push(trataData)
            dados.push(dadosSetor);
            contador++
            grafico.data.labels.push(trataData)
        }
    
        for(let i=0;i<grafico.data.datasets.length;i++) {
                if (grafico.data.labels.length > 4 ) {
                    grafico.data.labels.shift();
                    grafico.data.datasets[i].data.shift();
                } 

            for(let j=0;j<dados[i].length;j++) {
                grafico.data.datasets[i].data.push(dados[i][j]);
            }
            
        }
        grafico.update()
  
    })
}
let alertas;
function trazerAlerta() {
    let idShow = Number(filtro_evento.value);
    fetch(`/kpis/trazerAlertas/${idShow}/${dataAtualAcesso}`, {
        method: "GET"
    })
    .then(async resposta => {
        console.log(resposta);
        const alerta = await resposta.json()
        console.log("antes: ", dataAtualAcesso)
        dataAtualAcesso = dataAtual()
        area_alertas.style.display = "flex"
        if(alertas != undefined) {
            for(let i=0;i<alerta.length;i++) {
                let igual = false;
                if(alertas != undefined){
                    for(let j=0;j<alertas.length;j++) {
                        if(alerta[i].sensacaoTermica == alertas[j].sensacaoTermica && alerta[i].ala == alertas[j].ala) {
                            igual = true;
                        }
                    }
                }
                if(igual == false) {
                        await new Promise(resposta => setTimeout(resposta, 1000)); 
                        let corAlerta = ``
                        let descricaoAlerta = ``  
                        let dataTratada = new Date(alerta[i].dtHoraColeta) //transformo em data, pq o json traz como string
                        dataTratada = dataTratada.toLocaleTimeString().split(":"); //depois transformo no formato padrao para tratá-la
                        dataTratada = `${dataTratada[0]}:${dataTratada[1]}`

                        if(alerta[i].sensacaoTermica > 38 && alerta[i].sensacaoTermica < 45.00) {
                            corAlerta = "orange"
                            descricaoAlerta = `Público exposto a desmaios/vômitos. Acione reforços e estabilize a sensação térmica.`

                        } else if(alerta[i].sensacaoTermica > 45.00) {
                            corAlerta = "rgb(219, 28, 28)"
                            descricaoAlerta = `Público exposto a falência orgânica. Tome uma atitude imediatamente`
                        }

                        let novaDiv = document.createElement('div');
                        novaDiv.className = 'alerta_div'
                        novaDiv.style.backgroundColor = `${corAlerta}`
                        novaDiv.innerHTML =`
                            <div class="header-alert">
                                <h2 class="sensacao_alerta">${alerta[i].sensacaoTermica}ºC</h2>
                                <img class="close-alert" onclick="closeAlerta(this)" src="./img-all/img-close-modal.png"></div>
                            <h4 class="setor_alerta">Setor ${alerta[i].ala} - ${dataTratada}</h4>
                            <h5 class="descricao_alerta">${descricaoAlerta}</h5>                                  
                        `
                        area_alertas.appendChild(novaDiv)
                        novaDiv.classList.add('animacao');                    
                }
            }
        alertas = alerta;
        }
    })
    .catch(erro => {
        console.log("deu erro",erro);
    })
}

function closeAlerta(elemento){
    elemento.parentNode.parentNode.remove()
}
