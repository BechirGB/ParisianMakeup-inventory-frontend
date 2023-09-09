import { productActions } from "../slices/productSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

export function fetchProducts(pageNumber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/products?pageNumber=${pageNumber}`);
      dispatch(productActions.setproducts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Get Products Count
export function getProductCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/products/count`);
      dispatch(productActions.setproductsCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}



// Create Product

export function createProduct(newProduct) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.post("/api/products", newProduct, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(productActions.addProduct(data));
      toast.success("product created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Fetch Single Product
export function fetchSingleProduct(productId) {
  return async (dispatch) => {
    try {
      console.log(productId);
      const { data } = await request.get(`/api/products/${productId}`);
      dispatch(productActions.setproducts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}






// Update Product
export function updateProduct(newProduct,productId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.put(`/api/products/${productId}`, newProduct, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(productActions.setIsProductUpdated(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}



// Get All Products
export function getAllProducts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/products`);
      dispatch(productActions.setproducts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

}