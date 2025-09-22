import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import { IoIosPartlySunny } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AuthButtons from '../components/AuthButtons';

function Home() {
  const { getAccessTokenSilently, user } = useAuth0(); // Get the JWT token
  const [weatherData, setWeatherData] = useState([]);
  const [cityCodes, setCityCodes] = useState([]);

  useEffect(() => {
    const fetchCityCodes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/weather/cities');
        setCityCodes(response.data);
      } catch (error) {
        console.error('Error fetching city codes:', error);
      }
    };

    fetchCityCodes();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Get the JWT token
        const token = await getAccessTokenSilently();

        console.log('JWT Token:', token);  // Log the token to confirm it's being retrieved

        // Fetch weather data with token in the Authorization header
        const responses = await Promise.all(
          cityCodes.map(cityCode =>
            axios.get(`http://localhost:5000/api/weather/${cityCode}`, {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token here
              },
            })
          )
        );
       // setWeatherData(responses.map(response => response.data));
        const weatherInfo = responses.map(response => response.data);
console.log('Final weather data:', weatherInfo);
setWeatherData(weatherInfo);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (cityCodes.length > 0) {
      fetchWeatherData();
    }
  }, [cityCodes, getAccessTokenSilently]);

  return (
    <div className="w-full h-screen bg-[url(./weatherbg.jpg)] bg-cover bg-center flex flex-col items-center p-6 relative">
      <div className="absolute left-[5px] top-[5px]">
      <AuthButtons />
    </div>

      <h1 className="text-2xl font-bold text-white mt-8 flex items-center justify-center absolute top-0">
        <IoIosPartlySunny className="w-10 h-10 mr-4 text-blue-500" />
        Weather App
      </h1>

      <div className="flex items-center  mt-6 absolute top-15">
        <input
         type="text"
          className="p-2 rounded-md  text-white bg-gray-800"
           placeholder="Enter a city"
        />

        <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Add City</button>
      </div>

      <div className="flex flex-wrap justify-center  gap-6 mt-6 absolute top-35">
        {weatherData.map((data, index) => (
          <Link key={index} to={`/weather/${data.cityCode}`} state={{ weatherData: data }} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
            <WeatherCard weather={data} />
          </Link>
        ))}
      </div>

      <footer className="w-full bg-gray-800 text-center text-white py-4 absolute bottom-0">
        <p> 2025 Fidenz Technologies</p>
      </footer>
    </div>
  );
}

export default Home;
