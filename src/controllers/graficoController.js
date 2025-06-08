const graficoModel = require('../models/graficoModel');

function obterDados(req, res) {
    const { tipoDado, idShow } = req.params;
    const allDados = []
    graficoModel.obterDadosGraficoPorSetor(tipoDado, idShow, 'Norte').then(resposta => {
        if(resposta.length > 0) {
            allDados.push(resposta);
            graficoModel.obterDadosGraficoPorSetor(tipoDado, idShow, 'Sul').then(resposta => {
                if(resposta.length > 0) {
                    allDados.push(resposta)
                    graficoModel.obterDadosGraficoPorSetor(tipoDado, idShow, 'Leste').then(resposta => {
                        if(resposta.length > 0) {
                            allDados.push(resposta);
                            graficoModel.obterDadosGraficoPorSetor(tipoDado, idShow ,'Oeste').then(resposta => {
                                if(resposta.length > 0 ) {
                                    allDados.push(resposta);
                                    res.status(200).json(allDados);
                                }
                            })
                        }
                    })
                }
            })
        } 
    })
    .catch(erro => {
        res.status(500).json(erro);
    })
}


module.exports = { obterDados };
