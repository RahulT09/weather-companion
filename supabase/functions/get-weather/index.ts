import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Edge function to fetch weather data from OpenWeatherMap API
 * Keeps API key secure on the server side
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { city, lat, lon } = await req.json();
    const apiKey = Deno.env.get('OPENWEATHERMAP_API_KEY');

    if (!apiKey) {
      throw new Error('OpenWeatherMap API key not configured');
    }

    let url: string;
    
    // Build API URL based on provided parameters
    if (lat && lon) {
      // Use coordinates if provided (for geolocation)
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else if (city) {
      // Use city name search
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    } else {
      throw new Error('Please provide either city name or coordinates');
    }

    // Fetch weather data from OpenWeatherMap
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message || 'Failed to fetch weather data');
    }

    // Map OpenWeatherMap response to our format
    const weatherCondition = mapWeatherCondition(data.weather[0]?.main);
    
    // Get timezone offset in seconds and sunrise/sunset times
    const timezoneOffset = data.timezone || 0; // Offset in seconds from UTC
    const sunrise = data.sys?.sunrise || 0;
    const sunset = data.sys?.sunset || 0;
    
    const weatherData = {
      location: `${data.name}, ${data.sys?.country || ''}`,
      temperature: Math.round(data.main.temp),
      condition: weatherCondition,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      rainProbability: calculateRainProbability(data),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0]?.description || weatherCondition,
      timezoneOffset, // Timezone offset in seconds from UTC
      sunrise, // Sunrise time (Unix timestamp)
      sunset, // Sunset time (Unix timestamp)
    };

    return new Response(JSON.stringify(weatherData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Weather API Error:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

/**
 * Map OpenWeatherMap condition to our app's weather conditions
 */
function mapWeatherCondition(condition: string): string {
  const conditionMap: Record<string, string> = {
    'Clear': 'sunny',
    'Clouds': 'cloudy',
    'Rain': 'rainy',
    'Drizzle': 'rainy',
    'Thunderstorm': 'stormy',
    'Snow': 'snowy',
    'Mist': 'foggy',
    'Fog': 'foggy',
    'Haze': 'foggy',
    'Dust': 'windy',
    'Sand': 'windy',
    'Squall': 'windy',
    'Tornado': 'stormy',
  };
  
  return conditionMap[condition] || 'cloudy';
}

/**
 * Calculate rain probability from OpenWeatherMap data
 * OpenWeatherMap current weather doesn't have direct probability,
 * so we estimate based on conditions and humidity
 */
function calculateRainProbability(data: any): number {
  const condition = data.weather[0]?.main;
  const humidity = data.main?.humidity || 50;
  const clouds = data.clouds?.all || 0;
  
  // If it's already raining, high probability
  if (['Rain', 'Drizzle', 'Thunderstorm'].includes(condition)) {
    return 80 + Math.floor(Math.random() * 15);
  }
  
  // Estimate based on clouds and humidity
  const baseProb = (clouds * 0.4) + (humidity * 0.3);
  return Math.min(95, Math.max(5, Math.round(baseProb)));
}
