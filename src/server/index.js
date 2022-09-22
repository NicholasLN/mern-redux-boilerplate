require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const { logExpress, logDB, logGame, logError } = require("./utils/logging");
const jsonParser = express.json();
const urlEncodedParser = express.urlencoded({ extended: true });

app.use(jsonParser);
app.use(urlEncodedParser);

// MONGOOSE SETUP!
const mongoose = require("mongoose");
if (!process.env.MONGODB_URI_CONNECTION_STRING) {
  logError("MONGODB_URI_CONNECTION_STRING not set in environment variables.");
  process.exit(1);
} else {
  mongoose.connect(
    `${process.env.MONGODB_URI_CONNECTION_STRING}/${process.env.MONGODB_DB_NAME}`,
    { useNewUrlParser: true }
  );
  mongoose.connection.on("connected", () => {
    logDB("Connected to MongoDB.");
  });
  mongoose.connection.on("error", (err) => {
    logError(`Error connecting to MongoDB: ${err}`);
  });
  mongoose.Promise = global.Promise;
}

// We will now use our authentication middleware
// This will initialize a session for each user based on their authorization header.
// If a user has no authorization token, then their session is set to { id: false, role:"guest"}
app.use(require("./jwtVerificationMiddleware"));

// Routes
// User Actions (login, logout, etc)
app.use("/api/v1/user/userActions", require("./routes/user/useractions"));
app.use("/api/v1/user/userInfo", require("./routes/user/userinfo"));

app.use(express.static(`${process.env.BUILD_OUTPUT}`));
if (process.env.NODE_ENV.toUpperCase() == "PRODUCTION") {
  app.get("/*", function (req, res) {
    res.sendFile(
      path.join(__dirname + `../../../${process.env.BUILD_OUTPUT}/index.html`)
    );
  });
}

server.listen(process.env.PORT || 8080, () => {
  logExpress(`Server listening on port ${process.env.PORT || 8080}`);
});
