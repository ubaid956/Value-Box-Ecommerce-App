import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    removeFromCart(state, action) {
      return  state.filter(
        (item) => item.title !== action.payload.title
      );
    },
  },
});

export const { addToCart, removeFromCart } = CartSlice.actions;

export const selectCart = (state) => state.cart;

export default CartSlice.reducer;
