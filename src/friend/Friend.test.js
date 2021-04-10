/** @format */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Friend from "./Friend";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Friend />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  let username = "Nate";
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Friend />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("displays expected props as text", function () {
  let friend = {
    name: 'test',
    description: 'test',
    id: 1,
  }

  const { getAllByText } = render(
    <MemoryRouter>
      <UserProvider>
        <Friend name={friend.name} description={friend.description} id={friend.id}/>
      </UserProvider>
    </MemoryRouter>
  );

  expect(getAllByText("test")[0]).toBeInTheDocument();
});

it("displays text along with friend", function () {
  let friend = {
    name: 'test',
    description: 'test',
    id: 1,
  }

  const { getAllByText, queryByText } = render(
    <MemoryRouter>
      <UserProvider>
        <Friend name={friend.name} description={friend.description} id={friend.id}/>
      </UserProvider>
    </MemoryRouter>
  );

  expect(getAllByText("test")[0]).toBeInTheDocument();
  expect(queryByText("Program Friend")).toBeInTheDocument();
  expect(queryByText("Edit Friend")).toBeInTheDocument();
});


it("clicking edit friend opens form", function () {
  let friend = {
    name: 'test',
    description: 'test',
    id: 1,
  }

  const { getAllByText, queryByText, getByTestId } = render(
    <MemoryRouter>
      <UserProvider>
        <Friend name={friend.name} description={friend.description} id={friend.id}/>
      </UserProvider>
    </MemoryRouter>
  );


  let editButton = queryByText("Edit Friend")
  fireEvent.click(editButton);
  expect(getAllByText("Edit Friend")[0]).toBeInTheDocument();
  
  const closeBtn = getByTestId("close");
  fireEvent.click(closeBtn);

  expect(closeBtn).not.toBeInTheDocument();
});


 