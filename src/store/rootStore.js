import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import poroductReducer from "./productSlice.js";
export const rootStore = configureStore({
  reducer: {
    userSlice: userReducer,
    productSlice: poroductReducer,
  },
});
