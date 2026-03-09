# 🚀 Frontend - Futebol App

React + Vite + Tailwind CSS

## Setup

### 1. Instalar dependências
```bash
npm install
```

### 2. Variáveis de ambiente

Crie arquivo `.env.local` na raiz do `/frontend`:
```env
VITE_API_URL=http://localhost:5000/api
```

**Para produção:**
```env
VITE_API_URL=https://seu-backend-production.up.railway.app/api
```

### 3. Rodar localmente
```bash
npm run dev
```

Acesse `http://localhost:5173`

## 📁 Estrutura

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navbar.jsx
│   └── Card.jsx
├── pages/               # Páginas da aplicação
│   ├── Dashboard.jsx
│   ├── Players.jsx
│   ├── Payments.jsx
│   ├── Games.jsx
│   ├── Cash.jsx
│   └── Stats.jsx
├── services/            # Chamadas API
│   └── api.js
├── App.jsx              # Root component
├── main.jsx             # Entry point
└── index.css            # Tailwind global
```

## 🎨 Design

- **Dark theme** (cinza escuro com acentos verdes)
- **Mobile-first** (responsivo para todos os tamanhos)
- **Tailwind CSS** para estilos utilitários

## 🚢 Deploy (Vercel)

### 1. Push para GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Vercel setup
1. Acesse https://vercel.com
2. Import seu repositório GitHub
3. Selecione pasta: `frontend/`
4. Variáveis de ambiente:
   ```
   VITE_API_URL=https://seu-backend.up.railway.app/api
   ```
5. Deploy automático

### URL pública
```
https://seu-projeto.vercel.app
```

## 🧪 Páginas

- **Dashboard** - Resumo KPIs (caixa, adimplentes, artilheiros)
- **Jogadores** - CRUD de jogadores
- **Mensalidades** - Controle de pagamentos
- **Jogos** - Agenda de jogos
- **Caixa** - Entrada/saída de dinheiro
- **Estatísticas** - Rankings e gráficos

## 📝 Exemplos de Uso

### Adicionar jogador
1. Vá em **Jogadores**
2. Preencha nome e posição
3. Clique **Adicionar**

### Registrar pagamento
1. Vá em **Mensalidades**
2. Selecione jogador
3. Preencha valor, mês e ano
4. Clique **Registrar**

### Agendar jogo
1. Vá em **Jogos**
2. Preencha data e adversário
3. Clique **Agendar**
