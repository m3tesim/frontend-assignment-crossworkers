import { FunctionComponent } from "react";
import { Result } from "..";

/*
 * The ItemProps interface defines the types for the components props.
 *
 * If you would like to proceed without defining types do the following:
 * const Input: FunctionComponent<any> = (props) => {
 *                                ^^^
 *
 * and remove the ItemProps interface
 */

interface ItemProps {
  data: Result;
}

const Item: FunctionComponent<ItemProps> = ({ data }) => {
  return <li key={data.id}>{data.title}</li>;
};

export default Item;
