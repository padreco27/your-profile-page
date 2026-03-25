const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';

// Criar cliente Supabase apenas se variáveis estiverem disponíveis
const supabase = SUPABASE_URL && SUPABASE_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

async function saveContactToDatabase(name, email, phone, message) {
  if (!supabase) {
    console.warn('⚠️ Supabase não configurado, pulando salvamento');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          phone,
          message,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao salvar no Supabase:', error.message);
    return null;
  }
}

async function sendEmailViaEmailJS(name, email, phone, message) {
  try {
    // Verificar se credenciais do EmailJS estão configuradas
    if (!process.env.EMAILJS_SERVICE_ID || !process.env.EMAILJS_TEMPLATE_ID) {
      throw new Error('Credenciais EmailJS não configuradas');
    }

    const templateParams = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: {
        name,
        email,
        phone,
        message,
      },
    };

    const response = await axios.post(EMAILJS_API_URL, templateParams, {
      headers: { 'Content-Type': 'application/json' },
    });

    return response.data;
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = async function handler(req, res) {
  // Incluir CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  console.log(`📨 Método: ${req.method}`);

  // Lidar com OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { name, email, phone, message } = req.body;

    console.log('📋 Dados recebidos:', { name, email, phone });

    // Validação
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: 'Todos os campos são obrigatórios',
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

    // Salvar no Supabase
    console.log('💾 Salvando contato...');
    await saveContactToDatabase(name, email, phone, message);

    // Enviar email
    console.log('📧 Enviando email via EmailJS...');
    await sendEmailViaEmailJS(name, email, phone, message);

    console.log('✅ Sucesso!');

    return res.status(200).json({
      success: true,
      message: 'Email enviado com sucesso!',
    });
  } catch (error) {
    console.error('❌ ERRO GERAL:', error.message, error.stack);
    return res.status(500).json({
      success: false,
      error: error.message || 'Erro ao processar requisição',
    });
  }
}
