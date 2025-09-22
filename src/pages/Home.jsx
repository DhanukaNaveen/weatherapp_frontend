import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import { IoIosPartlySunny } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function Home() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();  // Auth0 hooks
  const [weatherData, setWeatherData] = useState([]);
  const [cityCodes, setCityCodes] = useState([]);
  const [cityInput, setCityInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCityCodes = async () => {
      try {
        setLoading(true);  // Start loading
        const response = await axios.get('http://localhost:5000/api/weather/cities');
        setCityCodes(response.data);  // Store the city codes from backend
        setLoading(false);  // End loading
      } catch (error) {
        console.error('Error fetching city codes:', error);
        setError('Failed to fetch city codes.');
        setLoading(false);  // End loading
      }
    };

    fetchCityCodes();
  }, []);

  useEffect(() => {
    if (cityCodes.length > 0) {
      const fetchWeatherData = async () => {
        try {
          setLoading(true);  // Start loading
          const responses = await Promise.all(
            cityCodes.map(cityCode =>
              axios.get(`http://localhost:5000/api/weather/${cityCode}`)
            )
          );
          setWeatherData(responses.map(response => response.data));
          setLoading(false);  // End loading
        } catch (error) {
          console.error('Error fetching weather data:', error);
          setError('Failed to fetch weather data.');
          setLoading(false);  // End loading
        }
      };

      fetchWeatherData();
    }
  }, [cityCodes]);

  return (
    <div className="min-h-screen bg-[url(./weatherbg.jpg)] bg-cover bg-center flex flex-col items-center justify-center p-4 pb-16">
      <h1 className="text-2xl font-bold text-white flex items-center justify-center sm:text-xl md:text-2xl mt-4 sm:mt-2">
        <IoIosPartlySunny className="w-10 h-10 mr-4 text-blue-500" />
        Weather App
      </h1>

      {isAuthenticated ? (
        <>
        
          <div className="absolute top-4 right-4 sm:top-2 sm:right-2">
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="bg-blue-600 text-white py-1 px-4 rounded-md"
            >
              Log Out
            </button>
          </div>

         
          <div className="w-full flex flex-col items-center justify-center">
          
            <div className="w-full flex flex-col items-center sm:flex-row justify-center mt-1 mb-4">
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                className="w-[250px] h-[40px] p-2 rounded-md bg-stone-950 text-white mb-2 sm:mb-0"
                placeholder="Enter a city"
              />
              <button className="bg-blue-500 h-[40px] text-white py-2 px-4 rounded-md">
                Add City
              </button>
            </div>

        
            {error && <p className="text-red-500 mt-4">{error}</p>}

         
            {loading && <div className="spinner mt-4">Loading...</div>}

            {/* Weather Cards Display */}
            <div className="flex flex-wrap justify-center gap-6 mt-4 sm:gap-8 md:gap-10 w-full">
              {weatherData.map((data, index) => (
                <Link
                  key={index}
                  to={`/weather/${data.cityCode}`}
                  state={{ weatherData: data }}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex justify-center"
                >
                  <WeatherCard weather={data} />
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        // If the user is not authenticated, show the login button
        <div className="mt-4 flex justify-center w-full">
          <button
            onClick={() => loginWithRedirect()}
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Log In
          </button>
        </div>
      )}

      <footer className="w-full bg-gray-800 text-center text-white py-4 fixed bottom-0">
        <p>2025 Fidenz Technologies</p>
      </footer>
    </div>
  );
}

export default Home;
