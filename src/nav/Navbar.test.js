/** @format */

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";
import Navbar from "./Navbar";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Navbar />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Navbar />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays expected text", function () {
  const { getAllByText } = render(
    <MemoryRouter>
      <UserProvider>
        <Navbar />
      </UserProvider>
    </MemoryRouter>
  );

  expect(getAllByText("Friends")[0]).toBeInTheDocument();
});
