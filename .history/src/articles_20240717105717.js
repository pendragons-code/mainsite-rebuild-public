const { readdir } = require("fs");
async function refreshArticleCache() {
	readdir("./public/picoctf", async (error, files) => {
		if(error) return console.log(error.stack);
		for(file of files) {
			let friendlyFileName = file.replaceAll(".html", "");
			let directory = `/picoctf/${file}`;
			if(picoCtfUrl.includes(friendlyFileName)) return;
			picoCtfUrl.push(friendlyFileName); //  but i will have this here in case we need it in the future, may consider using sets instead
			picoCtfUrlDir.push(directory); //  we might not even need this
			picoCtfArticlesNames += `<li><a href="${directory}"><u>${friendlyFileName}</u></a><br></li>`;
		}
	});

	readdir("./public/blogStuff", async (error, files) => {
		if(error) return console.error(error.stack);
		for(file of files) {
			let friendlyFileName = file.replaceAll(".html", "");
			let directory = `/blogStuff/${file}`;
			if(articlesUrl.includes(friendlyFileName)) return;
			articlesUrl.push(friendlyFileName);
			articlesUrlDir.push(directory);
			articlesNames += `<li><a href="${directory}"><u>${friendlyFileName}</u></a><br></li>`;
			console.log(articlesNames);
		}
	});
}
refreshArticleCache();

// setInterval(refreshArticleCache, 3.6e+6);