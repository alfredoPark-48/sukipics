const Danbooru = require("danbooru");

const booru = new Danbooru();

const getPost = (tag = "", callback) =>
	booru.posts({ tags: `${tag}`, limit: 100 }).then((posts) => {
		// Select a random post from posts array
		const index = Math.floor(Math.random() * posts.length);
		console.log(posts.length);
		const post = posts[index];

		if (post.file__ext === "zip" || post.file__ext === "mp4") {
			post = post[index++];
		}

		callback(post);
	});

exports.getPost = getPost;
