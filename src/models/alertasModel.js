var database = require("../database/config")

function selectTodosAlertas(idShow) {
    var instrucaoSql = `
         select ala, sensacaoTermica, dtHoraColeta from view_conta_alertas
            where sensacaoTermica > 38
			and dtHoraColeta between (select dtHoraComeco from shows where idEvento = ${idShow}) and
									 (select dtHoraFinal from shows where idEvento = ${idShow});
        `;

    console.log("Exeucutando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    selectTodosAlertas
};