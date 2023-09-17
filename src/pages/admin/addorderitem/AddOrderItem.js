import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";
import { fetchSingleOrder, fetchOrders } from "../../../redux/apiCalls/orderApiCall";
import { AddOrderItem } from "../../../redux/apiCalls/orderitemApiCall";
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import { RotatingLines } from "react-loader-spinner";
import {
  TextField,
  Button,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const AddOrderItemPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isOrderUpdated } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);

  const [orderItems, setOrderItems] = useState([
    { product: "", price: 0, quantity: 0, discount: 0 },
  ]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!orderItems.every((item) => item.product && item.quantity !== 0))
      return toast.error("All order items must have a product and quantity");

    const orderData = {
      orderItems,
    };

    dispatch(AddOrderItem(orderData, orderId)).then(() => {
      dispatch(fetchOrders());
      navigate("/orders-table");
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

  const cancelLastOrderItem = () => {
    if (orderItems.length > 1) {
      const updatedItems = [...orderItems];
      updatedItems.pop();
      setOrderItems(updatedItems);
    }
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <Container>
        <form onSubmit={formSubmitHandler}>
          <Grid container spacing={2} style={{ maxHeight: "400px", overflowY: "auto" }}>
            {orderItems.map((item, index) => (
              <Grid item xs={8} key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Select A product</InputLabel>
                      <Select
                        value={item.product}
                        onChange={(e) => {
                          const updatedItems = [...orderItems];
                          updatedItems[index].product = e.target.value;
                          setOrderItems(updatedItems);
                        }}
                        label="Select A product"
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

                  <br></br>
                  <br></br>
                  <Grid item xs={1.5}>
                    <TextField
                      fullWidth
                      type="number"
                      label={`Quantity ${index + 1}`}
                      variant="outlined"
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
                      fullWidth
                      type="number"
                      label={`Discount ${index + 1}`}
                      variant="outlined"
                      value={item.discount}
                      onChange={(e) => {
                        const updatedItems = [...orderItems];
                        updatedItems[index].discount = e.target.value;
                        setOrderItems(updatedItems);
                      }}
                    />
                  </Grid>
                  <Grid item xs={1.5}>
                    <TextField
                      fullWidth
                      type="number"
                      label={`Price ${index + 1}`}
                      variant="outlined"
                      value={item.price}
                      onChange={(e) => {
                        const updatedItems = [...orderItems];
                        updatedItems[index].price = e.target.value;
                        setOrderItems(updatedItems);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}
            </Grid>
<br></br>
            <Grid item xs={12}>
              <div className="order-actions">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    setOrderItems([
                      ...orderItems,
                      { product: "", price: 0, quantity: 0, discount: 0 },
                    ])
                  }
                >
                  Add Order Item
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={cancelLastOrderItem}
                >
                  Cancel
                </Button>

              </div>
              <br></br>
            </Grid>
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
                  "Create New Item"
                )}
              </Button>
          </Grid>
        </form>
      </Container>
    </section>
  );
};

export default AddOrderItemPage;

