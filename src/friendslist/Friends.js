/** @format */

import React, { useState, useEffect } from "react";
import "./Friends.css";
import Friend from "../friend/Friend";
import Form from "../form/Form";
import Paf from "../api.js";


function Friends({username}) {
  const [form, setForm] = useState(false);
  
  const [friends, setFriends] = useState([]);

  const openForm = () => {
    setForm(true);
  };
  const closeForm = () => {
    setForm(false);
  };

  async function deleteFriend(id) {
    await Paf.deleteFriend(id);
    let pos = friends
      .map((f) => {
        return f.id;
      })
      .indexOf(id);
    
    setFriends((data) => {
      data.splice(pos, 1);
      
      return ([...data])
    });
  }


  const addPerson = async (formData) => {
    formData.username = username;
    let res = await Paf.addFriend(formData);
    setFriends((data) => {
      if (data) {
        return [...data, res]
      } else {
        return [res]
      }
      
    });
    setForm(false);
    return { success: true };
  };

  useEffect(function () {
    async function getFriends() {
      let friends = await Paf.getAllFriends(username);
      setFriends(friends);
    }
    getFriends();
  }, []);

  let allFriends = friends
    ? friends.map((f) => {
        return (
          <Friend
            name={f.name}
            description={f.description}
            id={f.id}
            deleteFunc={() => deleteFriend(f.id)}
          />
        );
      })
    : null;

  return (
    <>
      <ul className="friends-list">
        {allFriends}

        <i className="fas fa-plus-circle add-icon" onClick={openForm}></i>
      </ul>
      {form ? (
        <div className="floating-form">
          <Form
            title="New Friend"
            inputs={["name", "description"]}
            func={addPerson}
            after={`/friends`}
            close={closeForm}
          />
        </div>
      ) : null}
    </>
  );
}

export default Friends;
