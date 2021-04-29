const express = require("express");
const path = require("path");
const danbooru = require("./utilities/danbooru");

const publicPath = path.join(__dirname + "/../public/");

const app = express();
const port = process.env.PORT || 3000;

// For CSS Styles
app.use(express.static(publicPath));

app.get("/", (req, res) => {
	res.sendFile(publicPath + "index.html");
});

app.listen(port, () => {
	console.log(`Listening at port ${port}`);
});

danbooru.getPost();
