import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DisableIcon from "@mui/icons-material/Cancel";
import EnableIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import DataTable from "react-data-table-component";

import { useDispatch, useSelector } from "react-redux";
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
    const actionMessage = isEnabled ? "enable" : "disable";

    swal({
      title: `Are you sure you want to ${actionMessage} this user's account?`,
      icon: "warning",
      buttons: ["Cancel", "Confirm"],
      dangerMode: true,
    }).then((willConfirm) => {
      if (willConfirm) {
        dispatch(enableDisableUser(userId));
        swal(`User's account has been ${actionMessage}d.`, {
          icon: "success",
        });
      }
    });
  };

  const columns = [
    {
      name: "Count",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "User",
      selector:  (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector:  (row) => row.email,
      sortable: true,
    },
    {
      name: "Password",
      selector:  (row) => row.password,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <IconButton
            color="success"
            size="small"
            component={Link}
            to={`update-user/${row._id}`}
          >
            <EditIcon />
          </IconButton>
          {row.isEnabled ? (
            <IconButton
              color="warning"
              size="small"
              onClick={() => enableDisableUserHandler(row._id, false)}
            >
              <DisableIcon />
            </IconButton>
          ) : (
            <IconButton
              color="info"
              size="small"
              onClick={() => enableDisableUserHandler(row._id, true)}
            >
              <EnableIcon />
            </IconButton>
          )}
        </div>
      ),
    },
  ];

  const handleAddNewUser = () => {
    navigate("add-user");
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
       

        <DataTable
          title="Liste Des Utilisateurs"
          columns={columns}
          data={profiles}
          pagination
          paginationPerPage={10} 
          subHeader
          subHeaderComponent= {
           <Button
          color="error"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddNewUser}
        >
          Add New User
        </Button>
        }
        />
      </div>
    </section>
  );
};

export default UsersTable;






