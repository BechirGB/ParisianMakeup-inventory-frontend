import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteProfile,
  getAllUsersProfile,

} from "../../redux/apiCalls/profileApiCall"; // Import your Redux actions

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllUsersProfile());
  }, [isProfileDeleted]);

  const deleteUserHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(userId));
      }
    });
  };
  
  const handleAddNewUser = () => {
    swal({
      title: "Add New Order",
      text: "Do you want to add a new order?",
      icon: "info",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
        },
        confirm: {
          text: "Add New",
          value: true,
          closeModal: false,
        },
      },
    }).then((willAddNew) => {
      if (willAddNew) {
        window.location.href = "/add-user";
      }
    });
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

        <div className="table-button-group">
        </div>
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
                    <img
                      src={item.profilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item.username}</span>
                  </div>
                </td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>
                  <Button
            variant="outlined"
            color="success"
            size="small">                       <Link to={`/profile/${item._id}`}>View Profile</Link>
 </Button>
                      
                   
               
                    <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() =>deleteUserHandler(item._id) }
          >
            Delete
          </Button>
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




