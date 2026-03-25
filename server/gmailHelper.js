import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { readFile } from 'fs/promises';
import { join } from 'path';

const GMAIL_SCOPE = 'https://www.googleapis.com/auth/gmail.modify';

/**
 * Enviar email via Gmail usando OAuth2
 */
export async function sendEmailViaGmail(to, subject, html, from) {
  try {
    // Verificar se credenciais estão disponíveis
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
      throw new Error('Credenciais do Google não configuradas');
    }

    // Autenticar com Google
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3002/auth/google/callback' // Redirect URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    // Criar transporter com Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      },
    });

    // Enviar email
    const mailOptions = {
      from: `${from} <${process.env.GOOGLE_EMAIL}>`,
      to,
      subject,
      html,
      replyTo: from,
    };

    const result = await transporter.sendMail(mailOptions);

    console.log('✅ Email enviado com sucesso via Gmail:', {
      messageId: result.messageId,
      to,
      subject,
    });

    return {
      success: true,
      service: 'gmail',
      messageId: result.messageId,
    };
  } catch (error) {
    console.error('❌ Erro ao enviar via Gmail:', error.message);
    throw error;
  }
}

/**
 * Validar se Gmail está configurado
 */
export function isGmailConfigured() {
  return !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN &&
    process.env.GOOGLE_EMAIL
  );
}

/**
 * Função auxiliar para formatar email HTML
 */
export function formatEmailHtml(name, email, phone, message) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; }
          h2 { color: #333; }
          .field { margin: 15px 0; padding: 10px; background-color: #f9f9f9; border-left: 4px solid #007bff; }
          .label { font-weight: bold; color: #555; }
          .value { color: #333; margin-top: 5px; }
          footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>📧 Nova Mensagem de Contato</h2>
          
          <div class="field">
            <div class="label">Nome:</div>
            <div class="value">${name}</div>
          </div>

          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${email}</div>
          </div>

          <div class="field">
            <div class="label">Telefone:</div>
            <div class="value">${phone}</div>
          </div>

          <div class="field">
            <div class="label">Mensagem:</div>
            <div class="value">${message.replace(/\n/g, '<br>')}</div>
          </div>

          <footer>
            <p>Email enviado via seu formulário de contato</p>
          </footer>
        </div>
      </body>
    </html>
  `;
}
