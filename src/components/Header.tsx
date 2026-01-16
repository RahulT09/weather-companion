import { CloudSun, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

/**
 * App header with title and refresh button
 */
export function Header({ onRefresh, isLoading }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <CloudSun className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            WeatherBuddy
          </h1>
          <p className="text-sm text-muted-foreground">
            Smart Weather Assistant
          </p>
        </div>
      </div>

      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="p-3 rounded-xl bg-card border border-border hover:bg-muted/50
                   transition-all duration-200 disabled:opacity-50 group"
        title="Refresh weather data"
      >
        <RefreshCw 
          className={`w-5 h-5 text-muted-foreground group-hover:text-foreground
                      ${isLoading ? 'animate-spin' : ''}`} 
        />
      </button>
    </header>
  );
}
