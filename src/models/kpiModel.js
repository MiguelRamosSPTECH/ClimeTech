var database = require("../database/config");

function qtdSetoresEmAlerta(setor, idShow) {
  if(setor == "geral") {
    query = `
     select count(*) as qtdAlertas from view_conta_alertas
    where idShow = ${idShow};
    `
  } else {
    query = `
    select count(*) as qtdAlertas from view_conta_alertas
	  where ala = '${setor}'
    and idShow = ${idShow};           
    `
  }

  return database.executar(query);
}

function sensacaoTermicaAtual(setor, idShow) {
  let query = ``
  if (setor == "geral") {
    query = `
      select * from vw_sensacao_geral
      where idShow = ${idShow};    
    `
  } else {
    query = `
select
      round(
          truncate(avg(temperaturaAtual), 2) + ((truncate(avg(umidadeAtual), 2) / 100) * (truncate(avg(umidadeAtual), 2) * 0.2)), 
          2
      ) as sensacaoTermica
      from vw_media_dados_setor
      where linhaUnica = 1 
      and ala = '${setor}'
      and idShow = ${idShow}
      and idEstadio = 1;    
    `;
  }

  return database.executar(query);
}

function setorMaisQuente(idShow) {
  var query = `
    select ala, max(sensacaoTermica) as sensacaoTermicaMaxima from view_conta_alertas
    where idShow = 1
    group by ala
    order by max(sensacaoTermica) desc
    limit 1;
  `;
  return database.executar(query);
}

function allShows() {
    let instrucaoSql = `
      select * from shows;
    `
    return database.executar(instrucaoSql);
}

module.exports = {
  qtdSetoresEmAlerta,
  sensacaoTermicaAtual,
  setorMaisQuente,
  allShows
}