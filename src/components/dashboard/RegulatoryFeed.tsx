import { RegulatoryUpdate, RiskLevel } from '@/types/compliance';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RegulatoryFeedProps {
  updates: RegulatoryUpdate[];
}

const riskColors: Record<RiskLevel, string> = {
  critical: 'bg-destructive/20 text-destructive border-destructive/30',
  high: 'bg-accent/20 text-accent border-accent/30',
  medium: 'bg-primary/20 text-primary border-primary/30',
  low: 'bg-success/20 text-success border-success/30',
};

const statusIcons = {
  new: <AlertTriangle className="w-4 h-4 text-accent" />,
  analyzing: <Loader2 className="w-4 h-4 text-primary animate-spin" />,
  implementing: <FileText className="w-4 h-4 text-primary" />,
  deployed: <CheckCircle className="w-4 h-4 text-success" />,
  archived: <Clock className="w-4 h-4 text-muted-foreground" />,
};

export function RegulatoryFeed({ updates }: RegulatoryFeedProps) {
  return (
    <div className="glass-card h-full flex flex-col">
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Regulatory Feed</h2>
        <Badge variant="outline" className="text-xs">
          {updates.filter(u => u.status === 'new').length} New
        </Badge>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-2">
        {updates.map((update, index) => (
          <div
            key={update.id}
            className={cn(
              'p-4 rounded-lg bg-secondary/30 border border-transparent hover:border-primary/30 transition-all duration-200 cursor-pointer animate-fade-in',
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">{statusIcons[update.status]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm text-foreground leading-tight">{update.title}</h3>
                  <Badge className={cn('shrink-0 text-xs', riskColors[update.riskLevel])}>
                    {update.riskLevel}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{update.source}</p>
                <p className="text-xs text-muted-foreground/80 mt-2 line-clamp-2">{update.summary}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-muted-foreground">
                    Detected {formatDistanceToNow(update.detectedAt, { addSuffix: true })}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <Badge variant="outline" className="text-xs py-0">
                    {update.category}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
