const express = require('express');
const fs = require('fs');
const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Path to the weather data JSON file
const weatherDataFile = 'weather.json';

// Dummy API key (replace with your actual API key)
const apiKey = "your_api_key_here";

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
  fs.readFile(weatherDataFile, (err, data) => {
    if (err) {
      console.error('Error reading weather data file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const weatherData = JSON.parse(data);
    const city = req.query.city;
    if (!city || !weatherData[city]) {
      return res.status(404).json({ error: 'City not found' });
    }
    res.json({ city, ...weatherData[city] });
  });
});


app.delete('/weather', checkApiKey, (req, res) => {
  fs.readFile(weatherDataFile, (err, data) => {
    if (err) {
      console.error('Error reading weather data file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const weatherData = JSON.parse(data);
    const {city} = req.body;

    console.log(weatherData);

    if (!city || !weatherData[city]) {
      return res.status(404).json({ error: 'City not found' });
    }else {
      console.log('deleting city ' + city)
      delete weatherData[city]
      fs.writeFile(weatherDataFile, JSON.stringify(weatherData, null, 2), (err) => {
        if (err) {
          console.error('Error writing file');
          return res.status(500).json({error: 'Internal Server Error'})
        }
      })
      return res.json('City Deleted')
    }
  });
});

// Endpoint to append new weather data
app.post('/weather', checkApiKey, (req, res) => {
  const { city, temperature, condition } = req.body;
  if (!city || !temperature || !condition) {
    return res.status(400).json({ error: 'City, temperature, and condition are required' });
  }
  fs.readFile(weatherDataFile, (err, data) => {
    if (err) {
      console.error('Error reading weather data file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const weatherData = JSON.parse(data);
    weatherData[city] = { temperature, condition };
    fs.writeFile(weatherDataFile, JSON.stringify(weatherData, null, 2), (err) => {
      if (err) {
        console.error('Error writing weather data file:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ message: 'Weather data updated successfully', city, temperature, condition });
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
