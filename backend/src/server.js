import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import playerRoutes from './routes/players.js';
import paymentRoutes from './routes/payments.js';
import gameRoutes from './routes/games.js';
import attendanceRoutes from './routes/attendance.js';
import cashRoutes from './routes/cash.js';
import statsRoutes from './routes/stats.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/players', playerRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/cash', cashRoutes);
app.use('/api/stats', statsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});