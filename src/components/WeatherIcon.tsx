import { WeatherCondition } from '@/types/weather';
import { Sun, Cloud, CloudRain, CloudLightning, Wind, CloudFog, Snowflake } from 'lucide-react';

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Weather icon component that displays appropriate icon based on condition
 */
export function WeatherIcon({ condition, size = 'md', className = '' }: WeatherIconProps) {
  // Size mapping for icons
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  // Color classes based on weather condition
  const colorClasses = {
    sunny: 'text-sunny',
    cloudy: 'text-cloudy',
    rainy: 'text-rainy',
    stormy: 'text-destructive',
    windy: 'text-windy',
    foggy: 'text-muted-foreground',
    snowy: 'text-secondary',
  };

  const iconClass = `${sizeClasses[size]} ${colorClasses[condition]} ${className}`;

  // Return appropriate icon based on condition
  switch (condition) {
    case 'sunny':
      return <Sun className={`${iconClass} animate-pulse-soft`} />;
    case 'cloudy':
      return <Cloud className={iconClass} />;
    case 'rainy':
      return <CloudRain className={iconClass} />;
    case 'stormy':
      return <CloudLightning className={iconClass} />;
    case 'windy':
      return <Wind className={iconClass} />;
    case 'foggy':
      return <CloudFog className={iconClass} />;
    case 'snowy':
      return <Snowflake className={iconClass} />;
    default:
      return <Sun className={iconClass} />;
  }
}
