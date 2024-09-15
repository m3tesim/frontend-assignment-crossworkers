import React from "react";
import { Todo } from "../types";

interface TodoProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FunctionComponent<TodoProps> = ({
  todo,
  toggleComplete,
  deleteTodo,
}) => {
  return (
    <div
      key={todo.id}
      className={`todo-item ${todo.completed ? "completed" : ""}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <div className="content">{todo.text}</div>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
};
export default TodoItem;
