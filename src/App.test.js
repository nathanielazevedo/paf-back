/** @format */

import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { UserProvider } from "./testUtils";
import { MemoryRouter } from "react-router";
import * as axios from "axios";
jest.mock('axios');

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </MemoryRouter>
  );
});
 
test("renders learn react link", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText('PROGRAM A FRIEND');
  expect(linkElement).toBeInTheDocument();
});

it("clicking login from intro page", function () {
  const { getByText, getByPlaceholderText } = render(
    <MemoryRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </MemoryRouter>
  );
  const login = getByText("Login");
  fireEvent.click(login);

  expect(getByPlaceholderText("username")).toBeInTheDocument();
});

it("clicking login from intro page", function () {
  const { getByText, getByTestId, getByLabelText } = render(
    <MemoryRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </MemoryRouter>
  );
    const home = getByText("<PAF/>");
    fireEvent.click(home);
  const login = getByText("Login");
  fireEvent.click(login);

  const nameInput = getByTestId("username");
  const description = getByTestId("password");
  const submitBtn = getByTestId("button"); 

  // fill out the form
  fireEvent.change(nameInput, { target: { value: "test" } });
  fireEvent.change(description, { target: { value: 'test' } });
  fireEvent.click(submitBtn);
});

it("clicking signup from intro page", function () {
  const { getByText, getByPlaceholderText } = render(
    <MemoryRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </MemoryRouter>
  );
  const signup = getByText("Sign Up");
  fireEvent.click(signup);

  expect(getByPlaceholderText("username")).toBeInTheDocument();
});



it("clicking signup from intro page", function () {
  const { getByText, getAllByText, getByPlaceholderText } = render(
    <MemoryRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </MemoryRouter>
  );
  const signup = getAllByText("Sign Up")[0];
  fireEvent.click(signup);
  const home = getByText("<PAF/>");
  fireEvent.click(home);

  expect(getByText("PROGRAM A FRIEND")).toBeInTheDocument();
});

it("clicking PAF from intro page", function () {
  const { getByText, getAllByText, getByPlaceholderText } = render(
    <MemoryRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </MemoryRouter>
  );
  const paf = getAllByText("<PAF/>")[0];
  fireEvent.click(paf);


  expect(getByText("PROGRAM A FRIEND")).toBeInTheDocument();
});

