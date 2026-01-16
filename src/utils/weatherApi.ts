import { WeatherData } from '@/types/weather';
import { supabase } from '@/integrations/supabase/client';

/**
 * Fetch weather data from our secure backend function
 * The API key is stored securely on the server
 */
export async function fetchWeatherData(city: string): Promise<WeatherData> {
  const { data, error } = await supabase.functions.invoke('get-weather', {
    body: { city },
  });

  if (error) {
    console.error('Error fetching weather:', error);
    throw new Error(error.message || 'Failed to fetch weather data');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data as WeatherData;
}

/**
 * Fetch weather using geolocation coordinates
 */
export async function fetchWeatherByLocation(lat: number, lon: number): Promise<WeatherData> {
  const { data, error } = await supabase.functions.invoke('get-weather', {
    body: { lat, lon },
  });

  if (error) {
    console.error('Error fetching weather:', error);
    throw new Error(error.message || 'Failed to fetch weather data');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data as WeatherData;
}

/**
 * Get user's current location using browser geolocation API
 * Returns coordinates if successful, null otherwise
 */
export function getUserLocation(): Promise<{ lat: number; lon: number } | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.log('Geolocation not supported');
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.log('Geolocation error:', error.message);
        resolve(null);
      },
      { timeout: 5000, maximumAge: 300000 }
    );
  });
}
