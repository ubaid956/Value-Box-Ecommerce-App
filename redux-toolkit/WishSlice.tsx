// slice is simple function which takes objects and 
// contains  -initial state value
//           -one or more reducer functions to define how the state can be updated
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const WishSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
      addWishList(state, action) {
        state.push(action.payload); // This directly mutates the state array
      },
      removeWishList(state, action) {
        return state.filter(
          (item) => item.title !== action.payload.title
        );
      },
    },
  });

export const { addWishList, removeWishList } = WishSlice.actions;

export const selectWishlist = (state) => state.wishlist;

export default WishSlice.reducer;
