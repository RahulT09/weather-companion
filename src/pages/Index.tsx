import { useState, useEffect, useCallback } from 'react';
import { WeatherData, AppMode, ChatMessage } from '@/types/weather';
import { getMockWeatherData } from '@/utils/mockWeather';
import { generateWeatherAdvice } from '@/utils/weatherAdvice';
import { Header } from '@/components/Header';
import { LocationSearch } from '@/components/LocationSearch';
import { WeatherCard } from '@/components/WeatherCard';
import { ModeToggle } from '@/components/ModeToggle';
import { ChatAssistant } from '@/components/ChatAssistant';

/**
 * Main Weather App Component
 * Displays weather information and provides smart advice based on selected mode
 */
const Index = () => {
  // State management using React hooks
  const [location, setLocation] = useState<string>('Mumbai, India');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [mode, setMode] = useState<AppMode>('general');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Fetch weather data for the current location
   * Uses mock data - can be replaced with real API
   */
  const fetchWeather = useCallback(() => {
    setIsLoading(true);
    
    // Simulate API delay for realistic feel
    setTimeout(() => {
      const data = getMockWeatherData(location);
      setWeather(data);
      setIsLoading(false);
    }, 800);
  }, [location]);

  /**
   * Generate advice messages when weather or mode changes
   */
  useEffect(() => {
    if (weather) {
      const advice = generateWeatherAdvice(weather, mode);
      setMessages(advice);
    }
  }, [weather, mode]);

  /**
   * Fetch weather on initial load and location change
   */
  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  /**
   * Handle location change from search
   */
  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
  };

  /**
   * Handle mode change from toggle
   */
  const handleModeChange = (newMode: AppMode) => {
    setMode(newMode);
  };

  /**
   * Refresh weather data
   */
  const handleRefresh = () => {
    fetchWeather();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container max-w-2xl mx-auto px-4 py-6 md:py-10">
        {/* App Header */}
        <Header onRefresh={handleRefresh} isLoading={isLoading} />

        {/* Location Search */}
        <div className="mb-6">
          <LocationSearch
            currentLocation={location}
            onLocationChange={handleLocationChange}
          />
        </div>

        {/* Weather Display */}
        {weather && !isLoading ? (
          <div className="space-y-6">
            {/* Weather Card */}
            <WeatherCard weather={weather} />

            {/* Mode Toggle */}
            <div className="flex justify-center">
              <ModeToggle currentMode={mode} onModeChange={handleModeChange} />
            </div>

            {/* Chat Assistant */}
            <ChatAssistant messages={messages} mode={mode} />
          </div>
        ) : (
          /* Loading State */
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 
                            flex items-center justify-center animate-pulse">
              <span className="text-3xl">🌤️</span>
            </div>
            <p className="text-muted-foreground">
              Fetching weather for {location}...
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-10 text-center text-sm text-muted-foreground">
          <p>WeatherBuddy - Your Smart Weather Companion</p>
          <p className="mt-1 text-xs">
            Made with ❤️ for farmers and everyone
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
