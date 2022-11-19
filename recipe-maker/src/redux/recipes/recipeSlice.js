import { createSlice } from "@reduxjs/toolkit";

import {
  saveRecipeDetails,
  getSavedRecipes,
  fetchRecipeCategories,
  fecthRecipesByType,
  fetchRecipesByDiet,
  fetchRecipeInformation,
  deleteRecipe,
} from "./recipeActions";

const initialState = {
  recipes: [],
  currentRecipe: {},
  userRecipes: [],
  loading: false,
  error: null,
  success: false,
};
const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  // action types are the names
  reducers: {
    removeRecipeDetails: (state) => (state.currentRecipe = {}),
    updateError: (state, { payload }) => ({ ...state, error: payload }),
    updateSuccess: (state, { payload }) => ({ ...state, success: payload }),
    resetCurrentRecipe: (state) => ({ ...state, currentRecipe: {} }),
    resetUserRecipes: (state) => ({ ...state, userRecipes: [] }),
    resetRecipes: (state) => ({ ...state, recipes: [] }),
    resetSaved: (state, { payload }) => ({ ...state, error: payload }),
  },
  extraReducers: {
    /** Fetch recipe categories */
    [fetchRecipeCategories.pending]: (state) => {
      state.loading = true;
    },
    [fetchRecipeCategories.fulfilled]: (state, { payload }) => {
      state.recipes = payload.results;
      state.totalResults = payload.totalResults;
      state.loading = false;
    },
    [fetchRecipeCategories.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    /** Fecth by type */
    [fecthRecipesByType.pending]: (state) => {
      state.loading = true;
    },
    [fecthRecipesByType.fulfilled]: (state, { payload }) => {
      state.recipes = payload.results;
      state.loading = false;
    },
    [fecthRecipesByType.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    /** Fetch Recipes by diet */
    [fetchRecipesByDiet.pending]: (state) => {
      state.loading = true;
    },
    [fetchRecipesByDiet.fulfilled]: (state, { payload }) => {
      state.recipes = payload.results;
      state.loading = false;
    },
    [fetchRecipesByDiet.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    /** Fetch recipe information */
    [fetchRecipeInformation.pending]: (state) => {
      state.loading = true;
    },
    [fetchRecipeInformation.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.currentRecipe = payload;
    },
    [fetchRecipeInformation.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    /** Save recipe details */
    [saveRecipeDetails.pending]: (state) => {
      state.loading = true;
    },
    [saveRecipeDetails.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [saveRecipeDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    /** Get saved recipes */
    [getSavedRecipes.pending]: (state) => {
      state.loading = true;
    },
    [getSavedRecipes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userRecipes = payload;
    },
    [getSavedRecipes.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    /** Delete recipe from user account */
    [deleteRecipe.pending]: (state) => {
      state.loading = true;
    },
    [deleteRecipe.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userRecipes = payload;
    },
    [deleteRecipe.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  removeRecipeDetails,
  updateError,
  updateSuccess,
  resetCurrentRecipe,
  resetUserRecipes,
  resetRecipes,
} = recipeSlice.actions;
export const getAllRecipes = (state) => state.recipes.recipes;
export const getRecipeDetails = (state) => {
  console.log(state.recipe);
};
export default recipeSlice.reducer;
