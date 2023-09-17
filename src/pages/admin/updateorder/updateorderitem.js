import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateOrderItem,
  fetchSingleOrderItem,
} from "../../../redux/apiCalls/orderitemApiCall";
import { fetchOrders } from "../../../redux/apiCalls/orderApiCall";

import AdminSidebar from "../AdminSidebar";

import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import { RotatingLines } from "react-loader-spinner";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";

const UpdateOrderItemPage = () => {
  const { orderItemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isOrderUpdated,OrderItems } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);

  const [orderItem, setOrderItem] = useState({
    product: "",
    quantity: 0,
    price: 0,
    discount: 0,
    quantity_in_tunisia: 0,
  });

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!orderItem.product || orderItem.quantity === 0) {
      return toast.error("Product and quantity are required");
    }

    dispatch(updateOrderItem(orderItem, orderItemId)).then(()=>{
      dispatch(fetchOrders());
    navigate("/orders-table");
  });
}
  useEffect(() => {
    if (OrderItems) {
      orderItem.quantity= OrderItems.quantity;
      
    }
  }, []);

  useEffect(() => {
    dispatch(fetchSingleOrderItem(orderItemId));
    dispatch(fetchProducts());
  }, [dispatch, orderItemId]);

  useEffect(() => {
    if (isOrderUpdated) {
      navigate("/orders-table");
    }
  }, [isOrderUpdated, navigate]);

  return (
    <section className="table-container">
      <AdminSidebar />
    <Container>
      
      <form onSubmit={formSubmitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Select a product</InputLabel>
              <Select
                value={orderItem.product}
                onChange={(e) =>
                  setOrderItem({ ...orderItem, product: e.target.value })
                }
                label="Select a product"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {products.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              label="Quantity"
              variant="outlined"
              fullWidth
              value={orderItem.quantity}
              onChange={(e) =>
                setOrderItem({ ...orderItem, quantity: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="decimal"
              label="Price"
              variant="outlined"
              fullWidth
              value={orderItem.price}
              onChange={(e) =>
                setOrderItem({ ...orderItem, price: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="decimal"
              label="Discount"
              variant="outlined"
              fullWidth
              value={orderItem.discount}
              onChange={(e) =>
                setOrderItem({ ...orderItem, discount: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              label="Quantity in Tunisia"
              variant="outlined"
              fullWidth
              value={orderItem.quantity_in_tunisia}
              onChange={(e) =>
                setOrderItem({
                  ...orderItem,
                  quantity_in_tunisia: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
<br></br>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="update-order-btn"
        >
          {loading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth={5}
              animationDuration={0.75}
              width={40}
              visible
            />
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </Container>
    </section>

  );
};

export default UpdateOrderItemPage;











  