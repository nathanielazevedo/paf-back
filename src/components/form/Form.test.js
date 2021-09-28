/** @format */

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Form from "./Form";
import { UserProvider } from "../../testUtils";

it("renders without crashing", function () {
  let title = 'Login'
  let inputs = ['Login'];
  let func = 'Login'
  render(
    <MemoryRouter>
      <UserProvider>
        <Form title={title} inputs={inputs} func={func}/>
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
    let title = "Login";
    let inputs = ["Login"];
    let func = "Login";
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Form title={title} inputs={inputs} func={func} />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});


it("displays expected text", function () {
  let title = "Login";
  let inputs = ["Login"];
  let func = "Login";
  const { getAllByText } = render(
    <MemoryRouter>
      <UserProvider>
        <Form title={title} inputs={inputs} func={func} />
      </UserProvider>
    </MemoryRouter>
  );

  expect(getAllByText("Login")[0]).toBeInTheDocument();
});