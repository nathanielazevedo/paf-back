/** @format */

import React, {useContext, Suspense} from "react";
import {Switch, Redirect, Route} from "react-router-dom";
import UserContext from "../UserContext";
import Home from "../screens/home/Home";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import FriendsC from "../screens/friends-list-container/FriendsListContainer";
import ResponseC from "../screens/responses-container/ResponsesContainer";
import Chat from "../screens/text-chat/Chat";
import StatementC from "../screens/friend-info-container/FriendInfoContainer";
import Facechat from "../screens/face-chat/FaceChat";
import Settings from "../screens/settings/Settings";
//Handles all front end routing. Some routes are protected by UserContext(logged in or not)
function Routes({loginFunc, signupFunc}) {
  const {currentUser} = useContext(UserContext);

  return (
    <Switch>
      <Route path="/" exact>
        {!currentUser ? <Suspense fallback={'loading'}><Home /></Suspense> : <Redirect to="/friends" />}
      </Route>
      <Route path="/friend/:id" exact>
        <StatementC color={currentUser?.color}/>
      </Route>
      <Route path="/responses/:id" exact>
        <ResponseC />
      </Route>
      <Route path="/chat/:id" exact>
        <Chat />
      </Route>
      <Route path="/facechat/:id" exact>
        <Facechat />
      </Route>
      <Route path="/settings" exact>
                {currentUser ? (
          <Settings username={currentUser.username} />
        ) : (
          <Redirect to="/" />
        )}
      </Route>
      <Route path="/friends" exact>
        {currentUser ? (
          <FriendsC username={currentUser.username}  color={currentUser.color}/>
        ) : (
          <Redirect to="/" />
        )}
      </Route>
      <Route path="/login" exact>
        {currentUser ? (
          <Redirect to="/" />
        ) : (
          <Login loginFunc={(f) => loginFunc(f)} />
        )}
      </Route>
      <Route path="/sign-up" exact>
        {currentUser ? (
          <Redirect to="/friends" />
        ) : (
          <Signup signupFunc={(f) => signupFunc(f)} />
        )}
      </Route>
      <Route path="/">
        {currentUser ? (
          <Redirect to="/" />
        ) : (
          <Signup signupFunc={(f) => signupFunc(f)} />
        )}
      </Route>
    </Switch>
  );
}

export default Routes;
