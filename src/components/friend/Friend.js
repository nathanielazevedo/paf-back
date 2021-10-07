import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import "./Friend.css";
import UserContext from "../../UserContext";

//Renders individual friend. State for edit form and dropdown selections for each friend live here.
function Friend({name, description, id, addFriendFunc, add = false}) {
  const {currentUser} = useContext(UserContext);
  const INITIAL_STATE = {name, description}
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (evt) => {
    let {name, value} = evt.target;
    setFormData((old) => (
      {
        ...old,
        [name]: value
      }
    ))
  }

  if (add) {
    return (
      <div className="friend add-friend">
        <div className="add-friend-info">
          <input className="friend-name add-friend-input" name='name' value={formData.name} onChange={(evt) => handleChange(evt)}/>
          <input className="friend-description-main add-friend-input accent" name='description' value={formData.description} onChange={(evt) => handleChange(evt)}/>
        </div>
        <span className="submit-friend" onClick={() => addFriendFunc(formData)}>Save</span>
      </div>
    );
  } else {
    return (
      <Link className="friend" to={`/paf-front-end/friend/${id}`}>
        <h5 className="friend-name">{name}</h5>
        <p className={`friend-description-main accent ${currentUser.color}`}>{description}</p>
      </Link>
    );
  }
}

export default Friend;
