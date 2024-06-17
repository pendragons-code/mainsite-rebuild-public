const { readdir } = require("fs");
async function refreshArticleCache() {
	readdir("./public/picoctf", async (error, files) => {
		if(error) return console.error(error.stack);
		for (file of files) {
			let friendlyName = file.replaceAll(".html", "");
			let directory = `/picoctf/${file}`;
			if(!picoCtfUrl.includes(friendlyName)) {
				picoCtfUrlDir.push(directory);
				picoCtfUrl.push(friendlyName)
				if(picoCtfUrl.length !== 0) {
					for (let i = 0; i < picoCtfUrlDir.length; ++i) {
						picoCtfArticlesNames += `<li><a href="${picoCtfUrlDir[i]}"><u>${picoCtfUrl[i]}</u></a><br></li>`; // might actually be the dumbest idea i ever had.\
					}
				}
				return;
			}
		}
	});
	readdir("./public/blogStuff", async (error, files) => {
		if(error) return console.error(error.stack);
		for (file of files) {
			let friendlyName = file.replaceAll(".html", "");
			let directory = `/blogStuff/${file}`;
			if(!articlesUrl.includes(friendlyName)) {
				articlesUrlDir.push(directory);
				articlesUrl.push(friendlyName)
				if(articlesUrl.length !== 0) {
					for (let i = 0; i < articlesUrlDir.length; ++i) {
						articlesNames += `<li><a href="${articlesUrlDir[i]}"><u>${articlesUrl[i]}</u></a><br></li>`; // might actually be the dumbest idea i ever had.\
					}
				}
				return;
			}
		}
	});
}
refreshArticleCache();
setInterval(refreshArticleCache, 3.6e+6); // the reason why i put them in different loops is because I don't want the possibility of 1 loop crashing and taking both out
// that said, I will likely join them together