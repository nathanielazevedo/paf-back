/** @format */

import React, { useState, useEffect } from "react";
import "./FriendsC.css";
import Friend from "../friend/Friend";
import Form from "../form/Form";
import Paf from "../api.js";
import { Button } from "reactstrap";

//All API calls for friend info lives here

function FriendsC({ username }) {
  const [form, setForm] = useState(false);
  const [friends, setFriends] = useState([]);

  //TOGGLE ADD FRIEND FORM
  const openForm = () => {
    setForm(true);
  };
  const closeForm = () => {
    setForm(false);
  };

  //DELETE FRIEND
  async function deleteFriend(id) {
    await Paf.deleteFriend(id);
    let pos = friends
      .map((f) => {
        return f.id;
      })
      .indexOf(id);

    setFriends((data) => {
      data.splice(pos, 1);

      return [...data];
    });
  }

  // EDIT FRIEND
  async function editFriend(id, data) {
    let newFriend = await Paf.editFriend(id, data);
    let pos = friends
      .map((f) => {
        return f.id;
      })
      .indexOf(id);

    setFriends((datas) => {
      datas[pos] = newFriend;

      return [...datas];
    }); 
    return { success: true };

  }

  // ADD FRIEND
  const addFriend = async (formData) => {
    let res = await Paf.addFriend(formData);
    setFriends((data) => {
      if (data) {
        return [...data, res];
      } else {
        return [res];
      }
    });
    setForm(false);
    return { success: true };
  };

  // GET ALL FRIENDS
  useEffect(
    function () {
      async function getFriends() {
        let friends = await Paf.getAllFriends(username);
        setFriends(friends);
      }
      getFriends();
    },
    [username]
  );

  //GENERATE FRIENDS
  let allFriends = friends
    ? friends.map((f, i) => {
        return (
          <Friend
            name={f.name}
            description={f.description}
            id={f.id}
            editFunc={editFriend}
            deleteFunc={() => deleteFriend(f.id)}
            key={i}
          />
        );
      })
    : null;

  return (
    <>
      <ul className="friends-list">
        {allFriends}
        <div className="container-button">
          <Button onClick={openForm}>ADD FRIEND</Button>
        </div>
      </ul>
      {form ? (
        <Form
          title="New Friend"
          inputs={["name", "description"]}
          func={addFriend}
          after={`/friends`}
          close={closeForm}
        />
      ) : null}
    </>
  );
}

export default FriendsC;
