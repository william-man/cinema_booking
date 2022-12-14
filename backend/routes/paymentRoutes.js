const express = require("express");
const router = express.Router();
const { checkout } = require("../controllers/paymentControllers");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/pay", urlencodedParser, jsonParser, checkout);

module.exports = router;
