const bycrypt = require("bcryptjs");
const User = require("../models/userModel");
const getSignedToken = require("../util/signedToken");

/**
 * creates new user with given params
 * encrypts password before saving the user in DB
 * @param {*} payload
 * @returns newly created user
 */
module.exports.createUser = async (payload) => {
  return (
    User.find({ email: payload.email })
      // exec() returns a promise, that you can use it with then() or async/await to execute a query on a model "asynchronous"
      .exec()
      .then(async (user) => {
        if (user.length > 0) {
          throw new Error("User already exist");
        }
        try {
          const hashed = await bycrypt.hash(payload.password, 10);
          const newUser = new User({
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            password: hashed,
          });
          return await newUser.save();
        } catch (err) {
          throw new Error("All field required");
        }
      })
  );
};

/**
 * returns signed JWT token
 * @param {*} payload
 * @returns signed JWT token
 */
module.exports.signInUser = async (payload) => {
  const user = await User.findOne({ email: payload.email }).exec();
  if (!user) {
    throw new Error("Please enter email or password");
  } else {
    return bycrypt
      .compare(payload.password, user.password)
      .then((res) => {
        if (res) {
          const token = getSignedToken.getSignedToken(user._id);
          return token;
        } else {
          throw new Error("Incorrect password or email, try again");
        }
      })
      
  }
};
/**
 * user searched via email
 * @param {*} payload 
 * @returns user
 */
module.exports.getUserId = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    return user;
  } else {
    throw new Error("User not found");
  }
};

/**
 * user searched by id
 * @param {*} payload 
 * @returns current user
 */
module.exports.getCurrentUser = async (payload) => {
  const user = await User.findById(payload.id);
  if (user) {
    return user;
  } else {
    throw new Error("User not found");
  }
};

