/** @format */

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Login from "./Login";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Login />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Login />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays expected text", function () {
  const { getAllByText } = render(
    <MemoryRouter>
      <UserProvider>
        <Login />
      </UserProvider>
    </MemoryRouter>
  );

  expect(getAllByText("Login")[0]).toBeInTheDocument();
});
