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

  // test("should show validation error when the input is empty", async () => {
  //   render(<TodoForm addTodo={mockAddTodo} />);

  //   // Simulate form submission without entering text
  //   const submitButton = screen.getByText("Add Todo");
  //   fireEvent.click(submitButton);

  //   // Expect an error message to be displayed
  //   const errorMessage = await screen.findByText("Max characters is 100");
  //   expect(errorMessage).toBeTruthy();

  //   // Ensure that addTodo was not called
  //   expect(mockAddTodo).not.toHaveBeenCalled();
  // });
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

// test("searches todos", () => {
//   render(<Task3 />); // Moved render here
//   const input = screen.getByPlaceholderText(/Search todos.../i);
//   fireEvent.change(input, { target: { value: "Existing Todo" } });

//   expect(screen.getByText(/Existing Todo/i)).toBeTruthy();
// });
