import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import { IoIosPartlySunny } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Home() {
  const { loginWithRedirect, logout, isAuthenticated , isLoading, getAccessTokenSilently } = useAuth0();  
  const [weatherData, setWeatherData] = useState([]);
  const [cityCodes, setCityCodes] = useState([]);
  const [cityInput, setCityInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


useEffect(() => {
  if (isLoading || !isAuthenticated) return;

    getAccessTokenSilently().then(token => {
      axios.get(`${BASE_URL}/api/weather/cities`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setCityCodes(res.data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to fetch city codes');
          setLoading(false);
        });
    });
  }, [isAuthenticated, isLoading]); 


useEffect(() => {
  if (cityCodes.length === 0) return;

    setLoading(true);
    getAccessTokenSilently().then(token => {
      Promise.all(
        cityCodes.map(code =>
          axios.get(`${BASE_URL}/api/weather/${code}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        )
      )
        .then(responses => {
          setWeatherData(responses.map(r => r.data));
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch weather data');
          setLoading(false);
        });
    });
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

  
            <div className="flex flex-wrap justify-center gap-6 mt-4 sm:gap-8 md:gap-10 w-full">
              {weatherData.map((data) => (
                <Link
                  key={data.cityCode}
                  to={`/weather/${data.cityCode}`}
                  state={{ data }}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex justify-center"
                >
                  <WeatherCard weather={data} />
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
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
