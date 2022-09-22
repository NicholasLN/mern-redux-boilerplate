const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = bcrypt.hashSync(user.password, 10);
  }
  next();
});

userSchema.methods.verifyPassword = function (password) {
  if (!password) {
    return false;
  }
  return bcrypt.compareSync(password, this.password) && this.password !== "";
};

module.exports = mongoose.model("User", userSchema);
