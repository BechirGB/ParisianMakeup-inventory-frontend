import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";
import { updateOrder, fetchSingleOrder } from "../../../redux/apiCalls/orderApiCall";
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import { RotatingLines } from "react-loader-spinner";

const UpdateOrderPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isOrderUpdated } = useSelector((state) => state.order);

  const [store, setStore] = useState("");
  const [dateOrdered, setDateOrdered] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (store.trim() === "") return toast.error("Order store is required");
    
    if (dateOrdered.trim() === "") return toast.error("Date is required");

    const orderData = {
      store,
      dateOrdered,
    };

    dispatch(updateOrder(orderData,orderId));

    navigate("/orders-table");
  };

  useEffect(() => {
    
    dispatch(fetchSingleOrder(orderId));
    dispatch(fetchProducts());
  }, [dispatch, orderId]);

  useEffect(() => {
    if (isOrderUpdated) {
      navigate("/orders");
    }
  }, [isOrderUpdated, navigate]);

  return (
    <section className="table-container">
            <AdminSidebar />

      <h1 className="update-order-store">Update Order</h1>
      <form onSubmit={formSubmitHandler} className="update-order-form">
        <input
          type="text"
          placeholder="Order store"
          className="create-order-input"
          value={store}
          onChange={(e) => setStore(e.target.value)}
        />


        <input
          type="date"
          placeholder="Date Ordered"
          className="create-order-input"
          value={dateOrdered}
          onChange={(e) => setDateOrdered(e.target.value)}
        />
        {/* Form fields */}
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

export default UpdateOrderPage;
