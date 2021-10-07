
import React, {useState, useContext} from "react";
import "./Response.css";
import UserContext from '../../UserContext'
//Renders an individual response.
function Response({s, deleteFunc, editFunc, index, message, addResponseStatus, addScreenFunc, addFunc}) {
  const [edit, setEdit] = useState(true);
  const [formData, setFormData] = useState({response: s?.response});
  const {currentUser} = useContext(UserContext)
  function toggleEdit() {
    setEdit((old) => !old);
  }

  //Handles form inputs, updates state from info in evt.target.
  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };


  if(s){
    return (
      <div className="response" key={s.id}>
      <span className={`response-index`}>{index + 1}</span>
        <input
          value={formData.response}
          disabled={edit}
          name="response"
          onChange={handleChange}
          className={`inputText ${edit ? '' : 'editable'}`}
        />
        <div className="response-options">
          <div
            onClick={edit ? toggleEdit : () => {toggleEdit(); editFunc(s.id, formData)}}
            className="response-edit"
          >
            {edit ? <i className="fas fa-pen edit-statement"></i>  : "Save"}
          </div>
          <div
            onClick={edit ? toggleEdit : () => {editFunc(formData)}}
            className="response-delete"
          >
            {edit ? <i className="fa fa-trash-alt delete-statement"></i> : "Save"}
          </div>
        </div>
      </div>
    );
  } else if (addFunc){
    return (
      <div className="response">
      <span className="response-index">{index + 1}</span>
        <input
          value={formData.response}
          name="response"
          onChange={handleChange}
          className="inputText editable"
          autocomplete="off"
        />
        <div className="response-options">
          <div
            onClick={() => {addFunc(formData)}}
            className="response-delete"
          >
            {"Save"}
          </div>
        </div>
      </div>
    );
  }
  
  else{
    return (
      <div className="response" >
        <span className="response-index">{message}</span>
        <div className="response-options">
          <button
            className={`add-response ${currentUser?.color}`}
            onClick={addScreenFunc}
            disabled={addResponseStatus}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

export default Response;
