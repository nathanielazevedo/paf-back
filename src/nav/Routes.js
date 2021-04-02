/** @format */

import React, { useContext } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Home from "../intro/Home";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import UserContext from "../UserContext";
import Friends from "../friendslist/Friends";
import Response from "../responses/Response";
import Chat from "../chat/Chat";
import FriendDetails from "../frienddetails/FriendDetails";

function Routes({ loginFunc, signupFunc }) {
  const { currentUser } = useContext(UserContext);

  return (
    <Switch>
      <Route path="/" exact>
        {!currentUser ? <Home /> : <Redirect to="/friends" />}
      </Route>
      <Route path="/friend/:id" exact>
        <FriendDetails />
      </Route>
      <Route path="/responses/:id" exact>
        <Response />
      </Route>
      <Route path="/chat/:id" exact>
        <Chat />
      </Route>
      <Route path="/friends" exact>
        {currentUser ? <Friends username={ currentUser.username }/> : <Redirect to="/" />}
      </Route>
      <Route path="/login" exact>
        {currentUser ? (
          <Redirect to="/" />
        ) : (
          <Login loginFunc={(f) => loginFunc(f)} />
        )}
      </Route>
      <Route path="/sign-up" exact>
        {currentUser ? (<Redirect to="/friends"/>) :
          (<Signup signupFunc={(f) => signupFunc(f)} />)}
      </Route>
    </Switch>
  );
}

export default Routes;
