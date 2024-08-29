export interface HourlyData {
   time: string[];
   temperature: number[];
   precipitation: number[];
   windspeed: number[];
   winddirection: number[];
   pictocode: number[];
   // Ajoutez d'autres propriétés si nécessaire
 }

export interface WeatherData {
   data_hourly: HourlyData;
   metadata: {
     modelrun_updatetime_utc: string;
     name: string;
     height: number;
     timezone_abbrevation: string;
     latitude: number;
     modelrun_utc: string;
     longitude: number;
     utc_timeoffset: number;
     generation_time_ms: number;
   };
   units: {
     [key: string]: string;
   };
   data_current: {
     time: string;
     isobserveddata: number;
     metarid: string;
     isdaylight: number;
     windspeed: number;
     zenithangle: number;
     pictocode_detailed: number;
     pictocode: number;
     temperature: number;
   };
   data_day: {
     time: string[];
     sealevelpressure_mean: number[];
     temperature_instant: number[];
     convective_precipitation: number[];
     midclouds_mean: number[];
     totalcloudcover_min: number[];
     lowclouds_min: number[];
     lowclouds_mean: number[];
     predictability: number[];
     uvindex: number[];
     midclouds_max: number[];
     temperature_mean: number[];
     precipitation_probability: number[];
     winddirection: number[];
     sealevelpressure_min: number[];
     windspeed_min: number[];
     felttemperature_mean: number[];
     visibility_max: number[];
     windspeed_mean: number[];
     visibility_mean: number[];
     sunshine_time: number[];
     moonage: number[];
     totalcloudcover_max: number[];
     windspeed_max: number[]
     relativehumidity_min: number[];
     pictocode: number[];
     relativehumidity_mean: number[];
     moonset: string[];
     precipitation_hours: number[];
     predictability_class: number[];
     visibility_min: number[];
     snowfraction: number[];
     highclouds_max: number[];
     moonphaseangle: number[];
     moonphasename: string[];
     sealevelpressure_max: number[];
     humiditygreater90_hours: number[];
     felttemperature_max: number[];
     sunrise: string[];
     rainspot: string[];
     highclouds_mean: number[];
     felttemperature_min: number[];
     lowclouds_max: number[];
     precipitation: number[];
     moonilluminatedfraction: number[];
     fog_probability: number[];
     moonrise: string[];
     temperature_min: number[];
     relativehumidity_max: number[];
     midclouds_min: number[];
     sunset: string[];
     temperature_max: number[];
     moonphasetransittime: string[];
     totalcloudcover_mean: number[];
     highclouds_min: number[];
   };
 }