

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateOrderitem, fetchSingleOrderitem } from "../../../redux/apiCalls/orderitemApiCall";
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import { RotatingLines } from "react-loader-spinner";

const UpdateOrderItemPage = () => {
  const { orderItemid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isOrderItemUpdated } = useSelector((state) => state.orderitem);
  const { products } = useSelector((state) => state.product);

  const [quantity, setQuantity] = useState("");
  const [orderItems, setOrderItems] = useState([]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (quantity.trim() === "") return toast.error("Order quantity is required");

    // Prepare the order items data
    const orderData = {
      quantity,
      orderItems,
    };

    dispatch(updateOrderitem(orderData, orderItemid));

    navigate("/orders-table");
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts());
      await dispatch(fetchSingleOrderitem(orderItemid));
    };

    fetchData();
  }, [dispatch, orderItemid]);

  const handleOrderItemChange = (index, field, value) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index][field] = value;
    setOrderItems(updatedOrderItems);
  };

  const calculateUpdatedTotalPrice = () => {
    return orderItems.reduce((totalPrice, item) => {
      const product = products.find((p) => p._id === item.product);
      if (product) {
        totalPrice += item.quantity * item.price - item.discount;
      }
      return totalPrice;
    }, 0);
  };

  return (
    <section className="update-order">
      <h1 className="update-order-quantity">Update Order Item</h1>
      <form onSubmit={formSubmitHandler} className="update-order-form">
        <input
          type="number"
          placeholder="Order quantity"
          className="create-order-input"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        {orderItems.map((item, index) => (
          <div key={index}>
            <select
              value={item.product}
              onChange={(e) => handleOrderItemChange(index, "product", e.target.value)}
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
              placeholder={`Price ${index + 1}`}
              className="create-order-input"
              value={item.price}
              onChange={(e) => handleOrderItemChange(index, "price", e.target.value)}
            />

            <input
              type="number"
              placeholder="Number Ordered"
              className="create-order-input"
              value={item.discount}
              onChange={(e) => handleOrderItemChange(index, "discount", e.target.value)}
            />
          </div>
        ))}

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

export default UpdateOrderItemPage;








  