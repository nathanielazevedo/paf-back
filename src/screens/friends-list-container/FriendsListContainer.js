/** @format */

import React, { useState, useEffect } from "react";
import Friend from "../../components/friend/Friend";
import Paf from "../../api.js";
import "./FriendsListContainer.css";

//Get and display friends.

function FriendsListContainer({ username, color }) {
  const [friends, setFriends] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [addStatus, setAddStatus] = useState(false);

  //GET ALL Friends
  useEffect(() => {
      async function getFriends() {
        let friends = await Paf.getAllFriends(username);
        setFriends(friends);
      }
      getFriends();
    },
    [fetch, username]
  );
  //CREATE
  const addFriend = async (formData) => {
    await Paf.addFriend(formData);
    setFetch((old) => !old);
    setAddStatus(false)
  };

    //ADDS EMPTY STATEMENT FORM
  function addFriendScreen() {
    setAddStatus(true);
    setFriends((old) => [...old, {blank: true}]);
  }

  //GENERATE FRIENDS
  let allFriends = friends
    ? friends.map((f, i) => {
      if(f.blank){
        return (
          <Friend
            name=''
            description=''
            key='999'
            add={true}
            addFriendFunc={addFriend}
          />
        );
      }else{
        return (
          <Friend
            name={f.name}
            description={f.description}
            id={f.id}
            key={i}
          />
        );
      }
      })
    : null;


  //Returns list of all friends a user has created.
  return (
      <div className="friends-list">
        {allFriends}
        <button className={`add-friend-button accent ${color}`} onClick={addFriendScreen} disabled={addStatus}>+</button>
      </div>
  );
}

export default FriendsListContainer;
