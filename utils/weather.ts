export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    precipitation: number;
    rain: number;
    showers: number;
    snowfall: number;
    is_day: number;
  };
  current_units: {
    temperature_2m: string;
    precipitation: string;
    rain: string;
    showers: string;
    snowfall: string;
  };
}

export interface WeatherFetchOptions {
  latitude?: number;
  longitude?: number;
  timezone?: string;
}

const DEFAULT_LATITUDE = 41.60598881478764;
const DEFAULT_LONGITUDE = -93.69678711832677;
const DEFAULT_TIMEZONE = 'America/Chicago';

export const fetchWeather = async (
  options: WeatherFetchOptions = {}
): Promise<WeatherData> => {
  const {
    latitude = DEFAULT_LATITUDE,
    longitude = DEFAULT_LONGITUDE,
    timezone = DEFAULT_TIMEZONE,
  } = options;

  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', latitude.toString());
  url.searchParams.set('longitude', longitude.toString());
  url.searchParams.set('current', 'temperature_2m,precipitation,rain,showers,snowfall,is_day');
  url.searchParams.set('timezone', timezone);
  url.searchParams.set('forecast_days', '1');
  url.searchParams.set('wind_speed_unit', 'mph');
  url.searchParams.set('temperature_unit', 'fahrenheit');

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    throw new Error(`Failed to fetch weather: ${response.statusText}`);
  }
  
  return response.json();
};

