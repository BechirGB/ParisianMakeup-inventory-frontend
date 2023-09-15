import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);
      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}


// Update Profile
export function updateProfile(userId,profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        profile,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.updateProfile(data));

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// Enable/Disable User Account
export function enableDisableUser(userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/enable-disable/${userId}`,
        null, 
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
 dispatch(profileActions.enableDisableUser(userId, data.message));

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}


// Delete Profile (Account)
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await request.delete(
        `/api/users/profile/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.setIsProfileDeleted());
      toast.success(data?.message);
      setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(profileActions.clearLoading());
    }
  };
}

// Get Users Count (for admin dashboard)
export function getUsersCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(
        `/api/users/count`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.setUserCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function addUserProfile(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register",user);
      dispatch(profileActions.registerProfile(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}
export function getAllUsersProfile() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(
        `/api/users/profile`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.setProfiles(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
