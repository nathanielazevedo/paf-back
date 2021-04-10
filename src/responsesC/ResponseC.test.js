/** @format */

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ResponseC from "./ResponseC";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <ResponseC />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {

  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <ResponseC/>
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays expected text", function () {
  const { getAllByText } = render(
    <MemoryRouter>
      <UserProvider>
        <ResponseC />
      </UserProvider>
    </MemoryRouter>
  );

  expect(getAllByText("Add Response")[0]).toBeInTheDocument();
});  