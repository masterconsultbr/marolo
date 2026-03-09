# 🚀 Backend - Futebol App

API Express + Supabase para gerenciar times de futebol.

## Setup

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie arquivo `.env` na raiz do `/backend`:
```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_secreta
PORT=5000
NODE_ENV=development
```

**Como conseguir as chaves:**
1. Acesse https://supabase.com
2. Crie novo projeto ou entre em um existente
3. Vá em **Settings → API**
4. Copie `URL` e `anon public key`

### 3. Criar tabelas no Supabase

1. No Supabase, vá em **SQL Editor**
2. Clique em **New Query**
3. Copie o conteúdo de `src/db/schema.sql`
4. Execute

### 4. Rodar localmente
```bash
npm run dev
```

Server rodará em `http://localhost:5000`

## 📡 Endpoints

### Players
```
GET    /api/players              → Listar todos
POST   /api/players              → Criar novo
PUT    /api/players/:id          → Editar
DELETE /api/players/:id          → Deletar
```

### Payments
```
GET    /api/payments             → Listar pagamentos
GET    /api/payments?month=3&year=2024
POST   /api/payments             → Criar pagamento
PUT    /api/payments/:id         → Editar pagamento
DELETE /api/payments/:id         → Deletar pagamento
GET    /api/payments/summary     → Adimplentes vs inadimplentes
```

### Games
```
GET    /api/games                → Listar jogos
POST   /api/games                → Criar jogo
PUT    /api/games/:id            → Editar jogo
DELETE /api/games/:id            → Deletar jogo
```

### Attendance
```
GET    /api/attendance/game/:gameId    → Presença em jogo específico
POST   /api/attendance                 → Registrar presença
PUT    /api/attendance/:id             → Atualizar presença
DELETE /api/attendance/:id             → Deletar presença
GET    /api/attendance/stats/:playerId → Stats individual do jogador
```

### Cash
```
GET    /api/cash/balance         → Saldo total em caixa
GET    /api/cash/summary         → Resumo (receita, despesa, saldo)
GET    /api/cash/history         → Histórico de movimentações
POST   /api/cash                 → Registrar entrada/saída
DELETE /api/cash/:id             → Deletar movimentação
```

### Stats
```
GET    /api/stats/top-scorers    → Top 10 artilheiros
GET    /api/stats/top-assists    → Top 10 assistências
GET    /api/stats/player-stats   → Estatísticas de todos os jogadores
```

## 📝 Exemplos de Requests

### Criar jogador
```bash
curl -X POST http://localhost:5000/api/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "position": "Atacante"
  }'
```

### Registrar pagamento
```bash
curl -X POST http://localhost:5000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "player_id": 1,
    "amount": 50.00,
    "status": "paid",
    "month": 3,
    "year": 2024
  }'
```

### Registrar jogo
```bash
curl -X POST http://localhost:5000/api/games \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-03-15",
    "opponent": "Time do Bairro"
  }'
```

### Registrar presença
```bash
curl -X POST http://localhost:5000/api/attendance \
  -H "Content-Type: application/json" \
  -d '{
    "player_id": 1,
    "game_id": 1,
    "goals": 2,
    "assists": 1
  }'
```

### Registrar movimento de caixa
```bash
curl -X POST http://localhost:5000/api/cash \
  -H "Content-Type: application/json" \
  -d '{
    "type": "income",
    "amount": 150.00,
    "description": "Mensalidade João Silva"
  }'
```

## 🧪 Testar no Postman/Thunder Client

1. Importe as requisições acima
2. Mude `http://localhost:5000` para seu URL de produção quando deployar

## 📦 Deploy (Railway)

1. Push seu código para GitHub
2. Vá em https://railway.app
3. New Project → GitHub Repo
4. Adicione variáveis de ambiente
5. Deploy automático

**Nota:** Railway automaticamente detecta Node.js e cria banco PostgreSQL se necessário
