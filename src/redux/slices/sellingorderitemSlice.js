import { createSlice } from "@reduxjs/toolkit";

const SellingOrderItemSlice = createSlice({
   name: "SellingOrderItem",
   initialState: {
    SellingOrderItems: [],
    SellingOrderItemsCount:null,
    SellingOrderItemsTotalPurchases:[],
    SellingOrderItemsCate:[],
    loading: false,
    isSellingOrderItemCreated: false,
    isSellingOrderItemUpdated:false,
    SellingOrderItem:null
   },
   reducers: {
      setSellingOrderItems(state, action) {
        state.SellingOrderItems = action.payload;
      },
      setSellingOrderItemsCount(state, action) {
         state.SellingOrderItemsCount = action.payload;
       },
       setSellingOrderItemsTotalPurchases(state, action) {
         state.SellingOrderItemsTotalPurchases = action.payload;
       },

      addSellingOrderItem(state, action) {
         state.SellingOrderItems.push(action.payload);
      },
      setLoading(state) {
         state.loading = true;
       },
       clearLoading(state) {
         state.loading = false;
       },
       setIsSellingOrderItemCreated(state) {
         state.isSellingOrderItemCreated = true;
         state.loading = false;
       },
       clearIsSellingOrderItemCreated(state) {
         state.isSellingOrderItemCreated = false;
       },
       setIsSellingOrderItemUpdated(state) {
        state.isSellingOrderItemUpdated = true;
        state.loading = false;
      },

      deleteSellingOrderItem(state, action) {
         state.SellingOrderItems = state.SellingOrderItems.filter(c => c._id !== action.payload);
      },
      setSellingOrderItem(state,action) {
         state.SellingOrderItems = action.payload;
       },

       
   }
});

const SellingOrderItemReducer = SellingOrderItemSlice.reducer;
const SellingOrderItemActions = SellingOrderItemSlice.actions;

export { SellingOrderItemActions, SellingOrderItemReducer }