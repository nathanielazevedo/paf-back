/** @format */

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import StatementC from "./StatementC";
import { UserProvider } from "../testUtils";

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

it("displays expected text", function () {
  const { getAllByText } = render(
    <MemoryRouter>
      <UserProvider>
        <StatementC />
      </UserProvider>
    </MemoryRouter>
  );

  expect(getAllByText("Add Statement")[0]).toBeInTheDocument();
});
