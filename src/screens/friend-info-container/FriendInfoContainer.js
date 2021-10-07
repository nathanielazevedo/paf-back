import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Paf from "../../api.js";
import Statement from "../../components/statement/Statement";
import {Link} from "react-router-dom";
import "./FriendInfoContainer.css";
import {useHistory} from 'react-router-dom'

//Should gather all info on friend and statements from here. (CRUD)
function FriendInfoContainer({color}) {
  const {id} = useParams();
  const [statements, setStatements] = useState([]);
  const [friend, setFriend] = useState();
  const [edit, setEdit] = useState(true);
  const [formData, setFormData] = useState({name: '', description: ''});
  const [addStatus, setAddStatus] = useState(false);
  const [fetch, setFetch] = useState(false);
  const history = useHistory();

  //TOGGLE FRIEND EDIT
  function toggleEdit() {
    setEdit((old) => !old);
  }

  //HANDLES FORM INPUTS
  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  //GET FRIEND AND STATEMENTS
  useEffect(() => {
    async function getFriendInfo() {
      let friend = await Paf.getFriendInfo(id);
      setFormData(() => ({name: friend.name, description: friend.description}));
      setFriend(friend);
      setStatements(friend.statements);
    }
    getFriendInfo();
  }, [fetch, id]);

  //ADD STATEMENT
  const addStatement = async (formData) => {
    formData.friend_id = parseInt(id);
    await Paf.addFriendStatement(formData);
    setFetch((old) => !old);
  };

  // EDIT STATEMENT
  async function editStatement(id, data) {
    await Paf.editStatement(id, data);
    setFetch((old) => !old);
  }

  // DELETE STATEMENT
  async function deleteStatement(id) {
    await Paf.deleteStatement(id);
    setFetch((old) => !old);
  }

  //UPDATE FRIEND
  async function editFriend() {
    await Paf.editFriend(friend.id, formData);
    setFetch((old) => !old);
  }

  //DELETE FRIEND
  async function deleteFriend() {
    await Paf.deleteFriend(id);
    history.push("/");
  }

  //ADDS EMPTY STATEMENT FORM
  function addStatementScreen() {
    setAddStatus(true);
    setStatements((old) => [...old, {blank: true}]);
  }

  return (
    <div className="friend-container">
      <div className="friend-info">
        <form className="friend-form">
          <input
            type="text"
            value={formData?.name}
            disabled={edit}
            name="name"
            onChange={handleChange}
            className="inputed friend-name"
          />
          <input
            type="text"
            value={formData?.description}
            disabled={edit}
            name="description"
            onChange={handleChange}
            className={`inputed main-friend-description ${color}`}
          />
        </form>
        <div className="friend-options">
          <Link
            to={`/chat/${friend?.id}`}
            className="text-chat icon"
          >
            <i className="fas fa-comment-dots text-chat"></i>
            <span className="icon-description">Text Chat</span>
          </Link>
          <Link
            to={`/facechat/${friend?.id}`}
            className="face-chat icon"
          >
            <i className="fas fa-microphone face-chat"></i>
            <span className="icon-description">Face Chat</span>
          </Link>
          <div onClick={edit ? toggleEdit : editFriend} className="edit-friend icon">
            {edit ? <i className="fas fa-pen edit-friend"></i> : "Save"}
            <span className="icon-description">Edit Info</span>
          </div>
          <i className="fa fa-trash-alt delete-friend icon" onClick={deleteFriend}>
            <span className="icon-description">Delete Friend</span>
          </i>
        </div>
      </div>
      <div className="statements-container" id="spot">
        {statements.map((s, i) => {
          if (s.blank) {
            return (
              <Statement
                addFunc={addStatement}
                key={i}
                add={true}
                statement=""
                index={i}
              />
            );
          } else {
            return (
              <Statement
                statement={s.statement}
                id={s.id}
                editFunc={editStatement}
                deleteFunc={deleteStatement}
                fId={id}
                key={s.id}
                add={false}
                index={i}
              />
            );
          }
        })}
      </div>
      <button
        className={`add-statement ${color}`}
        onClick={addStatementScreen}
        disabled={addStatus}
      >
        +
      </button>
    </div>
  );
}

export default FriendInfoContainer;
