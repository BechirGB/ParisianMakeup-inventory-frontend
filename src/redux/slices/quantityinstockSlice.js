import { createSlice } from "@reduxjs/toolkit";

const QuantityInStockSlice = createSlice({
  name: "quantityinstock", 
  initialState: {
    quantities: [], 
    quantity:[],
  },
  reducers: {
    setQuantities(state, action) {
      state.quantities = action.payload; 
    },
    setQuantity(state,action){
      state.quantity= action.payload
    }
  },
});

const QuantityInStockReducer = QuantityInStockSlice.reducer;
const QuantityInStockActions = QuantityInStockSlice.actions;
export const { setQuantities, setQuantity } = QuantityInStockActions;

export { QuantityInStockActions, QuantityInStockReducer };
