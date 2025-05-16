const nodemailer = require('nodemailer');
require('dotenv').config();

exports.enviarEmailCliente = async (nome, email, mensagem) => {
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_EMPRESA,
      pass: process.env.EMAIL_EMPRESA_SENHA
    }
  });

  await transporter.sendMail({
    from: `"Suporte da Empresa" <${process.env.EMAIL_EMPRESA}>`,
    to: email,
    subject: 'Confirmação de Recebimento',
    text: `Olá ${nome}, recebemos sua mensagem: "${mensagem}". Em breve responderemos.`,
  });
};
