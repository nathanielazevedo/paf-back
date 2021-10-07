/** @format */

import React, {useContext} from "react";
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
      <Route path="/paf-front-end" exact>
        {!currentUser ? <Home /> : <Redirect to="/paf-front-end/friends" />}
      </Route>
      <Route path="/paf-front-end/friend/:id" exact>
        <StatementC color={currentUser?.color}/>
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
      <Route path="/paf-front-end/settings" exact>
                {currentUser ? (
          <Settings username={currentUser.username} />
        ) : (
          <Redirect to="/paf-front-end" />
        )}
      </Route>
      <Route path="/paf-front-end/friends" exact>
        {currentUser ? (
          <FriendsC username={currentUser.username}  color={currentUser.color}/>
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
      <Route path="/">
        {currentUser ? (
          <Redirect to="/paf-front-end/" />
        ) : (
          <Signup signupFunc={(f) => signupFunc(f)} />
        )}
      </Route>
    </Switch>
  );
}

export default Routes;
