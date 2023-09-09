import React, { useState, useEffect } from "react";
import "./create-Sellingorder.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSellingorder } from "../../../redux/apiCalls/sellingorderApiCall";
import { RotatingLines } from "react-loader-spinner";
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";

const CreateOrderr = () => {
  const dispatch = useDispatch();
  const { loading, issellingorderCreated } = useSelector((state) => state.sellingorder);
  const { products } = useSelector((state) => state.product);

  const [deliveryId, setDeliveryId] = useState("");
  const [sellingorderItems, setOrderItems] = useState([
    { product: "", quantity: 0, price: 0},
  ]);
  const [date ,setDate] = useState("");

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (deliveryId.trim() === "") return toast.error("Order deliveryId is required");
    if (!sellingorderItems.every((item) => item.product && item.quantity !== 0))
      return toast.error("All order items must have product and quantity");
    if (date.trim() === "") return toast.error("Date is required");

    const sellingorderData = {
      deliveryId,
      sellingorderItems,
      date,
    };

    dispatch(createSellingorder(sellingorderData));

    // Clear fields after creating an order
    setDeliveryId("");
    setOrderItems([{ product: "", quantity: 0,price:0 }]);
    setDate("");
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const navigate = useNavigate();
  useEffect(() => {
    if (issellingorderCreated) {
      navigate("/selingsorders-table");
    }
  }, [issellingorderCreated, navigate]);

  return (
    <section className="create-order">
      <h1 className="create-order-deliveryId">Create New Order</h1>
      <form onSubmit={formSubmitHandler} className="create-order-form">
        <input
          type="text"
          placeholder="Order deliveryId"
          className="create-order-input"
          value={deliveryId}
          onChange={(e) => setDeliveryId(e.target.value)}
        />

        {sellingorderItems.map((item, index) => (
          <div key={index}>
            <select
              value={item.product}
              onChange={(e) => {
                const updatedItems = [...sellingorderItems];
                updatedItems[index].product = e.target.value;
                setOrderItems(updatedItems);
              }}
              className="create-order-input"
            >
              <option disabled value="">
                Select A product
              </option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder={`Quantity ${index + 1}`}
              className="create-order-input"
              value={item.quantity}
              onChange={(e) => {
                const updatedItems = [...sellingorderItems];
                updatedItems[index].quantity = e.target.value;
                setOrderItems(updatedItems);
              }}
            />
                  <input
              type="number"
              placeholder={`Price ${index + 1}`}
              className="create-order-input"
              value={item.price}
              onChange={(e) => {
                const updatedItems = [...sellingorderItems];
                updatedItems[index].price = e.target.value;
                setOrderItems(updatedItems);
              }}
            />
          </div>
        ))}

        <div className="order-actions">
          <button
            type="button"
            className="create-order-btn"
            onClick={() =>
              setOrderItems([
                ...sellingorderItems,
                { product: "", quantity: 0, price: 0},
              ])
            }
          >
            Add Order Item
          </button>
          <button
            type="button"
            className="create-order-btn"
            onClick={() =>
              setOrderItems([{ product: "", quantity: 0, price:0 }])
            }
          >
            Cancel
          </button>
        </div>

        <input
          type="date"
          placeholder="Date Ordered"
          className="create-order-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit" className="create-order-btn">
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

export default CreateOrderr;