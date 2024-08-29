import React, { useState } from 'react';

import WeatherDisplay from './WeatherDisplay';
import CitySearch from './CitySearch';
import CityInfo from './CityInfo';

import { CityData } from '../types/CityData';
import { WeatherData } from '../types/WeatherData';


const WeatherApp: React.FC = () => {
  const [cityWeather, setCityWeather] = useState<WeatherData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cityInfo, setCityInfo] = useState<CityData | null>(null);

  const updateWeather = (weatherData: WeatherData | null, cityData: CityData | null) => {
    if (weatherData) {
      setCityWeather(weatherData);
      setCityInfo(cityData);
      setIsSidebarOpen(false);
    } else {
      setCityWeather(null);
      setCityInfo(null);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Barre latérale */}
      <div className={`bg-blue-500 text-white transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-20'}`}>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="w-full p-4 text-2xl"
        >
          {isSidebarOpen ? '✕' : '☰'}
        </button>
        {isSidebarOpen && (
          <div className="p-4">
            <CitySearch onWeatherUpdate={updateWeather} />
            {cityInfo && <CityInfo cityInfo={cityInfo} />}
          </div>
        )}
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-hidden">
        {cityWeather ? (
          <WeatherDisplay weatherData={cityWeather} cityInfo={cityInfo} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-2xl text-gray-600">Sélectionnez une ville pour voir la météo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
