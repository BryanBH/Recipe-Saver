const jwt = require("jsonwebtoken");

module.exports.getSignedToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: "12hr",
  });
};
