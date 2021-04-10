/** @format */

import React from "react";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ResponseC from "./ResponseC";
import { UserProvider } from "../testUtils";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get(
    "http://localhost:3001/statements/undefined/undefined",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ responses: [{ response: "test", id: 1 }] })
      );
    }
  ),
  rest.get(
    "http://localhost:3001/friends/undefined/undefined",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ statements: [{ statement: "test", id: 1 }] })
      );
    }
  ),
  rest.post("http://localhost:3001/responses/undefined", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ response: "newtest", id: 1 }));
  }),
  rest.delete(
    "http://localhost:3001/responses/undefined/1",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ message: "success" }));
    }
  ),
  rest.patch("http://localhost:3001/responses/undefined/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ response: "edited", id: 1 }));
  }),
  rest.patch("*", (req, res, ctx) => {
    console.log(req.url.toString());
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

it("renders without crashing", async function () {
  const {
    getAllByText,
    queryByText,
    getByPlaceholderText,
    getByTestId,
    getByText,
  } = render(
    <MemoryRouter>
      <UserProvider>
        <ResponseC />
      </UserProvider>
    </MemoryRouter>
  );
  await waitFor(() => expect(queryByText("test")).toBeInTheDocument());
});

it("matches snapshot", async function () {
  const {
    getAllByText,
    queryByText,
    getByPlaceholderText,
    getByTestId,
    getByText,
    asFragment,
  } = render(
    <MemoryRouter>
      <UserProvider>
        <ResponseC />
      </UserProvider>
    </MemoryRouter>
  );
  await waitFor(() => expect(queryByText("test")).toBeInTheDocument());
  expect(asFragment()).toMatchSnapshot();
});

it("displays expected text", async function () {
  const { getAllByText, queryByText } = render(
    <MemoryRouter>
      <UserProvider>
        <ResponseC />
      </UserProvider>
    </MemoryRouter>
  );
  await waitFor(() => expect(queryByText("test")).toBeInTheDocument());
});

it("clicking add response displays form then submit shows new response", async function () {
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
        <ResponseC />
      </UserProvider>
    </MemoryRouter>
  );

  await waitFor(() => expect(queryByText("test")).toBeInTheDocument());

  const add = getAllByText("Add Response")[0];
  fireEvent.click(add);

  const responseInput = getByPlaceholderText("response");
  const submitBtn = getByTestId("button");

  // fill out the form
  fireEvent.change(responseInput, { target: { value: "newtest" } });
  fireEvent.click(submitBtn);

  await waitFor(() => expect(getByText("newtest")).toBeInTheDocument());
});

it("clicking delete removes the response", async function () {
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
        <ResponseC />
      </UserProvider>
    </MemoryRouter>
  );
  let name;
  await waitFor(() => {
    expect(queryByText("test")).toBeInTheDocument();
    name = queryByText("test");
  });

  const deleteBtn = getByText("Delete Response");

  fireEvent.click(deleteBtn);

  await waitFor(() => expect(name).not.toBeInTheDocument());
});

it("can edit a response", async function () {
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
        <ResponseC />
      </UserProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(queryByText("test")).toBeInTheDocument();
  });

  const editBtn = getByText("Edit Response");

  fireEvent.click(editBtn);

  const nameInput = getByPlaceholderText("response");

  const submitBtn = getByTestId("button");

  // fill out the form
  fireEvent.change(nameInput, { target: { value: "edited" } });
  fireEvent.click(submitBtn);

  await waitFor(() => expect(getByText("edited")).toBeInTheDocument());
});
