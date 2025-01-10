import { configureStore } from "@reduxjs/toolkit";
import WishReducer from "@/redux-toolkit/WishSlice";
import CartReducer from "@/redux-toolkit/CartSlice";
import authReducer from './auth/authSlice'
import ShippingReducer from "@/redux-toolkit/ShippingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: WishReducer,
    cart: CartReducer,
    shipping: ShippingReducer
  },
});

export default store;