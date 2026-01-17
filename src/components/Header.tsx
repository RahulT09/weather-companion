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
        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <CloudSun className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            WeatherBuddy
          </h1>
          <p className="text-sm opacity-80">
            Smart Weather Assistant
          </p>
        </div>
      </div>

      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30
                   transition-all duration-200 disabled:opacity-50 group hover:bg-white/30"
        title="Refresh weather data"
      >
        <RefreshCw 
          className={`w-5 h-5 opacity-80 group-hover:opacity-100
                      ${isLoading ? 'animate-spin' : ''}`} 
        />
      </button>
    </header>
  );
}
