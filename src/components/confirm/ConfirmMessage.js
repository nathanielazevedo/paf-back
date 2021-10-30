import React from 'react'
import './ConfirmMessage.css'

function ConfirmMessage({cancelDelete, confirmDelete}) {
  return (
    <div className="confirm-container">
      <div className="confirm-inner-container">
        <span>Are you sure you want to delete this friend?</span>
        <div className="confirmation-buttons">
          <button onClick={cancelDelete}>No</button>
          <button onClick={confirmDelete}>Yes</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmMessage
