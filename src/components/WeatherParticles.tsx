import { useMemo } from 'react';
import { WeatherCondition } from '@/types/weather';

interface WeatherParticlesProps {
  condition: WeatherCondition;
}

/**
 * Animated weather particles overlay based on current weather condition
 */
export function WeatherParticles({ condition }: WeatherParticlesProps) {
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
        return generateSunRays(8);
      default:
        return [];
    }
  }, [condition]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
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
                opacity: p.opacity,
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

      {condition === 'sunny' ? (
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
