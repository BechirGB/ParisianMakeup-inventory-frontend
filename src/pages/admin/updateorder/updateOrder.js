import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container,Grid ,Typography, TextField, Button } from "@mui/material";
import AdminSidebar from "../AdminSidebar";
import { updateOrder, fetchOrders,fetchSingleOrder } from "../../../redux/apiCalls/orderApiCall";
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import { RotatingLines } from "react-loader-spinner";

const UpdateOrderPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isOrderUpdated } = useSelector((state) => state.order);

  const [store, setStore] = useState("");
  const [dateOrdered, setDateOrdered] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (store.trim() === "") return toast.error("Order store is required");

    if (dateOrdered.trim() === "") return toast.error("Date is required");

    const orderData = {
      store,
      dateOrdered,
    };

    dispatch(updateOrder(orderData, orderId))
     .then(() => {
      dispatch(fetchOrders());
      navigate("/orders-table");
    })
    .catch((error) => {
      console.error("Error updating product:", error);
    });


  };

  useEffect(() => {
    dispatch(fetchSingleOrder(orderId));
    dispatch(fetchProducts());
  }, [dispatch, orderId]);

  useEffect(() => {
    if (isOrderUpdated) {
      navigate("/orders");
    }
  }, [isOrderUpdated, navigate]);

  return (
    <section className="table-container">
      <AdminSidebar />
    <Container maxWidth="md">
    
      <form onSubmit={formSubmitHandler}>
      <h1> -- Edit Order</h1>
      <Grid>
      
        <TextField
          fullWidth
          variant="outlined"
          label="Order store"
          value={store}
          onChange={(e) => setStore(e.target.value)}
        />
        </Grid>
        <br></br>
        <Grid>
        <TextField
          fullWidth
          type="datetime-local"
          variant="outlined"
          value={dateOrdered}
          onChange={(e) => setDateOrdered(e.target.value)}
        />
        </Grid>
        <br></br>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="update-order-btn"
          disabled={loading}
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

export default UpdateOrderPage;

