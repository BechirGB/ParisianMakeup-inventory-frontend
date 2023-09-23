import { createSlice } from "@reduxjs/toolkit";

const SellingorderSlice = createSlice({
   name: "Sellingorder",
   initialState: {
    sellingorders: [],
    sellingordersCount:null,
    sellingordersCate:[],
    loading: false,
    issellingorderCreated: false,
    issellingorderUpdated:false,
    sellingorder:null,
    totalSales:null,
   },
   reducers: {
      setSellingorders(state, action) {
        state.sellingorders = action.payload;
      },
      setSellingordersCount(state, action) {
         state.sellingordersCount = action.payload;
       },
     

      addSellingorder(state, action) {
         state.sellingorders.push(action.payload);
      },
      setLoading(state) {
         state.loading = true;
       }, 
       clearLoading(state) {
         state.loading = false;
       },
       setIsSellingorderCreated(state) {
         state.issellingorderCreated = true;
         state.loading = false;
       },
       setIsSellingorderUpdated(state) {
        state.issellingorderUpdated = true;
        state.loading = false;
      },
       clearIsSellingorderCreated(state) {
         state.issellingorderCreated = false;
       },

      deleteSellingorder(state, action) {
         state.sellingorders = state.sellingorders.filter(c => c._id !== action.payload);
      },
      setSellingorder(state,action) {
         state.sellingorders = action.payload;
       },
       setTotalSales(state, action) {
        state.totalSales = action.payload;
      },

       
   }
});

const SellingorderReducer = SellingorderSlice.reducer;
const SellingorderActions = SellingorderSlice.actions;

export { SellingorderActions, SellingorderReducer }