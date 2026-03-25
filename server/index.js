import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';
import { sendEmailViaGmail, isGmailConfigured, formatEmailHtml } from './gmailHelper.js';

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 3002;

// Gmail scope
const GMAIL_SCOPE = 'https://www.googleapis.com/auth/gmail.modify';

// Configureação Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// EmailJS API endpoint
const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'Server is running ✅',
    services: {
      gmail: isGmailConfigured() ? '✅ Configurado' : '❌ Não configurado',
      emailjs: process.env.EMAILJS_SERVICE_ID ? '✅ Configurado' : '❌ Não configurado',
    },
  });
});

// Endpoint POST para enviar formulário de contato (Gmail + EmailJS)
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

    const destinoEmail = 'felipeglacerdaa@hotmail.com';
    let emailResult = null;
    let usedService = null;

    // 1️⃣ Tentar enviar via Gmail (se configurado)
    if (isGmailConfigured()) {
      try {
        console.log('\n📧 Tentando enviar via Gmail...');

        const htmlBody = formatEmailHtml(name, email, phone, message);
        emailResult = await sendEmailViaGmail(
          destinoEmail,
          `Nova mensagem de contato de ${name}`,
          htmlBody,
          `${name} <${email}>`
        );

        usedService = 'Gmail';
        console.log('✅ Sucesso com Gmail!');
      } catch (gmailError) {
        console.warn('⚠️ Gmail falhou, tentando EmailJS...', gmailError.message);
        emailResult = null;
      }
    } else {
      console.log('ℹ️ Gmail não configurado, usando EmailJS');
    }

    // 2️⃣ Fallback para EmailJS se Gmail falhar ou não estiver configurado
    if (!emailResult && process.env.EMAILJS_SERVICE_ID) {
      try {
        console.log('\n📧 Enviando via EmailJS...');

        const templateParams = {
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          user_id: process.env.EMAILJS_PUBLIC_KEY,
          accessToken: process.env.EMAILJS_PRIVATE_KEY,
          template_params: {
            name: name,
            email: email,
            phone: phone,
            message: message,
          },
        };

        console.log('📤 Enviando para:', destinoEmail);
        console.log('📋 Dados do cliente:');
        console.log('   Nome:', name);
        console.log('   Email:', email);
        console.log('   Telefone:', phone);
        console.log('   Mensagem:', message.substring(0, 100) + '...');

        const response = await axios.post(EMAILJS_API_URL, templateParams, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        emailResult = {
          success: true,
          messageId: response.data.status,
        };

        usedService = 'EmailJS';
        console.log('✅ Sucesso com EmailJS!', response.data);
      } catch (emailJsError) {
        console.error('❌ EmailJS falhou:', {
          message: emailJsError.message,
          status: emailJsError.response?.status,
          data: emailJsError.response?.data,
        });

        return res.status(500).json({
          success: false,
          error: 'Erro ao enviar email. Tente novamente mais tarde.',
          details:
            process.env.NODE_ENV === 'development'
              ? {
                  gmailConfigured: isGmailConfigured(),
                  emailjsConfigured: !!process.env.EMAILJS_SERVICE_ID,
                  lastError: emailJsError.response?.data || emailJsError.message,
                }
              : undefined,
        });
      }
    }

    // Se chegou aqui, email foi enviado com sucesso
    console.log(`\n✅ Email enviado com sucesso via ${usedService}!`);

    return res.status(200).json({
      success: true,
      message: 'Email enviado com sucesso!',
      service: usedService,
      messageId: emailResult.messageId,
    });
  } catch (error) {
    console.error('❌ ERRO GERAL:', {
      message: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      success: false,
      error: 'Erro ao enviar email. Tente novamente mais tarde.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
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
