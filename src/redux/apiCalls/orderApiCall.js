import { OrderActions } from "../slices/orderSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch All Orders
export function fetchOrders() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/orders");
      dispatch(OrderActions.setOrders(data.orders));
      dispatch(OrderActions.setTotalPurchase(data.totalPurchase));

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function fetchSingleOrder(OrderId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/orders/${OrderId}`);
      dispatch(OrderActions.setOrder(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Create Order
export function createOrder(newOrder) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.post("/api/orders", newOrder, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(OrderActions.addOrder(data));
      dispatch(OrderActions.setIsOrderCreated(true));
      toast.success("order created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function getOrderCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/orders/count`);
      dispatch(OrderActions.setOrdersCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update order
export function updateOrder(neworder,orderId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.put(`/api/orders/${orderId}`,neworder, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(OrderActions.updateOrder(data));
      dispatch(OrderActions.setIsOrderUpdated(true));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete Order
export function deleteOrder(OrderId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.delete(`/api/orders/${OrderId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(OrderActions.deleteOrder(data.OrderId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function fetchOrdersBetweenDates(startDate, endDate) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/orders/total?startDate=${startDate}&endDate=${endDate}`);
      dispatch(OrderActions.setOrders(data.orders));
      dispatch(OrderActions.setTotalPurchase(data.totalPurchase));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}