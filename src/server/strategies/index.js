module.exports = {
  isLoggedIn: (req, res, next) => {
    // user.id is always set to false whenever a user is not logged in
    if (req.user.id) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  },
  isAdmin: (req, res, next) => {
    if (req.user.id && req.user.role === "admin") {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  },
};
