"use strict";

const keyword = document.getElementById("name-search");
const submit = document.querySelector("button");
const rank = document.querySelector("#rank");
const explicit = document.querySelector("#explicit");
const box = document.querySelector("#pic");
const downloadButton = document.querySelector("#download-btn");

// Event listener that handles search value retrieval
submit.addEventListener("click", (e) => {
	// Using prevent default method in order for browser to not refresh
	e.preventDefault();

	// Retrieving value from search bar
	const search = keyword.value;

	// Checking for rating
	const order = rank.checked ? `order:${rank.name}` : "";

	// Checking for explicit
	const rating = explicit.checked ? `rating:${explicit.name}` : `rating:safe`;

	fetch(`/posts?tags=${search} ${rating} ${order}`).then((res) => {
		res.json().then((data) => {
			if (!data) {
				box.appendChild(<h1>Error getting image! :(</h1>);

				return;
			}

			const type = data.file_url.substr(-3);
			if (type !== "mp4") {
				insertImage(data.file_url);
			} else {
				insertVideo(data.file_url);
			}

			downloadButton.classList.remove("hidden");
			download(data.file_url);
		});
	});
});

// Function that inserts an image to picture box
const insertImage = (url) => {
	const img = document.createElement("img");
	img.src = url;
	img.classList.add("picture");
	box.appendChild(img);
};

const insertVideo = (url) => {
	const vid = document.createElement("video");
	const source = document.createElement("source");
	source.src = "url";

	box.appendChild(vid);
	vid.appendChild(source);
};

// Function that adds download functionality to image
const download = (url) => {
	const type = url.substr(-3);
	console.log(type);
	downloadButton.href = url;
	downloadButton.download = `sukipic.${type}`;
};
