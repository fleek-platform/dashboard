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
};

export type AIAgentStatus = {
  status: 'true' | 'false';
};

export type AgentLog = {
  id: number;
  timestamp: number;
  message: string;
  priority: number;
};

export type PaginatedResponse<DataType> = {
  data: DataType[];
  next_cursor: string;
  prev_cursor: string;
};
