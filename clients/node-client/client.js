const http = require('http');
const url = require('url');

// Define the URL of the weather service
const baseURL = 'http://localhost:3000/weather';

// Define the parameters (city and API key)
const params = new URLSearchParams({
  city: 'New York', // Change the city name as needed
  apiKey: 'your_api_key_here' // Replace with your actual API key
});

// Build the URL with parameters
const weatherURL = `${baseURL}?${params}`;

// Make an HTTP GET request to the weather service
http.get(weatherURL, (res) => {
  let data = '';

  // Concatenate received data
  res.on('data', (chunk) => {
    data += chunk;
  });

  // Print the weather data
  res.on('end', () => {
    console.log('Weather Data:');
    console.log(data);
  });
}).on('error', (err) => {
  console.error('Error making request:', err);
});
