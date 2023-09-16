import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleOrder,fetchOrders } from "../../../redux/apiCalls/orderApiCall";
import {AddOrderItem} from "../../../redux/apiCalls/orderitemApiCall"
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import { RotatingLines } from "react-loader-spinner";

const AddOrderItemPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isOrderUpdated } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);

  const [orderItems, setOrderItems] = useState([]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
   
    if (!orderItems.every((item) => item.product && item.quantity !== 0))
      return toast.error("All order items must have product and quantity");

    const orderData = {
      orderItems,
    };

    dispatch(AddOrderItem(orderData,orderId)).then(() => {
      dispatch(fetchOrders());
    navigate("/orders-table")});


  };

  useEffect(() => {
    
    dispatch(fetchSingleOrder(orderId));
    dispatch(fetchProducts());
  }, [dispatch, orderId]);

  useEffect(() => {
    if (isOrderUpdated) {
      navigate("/orders-table");
    }
  }, [isOrderUpdated, navigate]);

  return (
    <section className="update-order">
      <form onSubmit={formSubmitHandler} className="update-order-form">
        

        {orderItems.map((item, index) => (
          <div key={index}>
            <select
              value={item.product}
              onChange={(e) => {
                const updatedItems = [...orderItems];
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
                const updatedItems = [...orderItems];
                updatedItems[index].quantity = e.target.value;
                setOrderItems(updatedItems);
              }}
            />
            <input
              type="decimal"
              placeholder={`Discount ${index + 1}`}
              className="create-order-input"
              value={item.discount}
              onChange={(e) => {
                const updatedItems = [...orderItems];
                updatedItems[index].discount = e.target.value;
                setOrderItems(updatedItems);
              }}
            />
               <input
              type="decimal"
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
                { product: "", },
                
              ])
            }
          >
            Add Order Item
          </button>
          <button
            type="button"
            className="create-order-btn"
            onClick={() =>
              setOrderItems([{ product: "", price :0, quantity: 0, discount: 0 }])
            }
          >
            Cancel
          </button>
        </div>

       
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

export default AddOrderItemPage;