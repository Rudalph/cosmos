// backend/routes/asteroids.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const NASA_API_KEY = '22RqS4n17JEOTTXGovheHtE0zQgQHJhDBISiCidQ';

router.get('/', async (req, res) => {
  const { start_date, end_date } = req.query;

  if (!start_date || !end_date) {
    return res.status(400).json({ error: 'Both start_date and end_date are required.' });
  }

  try {
    const nasaRes = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
      params: {
        start_date,
        end_date,
        api_key: NASA_API_KEY
      }
    });

    res.json(nasaRes.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from NASA API' });
  }
});

module.exports = router;
