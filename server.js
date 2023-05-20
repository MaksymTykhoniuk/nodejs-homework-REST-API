const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Max:18AU9l3IamAtkobg@cluster0.sitjxz0.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
