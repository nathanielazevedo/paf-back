/** @format */

import React from "react";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import StatementC from "./StatementC";
import { UserProvider } from "../testUtils";

import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("http://localhost:3001/statements/Nate", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ statements: [{ statement: "test", id: 1 }] })
    );
  }),
  rest.get(
    "http://localhost:3001/friends/undefined/undefined",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ statements: [{ statement: "test", id: 1 }] })
      );
    }
  ),
  rest.post("http://localhost:3001/statements/undefined", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ statement: "newtest", id: 1 }));
  }),
  rest.delete(
    "http://localhost:3001/statements/undefined/1",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ message: "success" }));
    }
  ),
  rest.patch(
    "http://localhost:3001/statements/undefined/1",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ statement: "edited", id: 1 }));
    }
  ),
  rest.patch("*", (req, res, ctx) => {
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
        <StatementC />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <StatementC />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays expected text", async function () {
  const { getAllByText, getByText } = render(
    <MemoryRouter>
      <UserProvider>
        <StatementC />
      </UserProvider>
    </MemoryRouter>
  );
  await waitFor(() =>
    expect(getAllByText("Add Statement")[0]).toBeInTheDocument()
  );
});

it("can open the form", async function () {
  const { getAllByText, getByText } = render(
    <MemoryRouter>
      <UserProvider>
        <StatementC />
      </UserProvider>
    </MemoryRouter>
  );

  const add = getAllByText("Add Statement")[0];
  fireEvent.click(add);

  await waitFor(() =>
    expect(getAllByText("New Statement")[0]).toBeInTheDocument()
  );
});

it("clicking add friend displays form then submit shows new friend", async function () {
  let username = "Nate";

  const {
    getAllByText,
    queryByText,
    getByPlaceholderText,
    getByTestId,
    getByText,
  } = render(
    <MemoryRouter>
      <UserProvider>
        <StatementC username={username} />
      </UserProvider>
    </MemoryRouter>
  );

  await waitFor(() => expect(queryByText("test")).toBeInTheDocument());

  const add = getAllByText("Add Statement")[0];
  fireEvent.click(add);

  const statementInput = getByPlaceholderText("statement");
  const submitBtn = getByTestId("button");

  // fill out the form
  fireEvent.change(statementInput, { target: { value: "newstatement" } });
  fireEvent.click(submitBtn);

  await waitFor(() => expect(getByText("newtest")).toBeInTheDocument());
});

it("clicking delete removes the statement", async function () {
  let username = "Nate";

  const {
    getAllByText,
    queryByText,
    getByPlaceholderText,
    getByTestId,
    getByText,
  } = render(
    <MemoryRouter>
      <UserProvider>
        <StatementC />
      </UserProvider>
    </MemoryRouter>
  );
  let name;
  await waitFor(() => {
    expect(queryByText("test")).toBeInTheDocument();
    name = queryByText("test");
  });

  const deleteBtn = getByText("Delete Statement");

  fireEvent.click(deleteBtn);

  await waitFor(() => expect(name).not.toBeInTheDocument());
});

it("can edit a statement", async function () {
  let username = "Nate";

  const {
    getAllByText,
    queryByText,
    getByPlaceholderText,
    getByTestId,
    getByText,
  } = render(
    <MemoryRouter>
      <UserProvider>
        <StatementC />
      </UserProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(queryByText("test")).toBeInTheDocument();
  });

  const editBtn = getByText("Edit Statement");

  fireEvent.click(editBtn);

  const nameInput = getByPlaceholderText("statement");

  const submitBtn = getByTestId("button");

  // fill out the form
  fireEvent.change(nameInput, { target: { value: "edited" } });
  fireEvent.click(submitBtn);

  await waitFor(() => expect(getByText("edited")).toBeInTheDocument());
});
