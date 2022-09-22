const jwt = require("jsonwebtoken");
const jwtVerificationMiddleware = async (req, res, next) => {
  // By default, we assume that the user is not logged in
  req.user = {
    id: false,
    role: "guest",
  };
  // Check if the JWT token is in the request header
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      var decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {}
    // If the token is valid, we check if the user is still in the database
    if (decoded) {
      const User = require("./models/User");
      const user = await User.findById(decoded._id);
      // If they are, we set the user to the request object
      if (user) {
        req.user = {
          id: decoded._id,
          role: decoded.role,
        };
        next();
      }
      // Automatically logout the user if they are not in the database
      else {
        next();
      }
      // Automatically logout the user if the token is not valid
    } else {
      next();
    }
    // Automatically logout the user if the token is not in the header
  } else {
    next();
  }
};
module.exports = jwtVerificationMiddleware;
