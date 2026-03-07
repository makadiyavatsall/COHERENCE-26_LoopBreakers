const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const trialRoutes = require('./routes/trialRoutes');
const authRoutes = require('./routes/authRoutes');
const entryPatientRoutes = require('./routes/entryPatientRoutes');
const { authMiddleware } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Connect to MongoDB ──────────────────────────
connectDB();

// ── Middleware ───────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ──────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/trials', trialRoutes);
app.use('/api/entry-patient', entryPatientRoutes);

// ── Serve uploaded files ────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Health Check ────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: 'Mediwell Healthcare Backend — Running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/signup | /api/auth/login',
      trials: '/api/trials (protected)',
    },
  });
});

// ── Start Server ────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
