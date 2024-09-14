import React, { useState, useMemo, useEffect } from "react";
import { Todo } from "./types";
import "./index.scss";

// Style
import "./index.scss";
import TodoList from "./components/ToDoList";
import TodoForm from "./components/ToDoForm";
import useDebounce from "../utils/useDebounce";

// Components
/*
 * Create the components you need in the components folder.
 * You may find inspiration in task 2
 */

const Task3: React.FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedQuery] = useDebounce(searchTerm);

  const addTodo = (todo: Todo) => {
    setTodos([todo, ...todos]);
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    if (!debouncedQuery) {
      setFilteredTodos([]); // Clear results if the query is empty
      return;
    }
    const searchResult = todos.filter((todo) =>
      todo.text.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    setFilteredTodos(searchResult);
  }, [debouncedQuery, todos]);

  const doneTodos = useMemo(() => {
    if (searchTerm !== "")
      return filteredTodos.filter((todo) => todo.completed);
    else return todos.filter((todo) => todo.completed);
  }, [todos, filteredTodos, searchTerm]);

  const pendingTodos = useMemo(() => {
    if (searchTerm !== "")
      return filteredTodos.filter((todo) => !todo.completed);
    else return todos.filter((todo) => !todo.completed);
  }, [todos, filteredTodos, searchTerm]);

  return (
    <div id="task-3">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <h2>Pending Todos</h2>
      <TodoList
        todos={pendingTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />

      <h2>Completed Todos</h2>
      <TodoList
        todos={doneTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default Task3;
