const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  sourceUrl: {
    type: String,
    required: true,
  },
  spoonacularSourceUrl: {
    type: String,
    required: true,
  },
  readyInMinutes: {
    type: Number,
  },
  instructions: {
    type: String,
  },
  servings: {
    type: Number,
  },
  cuisines: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Recipes", recipeSchema);
