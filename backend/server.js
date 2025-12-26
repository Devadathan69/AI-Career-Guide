const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const { analyzeResponses } = require('./services/llm_service');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid input. Expected an array of answers.' });
    }

    const result = await analyzeResponses(answers);
    res.json(result);
  } catch (error) {
    console.error('Error in /api/analyze:', error);
    res.status(500).json({ error: 'Internal server error processing your request.' });
  }
});

// Export for Vercel (Serverless)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
