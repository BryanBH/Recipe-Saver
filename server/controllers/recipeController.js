const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");
const recipeServices = require("../services/recipeServices");
const recipeApi = require("../util/recipeAPI");
const apiKey = process.env.API_KEY;

/**
 * Saves selected recipe in database & updates user's savedRecipes property
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports.saveRecipe = async (req, res, next) => {
  try {
    const data = req.body.data;
    const isDuplicate = await recipeServices.isDuplicateRecipe(data.recipe.id);
    if (!isDuplicate) {
      const user = await User.findById(data.userId);
      const savedRecipe = new Recipe({
        user: data.userId,
        id: data.recipe.id,
        recipieInfo: data.recipe,
        title: data.recipe.title,
        sourceUrl: data.recipe.sourceUrl,
        spoonacularSourceUrl: data.recipe.spoonacularSourceUrl,
        image: data.recipe.image,
        readyInMinutes: data.recipe.readyInMinutes,
        cuisines: data.recipe.cuisines,
        summary: data.recipe.summary,
        instructions: data.recipe.instructions,
        servings: data.recipe.servings,
      });
      user.savedRecipes.push(savedRecipe);
      await savedRecipe.save();
      await user.save();
      res.status(200).json({ savedRecipe });
    } else {
      throw new Error("Recipe already saved");
    }
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

/**
 *  Returns user's saved recipies
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports.getUserRecipes = async (req, res, next) => {
  try {
    const data = req.query;
    const userRecipes = await recipeServices.getUserRecipes(data.userId);
    res.status(200).json({ savedRecipes: userRecipes.savedRecipes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteRecipe = async (req, res, next) => {
  try {
    const data = req.body.data;
    await recipeServices.deleteRecipes(data);
    const userRecipes = await recipeServices.getUserRecipes(data.userId);
    res.status(200).json({ savedRecipes: userRecipes.savedRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.fetchRecipeByCuisine = async (req, res, next) => {
  try {
    const { search } = req.body.data;
    const { data } = await recipeApi.get(
      `complexSearch?apiKey=${apiKey}&cuisine=${search}&number=60`
    );
    if (data.results.length === 0) {
      throw new Error("Not a valid cuisine");
    } else {
      const results = data.results;
      res.status(200).json({ results });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.fetchRecipeByType = async (req, res, next) => {
  try {
    const { search } = req.body.data;
    const { data } = await recipeApi.get(
      `complexSearch?apiKey=${apiKey}&query=${search}&number=60`
    );
    if (data.results.length === 0) {
      throw new Error("Not a valid type");
    } else {
      const results = data.results;
      res.status(200).json({ results });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.fetchRecipeByDiet = async (req, res, next) => {
  try {
    const { diet } = req.body.data;
    const { data } = await recipeApi.get(
      `complexSearch?apiKey=${apiKey}&diet=${diet}&number=60`
    );
    const results = data.results;
    res.status(200).json({ results });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.fetchRecipeInformation = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { data } = await recipeApi.get(
      `${id}/information?includeNutrition=false&apiKey=${apiKey}`
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
