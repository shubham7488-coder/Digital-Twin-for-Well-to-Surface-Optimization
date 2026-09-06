/**
 * SIH 26120: Master Express & Node.js Digital Twin Server
 * AI-Powered Well-to-Surface Digital Twin for Integrated CSS-SRP Optimization
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./backend/routes/apiRoutes');

const app = express();
const DEFAULT_PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger for SCADA telemetry & DCS monitoring
app.use((req, res, next) => {
  if (!req.url.includes('/stream')) {
    console.log(`[SCADA-DCS] ${new Date().toISOString().split('T')[1].split('.')[0]} | ${req.method} ${req.url}`);
  }
  next();
});

// API Routes
app.use('/api', apiRoutes);

// Static files for Dashboard & Flowchart
app.use(express.static(path.join(__dirname, 'prototype')));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'prototype', 'index.html'));
});

// Catch-all to index.html
app.get('*', (req, res) => {
  if (req.url.startsWith('/api')) {
    return res.status(404).json({ error: "Endpoint not found" });
  }
  res.sendFile(path.join(__dirname, 'prototype', 'index.html'));
});

// Robust Port Listener with Automatic Fallback
function startServer(port) {
  const server = app.listen(port, () => {
    console.log('================================================================');
    console.log(` 🚀 SIH 26120 DIGITAL TWIN BACKEND SERVER RUNNING`);
    console.log(` 🌐 Main Portal:         http://localhost:${port}`);
    console.log(` 📊 Operations Dashboard: http://localhost:${port}/industrial_dashboard.html`);
    console.log(` 🔄 Master Flowchart:    http://localhost:${port}/sih_26120_flowchart.html`);
    console.log(` 📡 Real-time SSE Feed:  http://localhost:${port}/api/telemetry/stream`);
    console.log(` 💾 Database Status:     http://localhost:${port}/api/database/stats`);
    console.log('================================================================');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} in use, attempting port ${Number(port) + 1}...`);
      startServer(Number(port) + 1);
    } else {
      console.error("Server error:", err);
    }
  });
}

startServer(DEFAULT_PORT);
