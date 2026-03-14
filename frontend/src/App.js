// Import React hooks and axios
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // ===== STATE VARIABLES =====
  // useState is a React hook that lets you store data that can change
  
  // city: stores what user types in input box
  const [city, setCity] = useState('');
  
  // weather: stores weather data from API
  const [weather, setWeather] = useState(null);
  
  // loading: shows loading spinner while fetching data
  const [loading, setLoading] = useState(false);
  
  // error: stores error message if something goes wrong
  const [error, setError] = useState('');
  
  // recent searches: store last 5 searched cities
  const [recentSearches, setRecentSearches] = useState([]);

  // ===== FUNCTIONS =====

  // Function to fetch weather from backend
  const fetchWeather = async (searchCity) => {
    const cityToSearch = searchCity || city;
    
    // Don't do anything if input is empty
    if (!cityToSearch.trim()) return;
    
    // Show loading spinner, clear previous errors
    setLoading(true);
    setError('');
    
    try {
      // Make API call to our backend
      // await means wait for this to finish before moving on
      const response = await axios.get(`http://localhost:5000/api/weather/${cityToSearch}`);
      
      // Save weather data to state
      setWeather(response.data);
      
      // Add to recent searches (avoid duplicates, keep last 5)
      setRecentSearches(prev => {
        const newSearches = [cityToSearch, ...prev.filter(c => c.toLowerCase() !== cityToSearch.toLowerCase())];
        return newSearches.slice(0, 5);
      });
      
    } catch (err) {
      // If error (city not found, server down, etc.)
      setError('City not found. Please try again.');
      setWeather(null);
    } finally {
      // Hide loading spinner (runs whether success or error)
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page from refreshing
    fetchWeather();
  };

  // Handle recent search click
  const handleRecentSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeather(searchCity);
  };

  // Get weather icon URL
  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  // Get wind direction from degrees
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  // ===== WHAT USER SEES =====
  return (
    <div className="App">
      <h1>🌤️ Enhanced Weather App</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)} // Update city state as user types
        />
        <button type="submit">Get Weather</button>
      </form>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <h3>Recent Searches:</h3>
          <div className="recent-buttons">
            {recentSearches.map((search, index) => (
              <button 
                key={index} 
                onClick={() => handleRecentSearch(search)}
                className="recent-button"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Show loading message while fetching data */}
      {loading && <div className="loading">Loading...</div>}
      
      {/* Show error message if any */}
      {error && <div className="error">{error}</div>}
      
      {/* Show weather data if available */}
      {weather && (
        <div className="weather-card">
          <h2>{weather.city}, {weather.country}</h2>
          <div className="weather-info">
            {/* Weather icon and main condition */}
            <div className="weather-main">
              <img 
                src={getWeatherIconUrl(weather.icon)} 
                alt={weather.description}
              />
              <div className="main-condition">{weather.main}</div>
            </div>
            
            {/* Temperature Section */}
            <div className="temperature-section">
              <div className="current-temp">{Math.round(weather.temperature)}°C</div>
              <div className="feels-like">Feels like: {Math.round(weather.feelsLike)}°C</div>
              <div className="temp-range">
                <span>↓ {Math.round(weather.tempMin)}°C</span>
                <span>↑ {Math.round(weather.tempMax)}°C</span>
              </div>
            </div>

            {/* Weather Description */}
            <div className="description">{weather.description}</div>

            {/* Weather Details Grid */}
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">💧 Humidity</span>
                <span className="detail-value">{weather.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">🌬️ Wind</span>
                <span className="detail-value">{weather.windSpeed} m/s {getWindDirection(weather.windDeg)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">📊 Pressure</span>
                <span className="detail-value">{weather.pressure} hPa</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">☁️ Clouds</span>
                <span className="detail-value">{weather.clouds}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">👁️ Visibility</span>
                <span className="detail-value">{weather.visibility} km</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">🌅 Sunrise</span>
                <span className="detail-value">{weather.sunrise}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">🌇 Sunset</span>
                <span className="detail-value">{weather.sunset}</span>
              </div>
            </div>

            {/* Last Updated */}
            <div className="timestamp">
              Last updated: {weather.timestamp}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;