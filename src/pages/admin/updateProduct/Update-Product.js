import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminSidebar from "../AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleProduct,getAllProducts, updateProduct } from "../../../redux/apiCalls/productApiCall";
import { TextField, Button ,Container,Paper} from "@mui/material"; // Import MUI TextField and Button

const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.product);

  const [updatedName, setUpdatedName] = useState("");
  const [updatedBrand, setUpdatedBrand] = useState("");
  const [updatedlink, setUpdatedlink] = useState("");
  const [updatedsalePrice, setUpdatedsalePrice] = useState("");

  useEffect(() => {
    if (products) {
      setUpdatedName(products.name);
      setUpdatedBrand(products.brand);
      setUpdatedlink(products.link);
      setUpdatedsalePrice(products.sale_Price);
    }
  }, [products]);

  const handleUpdate = () => {
    const updatedProductData = {
      productId,
      name: updatedName,
      brand: updatedBrand,
      link: updatedlink,
      sale_Price: updatedsalePrice,
    };
  
    dispatch(updateProduct(updatedProductData, productId))
      .then(() => {
        dispatch(getAllProducts());
        navigate("/products-table");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };
  

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  return (
    <section className="table-container">
      <AdminSidebar />
      <Container maxWidth="lg">
        <Paper elevation={1} style={{ padding: "20px" }}>
      <form className="create-product-form">
        <TextField
          label="Product Name"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          sx={{ marginBottom: 5 }} 
        />
        <TextField
          label="Product Brand"
          value={updatedBrand}
          onChange={(e) => setUpdatedBrand(e.target.value)}
          sx={{ marginBottom: 5 }} 
          />
                  <TextField

          label="Product Selling Price"
          value={updatedsalePrice}
          onChange={(e) => setUpdatedsalePrice(e.target.value)}
          sx={{ marginBottom: 5 }} 
        />
        <TextField
          label="Product Link"
          value={updatedlink}
          onChange={(e) => setUpdatedlink(e.target.value)}
          sx={{ marginBottom: 5 }} 
        />
        <Button
          variant="contained"
          color="primary"
          className="create-order-btn"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </form>
      </Paper>
</Container>
    </section>
  );
};

export default EditProduct;





