import React, {useState, useEffect, useContext} from "react";
import "./Settings.css";
import API from "../../api";
import UserContext from "../../UserContext";

function Settings({username}) {
  const {setReload, currentUser} = useContext(UserContext);
  const [formData, setFormData] = useState();

  //Handles form inputs, updates state from info in evt.target.
  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  useEffect(() => {
    async function getUserInfo() {
      let info = await API.getUserInfo(username);
      delete info.isAdmin;
      setFormData(info);
    }
    getUserInfo();
  }, [username]);

  function handleColorChange(color) {
    setFormData((fData) => ({
      ...fData,
      color: color,
    }));
  }

  async function updateUser() {
    await API.updateUserInfo(formData);
    setReload((old) => !old);
  }

  return (
    <div className="settings-container">
      <div className="user-info-container">
        Username:
        <input
          value={formData?.username}
          name="username"
          onChange={handleChange}
          className="user-info"
        />
        Lastname:
        <input
          value={formData?.lastName}
          name="lastName"
          onChange={handleChange}
          className="user-info"
        />
        Firstname:
        <input
          value={formData?.firstName}
          name="firstName"
          onChange={handleChange}
          className="user-info"
        />
        Email:
        <input
          value={formData?.email}
          name="email"
          onChange={handleChange}
          className="user-info"
        />
      </div>
      <div className="colors">
        <div className={`color orange ${formData?.color === 'orange' ? 'chosen' : ''}`} onClick={() => handleColorChange('orange')}></div>
        <div className={`color blue ${formData?.color === 'blue' ? 'chosen' : ''}`} onClick={() => handleColorChange('blue')}></div>
        <div className={`color green ${formData?.color === 'green' ? 'chosen' : ''}`} onClick={() => handleColorChange('green')}></div>
      </div>
      <button className={`submit-user-info ${currentUser.color}`} onClick={() => updateUser()}>
        Edit User Info
      </button>
    </div>
  );
}

export default Settings;
