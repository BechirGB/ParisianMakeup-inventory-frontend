import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { fetchSingleProduct, updateProduct } from "../../../redux/apiCalls/productApiCall";

const UpdateProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { loading, product, error } = useSelector((state) => state.product);

  const [updatedName, setUpdatedName] = useState("");
  const [updatedBrand, setUpdatedBrand] = useState("");
  const [updatedlink, setUpdatedlink] = useState(""); 
  const [updatedsalePrice, setUpdatedsalePrice] = useState(""); 


  useEffect(() => {
    if (product) {
      setUpdatedName(product.name);
      setUpdatedBrand(product.brand);
      setUpdatedlink(product.link); 
      setUpdatedsalePrice(product.sale_Price);
    }
  }, [product]);

  const handleUpdate = () => {
    const updatedProductData = {
      productId,
      name: updatedName,
      brand: updatedBrand,
      link: updatedlink,
      sale_Price:updatedsalePrice
    };

    dispatch(updateProduct(updatedProductData, productId))
      .then(() => {
        navigate("/products-table"); 
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(productId)); 
  }, [dispatch, productId]);

  return (
    <section className="create-product">
    <h1 className="create-product-name">Update Product</h1>
    <form  className="create-product-form">
     <input
        type="text"
        placeholder="Product Name"
        className="create-product-input"

        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product Brand"
        className="create-product-input"

        value={updatedBrand}
        onChange={(e) => setUpdatedBrand(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product Selling price"
        className="create-product-input"

        value={updatedsalePrice}
        onChange={(e) => setUpdatedsalePrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product link"
        className="create-product-input"

        value={updatedlink}
        onChange={(e) => setUpdatedlink(e.target.value)}
      />
      <button  className="create-product-btn" onClick={handleUpdate}>Update</button>
      </form>
    </section>
  );
};

export default UpdateProduct;


