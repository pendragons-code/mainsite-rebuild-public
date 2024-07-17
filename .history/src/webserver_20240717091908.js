const express = require("express");
const expressStaticGzip = require("express-static-gzip");
const helmet = require("helmet");
const requestIp = require("request-ip");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const { join } = require("path"); // honestly should i just skip this and just concatenate it LMAO
const { appendFile } = require("fs");
const app = express();
const port = process.env.port || 3000;
const frontEndRoutes = require("./frontEndRoutes.js");
const apiRoutes = require("./apiRoutes.js");


// database
const { QuickDB } = require("quick.db");
global.db = new QuickDB({ filePath: "DATABASE/DATABASE.sqlite" });

// request manager
require("./weather.js");
require("./articles.js");

app.use(function (req, res, next) {
	res.setHeader("Content-Security-Policy", "frame-ancestors 'self';");
	next();
});

app.set("trust proxy", true); // ok maybe not a good idea, but nginx, so it is forgiven
app.set("view engine", "ejs");
app.set("views", join(__dirname, "../views"));
app.use(requestIp.mw());

app.use((req, res, next) => {
	//const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
	const ip = req.clientIp; // we will probably need to change this because nginx and proxying
	appendFile("Logs/ipLog.txt", `[${new Date()}] Client IP: ${ip}\n`, (error) => {
		if(error) console.error("Could not write ip to logfile", error);
	});
	next();
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});


app.use(helmet({
	contentSecurityPolicy: false,
	nosniff: true,
	xssFilter: true,
	hsts: { maxAge: 31536000, includesSubDomains: true } // not way i made a typo here WOT THE HELLLLLL
}));

app.use("/", frontEndRoutes);
app.use("/api", apiRoutes);
app.use("/", expressStaticGzip(join(__dirname, "../public"), {
	enableBrotli: true,
	orderPreference: ["br", "gzip"],
	cacheControl: true,
	immutable: true,
	maxAge: "30d"
}));

app.use(function (req, res) {
	res.render("404.ejs");
});

app.listen((port), async () => {
	console.log(`Hanging onto dear life at ${process.pid}\nCurrently listening at http://localhost:${port}!`);
});