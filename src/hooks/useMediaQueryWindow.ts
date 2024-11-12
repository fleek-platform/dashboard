import { useEffect, useState } from 'react';

export const useMediaQueryWindow = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const matchMedia = window.matchMedia(query);

      // Set the initial match state
      setMatches(matchMedia.matches);

      const handleChange = () => {
        setMatches(matchMedia.matches);
      };

      // Listen for changes to the media query
      matchMedia.addEventListener('change', handleChange);

      return () => {
        matchMedia.removeEventListener('change', handleChange);
      };
    }
  }, [query]);

  return matches;
};
