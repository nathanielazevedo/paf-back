import "./ResponsesContainer.css";
import React, {useState, useEffect} from "react";
import Paf from "../../api.js";
import Response from "../../components/response/Response";

//All api requests regarding responses are initiated here. (CRUD)
function ResponsesContainer({id, showResponses}) {
  const [responses, setResponses] = useState([]);
  const [addResponseStatus, setAddResponseStatus] = useState(false);
  const [fetch, setFetch] = useState(false);

  //ADDS EMPTY RESPONSE FORM
  function addResponseScreen() {
    setAddResponseStatus(true);
    setResponses((old) => [...old, {blank: true}]);
  }

  //Get all responses upon render
  useEffect(() => {
    async function getStatementInfo() {
      let statement = await Paf.getStatementInfo(id);
      setResponses(statement.responses);
      delete statement.responses;
    }
    getStatementInfo();
  }, [fetch, id]);

  //ADD RESPONSE
  const addResponse = async (formData) => {
    formData.statement_id = parseInt(id);
    await Paf.addStatementResponse(formData);
    setAddResponseStatus(false);
    setFetch((old) => !old);
  };

  // Edit RESPONSE
  async function editResponse(id, data) {
    await Paf.editResponse(id, data);
    setFetch((old) => !old);
  }

  // Delete a response
  async function deleteResponse(id) {
    await Paf.deleteResponse(id);
    setFetch((old) => !old);
  }

  if (responses.length) {
    return (
      <div
        className={`responses-container ${
          showResponses ? "showResponses" : ""
        }`}
      >
        {responses.map((s, i) => {
          if (s.blank) {
            return (
              <>
                <Response addFunc={addResponse} key={i} index={i} />
              </>
            );
          } else if (responses.length === i + 1) {
            return (
              <>
                <Response
                  s={s}
                  deleteFunc={deleteResponse}
                  editFunc={editResponse}
                  key={s.id}
                  index={i}
                />
                <Response
                  message=""
                  addScreenFunc={addResponseScreen}
                  addResponseStatus={addResponseStatus}
                />
              </>
            );
          } else {
            return (
              <Response
                s={s}
                deleteFunc={deleteResponse}
                editFunc={editResponse}
                key={s.id}
                index={i}
              />
            );
          }
        })}
      </div>
    );
  } else {
    return (
      <div
        className={`responses-container ${
          showResponses ? "showResponses" : ""
        }`}
      >
        <Response
          message="No responses have been added"
          addScreenFunc={addResponseScreen}
          addResponseStatus={addResponseStatus}
        />
      </div>
    );
  }
}

export default ResponsesContainer;
