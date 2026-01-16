import { WeatherData, WeatherCondition } from '@/types/weather';

/**
 * Mock weather data for demonstration
 * In a real app, this would be replaced with API calls
 */

const conditions: WeatherCondition[] = ['sunny', 'cloudy', 'rainy', 'windy'];

const descriptions: Record<WeatherCondition, string> = {
  sunny: 'Clear sky with bright sunshine',
  cloudy: 'Partly cloudy with some sun',
  rainy: 'Light to moderate rain expected',
  stormy: 'Thunderstorms in the area',
  windy: 'Strong winds throughout the day',
  foggy: 'Misty conditions with low visibility',
  snowy: 'Light snowfall expected',
};

/**
 * Generate realistic mock weather data
 */
export function getMockWeatherData(location: string = 'Mumbai, India'): WeatherData {
  // Simulate realistic Indian weather
  const baseTemp = 28 + Math.random() * 10; // 28-38°C range
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  let rainProbability = 20;
  if (condition === 'rainy') rainProbability = 70 + Math.random() * 25;
  else if (condition === 'cloudy') rainProbability = 30 + Math.random() * 30;
  else if (condition === 'sunny') rainProbability = 5 + Math.random() * 15;

  return {
    location,
    temperature: Math.round(baseTemp),
    condition,
    humidity: Math.round(50 + Math.random() * 40),
    windSpeed: Math.round(10 + Math.random() * 25),
    rainProbability: Math.round(rainProbability),
    feelsLike: Math.round(baseTemp + (Math.random() * 4 - 2)),
    description: descriptions[condition],
  };
}

/**
 * List of Indian cities for location search
 */
export const indianCities = [
  'Mumbai, India',
  'Delhi, India',
  'Bangalore, India',
  'Chennai, India',
  'Kolkata, India',
  'Hyderabad, India',
  'Pune, India',
  'Ahmedabad, India',
  'Jaipur, India',
  'Lucknow, India',
  'Nagpur, India',
  'Bhopal, India',
  'Chandigarh, India',
  'Kochi, India',
  'Patna, India',
];
