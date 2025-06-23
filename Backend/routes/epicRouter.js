// backend/Routes/epic.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = '22RqS4n17JEOTTXGovheHtE0zQgQHJhDBISiCidQ';

router.get('/', async (req, res) => {
  const { date } = req.query;

  if (!date) return res.status(400).json({ error: 'Date is required' });

  try {
    const nasaRes = await axios.get(`https://api.nasa.gov/EPIC/api/natural/date/${date}`, {
      params: { api_key: API_KEY }
    });

    res.json(nasaRes.data);
  } catch (err) {
    res.status(500).json({ error: 'NASA EPIC API call failed', details: err.message });
  }
});

module.exports = router;
