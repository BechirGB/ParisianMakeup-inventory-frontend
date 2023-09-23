import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AdminSidebar from "../admin/AdminSidebar";

import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { getUserProfile, updateProfile } from '../../redux/apiCalls/profileApiCall';

const UpdateProfileModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminn, setisAdminn] = useState(false);
  const [isUser, setIsUser] = useState(false); 

  const formSubmitHandler = (e) => {
    e.preventDefault();

    let isAdmin = '';

    if (isAdminn) {
       isAdmin= true;
    } else if (isUser) {
      isAdmin = false;
    }

    const updatedUser = { email, username, password, isAdmin };

    dispatch(updateProfile(userId, updatedUser));
    navigate('/users-table');
  };

  return (
    <section className="table-container">
    <AdminSidebar />
    <Container>
    <Paper elevation={1} style={{ padding: "20px" }}>

    <br></br>
      <h1 >
        Update  User
      </h1>
      <form onSubmit={formSubmitHandler}>
      <Grid>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="form-label"
        />
        </Grid>
<br></br>
<Grid>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="form-label"
        />
                </Grid>

<br></br>
<Grid>

        <TextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="update-profile-input"
        />
                </Grid>

        <FormControlLabel
          control={
            <Checkbox
              checked={isAdminn}
              onChange={(e) => setisAdminn(e.target.checked)}
              name="isAdminn"
              color="primary"
            />
          }
          label="Admin"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={isUser}
              onChange={(e) => setIsUser(e.target.checked)}
              name="isUser"
              color="primary"
            />
          }
          label="User"
        />
<br></br>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="update-profile-btn"
        >
          Update Profile
        </Button>
      </form>
      </Paper>

    </Container>
    </section>

  );
};

export default UpdateProfileModal;




