const axios = require('axios');
require('dotenv').config();

async function criarTicketJira(nome, email, mensagem) {
  const assunto = `Novo contato de ${nome}`;

  try {
    const response = await axios.post(
      `${process.env.JIRA_BASE_URL}/rest/api/3/issue`,
      {
        fields: {
          project: {
            key: process.env.JIRA_PROJECT_KEY,
          },
          summary: assunto,
          description: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
                  },
                ],
              },
            ],
          },
          issuetype: {
            name: "Task",
          },
        },
      },
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`
            ).toString("base64"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Erro desconhecido' };

    console.error('Erro ao criar ticket no Jira:');
    console.error('Status:', status);
    console.error('Data:', JSON.stringify(data, null, 2));

    throw { status, data };
  }
}

module.exports = { criarTicketJira };
