import { cn } from '@/lib/utils';
import { Radio, Brain, Code, Rocket, Shield } from 'lucide-react';

interface PipelineStage {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: 'completed' | 'active' | 'pending';
  count: number;
}

const stages: PipelineStage[] = [
  { id: 'ingest', name: 'Ingestion', icon: <Radio className="w-5 h-5" />, status: 'completed', count: 5 },
  { id: 'analyze', name: 'Analysis', icon: <Brain className="w-5 h-5" />, status: 'active', count: 3 },
  { id: 'implement', name: 'Implementation', icon: <Code className="w-5 h-5" />, status: 'active', count: 2 },
  { id: 'deploy', name: 'Deployment', icon: <Rocket className="w-5 h-5" />, status: 'pending', count: 1 },
  { id: 'validate', name: 'Validation', icon: <Shield className="w-5 h-5" />, status: 'pending', count: 0 },
];

export function WorkflowPipeline() {
  return (
    <div className="glass-card p-6">
      <h2 className="font-semibold text-foreground mb-6">Agent Workflow Pipeline</h2>
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-8 left-8 right-8 h-0.5 bg-border" />
        <div className="absolute top-8 left-8 h-0.5 bg-gradient-to-r from-success via-primary to-transparent w-2/5" />
        
        <div className="relative flex justify-between">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex flex-col items-center">
              <div
                className={cn(
                  'w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 relative',
                  stage.status === 'completed' && 'bg-success/20 text-success border border-success/30',
                  stage.status === 'active' && 'bg-primary/20 text-primary border border-primary/30 animate-pulse-glow',
                  stage.status === 'pending' && 'bg-secondary text-muted-foreground border border-border'
                )}
              >
                {stage.icon}
                {stage.count > 0 && (
                  <span className={cn(
                    'absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-medium flex items-center justify-center',
                    stage.status === 'completed' && 'bg-success text-success-foreground',
                    stage.status === 'active' && 'bg-primary text-primary-foreground',
                    stage.status === 'pending' && 'bg-muted text-muted-foreground'
                  )}>
                    {stage.count}
                  </span>
                )}
              </div>
              <span className={cn(
                'text-sm mt-3 font-medium',
                stage.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'
              )}>
                {stage.name}
              </span>
              <span className="text-xs text-muted-foreground capitalize">{stage.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
