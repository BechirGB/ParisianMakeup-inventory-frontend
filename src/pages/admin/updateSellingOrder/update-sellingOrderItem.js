import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import{fetchSellingorders} from "../../../redux/apiCalls/sellingorderApiCall"
import { updateSellingOrderitem, fetchSingleSellingOrderitem } from "../../../redux/apiCalls/sellingorderitemApiCall";
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { RotatingLines } from "react-loader-spinner";
import AdminSidebar from "../AdminSidebar";


const UpdateSellingOrderItemPage = () => {
  const { sellingorderItemid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isOrderItemUpdated } = useSelector((state) => state.orderitem);
  const { products } = useSelector((state) => state.product);

const UpdateSellingOrderItemPage = () => {
  const { sellingorderItemid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isOrderItemUpdated } = useSelector((state) => state.orderitem);
  const { products } = useSelector((state) => state.product);

  const [quantity, setQuantity] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [price, setPrice] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (quantity.trim() === "") return toast.error("Order quantity is required");
    if (price.trim() === "") return toast.error("Price is required");

    const orderData = {
      quantity,
      price,
      product: selectedProduct,
    };

    dispatch(updateSellingOrderitem(orderData, sellingorderItemid)).then(() => {
      dispatch(fetchSellingorders());
      navigate("/sellings-table");
    });
  };

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchSingleSellingOrderitem(sellingorderItemid));
  }, [dispatch, sellingorderItemid]);

  useEffect(() => {
    if (isOrderItemUpdated) {
      navigate("/sellingorders");
    }
  }, [isOrderItemUpdated, navigate]);

  return (
    <section className="update-order">
      <AdminSidebar />
      <Container maxWidth="md">
        <Typography variant="h4" className="update-order-quantity">
          Update Order
        </Typography>
        <form onSubmit={formSubmitHandler} className="update-order-form">
          <Typography variant="h6">New Order Item</Typography>
          <TextField
            type="number"
            label="Order quantity"
            variant="outlined"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <FormControl fullWidth variant="outlined" style={{ marginTop: "16px" }}>
            <InputLabel>Select A product</InputLabel>
            <Select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              label="Select A product"
            >
              <MenuItem value="" disabled>
                Select A product
              </MenuItem>
              {products.map((product) => (
                <MenuItem key={product._id} value={product._id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            type="number"
            label="Price"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ marginTop: "16px" }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            style={{ marginTop: "16px" }}
            startIcon={
              loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : null
            }
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </form>
      </Container>
    </section>
  );
};}

export default UpdateSellingOrderItemPage;
