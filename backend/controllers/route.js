const express = require("express");
const router = express.Router();


const userAuthRoute = require("./user-auth/_routes");

//Api`s
router.use("/user", userAuthRoute);

module.exports = router;
