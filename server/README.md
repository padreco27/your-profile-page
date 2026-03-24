# Backend - Contact Form Server

Servidor Express que funciona como intermediário entre o formulário de contato (frontend) e o EmailJS.

## 📋 Pré-requisitos

- **Node.js** v16+ (recomendado v18+)
- **npm** ou **yarn**
- Credenciais do **EmailJS** (Public Key, Private Key, Service ID, Template ID)

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

Edite o arquivo `.env` e preencha com suas credenciais:

```env
PORT=3001
EMAILJS_PUBLIC_KEY=sWfQhVPETYl48Zzpv
EMAILJS_PRIVATE_KEY=4ubbvFfiFO6TMsTBx2KDK
EMAILJS_SERVICE_ID=service_b3w3ggq
EMAILJS_TEMPLATE_ID=template_rfhpc4q
EMAILJS_TO_EMAIL=felipeglacerdaa@hotmail.com
NODE_ENV=development
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

O servidor vai iniciar em **`http://localhost:3001`**

### Opção 2: Rodar em produção

```bash
cd server
npm start
```

## 🧪 Testar o Endpoint

### Com cURL

```bash
curl -X POST http://localhost:3001/api/contact \
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
  "messageId": 200
}
```

### Com Postman

1. Abra Postman
2. Crie uma requisição **POST** para `http://localhost:3001/api/contact`
3. Selecione **Body** → **raw** → **JSON**
4. Cole o JSON acima
5. Clique em **Send**

## 📝 Endpoints da API

### `POST /api/contact`

Envia um formulário de contato via email.

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
| **500** | Erro ao enviar email |

### `GET /health`

Health check do servidor.

```bash
curl http://localhost:3001/health
```

Resposta:

```json
{
  "status": "Server is running ✅"
}
```

## 🔧 Troubleshooting

### "Erro: ECONNREFUSED"

**Problema:** Frontend não consegue conectar ao servidor.

**Solução:**
- Confirme que o servidor está rodando em `http://localhost:3001`
- Verifique a porta no `.env` (padrão: 3001)
- Certifique-se que o frontend está acessando `http://localhost:3001/api/contact` (não mude a URL)

### "Email não foi enviado"

**Problema:** Servidor retorna erro 500 ao tentar enviar email.

**Solução:**
- Verifique as credenciais do EmailJS no arquivo `.env`
- Confirme que a **Public Key** e **Private Key** estão corretos
- Verifique o **Service ID** e **Template ID** no dashboard EmailJS
- Certifique-se de que o template foi criado no EmailJS com os placeholders corretos

### "CORS Error"

**Problema:** Frontend recebe erro de CORS.

**Solução:**
- O CORS já está habilitado no servidor
- Se continuar o problema, verifique a URL do frontend (deve ser `localhost:8080`)
- Adicione debug logs no `index.js` se necessário

## 📚 Estrutura do Projeto

```
server/
├── index.js           # Servidor Express principal
├── package.json       # Dependências
├── .env              # Variáveis de ambiente (NÃO commit)
├── .env.example      # Template (commit this)
└── README.md         # Este arquivo
```

## 🔐 Segurança

- ✅ Variáveis sensíveis no `.env` (não commitadas)
- ✅ Validação de campos obrigatórios
- ✅ Validação de email
- ⚠️ **TODO:** Adicionar rate limiting (usar `express-rate-limit`)
- ⚠️ **TODO:** Adicionar autenticação se necessário

## 📖 Referências

- [Express.js](https://expressjs.com/)
- [EmailJS Node.js SDK](https://www.emailjs.com/docs/sdk/nodejs/)
- [Dotenv](https://github.com/motdotla/dotenv)
- [CORS](https://github.com/expressjs/cors)

## 📝 Logs

O servidor gera logs úteis:

```
✅ Email enviado com sucesso: [messageId]
❌ Erro ao enviar email: [erro]
🚀 Servidor rodando em http://localhost:3001
📧 Emails serão enviados para: felipeglacerdaa@hotmail.com
```

---

**Precisa de ajuda?** Verifique o console do servidor para logs detalhados de erros.
