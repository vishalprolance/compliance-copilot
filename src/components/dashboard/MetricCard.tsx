import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: 'default' | 'primary' | 'accent' | 'success';
}

export function MetricCard({ title, value, subtitle, icon: Icon, trend, variant = 'default' }: MetricCardProps) {
  const variantStyles = {
    default: 'border-border',
    primary: 'border-primary/30 glow-primary',
    accent: 'border-accent/30 glow-accent',
    success: 'border-success/30 glow-success',
  };

  const iconStyles = {
    default: 'text-muted-foreground',
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-success',
  };

  return (
    <div className={cn('glass-card p-6 transition-all duration-300 hover:scale-[1.02]', variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2 tracking-tight">{value}</p>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          {trend && (
            <div className={cn('flex items-center gap-1 mt-2 text-sm', trend.positive ? 'text-success' : 'text-destructive')}>
              <span>{trend.positive ? '↑' : '↓'}</span>
              <span>{trend.value}%</span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-lg bg-secondary/50', iconStyles[variant])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
