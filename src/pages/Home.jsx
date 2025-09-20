import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';

function Home() {
  const [weatherData, setWeatherData] = useState([]);
  const [cityCodes, setCityCodes] = useState([]);

  useEffect(() => {
    // Fetch CityCodes from the backend
    const fetchCityCodes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/weather/cities');
        setCityCodes(response.data); // Store the CityCodes
      } catch (error) {
        console.error('Error fetching city codes:', error);
      }
    };

    fetchCityCodes();
  }, []);

  useEffect(() => {
    if (cityCodes.length > 0) {
      // Fetch weather data for each city using the fetched city codes
      const fetchWeatherData = async () => {
        try {
          const responses = await Promise.all(
            cityCodes.map(cityCode =>
              axios.get(`http://localhost:5000/api/weather/${cityCode}`) // Backend API call
            )
          );

          // Store the fetched weather data
          setWeatherData(responses.map(response => response.data));
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };

      fetchWeatherData();
    }
  }, [cityCodes]); // Trigger fetching weather data when cityCodes are fetched

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-blue-500 mt-8">Weather App</h1>
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {/* Map over the weather data and render WeatherCards */}
        {weatherData.map((data, index) => (
          <WeatherCard key={index} weather={data} />
        ))}
      </div>
    </div>
  );
}

export default Home;
