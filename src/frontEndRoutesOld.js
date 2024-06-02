const express = require("express");
const routeFrontEnd = express.Router();
const endpointToPage = {
	"/contact": "contact",
	"/hug": "huggie",
	"/": { name: "landingPage", variables: [ weather ] }
}; // might wanna move this to a json file so in the future we can add pages without restarting

for(endPoint of Object.keys(endpointToPage)) {
	routeFrontEnd.get(`/${endPoint}`, async (req, res) => {
		res.render(endpointToPage[`${endPoint}`].name);
	});
}

module.exports = routeFrontEnd;