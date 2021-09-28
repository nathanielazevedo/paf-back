/** @format */

import React, { useState, useEffect } from "react";
import Friend from "../../components/friend/Friend";
import Form from "../../components/form/Form";
import Paf from "../../api.js";
import { Button } from "reactstrap";
import "./FriendsC.css";

//All API calls for FRIENDS are initiated here. (CRUD)

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

  //GET ALL. 
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

  //CREATE
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

  //UPDATE
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
  };

  //DELETE
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

  //Returns list of all friends a user has created.
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
          after={`/paf-front-end/friends`}
          close={closeForm}
        />
      ) : null}
    </>
  );
}

export default FriendsC;
