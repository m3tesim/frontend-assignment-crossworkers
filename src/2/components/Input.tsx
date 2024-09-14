import { FunctionComponent } from "react";

/*
 * The InputProps interface defines the types for the components props.
 *
 * If you would like to proceed without defining types do the following:
 * const Input: FunctionComponent<any> = (props) => {
 *                                ^^^
 *
 * and remove the InputProps interface
 */

interface InputProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Input: FunctionComponent<InputProps> = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search for posts..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default Input;
