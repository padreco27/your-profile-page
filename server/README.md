# Backend - Contact Form Server

Servidor Express que funciona como intermediário entre o formulário de contato (frontend) e **Gmail + EmailJS**.

## 📋 Características

- ✅ **Suporte duplo**: Gmail (prioritário) + EmailJS (fallback)
- ✅ **Fallback automático**: Se Gmail falhar, tenta EmailJS automaticamente
- ✅ **Validação completa**: Campos obrigatórios e validação de email
- ✅ **Logs detalhados**: Rastreamento completo das tentativas de envio
- ✅ **Variáveis de ambiente**: Credenciais seguras não commitadas

## 🚀 Instalação

### 1. Instalar dependências

```bash
cd server
npm install
```

Ou usando o script da raiz:

```bash
npm run server:install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `/server` baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
PORT=3002
EMAILJS_PUBLIC_KEY=seu_public_key
EMAILJS_PRIVATE_KEY=seu_private_key
EMAILJS_SERVICE_ID=seu_service_id
EMAILJS_TEMPLATE_ID=seu_template_id
EMAILJS_TO_EMAIL=seu-email@hotmail.com
NODE_ENV=development

# Gmail OAuth2 (opcional mas recomendado)
GOOGLE_CLIENT_ID=seu_client_id
GOOGLE_CLIENT_SECRET=seu_client_secret
GOOGLE_REFRESH_TOKEN=seu_refresh_token
GOOGLE_EMAIL=seu-email@gmail.com
```

⚠️ **NÃO COMMIT** o arquivo `.env` para o Git (já está ignorado no `.gitignore`)

## 🏃 Como Rodar

### Opção 1: Rodar servidor localmente (recomendado para desenvolvimento)

```bash
cd server
npm run dev
```

Ou da pasta raiz:

```bash
npm run server:dev
```

O servidor vai iniciar em **`http://localhost:3002`**

### Opção 2: Rodar em produção

```bash
cd server
npm start
```

## 🧪 Testar o Endpoint

### Com cURL

```bash
curl -X POST http://localhost:3002/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "(11) 99999-9999",
    "message": "Gostaria de um orçamento para meu site"
  }'
```

Resposta de sucesso (HTTP 200):

```json
{
  "success": true,
  "message": "Email enviado com sucesso!",
  "service": "Gmail",
  "messageId": "123abc"
}
```

### Com Postman

1. Abra Postman
2. Crie uma requisição **POST** para `http://localhost:3002/api/contact`
3. Selecione **Body** → **raw** → **JSON**
4. Cole o JSON acima
5. Clique em **Send**

## 📝 Endpoints da API

### `POST /api/contact`

Envia um formulário de contato via Gmail ou EmailJS.

**Request:**

```json
{
  "name": "string (obrigatório)",
  "email": "string (obrigatório, deve ser email válido)",
  "phone": "string (obrigatório)",
  "message": "string (obrigatório)"
}
```

**Respostas:**

| Status | Descrição |
|--------|-----------|
| **200** | Email enviado com sucesso |
| **400** | Campos obrigatórios faltando ou inválidos |
| **500** | Erro ao enviar email (Gmail e EmailJS falharam) |

### `GET /health`

Health check do servidor com status dos serviços.

```bash
curl http://localhost:3002/health
```

Resposta:

```json
{
  "status": "Server is running ✅",
  "services": {
    "gmail": "✅ Configurado",
    "emailjs": "✅ Configurado"
  }
}
```

## 🎯 Fluxo de Envio

```
Requisição do Frontend
    ↓
1️⃣ Validação de campos
    ↓
2️⃣ Tentar Gmail (se configurado)
    ├─ ✅ Sucesso? → Retorna resposta
    ├─ ❌ Erro? → Tenta EmailJS
    ↓
3️⃣ Tentar EmailJS (fallback)
    ├─ ✅ Sucesso? → Retorna resposta
    ├─ ❌ Erro? → Retorna erro 500
```

## 🔧 Configurar Gmail (OAuth2)

### Passo 1: Criar credenciais no Google Cloud

1. Vá para [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou use um existente
3. Ative a API do Gmail
4. Crie credenciais OAuth2 (tipo "Web application")
5. Adicione `http://localhost:3002` como URI de redirect autorizado
6. Copie o **Client ID** e **Client Secret**

### Passo 2: Gerar Refresh Token

```bash
# Criar um script para gerar o refresh token
# Ou usar ferramentas como:
# - OAuth2 Playground: https://developers.google.com/oauthplayground
```

### Passo 3: Adicionar credenciais ao `.env`

```env
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_REFRESH_TOKEN=xxx
GOOGLE_EMAIL=seu-email@gmail.com
```

## 🔧 Troubleshooting

### "Erro ao enviar email"

**Causa**: Ambos serviços falharam

**Solução**:
- Verifique o log do servidor para mais detalhes
- Confirme que pelo menos EmailJS está configurado
- Verifique as credenciais no `.env`

### "Failed to fetch" no frontend

**Problema**: Servidor não está respondendo

**Solução**:
- Confirme que servidor está rodando em `http://localhost:3002`
- Verifique a porta no `.env`
- Verifique CORS: `http://localhost:8080` deve conseguir acessar

### Gmail não está funcionando

**Problema**: Credenciais do Google inválidas

**Solução**:
- Verifique as variáveis `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`
- Confirme que a conta Gmail tem a API ativada
- Verifique o log do servidor para erro específico

### EmailJS não está funcionando

**Problema**: Credenciais do EmailJS inválidas

**Solução**:
- Verifique as variáveis `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PRIVATE_KEY`
- Confirme que "Allow EmailJS API for non-web environments" está ativado em https://dashboard.emailjs.com/admin/account/security
- Verifique o template no dashboard EmailJS

## 📚 Estrutura do Projeto

```
server/
├── index.js           # Servidor Express principal + lógica de envio
├── gmailHelper.js     # Funções auxiliares para Gmail (OAuth2, nodemailer)
├── package.json       # Dependências
├── .env              # Variáveis de ambiente (NÃO commit)
├── .env.example      # Template (commit this)
└── README.md         # Este arquivo
```

## 📖 Referências

- [Express.js](https://expressjs.com/)
- [Gmail API](https://developers.google.com/gmail/api)
- [Nodemailer](https://nodemailer.com/)
- [EmailJS](https://www.emailjs.com/)
- [Google OAuth2](https://developers.google.com/identity/protocols/oauth2)

## 🔐 Segurança

- ✅ Variáveis sensíveis no `.env` (não commitadas)
- ✅ Validação de campos obrigatórios
- ✅ Validação de email
- ⚠️ **TODO**: Adicionar rate limiting (usar `express-rate-limit`)
- ⚠️ **TODO**: Adicionar autenticação se necessário

## 📝 Logs

O servidor gera logs úteis:

```
📧 Tentando enviar via Gmail...
✅ Email enviado com sucesso via Gmail!

ou

ℹ️ Gmail não configurado, usando EmailJS
📧 Enviando via EmailJS...
✅ Sucesso com EmailJS!
```

---

**Precisa de ajuda?** Verifique o console do servidor para logs detalhados de erros.
