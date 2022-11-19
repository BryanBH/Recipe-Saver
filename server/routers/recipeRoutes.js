const express = require("express");
const { protect } = require("../middleware/protected");
const recipeController = require("../controllers/recipeController");
const { Router } = require("express");

const router = express.Router();

router.post("/api/fetchRecipeByCuisine", recipeController.fetchRecipeByCuisine);
router.post("/api/fetchRecipeByType", recipeController.fetchRecipeByType);
router.post("/api/fetchRecipeByDiet", recipeController.fetchRecipeByDiet);
router.get("/api/fetchRecipeInformation", recipeController.fetchRecipeInformation)

router.post("/saveRecipe", recipeController.saveRecipe);

router.get("/getUserRecipes", recipeController.getUserRecipes);

router.post("/deleteRecipe", recipeController.deleteRecipe);

module.exports = router;
