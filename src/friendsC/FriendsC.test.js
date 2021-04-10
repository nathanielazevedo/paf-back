/** @format */

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import FriendsC from "./FriendsC";
import { UserProvider } from "../testUtils";

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
        <FriendsC username = {username} />
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