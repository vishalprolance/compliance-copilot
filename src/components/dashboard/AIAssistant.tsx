import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m your Regulatory Compliance AI Assistant. I can help you understand regulatory updates, check compliance status, and answer questions about the system. How can I assist you today?',
    timestamp: new Date(),
  },
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Based on the current regulatory feed, I\'ve identified 3 updates that require immediate attention. The SEC Rule 10b5-1 modification has the highest priority with a risk score of 92.',
        'The GDPR Article 17 Amendment is currently in the analysis phase. Our Analyzer agent estimates the impact will affect 4 core components with approximately 47 code changes required.',
        'I can see there are 3 pending approvals in the queue. Would you like me to summarize the changes for the SEC compliance patch?',
        'The current compliance score is 94.7%. The recent HIPAA breach notification update has been successfully deployed, improving our healthcare compliance posture.',
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="glass-card h-full flex flex-col">
      <div className="p-4 border-b border-border/50 flex items-center gap-2">
        <div className="p-2 rounded-lg bg-primary/20">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground text-sm">AI Assistant</h2>
          <p className="text-xs text-muted-foreground">Ask about compliance status</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3 animate-fade-in',
              message.role === 'user' && 'flex-row-reverse'
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
              message.role === 'assistant' ? 'bg-primary/20 text-primary' : 'bg-secondary text-foreground'
            )}>
              {message.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div className={cn(
              'max-w-[80%] p-3 rounded-lg text-sm',
              message.role === 'assistant' ? 'bg-secondary/50 text-foreground' : 'bg-primary text-primary-foreground'
            )}>
              {message.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-secondary/50 p-3 rounded-lg">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about compliance..."
            className="bg-secondary/50 border-border/50"
          />
          <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
