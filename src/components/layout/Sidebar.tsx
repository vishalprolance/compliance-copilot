import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Bot, 
  Shield, 
  Settings, 
  Bell,
  GitBranch,
  Database,
  Activity
} from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', active: true },
  { icon: <FileText className="w-5 h-5" />, label: 'Regulations', badge: 5 },
  { icon: <Bot className="w-5 h-5" />, label: 'Agents' },
  { icon: <GitBranch className="w-5 h-5" />, label: 'Workflows' },
  { icon: <Shield className="w-5 h-5" />, label: 'Compliance' },
  { icon: <Database className="w-5 h-5" />, label: 'Audit Logs' },
  { icon: <Activity className="w-5 h-5" />, label: 'Analytics' },
];

const bottomItems: NavItem[] = [
  { icon: <Bell className="w-5 h-5" />, label: 'Notifications', badge: 3 },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-sidebar-foreground">RegulAI</h1>
            <p className="text-xs text-muted-foreground">Compliance Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                item.active 
                  ? 'bg-sidebar-accent text-sidebar-primary' 
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="space-y-1">
          {bottomItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-200"
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
