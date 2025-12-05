export type AgentStatus = 'active' | 'processing' | 'idle' | 'error';
export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'in-review';

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  tasksCompleted: number;
  currentTask?: string;
  lastActive: Date;
}

export interface RegulatoryUpdate {
  id: string;
  title: string;
  source: string;
  publishedAt: Date;
  detectedAt: Date;
  category: string;
  riskLevel: RiskLevel;
  summary: string;
  affectedSystems: string[];
  status: 'new' | 'analyzing' | 'implementing' | 'deployed' | 'archived';
}

export interface ImpactAnalysis {
  id: string;
  updateId: string;
  riskScore: number;
  affectedComponents: string[];
  estimatedEffort: string;
  codeChangesRequired: number;
  testCasesNeeded: number;
  recommendation: string;
  confidence: number;
}

export interface ApprovalRequest {
  id: string;
  updateId: string;
  type: 'code-change' | 'deployment' | 'policy-update';
  title: string;
  description: string;
  requestedBy: string;
  requestedAt: Date;
  status: ApprovalStatus;
  priority: RiskLevel;
  details: {
    changesCount: number;
    filesAffected: string[];
  };
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  action: string;
  agent: string;
  details: string;
  status: 'success' | 'warning' | 'error';
}

export interface SystemMetrics {
  updatesProcessed: number;
  pendingApprovals: number;
  complianceScore: number;
  avgProcessingTime: string;
  activeAgents: number;
  totalAgents: number;
}
