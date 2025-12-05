import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { AgentCard } from '@/components/dashboard/AgentCard';
import { RegulatoryFeed } from '@/components/dashboard/RegulatoryFeed';
import { WorkflowPipeline } from '@/components/dashboard/WorkflowPipeline';
import { ApprovalQueue } from '@/components/dashboard/ApprovalQueue';
import { AuditTrail } from '@/components/dashboard/AuditTrail';
import { AIAssistant } from '@/components/dashboard/AIAssistant';
import { 
  agents, 
  regulatoryUpdates, 
  approvalRequests, 
  auditLogs, 
  systemMetrics 
} from '@/data/mockData';
import { 
  FileText, 
  Clock, 
  ShieldCheck, 
  Bot,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [approvals, setApprovals] = useState(approvalRequests);

  const handleApprove = (id: string) => {
    setApprovals(prev => prev.map(a => 
      a.id === id ? { ...a, status: 'approved' as const } : a
    ));
    toast.success('Change approved', {
      description: 'The change has been approved and queued for deployment.',
    });
  };

  const handleReject = (id: string) => {
    setApprovals(prev => prev.map(a => 
      a.id === id ? { ...a, status: 'rejected' as const } : a
    ));
    toast.error('Change rejected', {
      description: 'The change has been rejected. The agent will be notified.',
    });
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto scrollbar-thin p-6">
          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Updates Processed"
              value={systemMetrics.updatesProcessed.toLocaleString()}
              subtitle="Last 30 days"
              icon={FileText}
              trend={{ value: 12, positive: true }}
              variant="primary"
            />
            <MetricCard
              title="Pending Approvals"
              value={systemMetrics.pendingApprovals}
              subtitle="Requires attention"
              icon={AlertTriangle}
              variant="accent"
            />
            <MetricCard
              title="Compliance Score"
              value={`${systemMetrics.complianceScore}%`}
              subtitle="Across all systems"
              icon={ShieldCheck}
              trend={{ value: 2.3, positive: true }}
              variant="success"
            />
            <MetricCard
              title="Active Agents"
              value={`${systemMetrics.activeAgents}/${systemMetrics.totalAgents}`}
              subtitle={`Avg. ${systemMetrics.avgProcessingTime} processing`}
              icon={Bot}
            />
          </div>

          {/* Workflow Pipeline */}
          <div className="mb-6">
            <WorkflowPipeline />
          </div>

          {/* Agents Grid */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">AI Agents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {agents.map((agent, index) => (
                <div 
                  key={agent.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <AgentCard agent={agent} />
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Regulatory Feed */}
            <div className="lg:col-span-1 h-[500px]">
              <RegulatoryFeed updates={regulatoryUpdates} />
            </div>

            {/* Approval Queue */}
            <div className="lg:col-span-1 h-[500px]">
              <ApprovalQueue 
                requests={approvals} 
                onApprove={handleApprove}
                onReject={handleReject}
              />
            </div>

            {/* AI Assistant */}
            <div className="lg:col-span-1 h-[500px]">
              <AIAssistant />
            </div>
          </div>

          {/* Audit Trail */}
          <div className="mt-6 h-[400px]">
            <AuditTrail logs={auditLogs} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
