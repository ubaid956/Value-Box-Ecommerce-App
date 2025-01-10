import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ShippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    addToShipping(state, action) {
      state.push(action.payload); // Add item to the shipping list
    },
    removeFromShipping(state, action) {
      return state.filter(
        (item) => item.title !== action.payload.title
      );
    },
  },
});

export const { addToShipping, removeFromShipping } = ShippingSlice.actions;

export const selectShipping = (state) => state.shipping;

export default ShippingSlice.reducer;
