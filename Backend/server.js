const express = require("express");
const cors = require("cors");
const apodRouter = require("./routes/apodRouter");
const nasaImageRouter = require('./routes/nasaImageRouter');
const asteroidRouter = require('./routes/neowsRouter')

const app = express();
const PORT = 5000;

app.use(cors());

app.use("/api/apod", apodRouter);
app.use("/api/nasa", nasaImageRouter);
app.use('/api/asteroids', asteroidRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
