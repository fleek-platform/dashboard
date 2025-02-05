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
