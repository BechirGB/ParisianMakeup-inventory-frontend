import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { productReducer } from "./slices/productSlice";
import { OrderReducer } from "./slices/orderSlice";
import { SellingorderReducer } from "./slices/sellingorderSlice";
import { QuantityInStockReducer } from "./slices/quantityinstockSlice";
import { OrderItemReducer } from "./slices/orderitemSlice";

const store = configureStore({
    reducer: {
       auth: authReducer,
       profile: profileReducer,
       product: productReducer,    
       order: OrderReducer,
       sellingorder:SellingorderReducer,
       quantityinstock:QuantityInStockReducer,
       orderitem:OrderItemReducer,
       sellingorderitem:SellingorderReducer
    }
});

export default store;