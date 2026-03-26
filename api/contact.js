// ✅ Função serverless Vercel para envio de formulário de contato
// Usa EmailJS (HTTP API) + Supabase para salvar os dados

const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';

/**
 * Salva o contato no Supabase via REST API (sem SDK, compatível com Edge/Serverless)
 */
async function saveToSupabase(name, email, phone, message) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase não configurado, pulando salvamento no BD');
    return null;
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ name, email, phone, message }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.warn('⚠️ Erro ao salvar no Supabase:', err);
    } else {
      console.log('✅ Contato salvo no Supabase!');
    }
  } catch (error) {
    console.warn('⚠️ Falha ao conectar ao Supabase:', error.message);
  }
}

/**
 * Envia email via EmailJS HTTP API
 */
async function sendEmailJS(name, email, phone, message) {
  const serviceId  = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey  = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS não configurado. Verifique as variáveis de ambiente.');
  }

  const payload = {
    service_id:   serviceId,
    template_id:  templateId,
    user_id:      publicKey,
    accessToken:  privateKey,
    template_params: { name, email, phone, message },
  };

  const response = await fetch(EMAILJS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`EmailJS falhou (${response.status}): ${errorText}`);
  }

  console.log('✅ Email enviado via EmailJS!');
  return true;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método não permitido' });
  }

  const { name, email, phone, message } = req.body;

  // Validação
  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      error: 'Todos os campos são obrigatórios (name, email, phone, message)',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Email inválido' });
  }

  try {
    // 1️⃣ Salvar no Supabase (não bloqueia se falhar)
    await saveToSupabase(name, email, phone, message);

    // 2️⃣ Enviar email via EmailJS
    await sendEmailJS(name, email, phone, message);

    return res.status(200).json({
      success: true,
      message: 'Email enviado com sucesso!',
    });
  } catch (error) {
    console.error('❌ Erro ao processar contato:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Erro ao enviar o formulário. Tente novamente mais tarde.',
    });
  }
}
