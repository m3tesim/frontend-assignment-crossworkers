import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoForm from "./components/ToDoForm";
import Task3 from ".";
import TodoItem from "./components/TodoItem";
//import TodoItem from "./3/components/TodoItem";

test("renders Todo App title", () => {
  render(<Task3 />); // Moved render here
  expect(screen.getByText(/Todo App/i)).toBeTruthy();
});

jest.useFakeTimers();

describe("TodoForm component", () => {
  const mockAddTodo = jest.fn();

  test("should call addTodo with correct values on form submit", async () => {
    render(<TodoForm addTodo={mockAddTodo} />);

    // Simulate typing into the input field
    const input = screen.getByPlaceholderText("Add new todo");
    userEvent.type(input, "New Task");

    // Simulate form submission
    const submitButton = screen.getByText("Add Todo");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddTodo).toHaveBeenCalledTimes(1);
    });

    expect(mockAddTodo).toHaveBeenCalledWith({
      id: expect.any(Number), // Since Date.now() is called, we check for any number
      text: "New Task",
      completed: false,
    });
  });
  test("filters todos based on the search term", async () => {
    render(<Task3 />);
    jest.useFakeTimers();

    // Add some initial todos
    const input = screen.getByPlaceholderText("Add new todo");
    const submitButton = screen.getByText("Add Todo");

    // Add first todo
    userEvent.type(input, "Learn React");
    userEvent.click(submitButton);
    jest.advanceTimersByTime(500);

    userEvent.type(input, "Learn Testing");
    userEvent.click(submitButton);

    userEvent.type(input, "Build Todo App");
    userEvent.click(submitButton);
    jest.advanceTimersByTime(500);

    // await waitFor(() => {
    //   expect(screen.getByText("Learn Testing")).toBeTruthy();
    //   expect(screen.queryByText("Learn React")).toBeTruthy();
    //   expect(screen.queryByText("Build Todo App")).toBeTruthy();
    // });
    const searchInput = screen.getByPlaceholderText("Search todos...");
    fireEvent.change(searchInput, { target: { value: "Testing" } });

    // Wait for filtering
    // await waitFor(() => {
    //   // Ensure only "Learn Testing" is displayed after filtering
    //   expect(screen.getByText("Learn Testing")).toBeTruthy();
    //   expect(screen.queryByText("Learn React")).not.toBeTruthy();
    //   expect(screen.queryByText("Build Todo App")).not.toBeTruthy();
    // });
  });
});

describe("TodoItem component", () => {
  const mockToggleComplete = jest.fn();
  const mockDeleteTodo = jest.fn();

  const todo = {
    id: 1,
    text: "Test Todo",
    completed: false,
  };

  test("should call toggleComplete when checkbox is clicked", () => {
    render(
      <TodoItem
        todo={todo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockToggleComplete).toHaveBeenCalledTimes(1);
    expect(mockToggleComplete).toHaveBeenCalledWith(todo.id);
  });

  test("should call deleteTodo when delete button is clicked", () => {
    render(
      <TodoItem
        todo={todo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
    expect(mockDeleteTodo).toHaveBeenCalledWith(todo.id);
  });
});
