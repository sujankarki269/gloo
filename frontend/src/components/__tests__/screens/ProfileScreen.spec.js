import React from "react"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { render, fireEvent, screen, renderWithLogin } from "../test-utils"
import ProfileScreen from "../../../screens/ProfileScreen"
import "@testing-library/jest-dom/extend-expect"
import { waitForElementToBeRemoved, cleanup } from "@testing-library/react"
import { sampleOrderArray } from "../stubs/orderStub"
import { createMemoryHistory } from "history"

export const handlers = [
  rest.get("/api/users/profile", (req, res, ctx) => {
    return res(
      ctx.json({
        _id: "60d55c4cd97a74d6bd80cb20",
        name: "John Doe",
        email: "john@example.com",
        isAdmin: false,
      })
    )
  }),

  rest.put("/api/users/profile", (req, res, ctx) => {
    return res(
      ctx.json({
        _id: "60d55c4cd97a74d6bd80cb20",
        name: "Trevor Smith",
        email: "trevor@example.com",
        isAdmin: false,
      })
    )
  }),

  rest.get("/api/orders/myorders", (req, res, ctx) => {
    return res(ctx.json(sampleOrderArray))
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())
const location = {
  search: "",
}

const pushMock = (arg) => arg

const history = {
  push: pushMock,
}

test("should redirect if not logged in", async () => {
  let history = createMemoryHistory()
  render(<ProfileScreen location={location} history={history} />)

  expect(screen.queryByTestId("update-name")).toHaveDisplayValue("")
  expect(screen.queryByTestId("update-email")).toHaveDisplayValue("")
  expect(screen.queryByTestId("update-password")).toHaveDisplayValue("")
  expect(screen.queryByTestId("update-confirmpassword")).toHaveDisplayValue("")
  expect(history.location.pathname).toBe("/login")
})

test("Profile page is displayed after successful login", async () => {
  renderWithLogin(<ProfileScreen location={location} history={history} />)

  expect(screen.queryByTestId("update-name")).toHaveDisplayValue("")
  expect(screen.queryByTestId("update-email")).toHaveDisplayValue("")
  expect(screen.queryByTestId("update-password")).toHaveDisplayValue("")
  expect(screen.queryByTestId("update-confirmpassword")).toHaveDisplayValue("")
  await waitForElementToBeRemoved(() => screen.getAllByText(/Loading/i))

  expect(screen.getByText("60d82fb65ab70e8b14f7fb79")).toBeInTheDocument()
  expect(screen.getByText("60d82fdf5ab70e8b14f7fb7c")).toBeInTheDocument()
  expect(screen.getByText("60d8303d5ab70e8b14f7fb7e")).toBeInTheDocument()
  expect(screen.getByText("60d8304d5ab70e8b14f7fb80")).toBeInTheDocument()
  expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument()
  expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument()

  const name = screen.getByTestId("update-name")
  fireEvent.change(name, { target: { value: "Trevor Smith" } })
  const email = screen.getByTestId("update-email")
  fireEvent.change(email, { target: { value: "trevor@example.com" } })
  const updateBtn = screen.getByTestId("update-submit")
  fireEvent.click(updateBtn)

  expect(screen.getByDisplayValue("Trevor Smith")).toBeInTheDocument()
  expect(screen.getByDisplayValue("trevor@example.com")).toBeInTheDocument()
})
