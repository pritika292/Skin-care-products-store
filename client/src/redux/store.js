import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/auth/userSlice";
import cartReducer from "./features/auth/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer
  },
});
