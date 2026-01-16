import { ChatMessage, AppMode } from '@/types/weather';
import { MessageCircle, AlertTriangle, Lightbulb, Sparkles } from 'lucide-react';

interface ChatAssistantProps {
  messages: ChatMessage[];
  mode: AppMode;
}

/**
 * Chat-style weather assistant that displays advice messages
 */
export function ChatAssistant({ messages, mode }: ChatAssistantProps) {
  // Get mode-specific styling
  const getModeStyles = () => {
    switch (mode) {
      case 'farmer':
        return {
          headerBg: 'bg-farmer',
          headerText: 'text-primary-foreground',
          title: '🌾 Farmer Assistant',
          subtitle: 'Agricultural weather advice',
        };
      case 'activity':
        return {
          headerBg: 'bg-activity',
          headerText: 'text-secondary-foreground',
          title: '🌍 Activity Advisor',
          subtitle: 'Daily activity recommendations',
        };
      default:
        return {
          headerBg: 'bg-primary',
          headerText: 'text-primary-foreground',
          title: '☀️ Weather Assistant',
          subtitle: 'Your friendly weather guide',
        };
    }
  };

  const styles = getModeStyles();

  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-slide-up">
      {/* Chat Header */}
      <div className={`${styles.headerBg} ${styles.headerText} px-5 py-4`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{styles.title}</h3>
            <p className="text-sm opacity-90">{styles.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Loading weather advice...</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatBubble 
              key={message.id} 
              message={message} 
              delay={index * 100}
            />
          ))
        )}
      </div>
    </div>
  );
}

interface ChatBubbleProps {
  message: ChatMessage;
  delay: number;
}

/**
 * Individual chat bubble component
 */
function ChatBubble({ message, delay }: ChatBubbleProps) {
  // Style based on message type
  const getTypeStyles = () => {
    switch (message.type) {
      case 'warning':
        return {
          bg: 'bg-destructive/10 border-destructive/20',
          icon: <AlertTriangle className="w-4 h-4 text-destructive" />,
        };
      case 'tip':
        return {
          bg: 'bg-accent/10 border-accent/20',
          icon: <Lightbulb className="w-4 h-4 text-accent" />,
        };
      case 'greeting':
        return {
          bg: 'bg-secondary/10 border-secondary/20',
          icon: <Sparkles className="w-4 h-4 text-secondary" />,
        };
      default:
        return {
          bg: 'bg-chat border-chat-border',
          icon: <MessageCircle className="w-4 h-4 text-primary" />,
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div 
      className="animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`
        flex gap-3 p-4 rounded-2xl rounded-tl-sm border
        ${styles.bg}
      `}>
        <div className="flex-shrink-0 mt-0.5">
          {styles.icon}
        </div>
        <p className="text-sm leading-relaxed text-foreground">
          {message.content}
        </p>
      </div>
    </div>
  );
}
