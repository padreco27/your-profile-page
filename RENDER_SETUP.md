# 🚀 Guia de Deploy no Render

## Pré-requisitos
- Conta no [Render.com](https://render.com) (grátis)
- Seu repositório no GitHub

## Passo 1: Prepare o servidor
✅ O arquivo `server/package.json` já existe? Verifique se tem:
```json
{
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  }
}
```

Se não existir, execute:
```bash
cd server && npm init -y
```

## Passo 2: No Render.com
1. **Criar novo Web Service**
   - Conecte ao seu repositório GitHub
   - Escolha branch main
   - Nome: `seu-profile-page-api`

2. **Configurações**
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: `.` (deixe padrão)

3. **Variáveis de Ambiente**
   Clique em "Environment" e adicione:
   ```
   PORT=3000
   NODE_ENV=production
   EMAILJS_SERVICE_ID=service_b3w3ggq
   EMAILJS_TEMPLATE_ID=template_mo7gme9
   EMAILJS_PUBLIC_KEY=sWfQhVPETYl48Zzpv
   EMAILJS_PRIVATE_KEY=4ubbvFfiFO6TMsTBx2KDK
   EMAILJS_TO_EMAIL=presencaproo@hotmail.com
   SUPABASE_URL=https://uoceecsreeiemovrdweo.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvY2VlY3NyZWVpZW1vdnJkd2VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MDA4NjUsImV4cCI6MjA4OTk3Njg2NX0.I9fP9Xsman9mMViYYqcF5Hb2OjeJCx48RFMW-dXIzs4
   ```

4. **Deploy**
   - Clique em "Create Web Service"
   - Aguarde ~2 min
   - Você receberá uma URL como: `https://seu-profile-page-api.onrender.com`

## Passo 3: Atualize o Frontend

No `src/components/ContactForm.tsx`, trocar:
```typescript
const backendUrl = isProduction 
  ? 'https://seu-app.onrender.com' // ← AQUI
  : 'http://localhost:3002';
```

Para a URL real do Render:
```typescript
const backendUrl = isProduction 
  ? 'https://seu-profile-page-api.onrender.com'
  : 'http://localhost:3002';
```

## Passo 4: Deploy do Frontend

Se está usando Vercel:
1. Faça push das mudanças
2. Vercel detecta automaticamente e faz deploy
3. Pronto! ✅

## Testando Localmente
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server:dev
```

Acesse http://localhost:5173 e teste o formulário.

## ⚠️ Erro Comum: "Unexpected token 'A'"
Se ainda receber esse erro:
1. Abra DevTools (F12) > Aba Network
2. Clique em "Enviar formulário"
3. Procure a requisição para `/api/contact`
4. Veja a resposta (Response) para identificar o erro real
5. Check se as variáveis de ambiente estão configuradas no Render

## Verificação de Saúde
Acesse: `https://seu-profile-page-api.onrender.com/health`

Deve retornar algo como:
```json
{
  "status": "Server is running ✅",
  "services": {
    "gmail": "❌ Não configurado",
    "emailjs": "✅ Configurado",
    "supabase": "✅ Configurado"
  }
}
```

---
**Sucesso!** Seu sistema agora usa: **Frontend (Vercel) + Backend (Render) + Database (Supabase)**
