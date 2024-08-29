import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WeatherData } from '../types/WeatherData';
import { CityData } from '../types/CityData';
import { getWeatherIcon, getBackgroundColor, getWeatherDescription } from '../utils/weatherUtils';
import { faSun, faMoon, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface WeatherDisplayProps {
  weatherData: WeatherData;
  cityInfo: CityData | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, cityInfo }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentHour = new Date().getHours();

  // Fonction pour convertir l'heure au format "HH:MM" en nombre d'heures
  const timeToHours = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours + minutes / 60;
  };

  const sunriseHour = timeToHours(weatherData.data_day.sunrise[0]);
  const sunsetHour = timeToHours(weatherData.data_day.sunset[0]);

  const currentWeather = weatherData.data_current;
  const todayForecast = {
    temp_max: weatherData.data_day.temperature_max[0],
    temp_min: weatherData.data_day.temperature_min[0],
    precipitation: weatherData.data_day.precipitation[0],
    precipitation_probability: weatherData.data_day.precipitation_probability[0],
    windspeed: weatherData.data_day.windspeed_mean[0],
    winddirection: weatherData.data_day.winddirection[0],
    sunrise: weatherData.data_day.sunrise[0],
    sunset: weatherData.data_day.sunset[0],
    uv_index: weatherData.data_day.uvindex[0],
    humidity: weatherData.data_day.relativehumidity_mean[0],
    pressure: weatherData.data_day.sealevelpressure_mean[0],
    visibility: weatherData.data_day.visibility_mean[0],
    felttemperature: weatherData.data_day.felttemperature_mean[0],
  };

  // Créer une approximation des données horaires de 00h à 23h
  const hourlyForecast = Array.from({ length: 24 }, (_, index) => {
    const isDay = index >= Math.floor(sunriseHour) && index < Math.floor(sunsetHour);
    return {
      time: index,
      temperature: Math.round(weatherData.data_day.temperature_mean[0] +
        (Math.sin((index - 6) * Math.PI / 12) * 3)), // Simulation de variation de température
      icon: isDay ? faSun : faMoon,
      precipitation: weatherData.data_day.precipitation_probability[0],
      isSunrise: Math.floor(sunriseHour) === index,
      isSunset: Math.floor(sunsetHour) === index,
      isDay: isDay
    };
  });

  const backgroundColor = getBackgroundColor(currentWeather.temperature);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollPosition = currentHour * 64; // 64px est la largeur de chaque élément horaire
      scrollRef.current.scrollLeft = scrollPosition - (scrollRef.current.clientWidth / 2) + 32;
    }
  }, [currentHour]);

  console.log(backgroundColor.replace('bg-', 'rgb-'));

  return (
    <div className="h-full overflow-auto bg-blue-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 min-h-full">
        {/* Colonne de gauche */}
        <div className={`${backgroundColor} text-white p-8 rounded-lg relative overflow-hidden flex flex-col justify-between h-full min-w-250px`}>
          {/* Partie supérieure : température et conditions météo */}
          <div>
            <div className="text-8xl font-bold mb-4">
              {currentWeather.temperature.toFixed(1)}°
            </div>
            <div className="text-4xl mb-8 flex items-center">
              <FontAwesomeIcon icon={getWeatherIcon(currentWeather.pictocode)} className="mr-4 text-6xl" />
              {getWeatherDescription(currentWeather.pictocode)}
            </div>
          </div>

          <div className="flex flex-col items-center text-center mt-auto">
            {cityInfo && (
              <div className="mb-4 text-blue">
                <h2 className="text-4xl font-bold">
                  {new Date().toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                  }).replace(/^\w/, c => c.toUpperCase())}
                </h2>
                <h2 className="text-2xl font-bold">
                  {new Date().toLocaleDateString('fr-FR', {
                    month: 'long',
                    year: 'numeric',
                  }).replace(/^\w/, c => c.toUpperCase())}
                </h2>
                <p>{cityInfo.timezone}</p>
              </div>
            )}
          </div>

          {/* Partie inférieure : informations sur la ville */}
          <div className="mt-auto">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 shadow-lg mb-4">
              {cityInfo && (
                <div className="text-gray-800">
                  <h2 className="text-2xl font-bold text-black">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-red-600" />{cityInfo.name}
                  </h2>
                  <p>{cityInfo.country}, {cityInfo.admin1}</p>
                  <p >Lat: {cityInfo.lat.toFixed(2)}, Lon: {cityInfo.lon.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Colonne centrale et droite */}
        <div className="col-span-2 bg-white rounded-lg p-8 shadow-lg overflow-auto h-full flex flex-col justify-between">
          {/* Section Prochaines heures (en haut) */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Prochaines heures</h3>
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-4" style={{ minWidth: "max-content" }}>
                {hourlyForecast.map((hour, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center w-16 p-2 rounded-lg ${hour.time === currentHour ? 'bg-blue-200 shadow-md' : ''
                      }`}
                  >
                    <div className="text-sm">{hour.time.toString().padStart(2, '0')}h</div>
                    <FontAwesomeIcon
                      icon={hour.icon}
                      className={`my-2 ${hour.isSunrise ? 'text-amber-600' :
                        hour.isSunset ? 'text-purple-600' :
                          hour.isDay ? 'text-yellow-400' : 'text-gray-600'
                        }`}
                      title={
                        hour.isSunrise ? 'Lever du soleil' :
                          hour.isSunset ? 'Coucher du soleil' :
                            hour.isDay ? 'Jour' : 'Nuit'
                      }
                    />
                    <div className="font-bold">{hour.temperature}°</div>
                    <div className="text-xs">{hour.precipitation}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section Détails météo du jour (au milieu) */}
          <div className="my-auto">
            <h3 className="text-2xl font-bold mb-4">Détails météo du jour</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <WeatherDetail title="Humidité" value={`${todayForecast.humidity}%`} icon="tint" />
              <WeatherDetail title="Vent" value={`${todayForecast.windspeed} km/h`} icon="wind" />
              <WeatherDetail title="Précipitations" value={`${todayForecast.precipitation} mm`} icon="cloud-rain" />
              <WeatherDetail title="Indice UV" value={todayForecast.uv_index.toString()} icon="sun" />
              <WeatherDetail title="Ressenti" value={`${todayForecast.felttemperature}°`} icon="thermometer-half" />
              <WeatherDetail title="Risque de pluie" value={`${todayForecast.precipitation_probability}%`} icon="umbrella" />
            </div>
          </div>

          {/* Section Prévisions sur 7 jours (en bas) */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Prévisions sur 7 jours</h3>
            <div className="overflow-x-auto">
              <div className="flex justify-between">
                {weatherData.data_day.time.map((date: string, index: number) => {
                  const dayName = new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' });
                  return (
                    <div key={date} className="flex flex-col items-center text-center px-1">
                      <div className="font-bold">{dayName.charAt(0).toUpperCase() + dayName.slice(1)}</div>
                      <FontAwesomeIcon
                        icon={getWeatherIcon(weatherData.data_day.pictocode[index])}
                        className="text-2xl my-1"
                      />
                      <div className="text-xs">
                        <div className="font-bold">{weatherData.data_day.temperature_max[index]}°</div>
                        <div>{weatherData.data_day.temperature_min[index]}°</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WeatherDetail: React.FC<{ title: string; value: string; icon: string }> = ({ title, value, icon }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
    <FontAwesomeIcon icon={['fas', icon as any]} className="text-2xl mr-4 text-blue-500" />
    <div>
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  </div>
);

export default WeatherDisplay;
