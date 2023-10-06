import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import jwtDecode from 'jwt-decode';

import { toast } from "react-toastify";

// Define your token duration or import it from a shared config file
const tokenDuration = 7200;


export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post('/api/auth/login', user);
      const token = data.token;

      const decodedToken = jwtDecode(token);
      const tokenExpirationTimestamp = decodedToken.exp * 1000; // Convert to milliseconds

      dispatch(authActions.login(data));
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('tokenExpiration', tokenExpirationTimestamp);

      const timeUntilExpiration = tokenExpirationTimestamp - Date.now();

      setTimeout(() => {
        dispatch(authActions.logout());
        localStorage.removeItem('userInfo');
        localStorage.removeItem('tokenExpiration');
      }, timeUntilExpiration);

      console.log(`Token expires at: ${new Date(tokenExpirationTimestamp).toLocaleString()}`);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
  }
}




