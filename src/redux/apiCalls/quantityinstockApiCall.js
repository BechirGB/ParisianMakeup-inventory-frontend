import { QuantityInStockActions } from "../slices/quantityinstockSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

export const getQuantityInStock = () => async (dispatch) => {
  try {
    const { data } = await request.get("/api/quantityinstock");
    dispatch(QuantityInStockActions.setQuantities(data.quantityInStock))
    console.log(data.quantityInStock);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};



