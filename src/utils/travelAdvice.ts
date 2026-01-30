import { WeatherData, TravelAdvice } from '@/types/weather';

/**
 * Generate local travel advice based on weather and location
 * Acts like a friendly local guide
 */
export function generateTravelAdvice(weather: WeatherData): TravelAdvice {
  const { temperature, condition, humidity, windSpeed, rainProbability } = weather;
  
  const advice: TravelAdvice = {
    weather: [],
    travel: [],
    safety: [],
    localTips: [],
    bestTimes: [],
  };

  // Weather insights
  advice.weather.push(getWeatherGreeting(condition, temperature));
  advice.weather.push(...getSeasonalAdvice(temperature, humidity));

  // Travel tips based on conditions
  advice.travel.push(...getTravelTips(condition, temperature, windSpeed));

  // Safety recommendations
  advice.safety.push(...getSafetyTips(condition, temperature, rainProbability));

  // Local tips
  advice.localTips.push(...getLocalTips(condition, temperature));

  // Best times to visit/travel
  advice.bestTimes.push(...getBestTimes(condition, temperature));

  return advice;
}

function getWeatherGreeting(condition: string, temperature: number): string {
  const greetings: Record<string, string> = {
    sunny: `☀️ It's a beautiful sunny day! Temperature is around ${temperature}°C - perfect for exploring!`,
    cloudy: `☁️ Cloudy skies today at ${temperature}°C. Great weather for walking around without harsh sun.`,
    rainy: `🌧️ It's raining here with ${temperature}°C. Carry an umbrella and enjoy the fresh smell of rain!`,
    stormy: `⛈️ Storm warning! Temperature is ${temperature}°C. Best to stay indoors for now.`,
    windy: `💨 Quite windy today at ${temperature}°C. Hold onto your hats!`,
    foggy: `🌫️ Foggy conditions with ${temperature}°C. Visibility might be low, so take care.`,
    snowy: `❄️ It's snowing! Temperature is ${temperature}°C. Bundle up and enjoy the winter wonderland!`,
  };
  return greetings[condition] || `Current temperature is ${temperature}°C.`;
}

function getSeasonalAdvice(temperature: number, humidity: number): string[] {
  const tips: string[] = [];

  if (temperature > 35) {
    tips.push('🥵 It\'s quite hot! Stay hydrated and avoid peak afternoon sun (12-4 PM).');
    tips.push('💧 Carry a water bottle - you\'ll need at least 2-3 liters today.');
  } else if (temperature > 28) {
    tips.push('🌡️ Warm weather - light cotton clothes recommended.');
    tips.push('🧴 Don\'t forget sunscreen if you\'re out for long.');
  } else if (temperature < 15) {
    tips.push('🧥 It\'s chilly! Bring layers and a warm jacket.');
  } else if (temperature < 5) {
    tips.push('🥶 Quite cold today! Thermal wear recommended.');
  }

  if (humidity > 80) {
    tips.push('💦 High humidity - you might feel sticky. Wear breathable fabrics.');
  }

  return tips;
}

function getTravelTips(condition: string, temperature: number, windSpeed: number): string[] {
  const tips: string[] = [];

  // Transport recommendations
  if (condition === 'rainy' || condition === 'stormy') {
    tips.push('🚕 Better to use cabs or auto-rickshaws today rather than two-wheelers.');
    tips.push('🚌 Public buses might be delayed due to weather. Plan extra time.');
  } else if (condition === 'sunny' && temperature < 32) {
    tips.push('🛺 Great day for an auto-rickshaw ride to explore the city!');
    tips.push('🚶 Perfect weather for walking tours of the old city areas.');
  }

  if (condition === 'foggy') {
    tips.push('🚗 If driving, use fog lights and maintain safe distance.');
    tips.push('✈️ Check flight status - fog might cause delays.');
  }

  if (windSpeed > 30) {
    tips.push('🏍️ Two-wheeler riders be careful - strong crosswinds on highways.');
  }

  // General transport tips
  tips.push('🗺️ Download offline maps - mobile networks can be spotty in some areas.');
  tips.push('💵 Keep small change handy for local transport and street vendors.');

  return tips;
}

function getSafetyTips(condition: string, temperature: number, rainProbability: number): string[] {
  const tips: string[] = [];

  if (condition === 'stormy') {
    tips.push('⚠️ Avoid open areas, trees, and metal structures during lightning.');
    tips.push('🏠 If outdoors, seek shelter immediately.');
  }

  if (rainProbability > 70) {
    tips.push('🌊 Watch out for waterlogged roads - avoid if possible.');
    tips.push('⚡ Stay away from electrical poles and wires during rain.');
  }

  if (temperature > 38) {
    tips.push('🏥 Signs of heat stroke: dizziness, nausea. Seek shade and water immediately.');
    tips.push('👶 Keep elderly and children indoors during afternoon hours.');
  }

  if (condition === 'foggy') {
    tips.push('👀 Visibility is low - walk carefully near roads.');
  }

  // General safety
  tips.push('📱 Save local emergency numbers: Police 100, Ambulance 108.');
  tips.push('🎒 Keep valuables secure, especially in crowded areas.');

  return tips;
}

function getLocalTips(condition: string, temperature: number): string[] {
  const tips: string[] = [];

  if (condition === 'sunny' && temperature > 25) {
    tips.push('🍧 Try local ice gola (shaved ice) or sugarcane juice from street vendors!');
    tips.push('☕ Evening chai at a local tapri (tea stall) is a must-try experience.');
  }

  if (condition === 'rainy') {
    tips.push('🍵 Hot chai and pakoras during rain - a local favorite combo!');
    tips.push('🌧️ Monsoon brings out the best street food - try corn on the cob!');
  }

  if (temperature < 20) {
    tips.push('🍲 Perfect weather for local hot dishes and soups.');
  }

  // General local tips
  tips.push('🙏 A friendly "Namaste" goes a long way with locals.');
  tips.push('🛍️ Bargain respectfully at local markets - it\'s expected!');
  tips.push('🕐 Many shops close for afternoon siesta (2-5 PM) in smaller towns.');

  return tips;
}

function getBestTimes(condition: string, temperature: number): string[] {
  const tips: string[] = [];

  if (temperature > 30) {
    tips.push('🌅 Best time to explore: Early morning (6-9 AM) or evening (5-7 PM).');
    tips.push('🌙 Night markets and food streets come alive after 7 PM.');
  } else if (temperature < 15) {
    tips.push('☀️ Best time to be outdoors: Mid-day when it\'s warmest (11 AM - 3 PM).');
  } else {
    tips.push('🎉 Great weather! You can explore comfortably throughout the day.');
  }

  if (condition === 'sunny') {
    tips.push('📸 Golden hour photography: 6-7 AM and 5-6 PM for best light.');
  }

  return tips;
}

/**
 * Get a friendly welcome message for the location
 */
export function getWelcomeMessage(location: string): string {
  return `🙏 Namaste! Welcome to ${location}! I'm your local guide. Let me share some tips to make your visit wonderful!`;
}

/**
 * Get community prompt message
 */
export function getCommunityPrompt(): string {
  return `💬 Have you visited this place? Share your tips and experiences to help fellow travelers!`;
}
