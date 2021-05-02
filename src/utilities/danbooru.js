const Danbooru = require("danbooru");
const booru = new Danbooru();

const getPost = (tag = "", callback) =>
	booru.posts({ tags: `${tag}`, limit: 200 }).then((posts) => {
		// Select a random post from posts array
		const index = Math.floor(Math.random() * posts.length);
		let post = posts[index];

		while (
			post === undefined ||
			post.file_ext === "zip" ||
			post.file_ext === "mp4" ||
			post.file_ext === undefined
		) {
			let newIndex = Math.floor(Math.random() * posts.length);
			post = posts[newIndex];
		}

		// Adding attribute to return total posts
		post.totalPosts = posts.length;

		// Get post's url and create a filename for it
		const url = booru.url(post.file_url);
		const name = `sukipic.${post.file_ext}`;

		// Download post image using node's https and fs libraries
		require("https").get(url, (response) => {
			response.pipe(require("fs").createWriteStream(name));
		}); //

		callback(post);
	});

exports.getPost = getPost;
