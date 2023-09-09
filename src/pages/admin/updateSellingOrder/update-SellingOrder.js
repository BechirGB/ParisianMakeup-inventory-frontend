import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateSellingOrder, fetchSingleSellingorder } from "../../../redux/apiCalls/sellingorderApiCall";
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import { RotatingLines } from "react-loader-spinner";
import "./update-Sellingorder.css";


const UpdateSellingOrderPage = () => {
  const { sellingorderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isSellingOrderUpdated } = useSelector((state) => state.sellingorder);

  const [deliveryId, setDeliveryId] = useState("");
  const [date, setDate] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (deliveryId.trim() === "") return toast.error("Order deliveryId is required");
   

    const sellingorderData = {
      deliveryId,
  date,
    };

    dispatch(updateSellingOrder(sellingorderData, sellingorderId));

    // Redirect back to the selling orders list page after successful update
    navigate("/sellingorders-table");
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
    <section className="update-order">
      <h1 className="update-order-deliveryId">Update Selling Order</h1>
      <form onSubmit={formSubmitHandler} className="update-order-form">
        <input
          type="text"
          placeholder="Order deliveryId"
          className="update-order-input"
          value={deliveryId}
          onChange={(e) => setDeliveryId(e.target.value)}
        />


        <input
          type="date"
          placeholder="Date"
          className="update-order-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit" className="update-order-btn">
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
        </button>
      </form>
    </section>
  );
};

export default UpdateSellingOrderPage;



