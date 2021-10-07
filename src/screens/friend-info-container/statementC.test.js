/** @format */

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import StatementC from "./FriendMain";
import { UserProvider } from "../../testUtils";
import { rest } from "msw";
import { setupServer } from "msw/node";

// console.log(req.url.toString());


//Intercepts API requests for testing.
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
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

it("renders without crashing", async function () {
  const { getByText } = render(
    <MemoryRouter>
      <UserProvider>
        <StatementC />
      </UserProvider>
    </MemoryRouter>
  );
  await waitFor(() => expect(getByText('Add Statement')).toBeInTheDocument());
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
  const { getAllByText } = render(
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

it("can open the add form", async function () {
  const { getAllByText } = render(
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

it("clicking add statement displays form then submit shows new statement", async function () {
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
  const {
    queryByText,
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
  const {
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
