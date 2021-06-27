import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  fireEvent,
  screen,
  renderWithLogin,
  renderWithOwnership,
} from "../test-utils";
import UserListScreen from "../../../screens/UserListScreen";
import "@testing-library/jest-dom/extend-expect";
import { waitForElementToBeRemoved } from "@testing-library/react";
import { arrayOfUsers } from "../stubs/userStub";

export const handlers = [
  rest.get("/api/users", (req, res, ctx) => {
    return res(ctx.json(arrayOfUsers));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const pushMock = (arg) => arg;

const history = {
  push: pushMock,
};

it("No user details shown if not logged in", async () => {
  render(<UserListScreen history={history} />);

  expect(screen.getByText("60bde864ee22a3fe9466639d")).toBeNull(); //John Doe
  expect(screen.getByText("John Doe")).toBeNull();
  expect(screen.getByText("john@example.com")).toBeNull();

  expect(screen.getByText("60bde864ee22a3fe9466639e")).toBeNull(); //Jane Doe
  expect(screen.getByText("Jane Doe")).toBeNull();
  expect(screen.getByText("jane@example.com")).toBeNull();

  expect(screen.getByText("60bde864ee22a3fe9466639c")).toBeNull(); //Admin
  expect(screen.getByText("Admin User")).toBeNull();
  expect(screen.getByText("admin@example.com")).toBeNull();
});

it("No user details shown if logged in as non-Admin user", async () => {
  renderWithLogin(<UserListScreen history={history} />);

  expect(screen.getByText("60bde864ee22a3fe9466639d")).toBeNull(); //John Doe
  expect(screen.getByText("John Doe")).toBeNull();
  expect(screen.getByText("john@example.com")).toBeNull();

  expect(screen.getByText("60bde864ee22a3fe9466639e")).toBeNull(); //Jane Doe
  expect(screen.getByText("Jane Doe")).toBeNull();
  expect(screen.getByText("jane@example.com")).toBeNull();

  expect(screen.getByText("60bde864ee22a3fe9466639c")).toBeNull(); //Admin
  expect(screen.getByText("Admin User")).toBeNull();
  expect(screen.getByText("admin@example.com")).toBeNull();
});

test("Details of all users successfully fetched upon log in as Admin user", async () => {
  renderWithOwnership(<UserListScreen history={history} />);

  expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
  expect(screen.getByText("60bde864ee22a3fe9466639d")).toBeInTheDocument(); //John Doe
  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("john@example.com")).toBeInTheDocument();

  expect(screen.getByText("60bde864ee22a3fe9466639e")).toBeInTheDocument(); //Jane Doe
  expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  expect(screen.getByText("jane@example.com")).toBeInTheDocument();

  expect(screen.getByText("60bde864ee22a3fe9466639c")).toBeInTheDocument(); //Admin
  expect(screen.getByText("Admin User")).toBeInTheDocument();
  expect(screen.getByText("admin@example.com")).toBeInTheDocument();
});