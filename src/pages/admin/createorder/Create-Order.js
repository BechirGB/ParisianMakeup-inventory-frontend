import React, { useState, useEffect } from "react";
import "./create-order.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../redux/apiCalls/orderApiCall";
import { RotatingLines } from "react-loader-spinner";
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";

const CreateOrder = () => {
  const dispatch = useDispatch();
  const { loading, isOrderCreated } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);

  const [store, setStore] = useState("");
  const [orderItems, setOrderItems] = useState([
    { product: "", quantity: 0, discount: 0 },
  ]);
  const [dateOrdered, setDateOrdered] = useState("");

  const navigate = useNavigate();



  // Function to handle product selection
  const handleProductSelection = (productId, index) => {
    const updatedItems = [...orderItems];
    updatedItems[index].product = productId;
    setOrderItems(updatedItems);
  };

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (store.trim() === "") return toast.error("Order store is required");
    if (!orderItems.every((item) => item.product && item.quantity !== 0))
      return toast.error("All order items must have product and quantity");
    if (dateOrdered.trim() === "") return toast.error("Date is required");

    const orderData = {
      store,
      orderItems,
      dateOrdered,
    };

    dispatch(createOrder(orderData));

    setStore("");
    setOrderItems([{ product: "", quantity: 0, discount: 0 }]);
    setDateOrdered("");
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isOrderCreated) {
      navigate("/orders-table");
    }
  }, [isOrderCreated, navigate]);

  return (
    <section className="create-order">
      <form onSubmit={formSubmitHandler} className="create-order-form">
        <input
          type="text"
          placeholder="Order store"
          className="create-order-input"
          value={store}
          onChange={(e) => setStore(e.target.value)}
        />

        {orderItems.map((item, index) => (
          <div key={index}>
            <select
              value={item.product}
              onChange={(e) => handleProductSelection(e.target.value, index)}
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

            {/* Display quantity in stock if available */}
            {item.quantityInStock && (
              <p>Quantity in Stock: {item.quantityInStock}</p>
            )}

            <input
              type="number"
              placeholder={`Quantity ${index + 1}`}
              className="create-order-input"
              value={item.quantity}
              onChange={(e) => {
                const updatedItems = [...orderItems];
                updatedItems[index].quantity = e.target.value;
                setOrderItems(updatedItems);
              }}
            />
            <input
              type="number"
              placeholder={`Discount ${index + 1}`}
              defaultValue={0}
              className="create-order-input"
              value={item.discount}
              onChange={(e) => {
                const updatedItems = [...orderItems];
                updatedItems[index].discount = e.target.value;
                setOrderItems(updatedItems);
              }}
            />
            <input
              type="number"
              placeholder={`Price ${index + 1}`}
              className="create-order-input"
              value={item.price}
              onChange={(e) => {
                const updatedItems = [...orderItems];
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
                ...orderItems,
                { product: "", price: 0, quantity: 0, discount: 0 },
              ])
            }
          >
            Add Order Item
          </button>
          <button
            type="button"
            className="create-order-btn"
            onClick={() =>
              setOrderItems([{ product: "", price: 0, quantity: 0, discount: 0 }])
            }
          >
            Cancel
          </button>
        </div>

        <input
          type="datetime-local"
          placeholder="Date Ordered"
          className="create-order-input"
          value={dateOrdered}
          onChange={(e) => setDateOrdered(e.target.value)}
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

export default CreateOrder;


