import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productsCount: null,
    loading: false,
    isproductCreated: false,
    isProductUpdated:false,
    product:null,
  },
  reducers: {
    setproducts(state, action) {
      state.products = action.payload;
    },
    setproductsCount(state, action) {
      state.productsCount = action.payload;
    },
    addProduct(state, action) {
      state.products.push(action.payload);
   },
   
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsProductCreated(state) {
      state.isproductCreated = true;
      state.loading = false;
    },
    clearIsProductCreated(state) {
      state.isproductCreated = false;
    },
    setIsProductUpdated(state,action) {
      state.isProductUpdated = action.payload;
    },
  
  
  },
});

const productReducer = productSlice.reducer;
const productActions = productSlice.actions;

export { productActions, productReducer };