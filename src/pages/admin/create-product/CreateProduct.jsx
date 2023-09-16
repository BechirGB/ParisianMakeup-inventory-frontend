import React, { useState, useEffect } from "react";
import "./create-product.css";
import AdminSidebar from "../AdminSidebar";

import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../redux/apiCalls/productApiCall";
import { RotatingLines } from "react-loader-spinner";
import TextField from "@mui/material/TextField"; // Import MUI TextField
import Autocomplete from "@mui/material/Autocomplete"; // Import MUI Autocomplete

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isProductCreated, error } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [sale_Price, setsale_Price] = useState("");
  const [link, setLink] = useState("");

  const [sale_PriceError, setsale_PriceError] = useState("");
  const [nameError, setNameError] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setNameError("Product Name is required");
      return;
    } else {
      setNameError("");
    }
    if (!brand.trim()) {
      toast.error("Product Brand is required");
      return;
    }

    if (!sale_Price.trim()) {
      toast.error("sale Price is required");

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
      <form onSubmit={formSubmitHandler} className="create-product-form">
        
        <h1> Add Product</h1>

        <TextField
          label="Product Name"
          className="create-product-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <TextField
          label="Product Brand"
          className="create-product-input"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
                <br></br>

        <TextField
          label="Product sale_Price"
          type="number"
          className="create-product-input"
          value={sale_Price}
          onChange={(e) => setsale_Price(e.target.value)}
        />
                {sale_PriceError && <p className="error-message">{sale_PriceError}</p>}

                <br></br>

        <TextField
          label="Product link"
          className="create-product-input"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        /> 
                <br></br>


        <button type="submit" className="create-product-btn">
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
        </button>
      </form>
    </section>
  );
};

export default CreateProduct;



