/** @format */

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import FriendsC from "./FriendsC";
import { UserProvider } from "../../testUtils";
import { rest } from "msw";
import { setupServer } from "msw/node";

//Overides API requests and returns these values for testing
const server = setupServer(
  rest.get("http://localhost:3001/friends/Nate", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{ name: "james", description: "test", id: 1 }])
    );
  }),
  rest.post("http://localhost:3001/friends/undefined", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ name: "newjames", description: "test", id: 1 })
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
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

it("renders without crashing", function () {
  let username = "Nate";
  render(
    <MemoryRouter>
      <UserProvider>
        <FriendsC username={username} />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  let username = "Nate";
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <FriendsC username={username} />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays expected text", function () {
  let username = "Nate";
  const { getAllByText } = render(
    <MemoryRouter>
      <UserProvider>
        <FriendsC username={username} />
      </UserProvider>
    </MemoryRouter>
  );

  expect(getAllByText("ADD FRIEND")[0]).toBeInTheDocument();
});

it("can open the form", function () {
  let username = "Nate";
  const { getAllByText } = render(
    <MemoryRouter>
      <UserProvider>
        <FriendsC username={username} />
      </UserProvider>
    </MemoryRouter>
  );

  const add = getAllByText("ADD FRIEND")[0];
  fireEvent.click(add);

  expect(getAllByText("New Friend")[0]).toBeInTheDocument();
});

it("can close the form", async function () {
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
        <FriendsC username={username} />
      </UserProvider>
    </MemoryRouter>
  );
  await waitFor(() => expect(queryByText("james")).toBeInTheDocument());

  const add = getAllByText("ADD FRIEND")[0];
  fireEvent.click(add);

  const closeBtn = getByTestId("close");
  fireEvent.click(closeBtn);

  expect(queryByText("New Friend")).not.toBeInTheDocument();
});

it("can fill form and submit", async function () {
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
        <FriendsC username={username} />
      </UserProvider>
    </MemoryRouter>
  );
  await waitFor(() => expect(queryByText("james")).toBeInTheDocument());

  const add = getAllByText("ADD FRIEND")[0];
  fireEvent.click(add);

  const nameInput = getByPlaceholderText("name");
  const descriptionInput = getByPlaceholderText("description");
  const submitBtn = getByTestId("button");

  // fill out the form
  fireEvent.change(nameInput, { target: { value: "james" } });
  fireEvent.change(descriptionInput, { target: { value: "friend" } });
  fireEvent.click(submitBtn);
});

it("It loads from MOCK API", async function () {
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
        <FriendsC username={username} />
      </UserProvider>
    </MemoryRouter>
  );

  await waitFor(() => expect(queryByText("james")).toBeInTheDocument());
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
        <FriendsC username={username} />
      </UserProvider>
    </MemoryRouter>
  );

  await waitFor(() => expect(queryByText("james")).toBeInTheDocument());

  const add = getAllByText("ADD FRIEND")[0];
  fireEvent.click(add);

  const nameInput = getByPlaceholderText("name");
  const descriptionInput = getByPlaceholderText("description");
  const submitBtn = getByTestId("button");

  // fill out the form
  fireEvent.change(nameInput, { target: { value: "newjames" } });
  fireEvent.change(descriptionInput, { target: { value: "friend" } });
  fireEvent.click(submitBtn);

  await waitFor(() => expect(getByText("newjames")).toBeInTheDocument());
});

it("clicking delete removes the friend", async function () {
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
        <FriendsC username={username} />
      </UserProvider>
    </MemoryRouter>
  );
  let name;
  await waitFor(() => {
    expect(queryByText("james")).toBeInTheDocument();
    name = queryByText("james");
  });

  const deleteBtn = getByText("Delete Friend");

  fireEvent.click(deleteBtn);

  await waitFor(() => expect(name).not.toBeInTheDocument());
});

it("can edit a friend", async function () {
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
        <FriendsC username={username} />
      </UserProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(queryByText("james")).toBeInTheDocument();
  });

  const editBtn = getByText("Edit Friend");

  fireEvent.click(editBtn);

  const nameInput = getByPlaceholderText("name");
  const descriptionInput = getByPlaceholderText("description");
  const submitBtn = getByTestId("button");

  // fill out the form
  fireEvent.change(nameInput, { target: { value: "newjames" } });
  fireEvent.change(descriptionInput, { target: { value: "friend" } });
  fireEvent.click(submitBtn);

  await waitFor(() => expect(getByText("edited")).toBeInTheDocument());
});
