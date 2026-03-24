import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 3002;

// Configureação Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// EmailJS API endpoint
const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running ✅' });
});

// Endpoint POST para enviar formulário de contato
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validar campos obrigatórios
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: 'Todos os campos são obrigatórios (name, email, phone, message)',
      });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido',
      });
    }

    // Preparar template parameters para EmailJS
    const templateParams = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        to_email: process.env.EMAILJS_TO_EMAIL || 'felipeglacerdaa@hotmail.com',
        from_name: name,
        from_email: email,
        phone: phone,
        message: message,
      },
    };

    // Enviar email via EmailJS API
    const response = await axios.post(EMAILJS_API_URL, templateParams, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('✅ Email enviado com sucesso:', response.data);

    return res.status(200).json({
      success: true,
      message: 'Email enviado com sucesso!',
      messageId: response.data.status,
    });
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      error: 'Erro ao enviar email. Tente novamente mais tarde.',
      details: process.env.NODE_ENV === 'development' ? error.response?.data || error.message : undefined,
    });
  }
});

// Rota 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada',
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
