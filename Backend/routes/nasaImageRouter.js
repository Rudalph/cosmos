const express = require("express");
const axios = require("axios");
const router = express.Router();

// Base NASA Image API URL
const BASE_URL = "https://images-api.nasa.gov";

// 1. Search Endpoint
router.get("/search", async (req, res) => {
  try {
    const { q, media_type } = req.query;
    const url = `${BASE_URL}/search?q=${encodeURIComponent(q)}${media_type ? `&media_type=${media_type}` : ""}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Error searching NASA media." });
  }
});

// 2. Get Asset by nasa_id
router.get("/asset/:nasa_id", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/asset/${req.params.nasa_id}`);
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Error fetching asset." });
  }
});

// 3. Get Metadata
router.get("/metadata/:nasa_id", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/metadata/${req.params.nasa_id}`);
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Error fetching metadata." });
  }
});

// 4. Get Captions
router.get("/captions/:nasa_id", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/captions/${req.params.nasa_id}`);
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Error fetching captions." });
  }
});

module.exports = router;
