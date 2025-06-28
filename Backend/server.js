const express = require("express");
const cors = require("cors");
const apodRouter = require("./routes/apodRouter");
const nasaImageRouter = require('./routes/nasaImageRouter');
const asteroidRouter = require('./routes/neowsRouter')
const epicRouter = require('./routes/epicRouter');
const keepAlikeRouter = require('./routes/keepAliveRouter')
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());

app.use("/api/apod", apodRouter);
app.use("/api/nasa", nasaImageRouter);
app.use('/api/asteroids', asteroidRouter);
app.use('/api/epic', epicRouter);
app.use('/api', keepAlikeRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


const SELF_URL = 'https://your-render-url.onrender.com/api/ping'; // Replace with your actual deployed URL

setInterval(() => {
  axios.get(SELF_URL)
    .then(() => console.log('Self-ping successful'))
    .catch(err => console.error('Self-ping failed:', err.message));
}, 5 * 60 * 1000);
