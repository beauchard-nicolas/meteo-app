import React from 'react';
import { CityData } from '../types/CityData';

interface CityInfoProps {
  cityInfo: CityData;
}

const CityInfo: React.FC<CityInfoProps> = ({ cityInfo }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Informations sur la ville</h3>
      <p>Nom : {cityInfo.name}</p>
      <p>Pays : {cityInfo.country}</p>
      <p>Région : {cityInfo.admin1}</p>
      <p>Latitude : {cityInfo.lat.toFixed(2)}</p>
      <p>Longitude : {cityInfo.lon.toFixed(2)}</p>
      <p>Fuseau horaire : {cityInfo.timezone}</p>
    </div>
  );
};

export default CityInfo;
