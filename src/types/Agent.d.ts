export type Agent = {
  id: string;
  projectId: string;
  name: string;
  host: string;
  slotNumber: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  status: AgentLifecycleStatus;
};

export type AgentLifecycleStatus =
  | 'Draft'
  | 'Created'
  | 'Pending'
  | 'Running'
  | 'Stopped'
  | 'Failed';

export type AgentStatus = {
  status: 'true' | 'false';
};

export type AgentLog = {
  id: integer;
  timestamp: number;
  message: string;
  priority: number;
};

export type PaginatedResponse<DataType> = {
  data: DataType[];
  next_page: string;
  prev_page: string;
};
