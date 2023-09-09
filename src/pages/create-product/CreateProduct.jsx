import React, { useState, useEffect } from "react";
import "./create-product.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/apiCalls/productApiCall";
import { RotatingLines } from "react-loader-spinner";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { loading, isProductCreated, error } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [barcode, setBarcode] = useState("");
  const [barcodeError, setBarcodeError] = useState("");
  const [nameError, setNameError] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    // Basic input validation
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

    if (!barcode.trim()) {
      setBarcodeError("Product Barcode is required");
      return;
    } else {
      setBarcodeError("");
    }

    const productData = {
      barcode,
      name,
      brand

    }

    dispatch(createProduct(productData));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isProductCreated) {
      navigate("/products-table");
    }
    if (error) {
      toast.error("Product creation failed");
    }
  }, [isProductCreated, navigate, error]);

  return (
    <section className="create-product">
      <h1 className="create-product-name">Create New Product</h1>
      <form onSubmit={formSubmitHandler} className="create-product-form">
        <input
          type="text"
          placeholder="Product Barcode"
          className="create-product-input"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        />
        {barcodeError && <p className="error-message">{barcodeError}</p>}
        <input
          type="text"
          placeholder="Product Name"
          className="create-product-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <p className="error-message">{nameError}</p>}
        <input
          type="text"
          placeholder="Product Brand"
          className="create-product-input"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
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



