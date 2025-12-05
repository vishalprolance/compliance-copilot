import { AuditLog } from '@/types/compliance';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface AuditTrailProps {
  logs: AuditLog[];
}

const statusIcons = {
  success: <CheckCircle className="w-4 h-4 text-success" />,
  warning: <AlertTriangle className="w-4 h-4 text-accent" />,
  error: <XCircle className="w-4 h-4 text-destructive" />,
};

const statusColors = {
  success: 'border-l-success',
  warning: 'border-l-accent',
  error: 'border-l-destructive',
};

export function AuditTrail({ logs }: AuditTrailProps) {
  return (
    <div className="glass-card h-full flex flex-col">
      <div className="p-4 border-b border-border/50">
        <h2 className="font-semibold text-foreground">Audit Trail</h2>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="divide-y divide-border/30">
          {logs.map((log, index) => (
            <div
              key={log.id}
              className={cn(
                'p-4 hover:bg-secondary/30 transition-colors border-l-2 animate-fade-in',
                statusColors[log.status]
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{statusIcons[log.status]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-foreground">{log.action}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {log.agent}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{log.details}</p>
                  <span className="text-xs text-muted-foreground/70 font-mono mt-2 block">
                    {format(log.timestamp, 'HH:mm:ss.SSS')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
