import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Task1 from ".";

describe("Task1 Component", () => {
  test("renders email and password inputs", () => {
    render(<Task1 />);
    expect(screen.getByTestId(/login-email-input/i)).toBeTruthy();
    expect(screen.getByTestId(/login-password-input/i)).toBeTruthy();
  });

  test("shows error message for invalid email", async () => {
    render(<Task1 />);
    fireEvent.change(screen.getByTestId(/login-email-input/i), {
      target: { value: "invalidEmail" },
    });
    fireEvent.blur(screen.getByTestId(/login-email-input/i));
    expect(await screen.findByText(/invalid email format/i)).toBeTruthy();
  });

  test("shows error message for short password", async () => {
    render(<Task1 />);
    fireEvent.change(screen.getByTestId(/login-password-input/i), {
      target: { value: "123" },
    });
    fireEvent.blur(screen.getByTestId(/login-password-input/i));
    expect(
      await screen.findByText(/password must be at least 6 characters/i)
    ).toBeTruthy();
  });

  test("submits form with valid inputs", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    render(<Task1 />);

    const emailInput = screen.getByTestId("login-email-input");
    const passwordInput = screen.getByTestId("login-password-input");
    const submitButton = screen.getByTestId("login-btn");

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password123");

    userEvent.click(submitButton);

    await waitFor(() =>
      expect(alertMock).toHaveBeenCalledWith(
        "Email: test@example.com \nPassword: password123"
      )
    );

    alertMock.mockRestore();
  });
});
