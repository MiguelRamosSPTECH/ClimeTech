var database = require("../database/config")

function selectTodosAlertas(idShow) {
    var instrucaoSql = `
         select distinct ala, sensacaoTermica, dtHoraColeta from view_conta_alertas
            where idShow = ${Number(idShow)}
            and sensacaoTermica > 38
            group by ala, sensacaoTermica, dtHoraColeta
            order by dtHoraColeta desc
        `;

    console.log("Exeucutando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    selectTodosAlertas
};