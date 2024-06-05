const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });
const DB = process.env.DATABASE;

mongoose.set("strictQuery", true);

mongoose
  .connect(`${DB}`)
  .then(() => {
    console.log(`connect succeesfully`);
  })
  .catch((err) => {
    console.log(err);
  });
