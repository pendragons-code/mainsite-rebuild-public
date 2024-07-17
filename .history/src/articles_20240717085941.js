const { readdir } = require("fs");
async function refreshArticleCache() {
	readdir("./public/picoctf", async (error, files) => {
	});
}
refreshArticleCache();
setInterval(refreshArticleCache, 3.6e+6); // the reason why i put them in different loops is because I don't want the possibility of 1 loop crashing and taking both out
// that said, I will likely join them together


// I promise you, when I wrote this code the first time, I was drunk. I will fix this.

function refreshArticleCache() {
	readdir("./public/picoctf", async (error, files) => {
		if(error) return console.error(error.stack);
		for(file of files) {
			let friendl
		}
	});
}