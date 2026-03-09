# ⚡ Guia Rápido (15 minutos)

Siga este guia para ter a aplicação rodando localmente em 15 minutos.

## ✅ Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Conta Supabase (crie em https://supabase.com gratuitamente)
- Um editor de código (VS Code recomendado)

## 🚀 Início Rápido

### Passo 1: Crie um projeto Supabase (3 min)

1. Acesse https://supabase.com
2. Clique **New project**
3. Dê um nome (ex: "futebol-app")
4. Escolha uma região próxima
5. Clique **Create new project**
6. Aguarde criação (1-2 min)

### Passo 2: Copie as chaves (1 min)

1. No seu projeto Supabase, vá em **Settings → API**
2. Copie:
   - `Project URL` → `SUPABASE_URL`
   - `anon public` → `SUPABASE_ANON_KEY`

### Passo 3: Crie as tabelas (2 min)

1. No Supabase, vá em **SQL Editor**
2. Clique **New query**
3. Copie todo o conteúdo de `backend/src/db/schema.sql`
4. Cole e clique **Run**
5. Aguarde sucesso

### Passo 4: Configure Backend (3 min)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env com suas chaves do Supabase
# SUPABASE_URL=https://seu-projeto.supabase.co
# SUPABASE_ANON_KEY=sua_chave_anonima
```

### Passo 5: Configure Frontend (2 min)

```bash
# Navigate to frontend folder
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# .env.local já está pronto, pois aponta para localhost:5000
```

### Passo 6: Rode o App (3 min)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Aguarde: `✅ Server running on http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Aguarde: `VITE v5.0.0 ready in XXX ms` e navegador abrir em http://localhost:5173

## ✨ Você completou!

Agora você tem:
- ✅ Backend rodando em `http://localhost:5000`
- ✅ Frontend rodando em `http://localhost:5173`
- ✅ Banco de dados conectado (Supabase)

## 🧪 Teste a App

1. Abra http://localhost:5173 no navegador
2. Vá em **Jogadores**
3. Adicione seu nome como jogador
4. Vá em **Caixa** e registre um movimento
5. Volte ao **Dashboard** e veja os dados aparecerem

## 🚨 Problemas?

### "Cannot find module @supabase/supabase-js"
```bash
cd backend
npm install @supabase/supabase-js
```

### "CORS error"
Verifique se `VITE_API_URL` aponta para `http://localhost:5000/api`

### "Port 5000 já está em uso"
```bash
# Kill processo na porta 5000 (Linux/Mac)
lsof -ti:5000 | xargs kill -9
```

## 📝 Próximos Passos

1. **Explorar o código** - Veja como funciona cada página
2. **Adicionar features** - Crie novas funcionalidades
3. **Fazer deploy** - Siga instruções de deploy no README principal
4. **Compartilhar** - Envie o link para seus amigos

## 💡 Dicas

- Use **Postman/Thunder Client** para testar a API
- Abra **DevTools** (F12) para ver erros
- Cheque **console do navegador** para erros do frontend
- Cheque **terminal do backend** para erros da API

---

**Sucesso! 🎉** Se tiver problemas, volte ao README principal ou veja a seção Troubleshooting.
