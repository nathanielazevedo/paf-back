/** @format */

import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "./App";
import React from "react";
import { UserProvider } from "./testUtils";
import { MemoryRouter } from "react-router";
import { rest } from "msw";
import { setupServer } from "msw/node";


//Overides API requests and returns these values
const server = setupServer(
  rest.get("http://localhost:3001/users/John", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: "james"
        },
      ])
    );
  }),
  rest.get("http://localhost:3001/users/undefined", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: "james"
        },
      ])
    );
  }),
  rest.get("http://localhost:3001/friends/undefined", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([ 
        {
          name: "james"
        },
      ])
    );
  }),
  rest.post("http://localhost:3001/auth/login", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "james",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJKb2huIn0.IohZZ7rP3uGJ1zuk1Qmm36wKeWrbzSnH4iywR3HqhEI",
        id: 1,
      })
    );
  }),
  rest.post("http://localhost:3001/auth/register", (req, res, ctx) => {
    return res(
      ctx.status(200), 
      ctx.json({
        name: "james",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJKb2huIn0.IohZZ7rP3uGJ1zuk1Qmm36wKeWrbzSnH4iywR3HqhEI",
        id: 1,
      })
    );
  }),
  rest.delete("http://localhost:3001/friends/undefined/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "success" }));
  }),
  rest.patch("http://localhost:3001/friends/undefined/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ name: "edited", description: "test", id: 1 })
    );
  }),
  rest.get("*", (req, res, ctx) => {
    console.log(req.url.toString());
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </MemoryRouter>
  );
});

test("renders PROGRAM A FRIEND", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText("PROGRAM A FRIEND");
  expect(linkElement).toBeInTheDocument();
});

it("clicks login from intro page and form opens", function () {
  const { getByText, getByPlaceholderText } = render(
    <MemoryRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </MemoryRouter>
  );
  const login = getByText("Login");
  fireEvent.click(login);

  expect(getByPlaceholderText("username")).toBeInTheDocument();
});

it("clicks login from intro page and clicks submit", function () {
  const { getByText, getByTestId, getByLabelText } = render(
    <MemoryRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </MemoryRouter>
  );
  const home = getByText("<PAF/>");
  fireEvent.click(home);
  const login = getByText("Login");
  fireEvent.click(login);

  const nameInput = getByTestId("username");
  const description = getByTestId("password");
  const submitBtn = getByTestId("button");

  // fill out the form
  fireEvent.change(nameInput, { target: { value: "test" } });
  fireEvent.change(description, { target: { value: "test" } });
  fireEvent.click(submitBtn);
});

it("clicks signup from intro page", function () {
  const { getByText, getByPlaceholderText } = render(
    <MemoryRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </MemoryRouter>
  );
  const signup = getByText("Sign Up");
  fireEvent.click(signup);

  expect(getByPlaceholderText("username")).toBeInTheDocument();
});

it("clicks signup from intro page and back to home", function () {
  const { getByText, getAllByText, getByPlaceholderText } = render(
    <MemoryRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </MemoryRouter>
  );
  const signup = getAllByText("Sign Up")[0];
  fireEvent.click(signup);
  const home = getByText("<PAF/>");
  fireEvent.click(home);

  expect(getByText("PROGRAM A FRIEND")).toBeInTheDocument();
});

it("clicking PAF from intro page", function () {
  const { getByText, getAllByText, getByPlaceholderText } = render(
    <MemoryRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </MemoryRouter>
  );
  const paf = getAllByText("<PAF/>")[0];
  fireEvent.click(paf);

  expect(getByText("PROGRAM A FRIEND")).toBeInTheDocument();
});


it("clicking login displays form then submit", async function () {
  const {
    getAllByText,
    queryByText,
    getByPlaceholderText,
    getByTestId,
    getByText,
  } = render(
    <MemoryRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </MemoryRouter>
  );

  await waitFor(() => expect(queryByText("Login")).toBeInTheDocument());

  const add = queryByText("Login");
  fireEvent.click(add);

  const usernameInput = getByPlaceholderText("username");
  const passwordInput = getByPlaceholderText("password");
  const submitBtn = getByTestId("button");

  // fill out the form
  fireEvent.change(usernameInput, { target: { value: "test" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(submitBtn);

  await waitFor(() => expect(getByText("ADD FRIEND")).toBeInTheDocument());
});

it("log out then clicking signup displays form then submit", async function () {
  const {
    getAllByText,
    queryByText,
    getByPlaceholderText,
    getByTestId,
    getByText,
  } = render(
    <MemoryRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </MemoryRouter>
  );

  await waitFor(() => expect(queryByText("ADD FRIEND")).toBeInTheDocument());

  const out = queryByText("Logout");
  fireEvent.click(out);
await waitFor(() => expect(queryByText("Logout")).not.toBeInTheDocument());
  const up = getByTestId("button");
  fireEvent.click(up);

  const usernameInput = getByPlaceholderText("username");
  const passwordInput = getByPlaceholderText("password");
  const submitBtn = getByTestId("button");

  // fill out the form
  fireEvent.change(usernameInput, { target: { value: "test" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(submitBtn);

  await waitFor(() => expect(getByText("ADD FRIEND")).toBeInTheDocument());
}); 