/** @format */

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "./Home";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Home />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Home/>
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays expected text", function () {
  const { getAllByText } = render(
    <MemoryRouter>
      <UserProvider>
        <Home />
      </UserProvider>
    </MemoryRouter>
  );

  expect(getAllByText("PROGRAM A FRIEND")[0]).toBeInTheDocument();
}); 