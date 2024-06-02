const { readdir } = require("fs");
async function refreshArticleCache() {
	readdir("./public/picoctf", async (error, files) => {
		if(error) return console.error(error);
		for(file of files) {
			let friendlyName = file.replaceAll(".html", "");
			let directory = `/picoctf/${file}`;
			if(!picoCtfUrl.includes(friendlyName)) {
				picoCtfUrlDir.push(directory);
				return picoCtfUrl.push(friendlyName);
			}
		}
	});
}