import { AppMode } from '@/types/weather';
import { Sprout, MapPin, User } from 'lucide-react';

interface ModeToggleProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

/**
 * Mode toggle buttons for switching between different advice modes
 */
export function ModeToggle({ currentMode, onModeChange }: ModeToggleProps) {
  const modes: { id: AppMode; label: string; icon: React.ReactNode; emoji: string }[] = [
    {
      id: 'general',
      label: 'General',
      icon: <User className="w-4 h-4" />,
      emoji: '👤',
    },
    {
      id: 'farmer',
      label: 'Farmer Mode',
      icon: <Sprout className="w-4 h-4" />,
      emoji: '🌾',
    },
    {
      id: 'activity',
      label: 'Activities',
      icon: <MapPin className="w-4 h-4" />,
      emoji: '🌍',
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 p-1 bg-muted/50 rounded-xl">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm
            transition-all duration-300 ease-out
            ${
              currentMode === mode.id
                ? mode.id === 'farmer'
                  ? 'bg-farmer text-primary-foreground shadow-md scale-105'
                  : mode.id === 'activity'
                  ? 'bg-activity text-secondary-foreground shadow-md scale-105'
                  : 'bg-primary text-primary-foreground shadow-md scale-105'
                : 'bg-transparent text-muted-foreground hover:bg-card hover:text-foreground'
            }
          `}
        >
          <span className="text-base">{mode.emoji}</span>
          <span className="hidden sm:inline">{mode.label}</span>
        </button>
      ))}
    </div>
  );
}
