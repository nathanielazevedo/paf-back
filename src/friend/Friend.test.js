/** @format */

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NavBar from "../nav/Navbar";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <NavBar />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  let username = "Nate";
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <NavBar />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays expected text", function () {
  const { getAllByText } = render(
    <MemoryRouter>
      <UserProvider>
        <NavBar />
      </UserProvider>
    </MemoryRouter>
  );

  expect(getAllByText("Friends")[0]).toBeInTheDocument();
}); 