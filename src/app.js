const Danbooru = require("danbooru");
const express = require("express");
const path = require("path");

const booru = new Danbooru();
const publicPath = path.join(__dirname + "/../public/");

console.log(publicPath);

const app = express();
const port = process.env.PORT || 3000;

// For CSS Styles
app.use(express.static(publicPath));

app.get("/", (req, res) => {
	res.sendFile(publicPath + "index.html");
});

booru.posts({ tags: "rating:safe order:rank" }).then((posts) => {
	// Select a random post from posts array
	const index = Math.floor(Math.random() * posts.length);
	const post = posts[index];

	// console.log(post);

	// Get post's url and create a filename for it
	const url = booru.url(post.file_url);
	const name = `${post.md5}.${post.file_ext}`;

	// console.log(url.href);

	// Download post image using node's https and fs libraries
	// require("https").get(url, (response) => {
	// 	response.pipe(require("fs").createWriteStream(name));
	// });
});

app.listen(port, () => {
	console.log(`Listening at port ${port}`);
});
