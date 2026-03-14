# Ìº§Ô∏è Weather App

A beautiful weather application built with React and Node.js that provides real-time weather information for cities worldwide.

## ‚ú® Features

- **Real-time Weather Data**: Get current weather conditions for any city
- **Detailed Information**: Temperature, feels like, min/max temp, humidity, wind speed, pressure, visibility, and more
- **Beautiful UI**: Gradient background with glass-morphism effects
- **Responsive Design**: Works perfectly on desktop and mobile
- **Recent Searches**: Quick access to your last 5 searched cities
- **Weather Icons**: Visual representation of weather conditions
- **Sunrise/Sunset Times**: Know when the sun rises and sets

## Ìª†Ô∏è Technologies Used

### Frontend
- React.js
- CSS3 with animations
- Axios for API calls

### Backend
- Node.js
- Express.js
- OpenWeatherMap API

## Ì≥ã Prerequisites

Before running this application, make sure you have:
- Node.js installed (v14 or higher)
- npm or yarn package manager
- OpenWeatherMap API key (free)

## Ì∫Ä Installation & Setup

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/weather-app.git
cd weather-app
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd backend
npm install
\`\`\`

Create a \`.env\` file in the backend folder:
\`\`\`env
PORT=5000
API_KEY=your_openweathermap_api_key_here
\`\`\`

### 3. Frontend Setup
\`\`\`bash
cd ../frontend
npm install
\`\`\`

### 4. Run the Application

**Start Backend Server** (in one terminal):
\`\`\`bash
cd backend
npm run dev
\`\`\`

**Start Frontend App** (in another terminal):
\`\`\`bash
cd frontend
npm start
\`\`\`

5. Open http://localhost:3000 in your browser

## ÌæØ How to Use

1. Enter a city name in the search box
2. Click "Get Weather" or press Enter
3. View comprehensive weather information
4. Click on recent searches to quickly check other cities

## Ì≥ä API Response Data

The app displays:
- Current temperature
- Feels like temperature
- Min and max temperature
- Weather condition and description
- Humidity percentage
- Wind speed and direction
- Atmospheric pressure
- Cloud coverage
- Visibility distance
- Sunrise and sunset times
- Weather icon

## Ì¥í Environment Variables

Create a \`.env\` file in the backend folder:
\`\`\`
PORT=5000
API_KEY=your_api_key_here
\`\`\`

## Ì¥ù Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Ì≥ù License

This project is licensed under the MIT License.

## Ìπè Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [React](https://reactjs.org/) for the frontend framework
- [Express](https://expressjs.com/) for the backend framework

## Ì≥ß Contact

Your Name - your.email@example.com

Project Link: https://github.com/YOUR_USERNAME/weather-app
