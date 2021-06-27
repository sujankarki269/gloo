import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen } from "../test-utils";
import RegisterScreen from "../../../screens/RegisterScreen";
import "@testing-library/jest-dom/extend-expect";

export const handlers = [
  rest.post("/api/users", (req, res, ctx) => {
    return res(
      ctx.json({
        name: "Steve Smith",
        email: "steve@example.com",
        password: "123456",
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Loader is displayed after successful login", async () => {
  const location = {
    search: "",
  };

  const pushMock = (arg) => arg;

  const history = {
    push: pushMock,
  };

  render(<RegisterScreen location={location} history={history} />);

  const name = screen.getByTestId("register-name");
  fireEvent.change(name, { target: { value: "Steve" } });
  const email = screen.getByTestId("register-email");
  fireEvent.change(email, { target: { value: "steve@example.com" } });
  const password = screen.getByTestId("register-password");
  fireEvent.change(password, { target: { value: "123456" } });
  const confirmPassword = screen.getByTestId("register-confirmpassword");
  fireEvent.change(confirmPassword, { target: { value: "123456" } });
  const registerBtn = screen.getByTestId("register-btn");
  fireEvent.click(registerBtn);

  expect(screen.getByRole("alert")).toHaveTextContent(
    "Name has to be between 6-30 characters long"
  );
  fireEvent.change(name, {
    target: { value: "Steve Smith Of Heracles The Sixth Son Of Steven Smith" },
  });
  fireEvent.click(registerBtn);

  expect(screen.getByRole("alert")).toHaveTextContent("Password is too weak");

  fireEvent.change(password, { target: { value: "1234567890a" } });
  fireEvent.change(confirmPassword, { target: { value: "1234567890" } });
  fireEvent.click(registerBtn);
  expect(screen.getByRole("alert")).toHaveTextContent("Passwords do not match");

  fireEvent.change(password, { target: { value: "1234567890a" } });
  fireEvent.change(confirmPassword, { target: { value: "1234567890a" } });
  fireEvent.click(registerBtn);

  expect(screen.getByRole("status")).toBeInTheDocument();
});
