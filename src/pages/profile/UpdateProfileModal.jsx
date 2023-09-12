import React, { useState } from "react";
import "./update-profile.css";
import { useDispatch } from "react-redux";
import { getUserProfile, updateProfile } from "../../redux/apiCalls/profileApiCall";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProfileModal = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const { userId } = useParams();
  const [email, setEmail] = useState(""); 

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const updatedUser = { email, username };

    if (password.trim() !== "") {
      updatedUser.password = password;
    }

    dispatch(updateProfile(userId, updatedUser));
    navigate("/users-table")
  };

  return (
    <div className="update-profile">
      <form onSubmit={formSubmitHandler} className="update-profile-form">
       
        <h1 className="update-profile-title">Update Your Profile</h1>
        <input
          type="email"
          className="update-profile-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="text"
          className="update-profile-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <input
          type="password"
          className="update-profile-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" className="update-profile-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
