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

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (
      !sellingorderItems.every(
        (item) => item.product && item.quantity !== 0 && item.price !== 0
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
          {sellingorderItems.map((item, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={4}>
                <FormControl fullWidth variant="outlined">
                  <Select
                    value={item.product}
                    onChange={(e) => {
                      const updatedItems = [...sellingorderItems];
                      updatedItems[index].product = e.target.value;
                      setSellingorderItems(updatedItems);
                    }}
                  >
                    <MenuItem disabled value="">
                      Select A product
                    </MenuItem>
                    {products.map((product) => (
                      <MenuItem key={product._id} value={product._id}>
                        {product.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label={`Quantity ${index + 1}`}
                  variant="outlined"
                  value={item.quantity}
                  onChange={(e) => {
                    const updatedItems = [...sellingorderItems];
                    updatedItems[index].quantity = e.target.value;
                    setSellingorderItems(updatedItems);
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label={`Price ${index + 1}`}
                  variant="outlined"
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
          <Box mt={2} mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                setSellingorderItems([
                  ...sellingorderItems,
                  { product: "", quantity: 0, price: 0 },
                ])
              }
            >
              Add Selling Order Item
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                setSellingorderItems([{ product: "", quantity: 0, price: 0 }])
              }
            >
              Cancel
            </Button>
          </Box>
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

