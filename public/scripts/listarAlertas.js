function listarAlertas() {
     const idShow = sessionStorage.ID_SHOW;

    fetch(`/alertas/listarAlertas/${idShow}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(async function (resposta) {
        if (resposta.ok) {
            const dadosAlertas = await resposta.json();
            const table = document.querySelector("table");
            let nivelAlerta = '';
            let corNivel = '';

            table.innerHTML = `
                <tr>
                    <th>Setor</th>
                    <th>Nível</th>
                    <th>Sensação Térmica</th>
                    <th>Data/Hora da Coleta</th>
                </tr>
            `;



            dadosAlertas.forEach(alerta => {

                if (Number(alerta.sensacaoTermica) >= 33 && Number(alerta.sensacaoTermica) < 39) {
                    nivelAlerta = 'Observação';
                    corNivel = 'gold';
                } else if (Number(alerta.sensacaoTermica) >= 40 && Number(alerta.sensacaoTermica) < 45){
                    nivelAlerta = 'Médio';
                    corNivel = 'orange';
                } else {
                    nivelAlerta = 'Crítico';
                    corNivel = 'rgb(255, 0, 0)';
                }
                
                let trataData = new Date(alerta.dtHoraColeta)

                table.innerHTML += `
                    <tr>
                        <td>${alerta.ala}</td>
                        <td style="color: ${corNivel}; font-weight: bold;">${nivelAlerta}</td>
                        <td>${alerta.sensacaoTermica} °C</td>
                        <td>${trataData.toLocaleDateString()} ${trataData.toLocaleTimeString()}</td>
                    </tr>
                `;
            });
        } else {
            const erro = await resposta.text();
            console.error("Erro ao buscar alertas:", erro);
        }
    })
    .catch(function (erro) {
        console.error("Erro na requisição:", erro);
    });
}
