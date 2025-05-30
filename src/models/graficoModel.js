async function obterDadosGraficoPorSetor(setor) {
    let instrucaoSql = '';

    if (setor === 'geral') {
        instrucaoSql = `
            SELECT * FROM vw_dados_setor_geral
            ORDER BY horario DESC
            LIMIT 6;
        `;
    } else {
        instrucaoSql = `
            SELECT * FROM vw_dados_setor_individual
            WHERE nome_setor = '${setor}'
            ORDER BY horario DESC
            LIMIT 6;
        `;
    }

    return await database.executar(instrucaoSql);
}

module.exports = { obterDadosGraficoPorSetor };