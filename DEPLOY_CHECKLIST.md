# ✅ CHECKLIST - Migração para Supabase + Render

## 📋 O que foi feito:

- [x] **Desativou função serverless do Vercel** (`api/contact.js`)
  - Agora retorna erro com mensagem clara apontando para usar Render
  
- [x] **Criou `.env.production` para Render** (`server/.env.production`)
  - Todas as variáveis de ambiente já configuradas
  
- [x] **Atualizou ContactForm.tsx**
  - ✅ Produção: aponta para URL do Render
  - ✅ Desenvolvimento: aponta para localhost:3002

- [x] **Servidor Express preparado** (`server/index.js`)
  - ✅ CORS configurado
  - ✅ Supabase integrado
  - ✅ EmailJS como fallback
  - ✅ Validações funcionando

## 🚀 PRÓXIMOS PASSOS:

### 1. Deploy no Render (30 minutos)
   ```
   1) Acesse https://render.com
   2) Clique "New +"  → "Web Service"
   3) Conecte seu repositório GitHub
   4) Preencha:
      - Build Command: cd server && npm install
      - Start Command: cd server && npm start
   5) Copie todas as variáveis de `server/.env.production` em Environment
   6) Clique "Create Web Service"
   7) Aguarde 2-3 minutos
   8) Você receberá uma URL como:
      https://seu-profile-page-api.onrender.com
   ```

### 2. Atualize Frontend (5 minutos)
   ```
   Em src/components/ContactForm.tsx:
   
   TROCAR ISTO:
   const backendUrl = isProduction 
     ? 'https://seu-app.onrender.com'
     : 'http://localhost:3002';
   
   PELA SUA URL DO RENDER (obtida no passo 1):
   const backendUrl = isProduction 
     ? 'https://seu-profile-page-api.onrender.com'  // ← Sua URL real
     : 'http://localhost:3002';
   ```

### 3. Teste Localmente (5 minutos)
   ```bash
   # Terminal 1
   npm run dev
   
   # Terminal 2
   npm run server:dev
   
   # Acesse http://localhost:5173
   # Teste o formulário de contato
   ```

### 4. Faça Push (1 minuto)
   ```bash
   git add .
   git commit -m "feat: migrate to Render backend + Supabase, remove Vercel serverless"
   git push origin main
   ```

## 🔍 COMO TESTAR:

1. **Testar Backend (Render)**
   ```
   GET https://seu-profile-page-api.onrender.com/health
   ```
   Deve retornar:
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

2. **Testar Formulário**
   - Abra DevTools (F12)
   - Aba Network
   - Preencha formulário
   - Procure por `/api/contact`
   - Clique nela
   - Veja "Response" para erro específico (se houver)

## ⚠️ SOLUÇÃO DE PROBLEMAS:

### "Server is running but services are ❌"
- Verifique se as variáveis de ambiente foram adicionadas no Render
- Clique no service → Settings → Environment
- Copie exatamente de `server/.env.production`

### "Unexpected token 'A'"
- Significa: Frontend está tentando usar Vercel serverless antigo
- ✅ Você já corrigiu isso, mas se ainda acontecer:
  1. Verifique a URL em ContactForm.tsx
  2. Limpe cache do navegador (Ctrl+Shift+Del)
  3. Redeploy no Vercel (push simples no GitHub)

### "Failed to fetch" (erro CORS)
- Backend não está respondendo
- Verifique se Render está "online" (não está dormindo)
- Acesse seu health check: `https://seu-profile-page-api.onrender.com/health`
- Free tier do Render "dorme" após 15 min sem uso

### Email não está chegando
- Abra health check: `/health`
- `emailjs: ❌` = Credenciais erradas ou não configuradas
- `emailjs: ✅` = Tudo OK, mas EmailJS API pode estar rejeitando
  - Vá a console.emailjs.com
  - Verifique limits/quota

## 📊 ARQUITETURA FINAL:

```
┌─────────────────────────────────────────┐
│  Frontend (Vercel)                      │
│  ✅ React + Vite + TailwindCSS          │
│  → https://seu-site.vercel.app          │
└────────────┬────────────────────────────┘
             │
             │ HTTP POST /api/contact
             ↓
┌─────────────────────────────────────────┐
│  Backend (Render)                       │
│  ✅ Express.js + Node.js                │
│  → https://seu-profile-page-api.onrender.com
└────────────┬────────────────────────────┘
             │
      ┌──────┴──────┐
      ↓             ↓
  ┌────────┐  ┌──────────────┐
  │EmailJS │  │  Supabase    │
  │(Gmail) │  │  PostgreSQL  │
  └────────┘  └──────────────┘
```

---
**Status: ✅ Pronto para Deploy!**

Qualquer dúvida, volte aqui com a mensagem de erro do console (F12).
