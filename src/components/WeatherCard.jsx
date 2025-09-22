import React from 'react';

function WeatherCard({ weather }) {
  return (
<div className="w-[300px] h-[200px] flex flex-col items-center bg-gray-800 rounded-md overflow-hidden">
  <div className="w-[300px] h-[130px] bg-[url(./cardbg.png)] bg-cover bg-center text-white text-lg flex items-center justify-between p-5">
  {/* Left side: city and weather stacked */}
  <div className="flex flex-col gap-2">
    <span className="font-bold text-3xl">{weather.city}</span>
    <p className="mt-1">{weather.weather}</p>
  </div>

  {/* Right side: temperature vertically centered */}
  <div className="flex items-center h-full">
    <p className="text-3xl font-semibold">{weather.temperature} °C</p>
  </div>
</div>


  <div className="w-[300px] h-[70px] bg-gray-800 text-white text-sm flex items-center justify-between px-4">
    <p>Humidity : {weather.humidity} %</p>
    <p>Wind Speed : {weather.windSpeed} m/s</p>
  </div>
</div>

  );
}

export default WeatherCard;
