import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { updateSellingOrder, fetchSellingorders, fetchSingleSellingorder } from "../../../redux/apiCalls/sellingorderApiCall";
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import { RotatingLines } from "react-loader-spinner";
import AdminSidebar from "../AdminSidebar";

const UpdateSellingOrderPage = () => {
  const { sellingorderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isSellingOrderUpdated, sellingorders } = useSelector((state) => state.sellingorder);

  const [deliveryId, setDeliveryId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (sellingorders) {
      setDeliveryId(sellingorders.deliveryId);
      setDate(sellingorders.date);
    }
  }, [sellingorders]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (deliveryId.trim() === "") return toast.error("Order deliveryId is required");

    const sellingorderData = {
      deliveryId,
      date,
    };

    dispatch(updateSellingOrder(sellingorderData, sellingorderId))
      .then(() => {
        navigate("/sellings-table");
      })
   
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
      <Container maxWidth="md">
        <form onSubmit={formSubmitHandler}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Order deliveryId"
                value={deliveryId}
                onChange={(e) => setDeliveryId(e.target.value)}
              />
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
                fullWidth
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
                  "Update"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </section>
  );
};

export default UpdateSellingOrderPage;



