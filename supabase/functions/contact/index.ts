import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Enviar email via EmailJS
async function sendEmailViaEmailJS(
  name: string,
  email: string,
  phone: string,
  message: string
) {
  const emailjsUrl = "https://api.emailjs.com/api/v1.0/email/send";

  const templateParams = {
    service_id: Deno.env.get("EMAILJS_SERVICE_ID"),
    template_id: Deno.env.get("EMAILJS_TEMPLATE_ID"),
    user_id: Deno.env.get("EMAILJS_PUBLIC_KEY"),
    accessToken: Deno.env.get("EMAILJS_PRIVATE_KEY"),
    template_params: {
      name,
      email,
      phone,
      message,
      to_email: Deno.env.get("EMAILJS_TO_EMAIL"),
    },
  };

  console.log("📧 Enviando email via EmailJS...");
  
  const response = await fetch(emailjsUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(templateParams),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`EmailJS error: ${response.status} - ${error}`);
  }

  return await response.json();
}

// Salvar no Supabase
async function saveContact(
  supabase: any,
  name: string,
  email: string,
  phone: string,
  message: string
) {
  console.log("💾 Salvando contato no banco...");
  
  const { data, error } = await supabase.from("contacts").insert([
    {
      name,
      email,
      phone,
      message,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) throw error;
  return data;
}

serve(async (req) => {
  console.log(`📨 Requisição recebida: ${req.method}`);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(JSON.stringify({ ok: true }), { 
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });
  }

  // Apenas POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Método não permitido" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { name, email, phone, message } = body;
    
    console.log(`Dados recebidos: ${name}, ${email}, ${phone}`);

    // Validação
    if (!name || !email || !phone || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Todos os campos são obrigatórios",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email inválido",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Criar cliente Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Variáveis de ambiente do Supabase não configuradas");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Salvar no banco de dados
    await saveContact(supabase, name, email, phone, message);

    // Enviar email
    await sendEmailViaEmailJS(name, email, phone, message);

    console.log("✅ Contato processado com sucesso!");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email e contato salvos com sucesso!",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Erro:", error?.message || String(error));
    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || "Erro ao processar requisição",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
