import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Paf from "../../api.js";
import Statement from "../../components/statement/Statement";
import {Link} from "react-router-dom";
import "./FriendInfoContainer.css";
import {useHistory} from 'react-router-dom'
import Confirmation from "../../components/confirmation/Confirmation.js";
import ConfirmMessage from "../../components/confirm/ConfirmMessage.js";

//Should gather all info on friend and statements from here. (CRUD)
function FriendInfoContainer({color}) {
  const {id} = useParams();
  const [statements, setStatements] = useState([]);
  const [friend, setFriend] = useState();
  const [edit, setEdit] = useState(true);
  const [formData, setFormData] = useState({name: '', description: ''});
  const [addStatus, setAddStatus] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [confirm, setConfirm] = useState(false)
  const [confirmMessageState, setConfirmMessageState] = useState(false)
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
    try{
      await Paf.addFriendStatement(formData);
      setAddStatus(false);
      setFetch((old) => !old);
      setConfirm(true)
      setTimeout(() => {
        setConfirm(false)
      }, 1000)
    } catch(e){
      setConfirm(true)
    }
  };

  // EDIT STATEMENT
  async function editStatement(id, data) {
    await Paf.editStatement(id, data);
    setFetch((old) => !old);
  }

  // DELETE STATEMENT
  async function deleteStatement(id) {
    await Paf.deleteStatement(id);
    setAddStatus(false);
    setFetch((old) => !old);
  }

  //UPDATE FRIEND
  async function editFriend() {
    await Paf.editFriend(friend.id, formData);
    setFetch((old) => !old);
    setEdit(true)
  }

  function confirmDeleteFriend(){
    setConfirmMessageState(true)
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

  function cancelAddStatement(){
    setAddStatus(false);
    setStatements((old) => {
      let canceled = [...old]
      canceled.pop();
      return canceled
      });
  }

  let confirmation = confirm ? <Confirmation/> : null;

  return (
    <div className="main-friend-container flex-column">

      <div className="main-friend-info flex-column">

        <div className="main-friend-form flex-column">
          <input
            value={formData?.name}
            disabled={edit}
            name="name"
            onChange={handleChange}
            className="main-friend-form-input main-friend-name"
            style={{borderBottom: !edit ? `solid gold 1px` : 'none'}}
          />
          <input
            value={formData?.description}
            disabled={edit}
            name="description"
            onChange={handleChange}
            className={`main-friend-form-input main-friend-description ${color}`}
            style={{borderBottom: !edit ? `solid gold 1px` : 'none'}}
          />
        </div>

        <div className="main-friend-options flex-column">
          <Link
            to={`/chat/${friend?.id}`}
            className="flex-column"
          >
            <i className="icon fas fa-comment-dots flex-column"></i>
            <span className="icon-description">Text Chat</span>
          </Link>
          <Link
            to={`/facechat/${friend?.id}`}
            className="flex-column"
          >
            <i className="icon fas fa-microphone"></i>
            <span className="icon-description">Face Chat</span>
          </Link>
          <div onClick={edit ? toggleEdit : editFriend} className="flex-column">
            {edit ? <i className="icon fas fa-pen edit-friend"></i> : <span style={{color: 'white', cursor: 'pointer'}}>Save</span>}
            <span className="icon-description" style={{display:!edit ? 'none' : ''}}>Edit Info</span>
          </div>
          <div className="flex-column">
            <i className="icon fa fa-trash-alt" onClick={confirmDeleteFriend}></i>
            <span className="icon-description">Delete Friend</span>
          </div>
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
      <div className="add-statement-containers">
        <button
          className={`add-statement ${color}`}
          onClick={!addStatus ? addStatementScreen : cancelAddStatement}
        >
          {!addStatus ? '+' : '-'}
        </button>
      </div>
      {confirmation}
      {confirmMessageState && <ConfirmMessage cancelDelete={() => setConfirmMessageState(false)} confirmDelete={deleteFriend}/>}
    </div>
  );
}

export default FriendInfoContainer;
