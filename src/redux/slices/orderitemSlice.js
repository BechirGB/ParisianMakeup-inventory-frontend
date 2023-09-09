import { createSlice } from "@reduxjs/toolkit";

const orderItemSlice = createSlice({
   name: "OrderItem",
   initialState: {
    OrderItems: [],
    OrderItemsCount:null,
    OrderItemsTotalPurchases:[],
    OrderItemsCate:[],
    loading: false,
    isOrderItemCreated: false,
    isOrderItemUpdated:false,
    OrderItem:null
   },
   reducers: {
      setOrderItems(state, action) {
        state.OrderItems = action.payload;
      },
      setOrderItemsCount(state, action) {
         state.OrderItemsCount = action.payload;
       },
       setOrderItemsTotalPurchases(state, action) {
         state.OrderItemsTotalPurchases = action.payload;
       },

      addOrderItem(state, action) {
         state.OrderItems.push(action.payload);
      },
      setLoading(state) {
         state.loading = true;
       },
       clearLoading(state) {
         state.loading = false;
       },
       setIsOrderItemCreated(state) {
         state.isOrderItemCreated = true;
         state.loading = false;
       },
       clearIsOrderItemCreated(state) {
         state.isOrderItemCreated = false;
       },
       setIsOrderItemUpdated(state) {
        state.isOrderItemUpdated = true;
        state.loading = false;
      },

      deleteOrderItem(state, action) {
         state.OrderItems = state.OrderItems.filter(c => c._id !== action.payload);
      },
      setOrderItem(state,action) {
         state.OrderItems = action.payload;
       },

       
   }
});

const OrderItemReducer = orderItemSlice.reducer;
const OrderItemActions = orderItemSlice.actions;

export { OrderItemActions, OrderItemReducer }