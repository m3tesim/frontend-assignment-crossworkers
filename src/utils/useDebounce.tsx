import { useEffect, useState } from "react";

const DEBOUNCE_DELAY = 500;

const useDebounce = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState<string>(""); // Debounced query

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query); // Update the debounced query after the delay
    }, DEBOUNCE_DELAY);
    // Cleanup the timeout if the component is unmounted or the query changes
    return () => clearTimeout(handler);
  }, [query]);

  return [debouncedQuery];
};

export default useDebounce;
