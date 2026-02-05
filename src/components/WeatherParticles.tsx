import { useMemo } from 'react';
import { WeatherCondition, WeatherData } from '@/types/weather';
import { isNightTimeAtLocation } from '@/utils/weatherBackground';

interface WeatherParticlesProps {
  condition: WeatherCondition;
  weather?: WeatherData | null;
}

/**
 * Animated weather particles overlay based on current weather condition
 * Includes night-time stars and moon effects based on location's time
 */
export function WeatherParticles({ condition, weather }: WeatherParticlesProps) {
  const isNight = isNightTimeAtLocation(weather);
  
  // Generate random particles based on condition
  const particles = useMemo(() => {
    switch (condition) {
      case 'rainy':
        return generateRaindrops(50);
      case 'stormy':
        return generateRaindrops(80);
      case 'snowy':
        return generateSnowflakes(40);
      case 'cloudy':
      case 'foggy':
        return generateClouds(6);
      case 'windy':
        return generateWindLines(15);
      case 'sunny':
        return isNight ? [] : generateSunRays(8);
      default:
        return [];
    }
  }, [condition, isNight]);

  // Generate stars for night time
  const stars = useMemo(() => {
    return isNight ? generateStars(60) : [];
  }, [isNight]);

  // Generate shooting stars for clear nights
  const shootingStars = useMemo(() => {
    return isNight && (condition === 'sunny' || condition === 'cloudy') ? generateShootingStars(3) : [];
  }, [isNight, condition]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Night sky effects */}
      {isNight && (
        <>
          {/* Moon glow */}
          <div className="moon-container">
            <div className="moon-glow" />
            <div className="moon">🌙</div>
          </div>

          {/* Twinkling stars */}
          <div className="stars-container">
            {stars.map((star, i) => (
              <div
                key={i}
                className="star"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  animationDelay: `${star.delay}s`,
                  fontSize: `${star.size}px`,
                  opacity: star.opacity,
                }}
              >
                ✦
              </div>
            ))}
          </div>

          {/* Shooting stars */}
          {shootingStars.map((star, i) => (
            <div
              key={`shooting-${i}`}
              className="shooting-star"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}
        </>
      )}

      {/* Render particles based on condition */}
      {condition === 'rainy' || condition === 'stormy' ? (
        <div className="rain-container">
          {particles.map((p, i) => (
            <div
              key={i}
              className="raindrop"
              style={{
                left: `${p.x}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
          {condition === 'stormy' && <div className="lightning" />}
        </div>
      ) : null}

      {condition === 'snowy' ? (
        <div className="snow-container">
          {particles.map((p, i) => (
            <div
              key={i}
              className="snowflake"
              style={{
                left: `${p.x}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                fontSize: `${p.size}px`,
              }}
            >
              ❄
            </div>
          ))}
        </div>
      ) : null}

      {(condition === 'cloudy' || condition === 'foggy') ? (
        <div className="clouds-container">
          {particles.map((p, i) => (
            <div
              key={i}
              className="cloud"
              style={{
                top: `${p.y}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                opacity: isNight ? p.opacity * 0.5 : p.opacity,
                transform: `scale(${p.size})`,
              }}
            >
              ☁
            </div>
          ))}
        </div>
      ) : null}

      {condition === 'windy' ? (
        <div className="wind-container">
          {particles.map((p, i) => (
            <div
              key={i}
              className="wind-line"
              style={{
                top: `${p.y}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                width: `${p.size}%`,
              }}
            />
          ))}
        </div>
      ) : null}

      {condition === 'sunny' && !isNight ? (
        <div className="sun-container">
          <div className="sun-glow" />
          {particles.map((p, i) => (
            <div
              key={i}
              className="sun-ray"
              style={{
                transform: `rotate(${p.rotation}deg)`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

// Particle generators
function generateRaindrops(count: number) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 0.5 + Math.random() * 0.5,
  }));
}

function generateSnowflakes(count: number) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 5,
    size: 10 + Math.random() * 20,
  }));
}

function generateClouds(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    y: 5 + (i * 15) + Math.random() * 10,
    delay: Math.random() * 10,
    duration: 20 + Math.random() * 20,
    opacity: 0.3 + Math.random() * 0.4,
    size: 1 + Math.random() * 2,
  }));
}

function generateWindLines(count: number) {
  return Array.from({ length: count }, () => ({
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 1 + Math.random() * 2,
    size: 10 + Math.random() * 20,
  }));
}

function generateSunRays(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    rotation: (360 / count) * i,
    delay: i * 0.1,
  }));
}

function generateStars(count: number) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 60, // Keep stars in upper portion
    delay: Math.random() * 3,
    size: 6 + Math.random() * 12,
    opacity: 0.4 + Math.random() * 0.6,
  }));
}

function generateShootingStars(count: number) {
  return Array.from({ length: count }, () => ({
    x: 20 + Math.random() * 60,
    y: 5 + Math.random() * 30,
    delay: Math.random() * 8,
    duration: 1 + Math.random() * 1.5,
  }));
}
