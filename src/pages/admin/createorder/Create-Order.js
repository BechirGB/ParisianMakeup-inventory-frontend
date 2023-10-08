import React, { useState, useEffect } from "react";
import "./create-order.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder, fetchOrders } from "../../../redux/apiCalls/orderApiCall";
import { RotatingLines } from "react-loader-spinner";
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import {
  TextField,
  Button,
  Container,
  Paper,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  FormControl,
} from "@mui/material";
import Navbar from "../../../components/header/Navbar";
import Autocomplete from "@mui/material/Autocomplete"; // Import Autocomplete

const CreateOrder = () => {
  const dispatch = useDispatch();
  const { loading, isOrderCreated } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);

  const [store, setStore] = useState("");
  const [order_Id, setOrderId] = useState("");
  const [orderItems, setOrderItems] = useState([
    { product: "", price: "", quantity: "", discount: "" },
  ]);
  const [dateOrdered, setDateOrdered] = useState("");
  const navigate = useNavigate();

  const handleProductSelection = (productId, index) => {
    const updatedItems = [...orderItems];
    updatedItems[index].product = productId;
    setOrderItems(updatedItems);
  };

  const handleAddOrderItem = () => {
    setOrderItems([
      ...orderItems,
      { product: "", price: "", quantity: "", discount: "" },
    ]);
  };

  const handleCancelOrderItem = () => {
    if (orderItems.length > 1) {
      const updatedItems = [...orderItems];
      updatedItems.pop();
      setOrderItems(updatedItems);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (order_Id.trim() === "") return toast.error("order_id is required");
    if (store.trim() === "") return toast.error("Order store is required");
    if (!orderItems.every((item) => item.product !=="" && item.price !== "" && item.quantity!==""))
      return toast.error(
        "All order items must have a product , quantity and price"
      );
    if (dateOrdered.trim() === "") return toast.error("Date is required");

    const orderData = {
      order_Id,
      store,
      orderItems,
      dateOrdered,
    };

    setOrderId("");
    setStore("");
    setOrderItems([{ product: "", price: "", quantity: "", discount: "" }]);
    setDateOrdered("");
    dispatch(createOrder(orderData)).then(() => {
      if (isOrderCreated) {
     
      dispatch(fetchOrders());
      navigate("/orders-table");}
    });
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isOrderCreated) {
      navigate("/orders-table");
    }
  }, [isOrderCreated, navigate]);

  return (
    <section className="table-container">
      <AdminSidebar />
      <Container>
      <Paper elevation={3} style={{ padding: "20px" }}>

        <form onSubmit={formSubmitHandler}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Order Id"
              value={order_Id}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </Grid>
          <br></br>
          <Grid>
            <TextField
              fullWidth
              variant="outlined"
              label="Order Store"
              value={store}
              onChange={(e) => setStore(e.target.value)}
            />
          </Grid>
          <br></br>
          <div
            className="order-items-container"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {orderItems.map((item, index) => (
              <Grid container spacing={4} key={index}>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined"
                  >
                  
                    <Autocomplete
                      options={products}
                      getOptionLabel={(product) =>
                        `${product.name}, ${product.brand}`
                      }
                      value={
                        products.find((p) => p._id === item.product) || null
                      }
                      onChange={(e, newValue) =>
                        handleProductSelection(
                          newValue ? newValue._id : "",
                          index
                        )
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </FormControl>
                </Grid>
                <br></br>
                <Grid item xs={1.5}>
                  <TextField
                    label={`Quantity ${index + 1}`}
                    value={item.quantity}
                    onChange={(e) => {
                      const updatedItems = [...orderItems];
                      updatedItems[index].quantity = e.target.value;
                      setOrderItems(updatedItems);
                    }}
                  />
                </Grid>
                <Grid item xs={1.5}>
                  <TextField
                    label={`Price ${index + 1}`}
                    value={item.price}
                    onChange={(e) => {
                      const updatedItems = [...orderItems];
                      updatedItems[index].price = e.target.value;
                      setOrderItems(updatedItems);
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label={`Discount ${index + 1}`}
                    value={item.discount}
                    onChange={(e) => {
                      const updatedItems = [...orderItems];
                      updatedItems[index].discount = e.target.value;
                      setOrderItems(updatedItems);
                    }}
                  />
                </Grid>
              </Grid>
            ))}
            <br></br>
          </div>
          <div className="order-actions">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddOrderItem}
            >
              Add Order Item
            </Button>
            <br></br>
            <br></br>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancelOrderItem}
            >
              Cancel Last Item
            </Button>
          </div>
          <br></br>
          <Grid>
            <TextField
              type="date"
              value={dateOrdered}
              onChange={(e) => setDateOrdered(e.target.value)}
            />
          </Grid>
          <br></br>
          <Grid item xs={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
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
                "Create"
              )}
            </Button>
          </Grid>
        </form>
        </Paper>

      </Container>
    </section>
  );
};

export default CreateOrder;



