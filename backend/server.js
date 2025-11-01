// backend/server.js

const express = require('express');
const cors = require('cors');

const tasksRouter = require('./src/routes/tasks.router');
const { getInsights } = require('./src/services/insight.service');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRouter);

app.get('/insights', (req, res) => {
  try {
    const insights = getInsights();
    res.json(insights);
  } catch (err) {
    console.error('Error generating insights:', err);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});



app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
