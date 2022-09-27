import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import windowFocusReducer from "./reducers/windowFocusSlice";

export default configureStore({
  reducer: { auth: authReducer, windowFocus: windowFocusReducer },
});
