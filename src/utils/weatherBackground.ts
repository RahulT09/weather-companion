import { WeatherCondition } from '@/types/weather';

/**
 * Maps weather conditions to CSS background classes
 */
export const getWeatherBackgroundClass = (condition: WeatherCondition): string => {
  const backgroundMap: Record<WeatherCondition, string> = {
    sunny: 'weather-bg-sunny',
    cloudy: 'weather-bg-cloudy',
    rainy: 'weather-bg-rainy',
    stormy: 'weather-bg-stormy',
    snowy: 'weather-bg-snowy',
    windy: 'weather-bg-cloudy', // Similar to cloudy
    foggy: 'weather-bg-cloudy', // Similar to cloudy
  };

  return backgroundMap[condition] || 'weather-bg-sunny';
};
