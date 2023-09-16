import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import{fetchSellingorders} from "../../../redux/apiCalls/sellingorderApiCall"
import { updateSellingOrderitem, fetchSingleSellingOrderitem } from "../../../redux/apiCalls/sellingorderitemApiCall";
import { fetchProducts } from "../../../redux/apiCalls/productApiCall";
import { RotatingLines } from "react-loader-spinner";

const UpdateSellingOrderItemPage = () => {
  const { sellingorderItemid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isOrderItemUpdated } = useSelector((state) => state.orderitem);
  const { products } = useSelector((state) => state.product);

  const [quantity, setQuantity] = useState("");
  const [sellingorderItems, setsellingorderItems] = useState([
    { product: "" },
  ]);
  const [price, setPrice] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (quantity.trim() === "") return toast.error("Order quantity is required");
    if (price.trim() === "") return toast.error("Price is required");

    const orderData = {
      quantity,
      price,
    };

    dispatch(updateSellingOrderitem(orderData, sellingorderItemid)).then(() => {
      dispatch(fetchSellingorders());
      navigate("/sellings-table");
    })
 
   };
  useEffect(() => {
    console.log(sellingorderItemid);
    dispatch(fetchProducts());
    dispatch(fetchSingleSellingOrderitem(sellingorderItemid));
  }, [dispatch, sellingorderItemid]);

  useEffect(() => {
    if (isOrderItemUpdated) {
      navigate("/sellingorders");
    }
  }, [isOrderItemUpdated, navigate]);

  return (
    <section className="update-order">
      <h1 className="update-order-quantity">Update Order</h1>
      <form onSubmit={formSubmitHandler} className="update-order-form">
        <h1>New Order Item</h1>
        <input
          type="number"
          placeholder="Order quantity"
          className="create-order-input"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
   {sellingorderItems.map((item, index) => (
          <div key={index}>
            <select
              value={item.product}
             
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
              onChange={(e) => setPrice(e.target.value)}
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

export default UpdateSellingOrderItemPage;
