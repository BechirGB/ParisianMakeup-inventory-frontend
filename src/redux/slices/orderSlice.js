import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "Order",
  initialState: {
    orders: [],
    ordersCount: null,
    ordersTotalPurchases: [], 
    ordersCate: [],
    updateOrder:[],
    loading: false,
    isorderCreated: true,
    isorderUpdated: false,
    order: null,
    totalPurchase: null, 
  },
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setOrdersCount(state, action) {
      state.ordersCount = action.payload;
    },
    setOrdersTotalPurchasesValue(state, action) {
      state.ordersTotalPurchases = action.payload;
    },
    addOrder(state, action) {
      state.orders.push(action.payload);
    },
    updateOrder(state,action){
      state.updateOrder=action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsOrderCreated(state) {
      state.isOrderCreated = true;
      state.loading = false;
    },
    clearIsOrderCreated(state) {
      state.isOrderCreated = false;
    },
    
    setIsOrderUpdated(state) {
      state.isOrderUpdated = true;
      state.loading = false;
    },
    deleteOrder(state, action) {
      state.orders = state.orders.filter((c) => c._id !== action.payload);
    },
    setOrder(state, action) {
      state.orders = action.payload;
    },
    setTotalPurchase(state, action) {
      state.totalPurchase = action.payload;
    },
  },
});

const OrderReducer = OrderSlice.reducer;
const OrderActions = OrderSlice.actions;

export { OrderActions, OrderReducer };
