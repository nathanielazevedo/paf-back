import React, {useState, useContext, useRef} from "react";
import "./statement.css";
import ResponsesContainer from "../../screens/responses-container/ResponsesContainer";
import UserContext from '../../UserContext'
//Generates display for each individual statement.

function Statement({statement, id, editFunc, deleteFunc, addFunc, add, index}) {
  const [edit, setEdit] = useState(true);
  const input = useRef(null)
  const [formData, setFormData] = useState({statement});
  const [showResponses, setShowResponses] = useState(false)
  const {currentUser} = useContext(UserContext)
  function toggleEdit() {
    setEdit((old) => !old);
  }

  function handleFocus(){
    console.log(input.current)
    input.current.focus();
  }

  if(!edit){
    handleFocus();
    console.log('focused')
  }
  
  //Handles form inputs, updates state from info in evt.target.
  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  if(add){
    return (
      <div className="statements-responses-container">
        <div className="statement-container">
          <input value={formData.statement} name="statement" onChange={handleChange} className="statement add-statement-container" autoComplete="off"/>
          <div className="statement-options">
            <div
              className="delete-statement"
              onClick={() => addFunc(formData)}
            >
              {"Save"}
            </div>
          </div>
        </div>
      </div>
    );  
  }else{
    return (
      <div className="statements-responses-container" >
        <div className="statement-container">
        <i className={`fa ${showResponses ? 'fa-chevron-up' : 'fa-chevron-down'} index ${currentUser?.color}`} onClick={() => setShowResponses((old) => !old)}></i>
          <input type='text' ref={input} value={formData.statement} disabled={edit} name="statement" onChange={handleChange} className={`statement ${edit ? '' : 'editable'}`} autoComplete="off" autoFocus/>
          <div className="statement-options">
            <div
              className="edit-statement"
              onClick={ edit ? (evt) => {toggleEdit();} : () => { toggleEdit(); editFunc(id, formData); }}
            >
              {edit ? <i className="fas fa-pen edit-statement"></i> : "Save"}
            </div>
            <div
              className="delete-statement"
              onClick={() => deleteFunc(id)}
            >
              {edit ? <i className="fa fa-trash-alt delete-statement"></i> : ""}
            </div>
          </div>
        </div>
        <ResponsesContainer id={id} showResponses={showResponses}/>
      </div>
    );
  }

}

export default Statement;
