import { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface LocationSearchProps {
  currentLocation: string;
  onLocationChange: (location: string) => void;
  isLoading?: boolean;
}

/**
 * Location search component - searches any city worldwide
 */
export function LocationSearch({ currentLocation, onLocationChange, isLoading }: LocationSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onLocationChange(searchTerm.trim());
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        {isLoading ? (
          <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary animate-spin" />
        ) : (
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        )}
        <input
          type="text"
          placeholder="Search any city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading}
          className="w-full pl-12 pr-24 py-3 rounded-xl bg-card border border-border
                     focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                     text-card-foreground placeholder:text-muted-foreground
                     transition-all duration-200 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!searchTerm.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 
                     bg-primary text-primary-foreground rounded-lg text-sm font-medium
                     hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200"
        >
          Search
        </button>
      </div>
      
      {/* Current location indicator */}
      <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">
        <MapPin className="w-4 h-4" />
        <span>Currently showing: {currentLocation}</span>
      </div>
    </form>
  );
}
