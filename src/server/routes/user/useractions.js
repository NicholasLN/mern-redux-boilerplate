const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../../models/User");

function generateAccessToken(obj, rememberMe) {
  const token = jwt.sign(obj, process.env.JWT_SECRET, {
    expiresIn: rememberMe ? "7d" : "1h",
  });
  return token;
}

router.post("/login", async (req, res) => {
  if (!req.user.id) {
    const { username, password, rememberMe } = req.body;
    User.findOne({ username }, async (err, user) => {
      if (err) {
        res.status(500).send("Error finding user");
      } else if (!user) {
        res.status(401).send("User not found");
      } else if (!user.verifyPassword(password)) {
        res.status(401).send("Password incorrect");
      } else {
        res.send({
          accessToken: generateAccessToken(
            { _id: user._id, role: user.role },
            rememberMe
          ),
          user: {
            username: user.username,
            email: user.email,
            id: user._id,
          },
        });
      }
    });
  } else {
    res.status(401).send("User already logged in.");
  }
});

router.post("/register", (req, res) => {
  if (!req.user.id) {
    const { username, password, email } = req.body;
    // See if user already exists
    User.findOne({ username }, (err, user) => {
      if (err) {
        res.status(500).send("Error finding user");
      } else if (user) {
        res.status(401).send("User already exists");
      } else {
        const user = new User({
          username,
          password,
          email,
        });
        user.save((err, user) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error saving new user.");
          } else {
            res.send({
              accessToken: generateAccessToken(
                { _id: user._id, role: user.role },
                false
              ),
              user: {
                username: user.username,
                email: user.email,
                id: user._id,
              },
            });
          }
        });
      }
    });
  } else {
    res.status(401).send("User already logged in.");
  }
});

module.exports = router;
