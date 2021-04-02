/** @format */

import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./FriendDetails.css";
import avatar from "../assets/paf-logo.jpg";
import Statement from "../statements/statement";
import Form from "../form/Form";
import { Link } from "react-router-dom";
import Paf from "../api.js";
import { useHistory } from "react-router-dom";

function FriendDetails() {
  const { id } = useParams();
  const [form, setForm] = useState(false);
  const [statements, setStatements] = useState();
  const [friend, setFriend] = useState();
  const history = useHistory();

  const openForm = () => {
    setForm(true);
  };
  const closeForm = () => {
    setForm(false);
  };

  function back() {
    history.goBack();
  }

  const addISay = async (formData) => {
    formData.friend_id = id;
    let res = await Paf.addFriendStatement(formData);
    setStatements((data) => [...data, res]);
    setForm(false);
    return { success: true };
  };

  useEffect(function () {
    async function getFriendInfo() {
      let friend = await Paf.getFriendInfo(id);
      setStatements(friend.statements);
      delete friend.statements;
      setFriend(friend);
    }
    getFriendInfo();
  }, []);

  let friendStuff = null;
  if (friend) {
    friendStuff = (
      <>
        <h1 h1 className="friend-name">
          {" "}
          {friend.name}
        </h1>
        <p className="friend-description-ind">{friend.description}</p>
        <Link to={`/chat/${friend.id}`}>
          <button className="friend-chat">Start Chatting</button>
        </Link>
      </>
    );
  }

  return (
    <section className="friend-contained">
      <div className="friend-header-container">
        <img src={avatar} className="friend-avatar" alt="avatar" />
        {friend ? friendStuff : null}
      </div>
      <div className="friend-convos-container">
        <ul className="friend-convo-list">
          <li className="friend-i-say title">When I say...</li>
          {statements
            ? statements.map((s, i) => {
                return <Statement say={s.statement} id={s.id} />;
              })
            : null}
          <div>
            <i className="fas fa-arrow-circle-left add-icon" onClick={back}></i>
            <i className="fas fa-plus-circle add-icon" onClick={openForm}></i>
          </div>
        </ul>
        {form ? (
          <div className="floating-form">
            <Form
              title="New Statement"
              inputs={["statement"]}
              func={addISay}
              after={`/friend/${friend.id}`}
              close={closeForm}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default FriendDetails;
