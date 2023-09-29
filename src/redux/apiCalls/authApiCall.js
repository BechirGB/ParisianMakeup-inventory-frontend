import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Login User

export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post('/api/auth/login', user);
      const tokenExpiration = 6300000;; 
      const tokenExpirationTimestamp = Date.now() + tokenExpiration ; // Calculate the token expiration timestamp

      dispatch(authActions.login(data));
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('tokenExpiration', tokenExpirationTimestamp);

      const timeUntilExpiration = tokenExpiration ; 
      setTimeout(() => {
        dispatch(authActions.logout());
        localStorage.removeItem('userInfo');
        localStorage.removeItem('tokenExpiration');
      }, timeUntilExpiration);

      console.log(tokenExpiration);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}


// Logout User
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
  }
}

// Register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register",user);
      dispatch(authActions.register(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}


// Verify Email
