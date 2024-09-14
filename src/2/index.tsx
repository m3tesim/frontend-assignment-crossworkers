import { FunctionComponent, useEffect, useState } from "react";

// Components
import Input from "./components/Input";
import List from "./components/List";

const DEBOUNCE_DELAY = 500;

// Type for a single result (matching the structure of the data from the API)
interface Result {
  id: number;
  title: string;
}

const Task2: FunctionComponent = () => {
  const [query, setQuery] = useState<string>(""); // User input
  const [debouncedQuery, setDebouncedQuery] = useState<string>(""); // Debounced query
  const [results, setResults] = useState<Result[]>([]); // Search results
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query); // Update the debounced query after the delay
    }, DEBOUNCE_DELAY);

    // Cleanup the timeout if the component is unmounted or the query changes
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]); // Clear results if the query is empty
      return;
    }

    const controller = new AbortController(); // Create an AbortController to cancel the request
    const signal = controller.signal;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?q=${debouncedQuery}`,
          { signal }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: Result[] = await response.json();

        // Fuzzy search logic (e.g., filter results containing the debounced query string)
        const fuzzyResults = data.filter((item) =>
          item.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        );

        setResults(fuzzyResults);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError("Failed to fetch data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();

    // Cleanup function to cancel the request if the query changes
    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <div>
      <Input query={query} setQuery={setQuery} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <br />

      <List results={results} />
    </div>
  );
};

export default Task2;
