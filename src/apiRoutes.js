const express = require("express");
const routeApi = express.Router();

routeApi.get("/test", async (req, res) => {
	res.json({ "test": "hit!" });
});

module.exports = routeApi;