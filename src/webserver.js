const express = require("express");
const helmet = require("helmet");
const requestIp = require("request-ip");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const { join } = require("path"); // honestly should i just skip this and just concatenate it LMAO
const { appendFile } = require("fs");
const app = express();
const port = process.env.port || 3000;
const frontEndRoutes = require("./frontEndRoutes.js");

// global variables for picoctf articles
global.picoCtfUrl = []
global.picoCtfUrlDir = []

// database
const { QuickDB } = require("quick.db");
global.db = new QuickDB({ filePath: "DATABASE/DATABASE.sqlite" });

// request manager
require("./weather.js");

app.use(function(req, res, next) {
	res.setHeader("Content-Security-Policy", "frame-ancestors 'self';");
	next();
});

app.set("trust proxy", true);
app.set("view engine", "ejs");
app.set("views", join(__dirname, "../views"));
app.use(requestIp.mw());

app.use((req, res, next) => {
	//const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
	const ip = req.clientIp; // we will probably need to change this because nginx and proxying
	appendFile("Logs/ipLog.txt", `[${new Date()}] Client IP: ${ip}\n`, (error) => {
		if(error) console.error("Could not write ip to logfile", error);
	});
	next();
});

app.use("/", frontEndRoutes);
app.use(express.static(join(__dirname, "../public")));

app.use(function(req, res) {
	res.render("404.ejs");
});

app.use(helmet({
	contentSecurityPolicy: false,
	nosniff: true,
	xssFilter: true,
	hsts: { maxAge: 31536000, includesSubDomiains: true }
}));

app.listen((port), async() => {
	console.log(`Hanging onto dear life at ${process.pid}\nCurrently listening at http://localhost:${port}!`);
});