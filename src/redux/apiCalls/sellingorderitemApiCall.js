import { SellingOrderItemActions } from "../slices/sellingorderitemSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch All Orders
export function fetchSellingOrderitems() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/sellingorderitems");
      dispatch(SellingOrderItemActions.setsetOrderItems(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function fetchSingleSellingOrderitem(sellingorderItemid) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/sellingorderitems/${sellingorderItemid}`);
      dispatch(SellingOrderItemActions.setSellingOrderItem(data));
      console.log(data)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function AddSellingOrderItem(neworder,sellingorderId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.put(`/api/sellingorders/sellingorderitems/${sellingorderId}`,neworder, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(SellingOrderItemActions.addSellingOrderItem(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function updateSellingOrderitem(newsellingorderitem,sellingorderItemid) {
    return async (dispatch,getState) => {
      try {
        const { data } = await request.put(`/api/sellingorderitems/${sellingorderItemid}`,newsellingorderitem, {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          }
        });
        dispatch(SellingOrderItemActions.setIsSellingOrderItemUpdated(data));
        console.log(data)
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
  }
  export function deleteSellingOrderItem(sellingorderId) {
    return async (dispatch,getState) => {
      try {
        const { data } = await request.delete(`/api/sellingorderitems/${sellingorderId}`, {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          }
        });
        dispatch(SellingOrderItemActions.deleteSellingOrderItem(data.sellingorderId));
        toast.success(data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
  }