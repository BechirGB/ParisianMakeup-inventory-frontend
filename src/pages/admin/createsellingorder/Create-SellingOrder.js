import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";

import { createSellingorder, fetchSellingorders } from "../../../redux/apiCalls/sellingorderApiCall";
import { RotatingLines } from "react-loader-spinner";
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import {
  TextField,
  Button,
  Container,
  Grid,
  FormControl,
 
  Typography,
  Paper,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete"; 

const CreateSelling = () => {
  const dispatch = useDispatch();
  const { loading, issellingorderCreated } = useSelector((state) => state.sellingorder);
  const { products } = useSelector((state) => state.product);

  const [deliveryId, setDeliveryId] = useState("");
  const [sellingorderItems, setOrderItems] = useState([
    { product: "", quantity: "", price: "" },
  ]);
  const [date, setDate] = useState("");
  
  const handleProductSelection = (productId, index) => {
    const updatedItems = [...sellingorderItems];
    updatedItems[index].product = productId;
    setOrderItems(updatedItems);
  };

  const handleAddOrderItem = () => {
    setOrderItems([
      ...sellingorderItems,
      { product: "", price: "", quantity: "" },
    ]);
  };

  const handleCancelOrderItem = () => {
    if (sellingorderItems.length > 1) {
      const updatedItems = [...sellingorderItems];
      updatedItems.pop();
      setOrderItems(updatedItems);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (deliveryId.trim() === "") return toast.error("Order deliveryId is required");
    if (!sellingorderItems.every((item) => item.product && item.quantity !== ""))
      return toast.error("All order items must have product and quantity");
    if (date.trim() === "") return toast.error("Date is required");

    const sellingorderData = {
      deliveryId,
      sellingorderItems,
      date,
    };

    dispatch(createSellingorder(sellingorderData)).then(() => {
      if (issellingorderCreated) {
      
    setDeliveryId("");
    setOrderItems([{ product: "", quantity: "", price: "" }]);
    setDate("");
      navigate("/sellings-table");
      }
    });
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const navigate = useNavigate();
  useEffect(() => {
   
    
  }, [issellingorderCreated, navigate]);

  const cancelLastOrderItem = () => {
    if (sellingorderItems.length > 1) {
      const updatedItems = [...sellingorderItems];
      updatedItems.pop();
      setOrderItems(updatedItems);
    }
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <Container maxWidth="lg">
        <Paper elevation={3} style={{ padding: "20px" }}>
          <form onSubmit={formSubmitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                type="string"
                  fullWidth
                  variant="outlined"
                  label="Order deliveryId"
                  value={deliveryId}
                  onChange={(e) => setDeliveryId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              <div
            className="order-items-container"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {sellingorderItems.map((item, index) => (
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
                      const updatedItems = [...sellingorderItems];
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
                      const updatedItems = [...sellingorderItems];
                      updatedItems[index].price = e.target.value;
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  variant="outlined"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
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
                    "Create"
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </section>
  );
};

export default CreateSelling;


