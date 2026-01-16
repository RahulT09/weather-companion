import { WeatherData, AppMode, ChatMessage } from '@/types/weather';

/**
 * Generate weather advice based on current conditions and selected mode
 * Uses simple if/else logic - easy to explain in college viva!
 */
export function generateWeatherAdvice(
  weather: WeatherData,
  mode: AppMode
): ChatMessage[] {
  const messages: ChatMessage[] = [];
  const { temperature, condition, humidity, windSpeed, rainProbability } = weather;

  // Generate greeting based on time of day
  const hour = new Date().getHours();
  let greeting = '';
  if (hour < 12) {
    greeting = 'Good morning! ☀️';
  } else if (hour < 17) {
    greeting = 'Good afternoon! 🌤️';
  } else {
    greeting = 'Good evening! 🌙';
  }

  // Add greeting with weather summary
  messages.push({
    id: 'greeting',
    content: `${greeting} Today in ${weather.location}: ${weather.description}. Temperature is ${temperature}°C.`,
    type: 'greeting',
    timestamp: new Date(),
  });

  // Mode-specific advice
  if (mode === 'farmer') {
    messages.push(...generateFarmerAdvice(weather));
  } else if (mode === 'activity') {
    messages.push(...generateActivityAdvice(weather));
  } else {
    messages.push(...generateGeneralAdvice(weather));
  }

  return messages;
}

/**
 * Farmer-specific advice based on weather conditions
 */
function generateFarmerAdvice(weather: WeatherData): ChatMessage[] {
  const messages: ChatMessage[] = [];
  const { temperature, windSpeed, rainProbability, humidity, condition } = weather;

  // Rain-based irrigation advice
  if (rainProbability > 70) {
    messages.push({
      id: 'rain-advice',
      content: '🌧️ Good rainfall expected today. No need to water your crops - save water and rest!',
      type: 'advice',
      timestamp: new Date(),
    });
  } else if (rainProbability > 40) {
    messages.push({
      id: 'rain-advice',
      content: '🌦️ Some rain possible. Water crops lightly in the morning just in case.',
      type: 'advice',
      timestamp: new Date(),
    });
  } else if (rainProbability < 20 && temperature > 30) {
    messages.push({
      id: 'rain-advice',
      content: '💧 No rain expected and it\'s hot! Water your crops early morning and evening.',
      type: 'warning',
      timestamp: new Date(),
    });
  }

  // Temperature warnings for crops
  if (temperature > 40) {
    messages.push({
      id: 'heat-warning',
      content: '🔥 Extreme heat alert! Protect young plants with shade. Water crops before 7 AM.',
      type: 'warning',
      timestamp: new Date(),
    });
  } else if (temperature > 35) {
    messages.push({
      id: 'heat-advice',
      content: '☀️ Very hot today. Best time for farm work: 6-9 AM and after 5 PM.',
      type: 'advice',
      timestamp: new Date(),
    });
  } else if (temperature < 10) {
    messages.push({
      id: 'cold-warning',
      content: '❄️ Cold weather! Cover sensitive plants to protect from frost damage.',
      type: 'warning',
      timestamp: new Date(),
    });
  }

  // Wind warnings
  if (windSpeed > 40) {
    messages.push({
      id: 'wind-warning',
      content: '💨 Strong winds today! Secure tall plants and avoid spraying pesticides.',
      type: 'warning',
      timestamp: new Date(),
    });
  } else if (windSpeed > 25) {
    messages.push({
      id: 'wind-advice',
      content: '🍃 Windy conditions. Support tall crops like corn and sunflowers.',
      type: 'advice',
      timestamp: new Date(),
    });
  }

  // Humidity advice
  if (humidity > 80 && temperature > 25) {
    messages.push({
      id: 'humidity-warning',
      content: '💦 High humidity! Watch for fungal diseases. Avoid watering leaves.',
      type: 'warning',
      timestamp: new Date(),
    });
  }

  // Best work time suggestion
  if (condition === 'sunny' && temperature < 32) {
    messages.push({
      id: 'work-tip',
      content: '🌾 Perfect weather for field work! Good day for planting or harvesting.',
      type: 'tip',
      timestamp: new Date(),
    });
  }

  return messages;
}

