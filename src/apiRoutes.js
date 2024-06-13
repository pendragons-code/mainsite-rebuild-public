const express = require("express");
const routeApi = express.Router();
const xss = require("xss");
const { encode } = require("html-entities");

routeApi.get("/test", async (req, res) => {
	res.json({ "test": "hit!" });
});

// ngl this is a really dumb way to do this
// Function to sanitize input using xss library
function sanitizeInput(input) {
	return xss(input);
}
// Function to encode output using html-entities library
function encodeOutput(output) {
	return encode(output);
}

// note that these do not serve any real use case now, but will likely be used in the future
module.exports = routeApi;