const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  savedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipes",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
