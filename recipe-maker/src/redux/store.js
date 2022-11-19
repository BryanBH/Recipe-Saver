import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipes/recipeSlice";
import authReducer from "./auth/authSlice";
export const store = configureStore({
  reducer: { recipes: recipeReducer, auth: authReducer },
});
