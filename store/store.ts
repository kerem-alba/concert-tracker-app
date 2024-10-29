import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

console.log("Store initialized");

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
