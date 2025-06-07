var database = require("../database/config");

function obterDadosGraficoPorSetor(idShow, setor) {
    let instrucaoSql = `
        select * from dadosGrafico
        where ala = '${setor}'
        and idShow = ${idShow};
    `;

    return database.executar(instrucaoSql);
}

module.exports = { 
    obterDadosGraficoPorSetor
};