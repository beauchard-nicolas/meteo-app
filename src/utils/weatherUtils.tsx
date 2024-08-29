import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faSun, faCloudSun, faCloud, faCloudRain, faCloudShowersHeavy,
  faSnowflake, faBolt, faSmog
} from '@fortawesome/free-solid-svg-icons';

export const getWeatherIcon = (pictocode: number): IconDefinition => {
  switch (pictocode) {
    case 1: case 2: return faSun;
    case 3: case 4: return faCloudSun;
    case 5: case 6: case 7: return faCloud;
    case 8: case 9: return faCloudRain;
    case 10: case 11: return faCloudShowersHeavy;
    case 12: case 13: case 14: return faSnowflake;
    case 15: case 16: case 17: return faBolt;
    default: return faSmog;
  }
};

export const getBackgroundColor = (temperature: number): string => {
  if (temperature <= 0) return 'bg-blue-700';
  if (temperature <= 10) return 'bg-blue-500';
  if (temperature <= 20) return 'bg-green-500';
  if (temperature <= 30) return 'bg-yellow-500';
  return 'bg-red-500';
};

export const getWeatherDescription = (pictocode: number): string => {
  switch (pictocode) {
    case 1: case 2: return 'Ensoleillé';
    case 3: case 4: return 'Partiellement nuageux';
    case 5: case 6: case 7: return 'Nuageux';
    case 8: case 9: return 'Pluvieux';
    case 10: case 11: return 'Fortes pluies';
    case 12: case 13: case 14: return 'Neigeux';
    case 15: case 16: case 17: return 'Orageux';
    default: return 'Brumeux';
  }
};
