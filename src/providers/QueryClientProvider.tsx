import {
  QueryClientProvider as Provider,
  QueryClient,
} from '@tanstack/react-query';

import type { ChildrenProps } from '@/types/Props';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const QueryClientProvider: React.FC<ChildrenProps> = ({ children }) => (
  <Provider client={queryClient}>{children}</Provider>
);