/**
 * Activity-based advice for daily planning
 */
function generateActivityAdvice(weather: WeatherData): ChatMessage[] {
  const messages: ChatMessage[] = [];
  const { temperature, windSpeed, rainProbability, condition } = weather;

  // Outdoor activity recommendations
  if (rainProbability < 30 && temperature >= 20 && temperature <= 32) {
    messages.push({
      id: 'outdoor-advice',
      content: '🌳 Great weather for outdoor activities! Perfect for morning walks or evening sports.',
      type: 'advice',
      timestamp: new Date(),
    });
  }

  // Market visit advice
  if (condition === 'sunny' || condition === 'cloudy') {
    if (rainProbability < 40) {
      messages.push({
        id: 'market-advice',
        content: '🛒 Good day for market visits and shopping. Weather looks stable.',
        type: 'advice',
        timestamp: new Date(),
      });
    }
  }

  // Travel recommendations
  if (rainProbability > 60) {
    messages.push({
      id: 'travel-warning',
      content: '🚗 Rain expected - plan travel carefully. Carry umbrella if going out.',
      type: 'warning',
      timestamp: new Date(),
    });
  } else if (windSpeed > 35) {
    messages.push({
      id: 'travel-warning',
      content: '💨 Strong winds may affect travel. Drive carefully on highways.',
      type: 'warning',
      timestamp: new Date(),
    });
  } else if (condition !== 'stormy' && condition !== 'foggy') {
    messages.push({
      id: 'travel-advice',
      content: '✈️ Good conditions for travel today. Roads should be clear.',
      type: 'advice',
      timestamp: new Date(),
    });
  }

  // Sports and exercise
  if (temperature > 35) {
    messages.push({
      id: 'sports-warning',
      content: '🏃 Too hot for outdoor sports. Exercise indoors or early morning only.',
      type: 'warning',
      timestamp: new Date(),
    });
  } else if (temperature >= 18 && temperature <= 28 && rainProbability < 30) {
    messages.push({
      id: 'sports-advice',
      content: '⚽ Perfect weather for outdoor sports and exercise!',
      type: 'tip',
      timestamp: new Date(),
    });
  }

  // Safety warnings
  if (condition === 'stormy') {
    messages.push({
      id: 'safety-warning',
      content: '⚠️ Storm alert! Stay indoors and avoid unnecessary travel.',
      type: 'warning',
      timestamp: new Date(),
    });
  }

  if (condition === 'foggy') {
    messages.push({
      id: 'fog-warning',
      content: '🌫️ Foggy conditions. Drive slowly and use fog lights if traveling.',
      type: 'warning',
      timestamp: new Date(),
    });
  }

  return messages;
}

/**
 * General weather advice for everyone
 */
function generateGeneralAdvice(weather: WeatherData): ChatMessage[] {
  const messages: ChatMessage[] = [];
  const { temperature, rainProbability, condition, humidity } = weather;

  // Basic weather tips
  if (rainProbability > 50) {
    messages.push({
      id: 'rain-tip',
      content: '☔ Don\'t forget your umbrella! Rain is expected today.',
      type: 'tip',
      timestamp: new Date(),
    });
  }

  if (temperature > 32) {
    messages.push({
      id: 'heat-tip',
      content: '🥤 Stay hydrated! Drink plenty of water and avoid direct sun.',
      type: 'advice',
      timestamp: new Date(),
    });
  }

  if (temperature < 15) {
    messages.push({
      id: 'cold-tip',
      content: '🧥 It\'s chilly! Wear warm clothes when going outside.',
      type: 'tip',
      timestamp: new Date(),
    });
  }

  if (condition === 'sunny' && temperature >= 20 && temperature <= 30) {
    messages.push({
      id: 'nice-day',
      content: '😊 Beautiful day ahead! Enjoy the pleasant weather.',
      type: 'advice',
      timestamp: new Date(),
    });
  }

  return messages;
}

/**
 * Get time-appropriate greeting
 */
export function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
