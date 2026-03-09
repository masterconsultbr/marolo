import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Players
export const playerService = {
  getAll: () => api.get('/players'),
  create: (data) => api.post('/players', data),
  update: (id, data) => api.put(`/players/${id}`, data),
  delete: (id) => api.delete(`/players/${id}`),
};

// Payments
export const paymentService = {
  getAll: (params) => api.get('/payments', { params }),
  getSummary: (params) => api.get('/payments/summary', { params }),
  create: (data) => api.post('/payments', data),
  update: (id, data) => api.put(`/payments/${id}`, data),
  delete: (id) => api.delete(`/payments/${id}`),
};

// Games
export const gameService = {
  getAll: () => api.get('/games'),
  create: (data) => api.post('/games', data),
  update: (id, data) => api.put(`/games/${id}`, data),
  delete: (id) => api.delete(`/games/${id}`),
};

// Attendance
export const attendanceService = {
  getByGame: (gameId) => api.get(`/attendance/game/${gameId}`),
  record: (data) => api.post('/attendance', data),
  update: (id, data) => api.put(`/attendance/${id}`, data),
  delete: (id) => api.delete(`/attendance/${id}`),
  getPlayerStats: (playerId) => api.get(`/attendance/stats/${playerId}`),
};

// Cash
export const cashService = {
  getBalance: () => api.get('/cash/balance'),
  getSummary: () => api.get('/cash/summary'),
  getHistory: (params) => api.get('/cash/history', { params }),
  record: (data) => api.post('/cash', data),
  delete: (id) => api.delete(`/cash/${id}`),
};

// Stats
export const statsService = {
  getTopScorers: (params) => api.get('/stats/top-scorers', { params }),
  getTopAssists: (params) => api.get('/stats/top-assists', { params }),
  getPlayerStats: () => api.get('/stats/player-stats'),
};

export default api;
