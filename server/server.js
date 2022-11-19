require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const authRouter = require("./routers/auth");
const recipeRouter = require("./routers/recipeRoutes");
const app = express();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(cors());
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../recipe-maker/build")));

const dbURL = process.env.DB_URL || "mongodb://localhost:27017/recipe-maker";
mongoose
  .connect(dbURL)
  .then(() => console.log("connected to local server"))
  .catch((err) => console.log(err));

app.use("/auth", authRouter);
app.use("/recipe", recipeRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../recipe-maker/build", "index.html"));
});
