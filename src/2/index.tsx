import { FunctionComponent, useEffect, useState } from "react";

// Components
import Input from "./components/Input";
import List from "./components/List";
import useDebounce from "../utils/useDebounce";

export interface Result {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Task2: FunctionComponent = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery] = useDebounce(query);

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
        setResults(data);
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
