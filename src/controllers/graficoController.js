const graficoModel = require('../models/graficoModel');

async function obterDados(req, res) {
    const setor = req.params.setor;

    try {
        const dados = await graficoModel.obterDadosGraficoPorSetor(setor);
        res.json(dados.reverse()); // ordena cronologicamente
    } catch (erro) {
        console.error("Erro ao obter dados do gráfico:", erro);
        res.status(500).json({ erro: 'Erro ao buscar dados do gráfico' });
    }
}

module.exports = { obterDados };
