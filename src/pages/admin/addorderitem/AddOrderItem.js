import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";
import { fetchSingleOrder, fetchOrders } from "../../../redux/apiCalls/orderApiCall";
import { AddOrderItem } from "../../../redux/apiCalls/orderitemApiCall";
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import { RotatingLines } from "react-loader-spinner";
import Autocomplete from "@mui/material/Autocomplete"; // Import Autocomplete

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
    { product: "", price: "", quantity: "", discount: "" },
  ]);
  const handleProductSelection = (productId, index) => {
    const updatedItems = [...orderItems];
    updatedItems[index].product = productId;
    setOrderItems(updatedItems);
  };

  const handleAddOrderItem = () => {
    setOrderItems([
      ...orderItems,
      { product: "", price: "", quantity:"", discount: "" },
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



  return (
    <section className="table-container">
      <AdminSidebar />
      <Container>
        <form onSubmit={formSubmitHandler}>
        <div
            className="order-items-container"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
                          <h1> Add New Item </h1>

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

