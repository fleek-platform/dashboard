export type Toast = {
  id: number;
  type: 'success' | 'error' | 'warning' | 'default';
  message: string;
  withCloseButton?: boolean;
  onDismiss?: () => void;
  duration?: number;
};
