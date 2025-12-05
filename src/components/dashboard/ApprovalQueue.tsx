import { ApprovalRequest, RiskLevel, ApprovalStatus } from '@/types/compliance';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Eye, FileCode, Rocket, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ApprovalQueueProps {
  requests: ApprovalRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const priorityColors: Record<RiskLevel, string> = {
  critical: 'bg-destructive/20 text-destructive border-destructive/30',
  high: 'bg-accent/20 text-accent border-accent/30',
  medium: 'bg-primary/20 text-primary border-primary/30',
  low: 'bg-success/20 text-success border-success/30',
};

const statusColors: Record<ApprovalStatus, string> = {
  pending: 'bg-accent/20 text-accent border-accent/30',
  'in-review': 'bg-primary/20 text-primary border-primary/30',
  approved: 'bg-success/20 text-success border-success/30',
  rejected: 'bg-destructive/20 text-destructive border-destructive/30',
};

const typeIcons = {
  'code-change': <FileCode className="w-4 h-4" />,
  'deployment': <Rocket className="w-4 h-4" />,
  'policy-update': <FileText className="w-4 h-4" />,
};

export function ApprovalQueue({ requests, onApprove, onReject }: ApprovalQueueProps) {
  const pendingRequests = requests.filter(r => r.status === 'pending' || r.status === 'in-review');

  return (
    <div className="glass-card h-full flex flex-col">
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Human-in-the-Loop Approvals</h2>
        <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/30">
          {pendingRequests.length} Pending
        </Badge>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-3">
        {pendingRequests.map((request, index) => (
          <div
            key={request.id}
            className={cn(
              'p-4 rounded-lg bg-secondary/30 border border-border/50 hover:border-accent/30 transition-all duration-200 animate-slide-up'
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className={cn('p-2 rounded-lg', request.priority === 'critical' ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary')}>
                {typeIcons[request.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm text-foreground">{request.title}</h3>
                  <Badge className={cn('shrink-0 text-xs', priorityColors[request.priority])}>
                    {request.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{request.description}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                  <span>By {request.requestedBy}</span>
                  <span>•</span>
                  <span>{formatDistanceToNow(request.requestedAt, { addSuffix: true })}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="outline" className="text-xs py-0">
                    {request.details.changesCount} changes
                  </Badge>
                  <Badge variant="outline" className="text-xs py-0">
                    {request.details.filesAffected.length} files
                  </Badge>
                  <Badge className={cn('text-xs', statusColors[request.status])}>
                    {request.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/50">
              <Button size="sm" variant="ghost" className="flex-1 h-8">
                <Eye className="w-4 h-4 mr-1" />
                Review
              </Button>
              <Button size="sm" variant="success" className="flex-1 h-8" onClick={() => onApprove(request.id)}>
                <Check className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button size="sm" variant="destructive" className="flex-1 h-8" onClick={() => onReject(request.id)}>
                <X className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
