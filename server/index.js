const express = require('express');
const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Mock weather data
const weatherData = {
  "New York": { temperature: 25, condition: "Sunny" },
  "London": { temperature: 15, condition: "Cloudy" },
  "Tokyo": { temperature: 30, condition: "Rainy" }
};

// Dummy API key (replace with your actual API key)
const apiKey = "super_secret_key";

// Middleware to check API key
function checkApiKey(req, res, next) {
  const providedApiKey = req.query.apiKey;
  if (!providedApiKey || providedApiKey !== apiKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// Endpoint to get weather data
app.get('/weather', checkApiKey, (req, res) => {
  const city = req.query.city;
  if (!city || !weatherData[city]) {
    return res.status(404).json({ error: "City not found" });
  }
  const { temperature, condition } = weatherData[city];
  res.json({ city, temperature, condition });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
