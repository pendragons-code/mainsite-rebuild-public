require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const axios = require("axios");

async function getWeather() {
	let newWeatherDateObj = new Date();
	let newWeatherDate = `${newWeatherDateObj.getDate()}-${newWeatherDateObj.getMonth()+1}-${newWeatherDateObj.getFullYear()}`;
	let currentWeather = await db.get("weather");
	if(currentWeather === null) currentWeather = ["Not Available!", "Not Available!"];
	if(currentWeather[1] === newWeatherDate) return; // check if the data is duplicate, ignores if it is

	// before i begin about the stupidity about the situation i just wanna say that it seem that the docs have been deleted and i know this is the weirdest name i can come up with
	let weatherTypeOld = currentWeather[0]; // I am hoping that the data is what i think it is
	let weatherTimeOld = currentWeather[1]; // whadahelllllllllll

	const options = {
		method: "GET",
		url: "https://ai-weather-by-meteosource.p.rapidapi.com/daily",
		params: { lat: '1.352230N', lon: '103.711342E', language: 'en', units: 'metric' },
		headers: {
			"X-RapidAPI-Key": process.env.weatherAPIKey,
			"X-RapidAPI-Host": "ai-weather-by-meteosource.p.rapidapi.com"
		}
	};

	axios.request(options)
	.catch(async (error) => {
		await db.set("weather", [weatherTypeOld, weatherTimeOld]);
		console.error(error.stack);
	})
	.then(async (result) => {
		if(!result || result.detail) return await db.set("weather", [weatherTypeOld, weatherTimeOld]); // ok so I am not really sure wot happened here, but it seems that if there is a result.detail it means that there is an error
		let style, weatherResult = result.data.daily.data[0].weather;
		if(weatherResult.includes("cloudy") || result.data.daily.data[0].weather === "overcast" || weatherResult.includes("sunny")) style = `<i class="fa-solid fa-cloud fa-beat-fade" style="color: #f5bc92;"> </i> ${result.data.daily.data[0].weather.replaceAll("_", " ").toUpperCase()} (weather code)`;
		if(weatherResult.includes("rain") || weatherResult.includes("shower")) style = `<i class="fa-solid fa-umbrella fa-beat-fade" style="color:#f5bc92;"> </i> ${result.data.daily.data[0].weather.replaceAll("_", " ").toUpperCase()} (weather code)`;
		if(weatherResult.includes("storm")) style = `<i class="fa-solid fa-cloud-bolt fa-beat-fade" style="color: #f5bc92;"> </i> ${result.data.daily.data[0].weather.replaceAll("_", " ").toUpperCase()} (weather code)`;
		let newWeatherInfo = [result.data.daily.data[0], newWeatherDate, style];
		await db.set("weather", newWeatherInfo);
	});
}

getWeather();
setInterval(getWeather, 3.6e+6);
