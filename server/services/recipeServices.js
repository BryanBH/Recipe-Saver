const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");
/**
 *
 * @param {string} id recipe id
 * searches recipe collection to see if specific recipe already exists
 * @returns boolean true if it already exists, false otherwise
 */
module.exports.isDuplicateRecipe = async (id) => {
  return Recipe.find({ id: id })
    .exec()
    .then((recipe) => {
      return recipe.length > 0 ? true : false;
    });
};

/**
 *
 * @param {string} id user id
 * gets current user's saved recipes
 * @returns user model with saved recipes populated
 */
module.exports.getUserRecipes = async (id) => {
  return User.findById(id).populate("savedRecipes");
};

module.exports.deleteRecipes = async (data) => {
  const { userId, recipeId } = data;
  await User.findByIdAndUpdate(userId, { $pull: { savedRecipes: recipeId } });
  await Recipe.findByIdAndDelete(recipeId);
};
