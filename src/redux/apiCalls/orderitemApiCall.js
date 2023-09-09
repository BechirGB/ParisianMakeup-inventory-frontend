import { OrderItemActions } from "../slices/orderitemSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

export function fetchOrderitems() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/orderitems");
      dispatch(OrderItemActions.setsetOrderItems(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function fetchSingleOrderitem(orderItemid) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/orderitems/${orderItemid}`);
      dispatch(OrderItemActions.setOrderItem(data));
      console.log(data)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}



export function updateOrderitem(neworderitem,orderItemid) {
    return async (dispatch,getState) => {
      try {
        const { data } = await request.put(`/api/orderitems/${orderItemid}`,neworderitem, {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          }
        });
        dispatch(OrderItemActions.setIsOrderItemUpdated(data));
        console.log(data)
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
  }
  export function AddOrderItem(neworder,orderId) {
    return async (dispatch,getState) => {
      try {
        const { data } = await request.put(`/api/orders/orderitems/${orderId}`,neworder, {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          }
        });
        dispatch(OrderItemActions.addOrderItem(data));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
  }
  // Delete Order Item
export function deleteOrderItem(OrderItemId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.delete(`/api/orderitems/${OrderItemId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(OrderItemActions.deleteOrderItem(data.OrderItemId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

  