import React from 'react';
import { Link } from 'react-router-dom';

function WeatherCard({ weather }) {
  return (
    <div className="max-w-xs w-full bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-bold text-blue-600">{weather.city}</h2>
      <p className="text-xl">{weather.weather}</p>
      <p className="text-lg font-semibold">{weather.temperature} °C</p>

      {/* Link to WeatherDetails page for this specific city */}
      <Link
        to={`/weather/${weather.cityCode}`}
        className="text-blue-500 mt-4 block text-center hover:text-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}

export default WeatherCard;
