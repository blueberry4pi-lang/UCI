const express = require('express');
const cron = require('node-cron');
const path = require('path');
const raceRoutes = require('./api/routes/races');
const rankingRoutes = require('./api/routes/rankings');
const countdownRoutes = require('./api/routes/countdown');
const synchronizationService = require('./services/synchronizationService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/races', raceRoutes);
app.use('/api/rankings', rankingRoutes);
app.use('/api/countdown', countdownRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'UCI Cycling Data Application'
  });
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Initialize synchronization
synchronizationService.initialize();

// Start server
app.listen(PORT, () => {
  console.log(`UCI Cycling Data Application running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});

module.exports = app;