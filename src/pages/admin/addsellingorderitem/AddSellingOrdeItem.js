import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {fetchSingleSellingorder } from "../../../redux/apiCalls/sellingorderApiCall";
import { AddSellingOrderItem} from "../../../redux/apiCalls/sellingorderitemApiCall"
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import { RotatingLines } from "react-loader-spinner";



const AddSellingOrderItemPage = () => {
  const { sellingorderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isSellingOrderUpdated } = useSelector((state) => state.sellingorder);
  const { products } = useSelector((state) => state.product);

  const [sellingorderItems, setSellingorderItems] = useState([]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    
    if (!sellingorderItems.every((item) => item.product && item.quantity !== 0 && item.price !== 0))
      return toast.error("All order items must have product, quantity, and price");

    const sellingorderData = {
      sellingorderItems,
    };

    dispatch(AddSellingOrderItem(sellingorderData, sellingorderId));

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
       

        {sellingorderItems.map((item, index) => (
          <div key={index}>
            <select
              value={item.product}
              onChange={(e) => {
                const updatedItems = [...sellingorderItems];
                updatedItems[index].product = e.target.value;
                setSellingorderItems(updatedItems);
              }}
              className="update-order-input"
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
              className="update-order-input"
              value={item.quantity}
              onChange={(e) => {
                const updatedItems = [...sellingorderItems];
                updatedItems[index].quantity = e.target.value;
                setSellingorderItems(updatedItems);
              }}
            />
            <input
              type="number"
              placeholder={`Price ${index + 1}`}
              className="update-order-input"
              value={item.price}
              onChange={(e) => {
                const updatedItems = [...sellingorderItems];
                updatedItems[index].price = e.target.value;
                setSellingorderItems(updatedItems);
              }}
            />
          </div>
        ))}

        <div className="order-actions">
          <button
            type="button"
            className="update-order-btn"
            onClick={() =>
              setSellingorderItems([
                ...sellingorderItems,
                { product: "", quantity: 0, price: 0 },
              ])
            }
          >
            Add Selling Order Item
          </button>
          <button
            type="button"
            className="update-order-btn"
            onClick={() =>
              setSellingorderItems([{ product: "", quantity: 0, price: 0 }])
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

export default AddSellingOrderItemPage;
