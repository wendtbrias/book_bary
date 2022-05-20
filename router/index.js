const express = require('express');
const router = express.Router();

const { getHomePage } = require("../controller/home");

router.get("/" , getHomePage);

module.exports = router;