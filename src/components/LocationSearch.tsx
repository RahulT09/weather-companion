import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { indianCities } from '@/utils/mockWeather';

interface LocationSearchProps {
  currentLocation: string;
  onLocationChange: (location: string) => void;
}

/**
 * Location search component with autocomplete suggestions
 */
export function LocationSearch({ currentLocation, onLocationChange }: LocationSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter cities based on search term
  const filteredCities = indianCities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (city: string) => {
    onLocationChange(city);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search city..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border
                     focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                     text-foreground placeholder:text-muted-foreground
                     transition-all duration-200"
        />
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border 
                        rounded-xl shadow-card overflow-hidden z-50 max-h-60 overflow-y-auto">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <button
                key={city}
                onClick={() => handleSelect(city)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50
                           text-left transition-colors duration-150"
              >
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{city}</span>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-muted-foreground text-center">
              No cities found
            </div>
          )}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
