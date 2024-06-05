const express = require("express");
// const { getProduct } = require("../controller/product");
const { trendFromTwitter, fetchData } = require("../controller/trending");

const router = express.Router();

router.get("/trending/fetch", trendFromTwitter);
router.get("/trending/allItem", fetchData);

module.exports = router;
