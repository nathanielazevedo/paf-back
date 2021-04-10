/** @format */

import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { UserProvider } from "./testUtils";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText('PROGRAM A FRIEND');
  expect(linkElement).toBeInTheDocument();
});

it("clicking login from intro page", function () {
  const { getByText, getByPlaceholderText } = render(
    <UserProvider>
      <App />
    </UserProvider>
  );
  const login = getByText("Login");
  fireEvent.click(login);

  expect(getByPlaceholderText("username")).toBeInTheDocument();
});

it("clicking signup from intro page", function () {
  const { getByText, getByPlaceholderText } = render(
    <UserProvider>
      <App />
    </UserProvider>
  );
  const signup = getByText("Sign Up");
  fireEvent.click(signup);

  expect(getByPlaceholderText("username")).toBeInTheDocument();
});
