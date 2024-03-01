const express = require("express");
const route = express.Router();

const controller = require("../controller/order");

route.post("/", controller.addOrder);

module.exports = route;