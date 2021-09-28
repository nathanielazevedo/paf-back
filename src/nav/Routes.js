/** @format */

import React, { useContext } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import UserContext from "../UserContext";
import Home from "../screens/intro/Home";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import FriendsC from "../screens/friendsC/FriendsC";
import ResponseC from "../screens/responsesC/ResponseC";
import Chat from "../screens/chat/Chat";
import StatementC from "../screens/statementC/StatementC";
import Facechat from "../screens/facechat/Facechat";

//Handles all front end routing. Some routes are protected by UserContext(logged in or not)
function Routes({ loginFunc, signupFunc }) {
  const { currentUser } = useContext(UserContext);

  return (
    <Switch>
      <Route path="/paf-front-end" exact>
        {!currentUser ? <Home /> : <Redirect to="/paf-front-end/friends" />}
      </Route>
      <Route path="/paf-front-end/friend/:id" exact>
        <StatementC />
      </Route>
      <Route path="/paf-front-end/responses/:id" exact>
        <ResponseC />
      </Route>
      <Route path="/paf-front-end/chat/:id" exact>
        <Chat />
      </Route>
      <Route path="/paf-front-end/facechat/:id" exact>
        <Facechat />
      </Route>
      <Route path="/paf-front-end/friends" exact>
        {currentUser ? (
          <FriendsC username={currentUser.username} />
        ) : (
          <Redirect to="/paf-front-end" />
        )}
      </Route>
      <Route path="/paf-front-end/login" exact>
        {currentUser ? (
          <Redirect to="/paf-front-end" />
        ) : (
          <Login loginFunc={(f) => loginFunc(f)} />
        )}
      </Route>
      <Route path="/paf-front-end/sign-up" exact>
        {currentUser ? (
          <Redirect to="/paf-front-end/friends" />
        ) : (
          <Signup signupFunc={(f) => signupFunc(f)} />
        )}
      </Route>
    </Switch>
  );
}

export default Routes;
