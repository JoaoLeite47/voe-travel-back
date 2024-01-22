const nodemailer = require('nodemailer');

// Configurar o transporter (servidor SMTP)
const transporter = nodemailer.createTransport({
  service: 'outlook', // Exemplo: 'gmail'
  port: 465, // ou 587 para TLS
  secure: false, // true para SSL, false para TLS
  auth: {
    user: 'stalkerjj@outlook.com',
    pass: 'IwWYD9CbBEveg3V'
  }
});

// Função para enviar o e-mail de backup
const enviarEmailBackup = async (cliente) => {
  const mensagem = `
    Novo cliente inserido:
    Nome: ${cliente.nome}
    Pedido: ${cliente.pedido}
  `;

  const info = await transporter.sendMail({
    from: 'stalkerjj@outlook.com',
    to: 'hopeesuporte@outlook.com',
    subject: 'Novo Cliente Inserido',
    text: mensagem
  });

  console.log('E-mail de backup enviado:', info.messageId);
};

module.exports = enviarEmailBackup;
