import React, { useState, useEffect } from "react";
import "./create-order.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../redux/apiCalls/orderApiCall";
import { RotatingLines } from "react-loader-spinner";
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import { TextField, Button, Select, MenuItem, Grid, InputLabel } from "@mui/material";

const CreateOrder = () => {
  const dispatch = useDispatch();
  const { loading, isOrderCreated } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);

  const [store, setStore] = useState("");
  const[order_Id,setOrderId]=useState("");
  const [orderItems, setOrderItems] = useState([
    { product: "",price:0, quantity: 0, discount: 0 },
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
      { product: "",price:0, quantity: 0, discount: 0 },
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
    if (!orderItems.every((item) => item.product && item.quantity !== 0))
      return toast.error("All order items must have a product and quantity");
    if (dateOrdered.trim() === "") return toast.error("Date is required");

    const orderData = {
      order_Id,
      store,
      orderItems,
      dateOrdered,
    };

    dispatch(createOrder(orderData));
    setOrderId("");
    setStore("");
    setOrderItems([{ product: "", price :0 ,quantity: 0, discount: 0 }]);
    setDateOrdered("");
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
      <form onSubmit={formSubmitHandler} className="create-order-form">
      <TextField
          label="Order Id"
          className="create-order-input"
          value={order_Id}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <TextField
          label="Order Store"
          className="create-order-input"
          value={store}
          onChange={(e) => setStore(e.target.value)}
        />

        {orderItems.map((item, index) => (
          <Grid container spacing={4} key={index}>
            <Grid item xs={8}>
              <InputLabel>Product</InputLabel>
              <Select
                value={item.product}
                onChange={(e) => handleProductSelection(e.target.value, index)}
                className="create-order-input"
              >
                <MenuItem value="">
                  <em>Select A product</em>
                </MenuItem>
                {products.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.name},   {product.brand}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <br></br>
            <Grid item xs={2}>
              <TextField
                type="number"
                label={`Quantity ${index + 1}`}
                className="create-order-input"
                value={item.quantity}
                onChange={(e) => {
                  const updatedItems = [...orderItems];
                  updatedItems[index].quantity = e.target.value;
                  setOrderItems(updatedItems);
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                type="decimal"
                label={`Price ${index + 1}`}
                defaultValue={0}
                className="create-order-input"
                value={item.price}
                onChange={(e) => {
                  const updatedItems = [...orderItems];
                  updatedItems[index].price = e.target.value;
                  setOrderItems(updatedItems);
                }}
              />
          </Grid>
            <Grid item xs={4}>
              <TextField
                type="number"
                label={`Discount ${index + 1}`}
                defaultValue={0}
                className="create-order-input"
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

        <div className="order-actions">
          <Button
            type="button"
            className="create-order-btn"
            onClick={handleAddOrderItem}
          >
            Add Order Item
          </Button>
          <Button
            type="button"
            className="create-order-btn"
            onClick={handleCancelOrderItem}
          >
            Cancel Last Item
          </Button>
        </div>

        <TextField
          type="datetime-local"
          className="create-order-input"
          value={dateOrdered}
          onChange={(e) => setDateOrdered(e.target.value)}
        />

        <Button
          type="submit"
          className="create-order-btn"
          variant="contained"
          color="primary"
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
      </form>
    </section>
  );
};

export default CreateOrder;


