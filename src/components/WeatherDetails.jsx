import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosPartlySunny } from "react-icons/io";

function WeatherDetails() {
  const { cityCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();  // useNavigate hook for navigation
  const weatherDetail = location.state?.weatherData;

  if (!weatherDetail) {
    return (
      <div className="min-h-screen bg-[url(./weatherbg.jpg)] bg-cover bg-center flex flex-col items-center p-6">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url(./weatherbg.jpg)] bg-cover bg-center flex flex-col items-center p-6">
      

      <h1 className="text-2xl font-bold text-white mt-8 flex items-center justify-center">
        <IoIosPartlySunny className="w-10 h-10 mr-4 text-blue-500" />
        Weather App
      </h1>

      <div className="w-[600px] h-[400px] flex flex-col items-center bg-gray-800 rounded-md overflow-hidden mt-15 relative">
        {/* Back Button */}
      <button 
        className="absolute top-4 left-4 text-white"
        onClick={() => navigate(-1)} // Goes back to the previous page
      >
        <FaArrowLeft className="w-6 h-6" />
      </button>
        <div className="w-[600px] h-[260px] bg-[url(./cardbg.png)] bg-cover bg-center text-white text-lg flex flex-col items-center justify-center gap-4 p-7">
          <span className="font-bold text-6xl">{weatherDetail.city}</span>
          <div className="w-full  flex justify-between px-4  p-5">
            <p className="text-4xl">{weatherDetail.weather}</p>
            <p className="text-5xl">{weatherDetail.temperature} °C</p>
          </div>
        </div>

        <div className="w-[600px] h-[140px] bg-gray-800 text-white text-lg flex items-center justify-between  p-10">
          <p>Humidity : {weatherDetail.humidity} %</p>
          <p>Wind Speed : {weatherDetail.windSpeed} m/s</p>
        </div>
      </div>

      <footer className="w-full bg-gray-800 text-center text-white py-4 absolute bottom-0">
        <p>2025 Fidenz Technologies</p>
      </footer>
    </div>
  );
}

export default WeatherDetails;
