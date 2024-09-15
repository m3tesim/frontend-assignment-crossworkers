import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Task2 from "."; // Adjust the path to your component

// Mock the `useDebounce` hook
jest.mock("../utils/useDebounce", () => ({
  __esModule: true,
  default: (value: unknown) => [value], // Ensure this returns an array
}));

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { userId: 1, id: 1, title: "Test Title 1", body: "Test Body 1" },
        { userId: 1, id: 2, title: "Test Title 2", body: "Test Body 2" },
      ]),
  })
) as jest.Mock;

describe("Task2 Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("renders and fetches data based on user input", async () => {
    render(<Task2 />);

    // Simulate user input
    const input = screen.getByRole("textbox"); // Assumes the input has a role of 'textbox'
    fireEvent.change(input, { target: { value: "Test" } });

    // Debug the DOM to see what's currently rendered

    // Check that the loading message is not present once data is loaded
  });

  it("shows loading message while fetching data", async () => {
    // Mock fetch to delay response
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve([]),
              }),
            300
          )
        )
    ) as jest.Mock;

    render(<Task2 />);

    // Simulate user input
    const input = screen.getByRole("textbox"); // Assumes the input has a role of 'textbox'
    fireEvent.change(input, { target: { value: "Test" } });

    // Check that the loading message is present
    expect(screen.getByText(/Loading.../i)).toBeTruthy();

    // Wait for the results to be fetched and loading message to disappear
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeTruthy();
    });
  });

  it("handles fetch error", async () => {
    // Mock fetch to simulate an error
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    render(<Task2 />);

    // Simulate user input
    const input = screen.getByRole("textbox"); // Assumes the input has a role of 'textbox'
    fireEvent.change(input, { target: { value: "Test" } });

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch data/i)).toBeTruthy();
    });
  });
});
