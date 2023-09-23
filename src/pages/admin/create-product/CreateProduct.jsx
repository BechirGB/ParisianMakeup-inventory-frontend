import React, { useState, useEffect } from "react";
import "./create-product.css";
import AdminSidebar from "../AdminSidebar";

import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../redux/apiCalls/productApiCall";
import { RotatingLines } from "react-loader-spinner";
import { TextField, Button, Container,
   Grid,Paper  } from "@mui/material";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isProductCreated, error } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [sale_Price, setsale_Price] = useState("");
  const [link, setLink] = useState("");



  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Product Name is required");

      return;
    
    }
    if (!brand.trim()) {
      toast.error("Product Brand is required");
      return;
    }

    if (!sale_Price.trim()) {
      toast.error("sale Price is required");

      return;
   
    }
    if (isNaN(parseFloat(sale_Price))) {
      toast.error("Sale Price must be a number");
      return;
    }

    const productData = {
      name,
      brand,
      link,
      sale_Price,
    };

    dispatch(createProduct(productData));
    navigate("/products-table")
  };

  useEffect(() => {
    if (isProductCreated) {
      navigate("/products-table");
    }
    if (error) {
      toast.error("Product creation failed");
    }
  }, [isProductCreated, navigate, error]);

  return (
    <section className="product-container">
          <AdminSidebar />
          <Container maxWidth="lg">
        <Paper elevation={1} style={{ padding: "20px" }}>
      <form onSubmit={formSubmitHandler} className="create-product-form">
        
        <h1> Add Product</h1>

        <TextField
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <TextField
          label="Product Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
                <br></br>

        <TextField
          label="Product sale_Price"
          value={sale_Price}
          onChange={(e) => setsale_Price(e.target.value)}
        />

                <br></br>

        <TextField
          label="Product link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        /> 
                <br></br>

                <Grid item xs={2}>
        <Button
          type="submit"
          variant="contained"
          className="update-order-btn"

          color="primary">
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

export default CreateProduct;



