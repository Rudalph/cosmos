const express = require("express");
const axios = require("axios");
const router = express.Router();

const NASA_API_KEY = "22RqS4n17JEOTTXGovheHtE0zQgQHJhDBISiCidQ"; // Replace with your key

router.get("/", async (req, res) => {
  try {
    const { date, start_date, end_date, count, thumbs } = req.query;

    let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
    if (date) apiUrl += `&date=${date}`;
    if (start_date) apiUrl += `&start_date=${start_date}`;
    if (end_date) apiUrl += `&end_date=${end_date}`;
    if (count) apiUrl += `&count=${count}`;
    if (thumbs === "true") apiUrl += `&thumbs=true`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
