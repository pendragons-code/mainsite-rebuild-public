const express = require("express");
const routeFrontEnd = express.Router();

routeFrontEnd.get(`/`, async (req, res) => {
	let getWeather = await db.get("weather")
	let weatherFinalFromGet = getWeather[2]
	let weather = `
	<br><p>${getWeather[0].summary}</p>
		\n<ul>
		\n<li>${weatherFinalFromGet}</li>
		\n<li>Average temperature is ${getWeather[0].temperature}°C.</li>
		\n<li>Wind chill is ${getWeather[0].wind_chill}°C.</li>
		\n<li>Dew point is ${getWeather[0].dew_point}°C.</li>
		\n<li>Feels like ${getWeather[0].feels_like}°C.</li>
		\n<li>Wind is blowing towards <b>${getWeather[0].wind.dir}</b>.</li>
		\n<li>Wind speed is about ${getWeather[0].wind.speed} km/h.</li>
		\n</ul>`

	res.render("landingPage", { weather: weather });
});

module.exports = routeFrontEnd;