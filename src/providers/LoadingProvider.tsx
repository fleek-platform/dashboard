import { createContext, useContext, useState } from 'react';
import { LoadingFullScreen } from '@/components/Loading';
import { Box } from '@/ui';

type LoadingContextType = {
  showLoading: () => void;
  hideLoading: () => void;
  isLoading: boolean;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading, isLoading }}>
      <Box className="relative">
        {isLoading && (
          <Box className="fixed left-0 top-0 right-0 bottom-0 h-screen w-screen z-[100] bg-black">
            <LoadingFullScreen />
          </Box>
        )}
        {children}
      </Box>
    </LoadingContext.Provider>
  );
};
