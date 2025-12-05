import { Agent, AgentStatus } from '@/types/compliance';
import { cn } from '@/lib/utils';
import { Bot, Activity, Zap, AlertCircle } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

const statusConfig: Record<AgentStatus, { color: string; bgColor: string; label: string }> = {
  active: { color: 'bg-success', bgColor: 'bg-success/10', label: 'Active' },
  processing: { color: 'bg-primary', bgColor: 'bg-primary/10', label: 'Processing' },
  idle: { color: 'bg-muted-foreground', bgColor: 'bg-muted', label: 'Idle' },
  error: { color: 'bg-destructive', bgColor: 'bg-destructive/10', label: 'Error' },
};

export function AgentCard({ agent }: AgentCardProps) {
  const status = statusConfig[agent.status];

  return (
    <div className="agent-card group">
      <div className="flex items-start gap-4">
        <div className={cn('p-3 rounded-lg transition-colors', status.bgColor)}>
          <Bot className={cn('w-6 h-6', agent.status === 'active' || agent.status === 'processing' ? 'text-primary' : 'text-muted-foreground')} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{agent.name}</h3>
            <div className="flex items-center gap-1.5">
              <span className={cn('w-2 h-2 rounded-full', status.color, (agent.status === 'active' || agent.status === 'processing') && 'animate-pulse')} />
              <span className="text-xs text-muted-foreground">{status.label}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{agent.role}</p>
          {agent.currentTask && (
            <p className="text-xs text-primary mt-2 truncate flex items-center gap-1">
              <Activity className="w-3 h-3" />
              {agent.currentTask}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Zap className="w-3 h-3" />
          <span>{agent.tasksCompleted.toLocaleString()} tasks</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {agent.status === 'idle' ? 'Idle for 5m' : 'Just now'}
        </span>
      </div>
    </div>
  );
}
