import React from 'react';
import { IoIosPartlySunny } from "react-icons/io";
import { IoMdRainy } from "react-icons/io";
import { FaCloudSun } from "react-icons/fa";
import { MdCloud } from "react-icons/md";
import { GiHeavyRain } from "react-icons/gi";
import { FaSmog } from "react-icons/fa";

function WeatherCard({ weather }) {

  const weatherBackgroundMap = {
    "few clouds": "a.png",
    "scattered clouds": "a.png",
    "broken clouds": "b.png",
    "overcast clouds": "b.png",
    "clear sky": "c.png",
    "sunny": "c.png",
    "light rain": "d.png",
    "drizzle": "d.png",
    "shower": "d.png",
    "mist": "e.png",
    "fog": "e.png",
    "haze": "e.png",
  };

  const weatherIconMap = {
    "few clouds": <FaCloudSun className="w-7 h-7 ml-6" />,
    "scattered clouds": <FaCloudSun className="w-7 h-7 ml-6" />,
    "broken clouds": <MdCloud className="w-7 h-7 ml-6" />,
    "overcast clouds": <MdCloud className="w-7 h-7 ml-6" />,
    "clear sky": <IoIosPartlySunny className="w-7 h-7 ml-6" />,
    "sunny": <IoIosPartlySunny className="w-7 h-7 ml-6" />,
    "light rain": <GiHeavyRain className="w-7 h-7 ml-6" />,
    "drizzle": <GiHeavyRain className="w-7 h-7 ml-6" />,
    "shower": <GiHeavyRain className="w-7 h-7 ml-6" />,
    "mist": <FaSmog className="w-7 h-7 ml-6" />,
    "fog": <FaSmog className="w-7 h-7 ml-6" />,
    "haze": <FaSmog className="w-7 h-7 ml-6" />,
  };

  const backgroundImage = weatherBackgroundMap[weather.weather.toLowerCase()] || "card.png";


  const weatherIcon = weatherIconMap[weather.weather.toLowerCase()] || <IoIosPartlySunny className="w-7 h-7 ml-6" />;

  return (
    <div className="w-[300px] h-[200px] flex flex-col items-center bg-gray-800 rounded-md overflow-hidden shadow-lg">
      {/* Top section with dynamic background */}
      <div 
        className="w-[300px] h-[130px] bg-cover bg-center text-white text-lg flex items-center justify-between p-5"
        style={{ backgroundImage: `url(./${backgroundImage})` }} // Dynamic background image
      >
        {/* Left side: city and weather stacked */}
        <div className="flex flex-col gap-2">
          <span className="font-bold text-3xl drop-shadow-md">{weather.city}</span>
          {weatherIcon} {/* Dynamic icon */}
          <p className="mt-1 drop-shadow-md">{weather.weather}</p>
        </div>

        {/* Right side: temperature vertically centered */}
        <div className="flex items-center h-full">
          <p className="text-3xl font-semibold drop-shadow-md">{weather.temperature} °C</p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="w-[300px] h-[70px] bg-gray-800 text-white text-sm flex items-center justify-between px-4">
        <p className="font-medium">Humidity: {weather.humidity}%</p>
        <p className="font-medium">Wind Speed: {weather.windSpeed} m/s</p>
      </div>
    </div>
  );
}

export default WeatherCard;
