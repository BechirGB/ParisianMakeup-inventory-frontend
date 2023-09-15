import { createSlice } from "@reduxjs/toolkit";

const QuantityInStockSlice = createSlice({
  name: "quantityinstock", 
  initialState: {
    quantities: [], 
    tn_quantities:[],
  },
  reducers: {
    setQuantities(state, action) {
      state.quantities = action.payload; 
    },
    setTnQuantities(state,action){
      state.tn_quantities= action.payload
    }
  },
});

const QuantityInStockReducer = QuantityInStockSlice.reducer;
const QuantityInStockActions = QuantityInStockSlice.actions;
export const { setQuantities, setQuantity } = QuantityInStockActions;

export { QuantityInStockActions, QuantityInStockReducer };
