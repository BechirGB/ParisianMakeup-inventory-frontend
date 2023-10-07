import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchSingleSellingorder,
  fetchSellingorders,
} from "../../../redux/apiCalls/sellingorderApiCall";
import { AddSellingOrderItem } from "../../../redux/apiCalls/sellingorderitemApiCall";
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import { RotatingLines } from "react-loader-spinner";
import Autocomplete from "@mui/material/Autocomplete"; 

import AdminSidebar from "../AdminSidebar";

import {
  Container,
  Typography,
  Button,
  TextField,
  Select,
  FormControl,
  MenuItem,
  Grid,
  Box,
  Paper,
} from "@mui/material";

const AddSellingOrderItemPage = () => {
  const { sellingorderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isSellingOrderUpdated } = useSelector(
    (state) => state.sellingorder
  );
  const { products } = useSelector((state) => state.product);

  const [sellingorderItems, setSellingorderItems] = useState([]);
  const handleProductSelection = (productId, index) => {
    const updatedItems = [...sellingorderItems];
    updatedItems[index].product = productId;
    setSellingorderItems(updatedItems);
  };

  const handleAddOrderItem = () => {
    setSellingorderItems([
      ...sellingorderItems,
      { product: "", price: "", quantity: "" },
    ]);
  };

  const handleCancelOrderItem = () => {
    if (sellingorderItems.length > 1) {
      const updatedItems = [...sellingorderItems];
      updatedItems.pop();
      setSellingorderItems(updatedItems);
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (
      !sellingorderItems.every(
        (item) => item.product && item.quantity !== "" && item.price !== ""
      )
    )
      return toast.error(
        "All order items must have product, quantity, and price"
      );

    const sellingorderData = {
      sellingorderItems,
    };

    dispatch(AddSellingOrderItem(sellingorderData, sellingorderId)).then(
      () => {
        dispatch(fetchSellingorders());
        navigate("/sellings-table");
      }
    );
  };

  useEffect(() => {
    dispatch(fetchSingleSellingorder(sellingorderId));
    dispatch(fetchProducts());
  }, [dispatch, sellingorderId]);

  useEffect(() => {
    if (isSellingOrderUpdated) {
      navigate("/selling-orders");
    }
  }, [isSellingOrderUpdated, navigate]);

  return (
    <section className="table-container">
    <AdminSidebar />
    <Container maxWidth="lg">
     
      <Paper elevation={3}>
        <form onSubmit={formSubmitHandler} style={{ padding: "20px" }}>
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
                      setSellingorderItems(updatedItems);
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
                      setSellingorderItems(updatedItems);
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
              Add Selling Order Item
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
        
          <Button type="submit" variant="contained" color="primary">
            {loading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth={5}
                animationDuration={0.75}
                width={40}
                visible
              />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Paper>
    </Container>
    </section>
  );
};

export default AddSellingOrderItemPage;

