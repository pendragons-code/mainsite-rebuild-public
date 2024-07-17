const { readdir } = require("fs");
async function refreshArticleCache() {
	readdir("./public/picoctf", async (error, files) => {
		
	});
}
refreshArticleCache();
setInterval(refreshArticleCache, 3.6e+6);

function refreshArticleCache() {
	readdir("./public/picoctf", async (error, files) => {
		if(error) return console.error(error.stack);
		for(file of files) {
			let friendl
		}
	});
}