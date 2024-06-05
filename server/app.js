const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/temp");
require("./db/conn");
app.use(express.json());
app.use(cors());

app.use("/api", router);
app.get("/", () => {
  console.log("hello");
});

app.listen(5000, () => {
  console.log(`Server is Run on the Port is : 5000`);
});
