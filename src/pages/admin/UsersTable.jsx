import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";

import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllUsersProfile,
  enableDisableUser, 
} from "../../redux/apiCalls/profileApiCall"; 

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsersProfile());
  }, [isProfileDeleted]);



  const enableDisableUserHandler = (userId, isEnabled) => {
    const actionMessage = isEnabled ? "disable" : "enable";
    const confirmMessage = `Are you sure you want to ${actionMessage} this user's account?`;

    if (window.confirm(confirmMessage)) {
      dispatch(enableDisableUser(userId));
    }
  };

  const handleAddNewUser = () => {
    navigate("add-user");
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Users</h1>
        <Button
          color="error"
          variant="outlined"
          onClick={() => handleAddNewUser()}
        >
          Add New User
        </Button>

        <div className="table-button-group"></div>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <span className="table-username">{item.username}</span>
                  </div>
                </td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>
                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                  >
                    <Link to={`update-user/${item._id}`}>Update</Link>
                  </Button>

                  {item.isEnabled ? (
                    <Button
                      variant="outlined"
                      color="warning"
                      size="small"
                      onClick={() => enableDisableUserHandler(item._id, false)}
                    >
                      Disable
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="info"
                      size="small"
                      onClick={() => enableDisableUserHandler(item._id, true)}
                    >
                      Enable
                    </Button>
                  )}

               
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UsersTable;





