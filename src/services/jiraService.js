const axios = require('axios');
require('dotenv').config();

exports.criarTicketJira = async (nome, email, mensagem) => {
  const response = await axios.post(
    `${process.env.JIRA_BASE_URL}/rest/api/3/issue`,
    {
      fields: {
        project: { key: `${process.env.JIRA_PROJECT_KEY}` },
        summary: `Mensagem de ${nome}`,
        description: `Email: ${email}\n\nMensagem:\n${mensagem}`,
        issuetype: { name: 'Task' }
      }
    },
    {
      auth: {
        username: process.env.JIRA_EMAIL,
        password: process.env.JIRA_API_TOKEN
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};
