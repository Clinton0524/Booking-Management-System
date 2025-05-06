import { configureStore } from "@reduxjs/toolkit";
import BookingReducer from "./BookingSlice";
import authReducer from './AuthSlice';
const Store = configureStore({
  reducer: {
    booking: BookingReducer,
    auth: authReducer,
  },
});
export default Store;
