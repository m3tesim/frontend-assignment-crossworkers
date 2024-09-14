import { FunctionComponent } from "react";

// Components
import Item from "./Item";
import { Result } from "..";

/*
 * The ListProps interface defines the types for the components props.
 *
 * If you would like to proceed without defining types do the following:
 * const Input: FunctionComponent<any> = (props) => {
 *                                ^^^
 *
 * and remove the ListProps interface
 */

interface ListProps {
  results: Result[];
}

const List: FunctionComponent<ListProps> = ({ results }) => {
  return (
    <ul className="list">
      {results.map((result) => (
        <Item data={result} />
      ))}
    </ul>
  );
};

export default List;
