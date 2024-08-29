import React, { useState } from 'react';
import { WeatherData } from '../types/WeatherData';
import { CityData } from '../types/CityData'

interface CitySearchProps {
  onWeatherUpdate: (weatherData: WeatherData | null, cityData: CityData | null) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onWeatherUpdate }) => {
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cityInfo, setCityInfo] = useState<CityData | null>(null);

  const fetchCityCoordinates = async (cityName: string): Promise<CityData | null> => {
    const apiUrl = `https://www.meteoblue.com/en/server/search/query3?query=${encodeURIComponent(cityName)}&apikey=DEMOKEY`;
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Erreur lors de la recherche de la ville');
      }
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        return {
          name: result.name,
          country: result.country,
          admin1: result.admin1,
          lat: result.lat,
          lon: result.lon,
          timezone: result.timezone,
          iso2: result.iso2
        };
      }
      return null;
    } catch (error) {
      console.error("Erreur lors de la recherche de la ville:", error);
      return null;
    }
  };

  const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData | null> => {
    const apiUrl = `https://my.meteoblue.com/packages/basic-day_current_clouds-day_sunmoon?apikey=G8jXT0vEAu6DzPMQ&lat=${lat}&lon=${lon}&asl=108&format=json&forecast_days=7`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données météo');
      }
      const data = await response.json();
      return data as WeatherData;
    } catch (error) {
      console.error("Erreur:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setCityInfo(null);

    console.log("Recherche de la ville:", city);

    const cityData = await fetchCityCoordinates(city);
    console.log("Données de la ville récupérées:", cityData);

    if (cityData) {
      setCityInfo(cityData);
      console.log("Récupération des données météo pour:", cityData.name);
      const weatherData = await fetchWeatherData(cityData.lat, cityData.lon);
      console.log("Données météo récupérées:", weatherData);
      if (weatherData) {
        onWeatherUpdate(weatherData, cityData);
      } else {
        setError("Impossible de récupérer les données météo");
        onWeatherUpdate(null, null);
      }
    } else {
      setError("Ville non trouvée");
      onWeatherUpdate(null, null);
    }

    setIsLoading(false);
  };

  const handleGeolocation = () => {
    setIsLoading(true);
    setError(null);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchWeatherData(latitude, longitude);
        },
        (error) => {
          setError("Erreur de géolocalisation: " + error.message);
          setIsLoading(false);
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par votre navigateur");
      setIsLoading(false);
    }
  };

  return (
    <div className="text-white">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Entrez une ville"
          className="w-full px-3 py-2 border rounded-md mb-2 text-gray-800"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
          Rechercher
        </button>
      </form>
      <button 
        onClick={handleGeolocation} 
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors mb-4"
      >
        Utiliser ma position
      </button>
      {isLoading && <p className="mt-2 text-gray-300">Chargement en cours...</p>}
      {error && <p className="mt-2 text-red-400">{error}</p>}
      {cityInfo && (
        <div className="mt-4 p-3 bg-gray-700 rounded-md">
          <h3 className="font-bold text-lg">{cityInfo.name}</h3>
          <p>Pays: {cityInfo.country}</p>
          <p>Langue: {cityInfo.iso2}</p>
          <p>Département: {cityInfo.admin1}</p>
          <p>Latitude: {cityInfo.lat}</p>
          <p>Longitude: {cityInfo.lon}</p>
          <p>Fuseau horaire: {cityInfo.timezone}</p>
        </div>
      )}
    </div>
  );
};

export default CitySearch;
