import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../forms/form.css";
import AdminSidebar from "../AdminSidebar";
import { TextField,Grid, Button ,Container,Paper} from "@mui/material"; // Import MUI TextField and Button




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
    isAdmin: false, 
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
    <Container maxWidth="lg">
<Paper elevation={1} style={{ padding: "20px" }}>
      <form onSubmit={handleSubmit}>
     <Grid>
          <TextField
          fullWidth
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
          />
        </Grid>
        <br></br>
        <Grid>

          <TextField
          fullWidth
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
                  </Grid>
<br></br>
      <Grid>
          <TextField
          fullWidth
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          </Grid>
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
      </Paper>
      </Container>
    </section>
  );
};

export default AddUserPage;
