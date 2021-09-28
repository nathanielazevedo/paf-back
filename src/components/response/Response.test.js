/** @format */

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Response from "./Response";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  let s = {response: "hey"}
  render(
    <MemoryRouter>
      <UserProvider>
        <Response s={s}/>
      </UserProvider>
    </MemoryRouter>
  );
});


it("matches snapshot", function () {
  let s = { response: "hey" };
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Response s={s} />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays expected text", function () {
  let s = { response: "hey" };
  const { getAllByText } = render(
    <MemoryRouter>
      <UserProvider>
        <Response s={s} />
      </UserProvider>
    </MemoryRouter>
  );

  expect(getAllByText("hey")[0]).toBeInTheDocument();
}); 