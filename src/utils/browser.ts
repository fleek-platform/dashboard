export const clearStorageByMatchTerm = (term: string) => {
  try {
    for (const key in localStorage) {
      try {
        if (key.toLowerCase().includes(term)) {
          localStorage.removeItem(key);
        }
      } catch (e) {
        console.warn(`Failed to clear localStorage key ${key}:`, e);
      }
    }

    for (const key in sessionStorage) {
      try {
        if (key.toLowerCase().includes(term)) {
          sessionStorage.removeItem(key);
        }
      } catch (e) {
        console.warn(`Failed to clear sessionStorage key ${key}:`, e);
      }
    }
  } catch (error) {
    console.error('Failed to clear storage due to an error', error);
  }
};
