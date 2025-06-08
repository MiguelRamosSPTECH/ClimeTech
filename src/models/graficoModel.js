var database = require("../database/config");

function obterDadosGraficoPorSetor(tipoDado, idShow, setor) {
    let instrucaoSql = `
        select ala, ${tipoDado == "temperatura" ? "temperaturaAtual" : "umidadeAtual"}, dtHoraColeta, idShow from dadosGrafico
        where ala = '${setor}'
        and idShow = ${idShow};
    `;

    return database.executar(instrucaoSql);
}

module.exports = { 
    obterDadosGraficoPorSetor
};