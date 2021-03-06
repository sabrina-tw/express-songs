const mongoose = require("mongoose");

const mongoOptions = {
  useNewUrlParser: true, // prevent deprecation warnings
  useUnifiedTopology: true,
  useFindAndModify: false, // For find one and update
  useCreateIndex: true, // for creating index with unique
};

// will create a new db if does not exist
const dbName = "songs";
const dbUrl =
  process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017/" + dbName
    : process.env.MONGODB_URI;
mongoose.connect(dbUrl, mongoOptions);
const db = mongoose.connection;

// event emitters
// console.error() implementation expects its this value to be set to window.console
// read https://www.tjvantoll.com/2015/12/29/console-error-bind/
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log(`connected to mongodb at ${dbUrl}`);
});
