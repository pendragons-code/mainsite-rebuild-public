const { readdir } = require("fs");
async function refreshArticleCache() {
	readdir("./public/picoctf", async (error, files) => {
		if(error) return logError(error)
	});
}
refreshArticleCache();
setInterval(refreshArticleCache, 3.6e+6);