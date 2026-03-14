// Import required packages
const express = require('express');  // Web framework for Node.js
const cors = require('cors');        // Allows React app to talk to backend
const axios = require('axios');      // Makes HTTP requests to weather API
require('dotenv').config();          // Loads environment variables from .env file

// Create express application
const app = express();

// Define port - use from .env or default to 5000
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====
// These are functions that run before your routes

// Enable CORS (allows your React app to communicate with this backend)
app.use(cors());

// Parse JSON data in requests (so we can read req.body)
app.use(express.json());

// ===== ROUTES =====

// Test route to check if server is working
app.get('/', (req, res) => {
    res.send('Weather API Server is Running!');
});

// Main weather route - gets weather for a specific city
// The :city part is a URL parameter - e.g., /api/weather/London
app.get('/api/weather/:city', async (req, res) => {
    try {
        // Get city name from URL parameter
        const { city } = req.params;
        
        // Get API key from environment variables (stored in .env)
        const API_KEY = process.env.API_KEY;
        
        // Make request to OpenWeatherMap API
        // units=metric means temperature in Celsius
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        // Extract MORE data from the API response
        const weatherData = {
            city: response.data.name,                          // City name
            country: response.data.sys.country,               
            temperature: response.data.main.temp,              
            feelsLike: response.data.main.feels_like,          
            tempMin: response.data.main.temp_min,              
            tempMax: response.data.main.temp_max,             
            description: response.data.weather[0].description, 
            main: response.data.weather[0].main,              
            humidity: response.data.main.humidity,              
            pressure: response.data.main.pressure,              
            windSpeed: response.data.wind.speed,               
            windDeg: response.data.wind.deg,                    
            clouds: response.data.clouds.all,                  
            visibility: response.data.visibility / 1000,       
            icon: response.data.weather[0].icon,                
            sunrise: new Date(response.data.sys.sunrise * 1000).toLocaleTimeString(), 
            sunset: new Date(response.data.sys.sunset * 1000).toLocaleTimeString(),  
            timestamp: new Date().toLocaleString()              
        };
        

        res.json(weatherData);
        
    } catch (error) {
        console.error('Error fetching weather:', error.message);
        res.status(404).json({ message: 'City not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});