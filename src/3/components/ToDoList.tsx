import React from "react";
import { Todo } from "../types";

interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoList: React.FunctionComponent<TodoListProps> = ({
  todos,
  toggleComplete,
  deleteTodo,
}) => {
  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`todo-item ${todo.completed ? "completed" : ""}`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />
          <span>{todo.text}</span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
