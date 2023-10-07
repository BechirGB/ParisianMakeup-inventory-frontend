import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid, Typography,Paper,
   TextField, Button } from "@mui/material";
import AdminSidebar from "../AdminSidebar";
import { updateOrder, fetchOrders, fetchSingleOrder } from "../../../redux/apiCalls/orderApiCall";
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import { RotatingLines } from "react-loader-spinner";

const UpdateOrderPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading , isOrderUpdated, orders } = useSelector((state) => state.order);

  const [store, setStore] = useState("");
  const [dateOrdered, setDateOrdered] = useState("");

  useEffect(() => {
    if (orders) {
      setStore(orders.store);
      setDateOrdered(orders.dateOrdered);
    }
  }, [orders]);

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
      navigate("/orders-table");
    }
  }, [isOrderUpdated, navigate]);

  return (
    <section className="table-container">
      <AdminSidebar />
      <Container maxWidth="lg">
      <Paper elevation={2} style={{ padding: "20px" }}>

        <form onSubmit={formSubmitHandler}>
          <h1>Edit Order</h1>
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
              type="date"
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
        </Paper>
      </Container>
    </section>
  );
};

export default UpdateOrderPage;


