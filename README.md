<<<<<<< HEAD
# ⚽ Futebol App - Gestão de Time

Um aplicativo web para gerenciar mensalidades, frequência, estatísticas e caixa de times de futebol.

## 🎯 Features

- ✅ Dashboard com resumo (caixa, adimplentes, artilheiro)
- ✅ Controle de jogadores (add, editar, deletar)
- ✅ Gestão de mensalidades (quem pagou, quem não pagou)
- ✅ Marcar presença em jogos (gols, assistências)
- ✅ Ranking de artilheiro e assistências
- ✅ Histórico de caixa (entradas/saídas)
- ✅ Interface responsiva (mobile-first)

## 🛠️ Tech Stack

### Frontend
- **React 18** + Vite
- **Tailwind CSS** + shadcn/ui
- **Axios** para chamadas API
- **React Router** para navegação

### Backend
- **Node.js** + Express
- **Supabase** (PostgreSQL gerenciado)
- **Estrutura MVC** (Controllers, Services, Routes)

### Deploy
- **Frontend:** Vercel (automático)
- **Backend:** Railway (automático)

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Conta Supabase (grátis em https://supabase.com)
- Conta GitHub
- Conta Vercel (link com GitHub)
- Conta Railway (link com GitHub)

## 🚀 Setup Local

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/futebol-app.git
cd futebol-app
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Crie arquivo `.env` na raiz de `/backend`:
```env
SUPABASE_URL=sua_url_supabase_aqui
SUPABASE_ANON_KEY=sua_chave_publica_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_chave_secreta_aqui
PORT=5000
NODE_ENV=development
```

Execute migrations:
```bash
npm run migrate
```

Inicie o servidor:
```bash
npm run dev
```

Backend rodará em `http://localhost:5000`

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```

Crie arquivo `.env.local` na raiz de `/frontend`:
```env
VITE_API_URL=http://localhost:5000/api
```

Inicie o app:
```bash
npm run dev
```

Frontend rodará em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
futebol-app/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Lógica de requisições
│   │   ├── services/         # Lógica de negócio
│   │   ├── routes/           # Definição de rotas
│   │   ├── db/
│   │   │   ├── migrations/   # Schema do banco
│   │   │   └── supabase.js   # Configuração Supabase
│   │   ├── config/           # Variáveis de ambiente
│   │   ├── middleware/       # CORS, validação
│   │   └── server.js         # Entry point
│   ├── .env                  # Variáveis locais (não commitar)
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/            # Páginas (Dashboard, Players, etc)
│   │   ├── services/         # Chamadas API
│   │   ├── hooks/            # Custom hooks
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.local            # Variáveis locais
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
└── README.md
```

## 🗄️ Banco de Dados (Supabase)

### Tabelas criadas automaticamente
```sql
-- Players
CREATE TABLE players (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Payments (Mensalidades)
CREATE TABLE payments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  player_id BIGINT REFERENCES players(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2),
  status VARCHAR(20) DEFAULT 'pending', -- 'paid', 'pending'
  month INTEGER,
  year INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Games (Jogos)
CREATE TABLE games (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  date DATE,
  opponent VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Attendance (Presença)
CREATE TABLE attendance (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  player_id BIGINT REFERENCES players(id) ON DELETE CASCADE,
  game_id BIGINT REFERENCES games(id) ON DELETE CASCADE,
  goals INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Cash Flow
CREATE TABLE cash_flow (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  type VARCHAR(20) NOT NULL, -- 'income', 'expense'
  amount DECIMAL(10, 2) NOT NULL,
  description VARCHAR(200),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 📡 API Endpoints

### Players
- `GET /api/players` - Listar todos
- `POST /api/players` - Criar novo
- `PUT /api/players/:id` - Editar
- `DELETE /api/players/:id` - Deletar

### Payments
- `GET /api/payments` - Listar
- `POST /api/payments` - Criar
- `PUT /api/payments/:id` - Editar

### Games
- `GET /api/games` - Listar
- `POST /api/games` - Criar

### Attendance
- `POST /api/attendance` - Registrar presença
- `GET /api/attendance/game/:gameId` - Presença em jogo específico

### Cash
- `GET /api/cash` - Saldo total
- `GET /api/cash/history` - Histórico
- `POST /api/cash` - Registrar movimento

### Stats
- `GET /api/stats/top-scorers` - Ranking artilheiros
- `GET /api/stats/top-assists` - Ranking assistências

## 🚢 Deploy

### Deploy Frontend (Vercel)
1. Push seu código para GitHub
2. Acesse https://vercel.com
3. Import seu repositório
4. Selecione pasta `frontend/`
5. Adicione variável de ambiente:
   ```
   VITE_API_URL=https://seu-backend-railway.up.railway.app/api
   ```
6. Deploy automático

### Deploy Backend (Railway)
1. Acesse https://railway.app
2. New Project → GitHub Repo
3. Selecione seu repositório
4. Railway detecta Node.js automaticamente
5. Adicione variáveis de ambiente:
   ```
   SUPABASE_URL=...
   SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   PORT=3000
   NODE_ENV=production
   ```
6. Deploy automático

## 📝 Commits Recomendados

```bash
git add .
git commit -m "feat: initial project setup"
git commit -m "feat: backend structure and routes"
git commit -m "feat: frontend base and components"
git commit -m "feat: players CRUD"
git commit -m "feat: payments management"
git commit -m "feat: games and attendance"
git commit -m "feat: cash flow tracking"
git commit -m "feat: stats and rankings"
```

## 🐛 Troubleshooting

**Erro de conexão com Supabase**
- Verifique credenciais no `.env`
- Confirme que tabelas foram criadas no Supabase

**CORS error no frontend**
- Verifique `VITE_API_URL` no `.env.local`
- Backend deve ter CORS habilitado para origem do frontend

**Port já em uso**
```bash
# Kill processo na porta 5000 (Linux/Mac)
lsof -ti:5000 | xargs kill -9
```

## 📈 Roadmap Futuro

- [ ] Gráficos de estatísticas (Chart.js)
- [ ] Relatórios em PDF
- [ ] Notificações por email
- [ ] App mobile (React Native)
- [ ] Sistema de multas por falta
- [ ] Integração com Stripe (cobrar online)

## 👨‍💻 Autor

Seu Nome - [@seu-github](https://github.com/seu-usuario)

## 📄 Licença

MIT
=======
# marolo
>>>>>>> 1110bdfcc562914f6c5be933fdad9170ead18aa1
