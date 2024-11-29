import type React from 'react';
import { useCallback, useState } from 'react';

export const useUserHasScrolled = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop > 0) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  }, []);

  return { hasScrolled, handleScroll };
};
