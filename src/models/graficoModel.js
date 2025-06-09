var database = require("../database/config");

function obterDadosGraficoPorSetor(tipoDado, idShow, setor) {
    let instrucaoSql = `
        select ala, ${tipoDado == "temperatura" ? "temperaturaAtual" : "umidadeAtual"}, dtHoraColeta, idShow from dadosGrafico
        where ala = '${setor}'
        and idShow = ${idShow};
    `;
    console.log("OBTER DADOS GRAFICO: ", instrucaoSql);
    var dados = database.executar(instrucaoSql);
    //console.log(dados[0].dtHoraColeta);
    return dados;
    
}

module.exports = { 
    obterDadosGraficoPorSetor
};