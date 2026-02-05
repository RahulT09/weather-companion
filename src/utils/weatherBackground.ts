import { WeatherCondition } from '@/types/weather';

interface WeatherTheme {
  background: string;
  text: string;
}

/**
 * Check if it's currently night time (between 7 PM and 6 AM)
 */
export const isNightTime = (): boolean => {
  const hour = new Date().getHours();
  return hour >= 19 || hour < 6;
};

/**
 * Maps weather conditions to CSS background and text classes
 * Automatically adjusts for day/night time
 */
export const getWeatherTheme = (condition: WeatherCondition): WeatherTheme => {
  const isNight = isNightTime();
  
  // Night time themes
  if (isNight) {
    const nightThemeMap: Record<WeatherCondition, WeatherTheme> = {
      sunny: { background: 'weather-bg-night-clear', text: 'weather-text-light' },
      cloudy: { background: 'weather-bg-night-cloudy', text: 'weather-text-light' },
      rainy: { background: 'weather-bg-night-rainy', text: 'weather-text-light' },
      stormy: { background: 'weather-bg-stormy', text: 'weather-text-light' },
      snowy: { background: 'weather-bg-night-snowy', text: 'weather-text-light' },
      windy: { background: 'weather-bg-night-cloudy', text: 'weather-text-light' },
      foggy: { background: 'weather-bg-night-cloudy', text: 'weather-text-light' },
    };
    return nightThemeMap[condition] || { background: 'weather-bg-night-clear', text: 'weather-text-light' };
  }

  // Day time themes
  const dayThemeMap: Record<WeatherCondition, WeatherTheme> = {
    sunny: { background: 'weather-bg-sunny', text: 'weather-text-dark' },
    cloudy: { background: 'weather-bg-cloudy', text: 'weather-text-light' },
    rainy: { background: 'weather-bg-rainy', text: 'weather-text-light' },
    stormy: { background: 'weather-bg-stormy', text: 'weather-text-light' },
    snowy: { background: 'weather-bg-snowy', text: 'weather-text-dark' },
    windy: { background: 'weather-bg-cloudy', text: 'weather-text-light' },
    foggy: { background: 'weather-bg-cloudy', text: 'weather-text-light' },
  };

  return dayThemeMap[condition] || { background: 'weather-bg-sunny', text: 'weather-text-dark' };
};

/**
 * @deprecated Use getWeatherTheme instead
 */
export const getWeatherBackgroundClass = (condition: WeatherCondition): string => {
  return getWeatherTheme(condition).background;
};
