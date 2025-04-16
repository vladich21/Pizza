import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import cartReducer from "./cartSlice";
import pizzaReducer from "./pizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
