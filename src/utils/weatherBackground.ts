import { WeatherCondition } from '@/types/weather';

interface WeatherTheme {
  background: string;
  text: string;
}

/**
 * Maps weather conditions to CSS background and text classes
 */
export const getWeatherTheme = (condition: WeatherCondition): WeatherTheme => {
  const themeMap: Record<WeatherCondition, WeatherTheme> = {
    sunny: { background: 'weather-bg-sunny', text: 'weather-text-dark' },
    cloudy: { background: 'weather-bg-cloudy', text: 'weather-text-light' },
    rainy: { background: 'weather-bg-rainy', text: 'weather-text-light' },
    stormy: { background: 'weather-bg-stormy', text: 'weather-text-light' },
    snowy: { background: 'weather-bg-snowy', text: 'weather-text-dark' },
    windy: { background: 'weather-bg-cloudy', text: 'weather-text-light' },
    foggy: { background: 'weather-bg-cloudy', text: 'weather-text-light' },
  };

  return themeMap[condition] || { background: 'weather-bg-sunny', text: 'weather-text-dark' };
};

/**
 * @deprecated Use getWeatherTheme instead
 */
export const getWeatherBackgroundClass = (condition: WeatherCondition): string => {
  return getWeatherTheme(condition).background;
};
