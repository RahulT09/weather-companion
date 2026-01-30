import { useState } from 'react';
import { X, Send, MapPin, ThumbsUp, User, MessageCircle, Compass, Shield, Clock, Utensils } from 'lucide-react';
import { WeatherData, LocalTip, TravelAdvice } from '@/types/weather';
import { generateTravelAdvice, getWelcomeMessage, getCommunityPrompt } from '@/utils/travelAdvice';

interface LocalGuideChatProps {
  weather: WeatherData;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'chat' | 'weather' | 'travel' | 'safety' | 'tips';

/**
 * Local Guide Chat - Interactive travel assistant
 */
export function LocalGuideChat({ weather, isOpen, onClose }: LocalGuideChatProps) {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [userTips, setUserTips] = useState<LocalTip[]>([]);
  const [newTip, setNewTip] = useState('');
  const [userName, setUserName] = useState('');

  if (!isOpen) return null;

  const advice = generateTravelAdvice(weather);
  const welcomeMessage = getWelcomeMessage(weather.location);

  const handleAddTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTip.trim() && userName.trim()) {
      const tip: LocalTip = {
        id: Date.now().toString(),
        content: newTip.trim(),
        author: userName.trim(),
        timestamp: new Date(),
        category: 'general',
        likes: 0,
      };
      setUserTips(prev => [tip, ...prev]);
      setNewTip('');
    }
  };

  const handleLikeTip = (tipId: string) => {
    setUserTips(prev =>
      prev.map(tip =>
        tip.id === tipId ? { ...tip, likes: tip.likes + 1 } : tip
      )
    );
  };

  const tabs = [
    { id: 'chat' as TabType, label: 'Chat', icon: MessageCircle },
    { id: 'weather' as TabType, label: 'Weather', icon: Clock },
    { id: 'travel' as TabType, label: 'Travel', icon: Compass },
    { id: 'safety' as TabType, label: 'Safety', icon: Shield },
    { id: 'tips' as TabType, label: 'Food & Tips', icon: Utensils },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-card rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-primary text-primary-foreground px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Local Guide</h3>
              <p className="text-sm opacity-90 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {weather.location}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors
                ${activeTab === tab.id 
                  ? 'text-primary border-b-2 border-primary bg-primary/5' 
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'chat' && (
            <ChatTab 
              welcomeMessage={welcomeMessage}
              userTips={userTips}
              userName={userName}
              setUserName={setUserName}
              newTip={newTip}
              setNewTip={setNewTip}
              onAddTip={handleAddTip}
              onLikeTip={handleLikeTip}
            />
          )}
          {activeTab === 'weather' && <AdviceList items={advice.weather} title="Weather & Climate" icon="🌤️" />}
          {activeTab === 'travel' && <AdviceList items={advice.travel} title="Getting Around" icon="🚗" />}
          {activeTab === 'safety' && <AdviceList items={advice.safety} title="Safety Tips" icon="🛡️" />}
          {activeTab === 'tips' && (
            <div className="space-y-4">
              <AdviceList items={advice.localTips} title="Local Experiences" icon="🍜" />
              <AdviceList items={advice.bestTimes} title="Best Times" icon="⏰" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ChatTabProps {
  welcomeMessage: string;
  userTips: LocalTip[];
  userName: string;
  setUserName: (name: string) => void;
  newTip: string;
  setNewTip: (tip: string) => void;
  onAddTip: (e: React.FormEvent) => void;
  onLikeTip: (id: string) => void;
}

function ChatTab({ 
  welcomeMessage, 
  userTips, 
  userName, 
  setUserName, 
  newTip, 
  setNewTip, 
  onAddTip,
  onLikeTip 
}: ChatTabProps) {
  return (
    <div className="space-y-4">
      {/* Welcome message */}
      <div className="bg-primary/10 rounded-2xl rounded-tl-sm p-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Compass className="w-4 h-4 text-primary" />
          </div>
          <p className="text-sm leading-relaxed">{welcomeMessage}</p>
        </div>
      </div>

      {/* Community prompt */}
      <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
        <p className="text-sm text-center">{getCommunityPrompt()}</p>
      </div>

      {/* Add tip form */}
      <form onSubmit={onAddTip} className="space-y-3">
        <input
          type="text"
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground
                     placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Share your tip or experience..."
            value={newTip}
            onChange={(e) => setNewTip(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-muted border border-border text-foreground
                       placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
          />
          <button
            type="submit"
            disabled={!newTip.trim() || !userName.trim()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg
                       hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* User tips */}
      {userTips.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Community Tips</h4>
          {userTips.map(tip => (
            <div key={tip.id} className="bg-secondary/30 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm font-medium">{tip.author}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(tip.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm pl-8">{tip.content}</p>
              <button
                onClick={() => onLikeTip(tip.id)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors ml-8"
              >
                <ThumbsUp className="w-3 h-3" />
                {tip.likes > 0 && <span>{tip.likes}</span>}
                <span>Helpful</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {userTips.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-4">
          Be the first to share a tip about this place! 🌟
        </p>
      )}
    </div>
  );
}

interface AdviceListProps {
  items: string[];
  title: string;
  icon: string;
}

function AdviceList({ items, title, icon }: AdviceListProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="flex items-center gap-2 font-medium">
        <span>{icon}</span>
        {title}
      </h4>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-secondary/30 rounded-xl p-3 text-sm leading-relaxed animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
