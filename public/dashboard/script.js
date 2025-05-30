function openCloseIndice() {
    if(modal_indice.classList == "hide" && fade.classList == "hide") {
        modal_indice.classList.remove("hide");
        fade.classList.remove("hide");
    } else {
        modal_indice.classList.add("hide");
        fade.classList.add("hide");
    }
}

async function carregarDadosGrafico(idSetor) {
    try {
        const resposta = await fetch(`/graficos/dados/${idSetor}`);
        const dados = await resposta.json();

        const horarios = dados.map(linha => linha.horario);
        const temperaturas = dados.map(linha => linha.temperatura);
        const umidades = dados.map(linha => linha.umidade);

        // Atualizar os gráficos dinamicamente
        myChart.data.labels = horarios;
        myChart.data.datasets[0].data = temperaturas;
        chartUmidade.data.labels = horarios;
        chartUmidade.data.datasets[0].data = umidades;

        myChart.update();
        chartUmidade.update();
    } catch (erro) {
        console.error("Erro ao carregar os dados dos gráficos:", erro);
    }
}

// Chamada inicial para Setor Norte (ID = 1)
carregarDadosGrafico(1);