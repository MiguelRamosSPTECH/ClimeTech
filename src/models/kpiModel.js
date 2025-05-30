var database = require("../database/config");

function qtdSetoresEmAlerta() {
  var query = `
    SELECT COUNT(*) AS qtd_setores_em_alerta
    FROM (
        (SELECT * FROM vw_media_dados_setor_norte ORDER BY dtHoraColeta DESC LIMIT 1)
        UNION ALL
        (SELECT * FROM vw_media_dados_setor_sul ORDER BY dtHoraColeta DESC LIMIT 1)
        UNION ALL
        (SELECT * FROM vw_media_dados_setor_leste ORDER BY dtHoraColeta DESC LIMIT 1)
        UNION ALL
        (SELECT * FROM vw_media_dados_setor_oeste ORDER BY dtHoraColeta DESC LIMIT 1)
    ) AS ultimos_setores
    WHERE (
      media_temperatura + ((media_umidade / 100) * (media_temperatura * 0.2))
    ) >= 30;
  `;
  return database.executar(query);
}

function sensacaoTermicaAtual(setor) {
  let view = "";

  if (setor == "geral") {
    view = "vw_media_tudo";
  } else {
    view = `vw_media_dados_setor_${setor}`;
  }

  var query = `
    SELECT
        media_temperatura,
        media_umidade,
        (
        media_temperatura + ((media_umidade / 100) * (media_temperatura * 0.2))
        ) AS sensacao_termica
    FROM ${view}
    ORDER BY dtHoraColeta DESC
    LIMIT 1;
  `;
  return database.executar(query);
}

function setorMaisQuente() {
  var query = `
    SELECT setor, temperatura FROM (
        SELECT 'norte' AS setor, media_temperatura AS temperatura, dtHoraColeta FROM vw_media_dados_setor_norte
        UNION
        SELECT 'sul', media_temperatura, dtHoraColeta FROM vw_media_dados_setor_sul
        UNION
        SELECT 'leste', media_temperatura, dtHoraColeta FROM vw_media_dados_setor_leste
        UNION
        SELECT 'oeste', media_temperatura, dtHoraColeta FROM vw_media_dados_setor_oeste
    ) AS todos
    ORDER BY dtHoraColeta DESC, temperatura DESC
    LIMIT 1;
  `;
  return database.executar(query);
}

module.exports = {
  qtdSetoresEmAlerta,
  sensacaoTermicaAtual,
  setorMaisQuente
}