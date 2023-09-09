import { SellingorderActions } from "../slices/sellingorderSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";


// Fetch All Sellingorders
export function fetchSellingorders() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/sellingorders");
      dispatch(SellingorderActions.setSellingorders(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function fetchSingleSellingorder(sellingorderId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/sellingorders/${sellingorderId}`);
      dispatch(SellingorderActions.setSellingorder(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Create Sellingorder
export function createSellingorder(newSellingorder) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.post("/api/sellingorders", newSellingorder, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(SellingorderActions.addSellingorder(data));
      toast.success("Sellingorder created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function getSellingorderCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/sellingorders/count`);
      dispatch(SellingorderActions.setSellingordersCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function getSellingorderTotalPurchases() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/sellingorders/totalpurchases`);
      dispatch(SellingorderActions.setSellingordersTotalPurchases(data));
      console.log(data)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete Sellingorder
export function deleteSellingorder(SellingorderId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.delete(`/api/sellingorders/${SellingorderId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(SellingorderActions.deleteSellingorder(data.SellingorderId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function updateSellingOrder(newsellingorder,sellingorderId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.put(`/api/sellingorders/${sellingorderId}`,newsellingorder, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(SellingorderActions.setIsSellingorderUpdated(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

