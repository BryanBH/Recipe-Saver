const UserServices = require("../services/userServices");

/**
 * Creates new user in DB and sends new user as a reponse
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports.signUp = async (req, res, next) => {
  try {
    const newUser = req.body.data;
    const savedUser = await UserServices.createUser(newUser);
    res.status(200).json({
      success: true,
      data: savedUser,
    });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

/**
 * generates signed token and returns the token and user id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports.signIn = async (req, res, next) => {
  try {
    const payload = req.body.data;
    const token = await UserServices.signInUser(payload);
    const user = await UserServices.getUserId(payload);
    res.status(200).json({
      success: true,
      token: token,
      user: {
        id: user._id,
      },
    });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

/**
 * returns current user information
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports.getUserProfile = async (req, res, next) => {
  try {
    const data = req.user;
    const user = await UserServices.getCurrentUser(data);

    if (user) {
      res.status(200).json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        savedRecipes: user.savedRecipes,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
