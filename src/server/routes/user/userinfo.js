const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { isLoggedIn } = require("../../strategies");

router.get("/profile", isLoggedIn, async (req, res) => {
  var user = await User.findById(req.user.id).select("-password");
  if (user) {
    res.status(200).send(user);
  }
});

module.exports = router;
