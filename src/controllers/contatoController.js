const { criarTicketJira }   = require('../services/jiraService');
const { enviarEmailCliente } = require('../services/emailService');

exports.enviarContato = async (req, res) => {
  const { nome, email, mensagem } = req.body;

  try {
    await criarTicketJira(nome, email, mensagem);      // 1) cria chamado no Jira
    await enviarEmailCliente(email, nome, mensagem);   // 2) manda cópia ao cliente
    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (e) {
    console.error('Erro ao enviar contato:', e.response?.data || e.message || e);
    res.status(500).json({ message: 'Falha ao processar sua mensagem.' });
  }
};
