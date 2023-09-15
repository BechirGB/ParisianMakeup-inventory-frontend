import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../forms/form.css";
import AdminSidebar from "../AdminSidebar";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { addUserProfile } from "../../../redux/apiCalls/profileApiCall";

const AddUserPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false, // Default role is user
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(addUserProfile(formData));

      toast.success("User registered successfully");
      navigate("/users-table");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="table-container">
    <AdminSidebar />
      <h1 className="form-title">Create new account</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <TextField
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <TextField
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <TextField
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isAdmin}
                onChange={handleChange}
                name="isAdmin"
                color="primary"
              />
            }
            label="Admin"
          />
        </div>
        <Button variant="contained" type="submit" className="login-button">
          Register
        </Button>
      </form>
    </section>
  );
};

export default AddUserPage;
