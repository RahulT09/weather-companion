import { WeatherData } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';
import { Droplets, Wind, Thermometer, CloudRain } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
}

/**
 * Main weather display card showing current conditions
 */
export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 animate-slide-up">
      {/* Location Header */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-medium text-muted-foreground">
          📍 {weather.location}
        </h2>
      </div>

      {/* Main Temperature Display */}
      <div className="flex items-center justify-center gap-6 mb-8">
        <WeatherIcon condition={weather.condition} size="xl" />
        <div className="text-center">
          <div className="text-6xl md:text-7xl font-light text-foreground">
            {weather.temperature}°
          </div>
          <div className="text-lg text-muted-foreground capitalize">
            {weather.condition}
          </div>
        </div>
      </div>

      {/* Weather Description */}
      <p className="text-center text-muted-foreground mb-6">
        {weather.description}
      </p>

      {/* Weather Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <WeatherStat
          icon={<Thermometer className="w-5 h-5 text-accent" />}
          label="Feels Like"
          value={`${weather.feelsLike}°C`}
        />
        <WeatherStat
          icon={<Droplets className="w-5 h-5 text-secondary" />}
          label="Humidity"
          value={`${weather.humidity}%`}
        />
        <WeatherStat
          icon={<Wind className="w-5 h-5 text-windy" />}
          label="Wind"
          value={`${weather.windSpeed} km/h`}
        />
        <WeatherStat
          icon={<CloudRain className="w-5 h-5 text-rainy" />}
          label="Rain Chance"
          value={`${weather.rainProbability}%`}
        />
      </div>
    </div>
  );
}

interface WeatherStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

/**
 * Individual weather statistic display
 */
function WeatherStat({ icon, label, value }: WeatherStatProps) {
  return (
    <div className="flex flex-col items-center p-3 bg-muted/50 rounded-xl">
      <div className="mb-2">{icon}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}
