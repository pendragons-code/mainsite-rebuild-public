const { readdir } = require("fs");
async function refreshArticleCache() {
	readdir("./public/picoctf", async (error, files) => {
		if(error) return logError(error); // the consequences here are not really dire so we are oki
		for(picoctfArticles in )
	});
}
refreshArticleCache();
setInterval(refreshArticleCache, 3.6e+6);