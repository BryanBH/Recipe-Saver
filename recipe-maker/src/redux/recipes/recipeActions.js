import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { getTemplateRecipeInfo } from "../../data/randomRecipes";

export const saveRecipeDetails = createAsyncThunk(
  "/recipe/saveRecipeDetails",
  async (recipe, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/recipe/saveRecipe",
        {
          data: {
            userId: auth.currentUser.id,
            recipe,
          },
        }
      );
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getSavedRecipes = createAsyncThunk(
  "/recipe/getSavedRecipe",
  async (args, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const { data } = await axios.get(
        "/recipe/getUserRecipes",
        {
          params: {
            userId: auth.currentUser.id,
          },
        }
      );
      return data.savedRecipes;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

/**
 * axios post to backend to fetch recipes by categories limited to 60
 * @param search category search term
 * @returns array of recipes
 */
export const fetchRecipeCategories = createAsyncThunk(
  "/recipe/fetchRecipeCategories",
  async (search, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/recipe/api/fetchRecipeByCuisine",
        {
          data: {
            search,
          },
        }
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
/**
 * API all to fetch recipes by default query parameter
 */
export const fecthRecipesByType = createAsyncThunk(
  "/recipe/fetchRecipeByType",
  async (search, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/recipe/api/fetchRecipeByType",
        {
          data: {
            search,
          },
        }
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchRecipesByDiet = createAsyncThunk(
  "'/recipe/fetchRecipeByDiet",
  async (diet, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/recipe/api/fetchRecipeByDiet",
        {
          data: {
            diet,
          },
        }
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
/**
 * API call that fecthes specific recipe information
 * @param id recipe id
 * @returns json recipe information
 */
export const fetchRecipeInformation = createAsyncThunk(
  "/recipe/fetchRecipeInformation",
  async (id, { rejectWithValue }) => {
    const results = getTemplateRecipeInfo(id);
    if (results) {
      return results;
    }
    try {
      const { data } = await axios.get(
        "/recipe/api/fetchRecipeInformation",
        {
          params: {
            id,
          },
        }
      );

      return data.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  "/recipe/deleteRecipe",
  async (recipeId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const { data } = await axios.post(
        "/recipe/deleteRecipe",
        {
          data: {
            userId: auth.currentUser.id,
            recipeId,
          },
        }
      );
      return data.savedRecipes;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
