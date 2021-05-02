"use strict";

const keyword = document.getElementById("name-search");
const submit = document.querySelector("button");
const rank = document.querySelector("#rank");
const explicit = document.querySelector("#explicit");
const box = document.querySelector("#pic");
const downloadButton = document.querySelector("#download-btn");
const picbox = document.querySelector("#picbox");

// Event listener that handles search value retrieval
submit.addEventListener("click", (e) => {
	// Using prevent default method in order for browser to not refresh
	e.preventDefault();

	// Retrieving value from search bar
	const firstSearch = keyword.value;
	const search = firstSearch.replace(" ", "_");

	// Checking for rating
	const order = rank.checked ? `order:${rank.name}` : "";

	// Checking for explicit
	const rating = explicit.checked ? `rating:${explicit.name}` : `rating:safe`;

	fetch(`/posts?tags=${search} ${rating} ${order}`).then((res) => {
		res.json().then((data) => {
			if (!data) {
				const error = "<h1>Something went wrong with connection! :(</h1>";
				box.appendChild(error);
				return;
			}

			console.log(data);

			// Showing total posts retrieved
			totalPosts(data, firstSearch);

			// Condition to check if picture box currently has an image
			if (box.hasChildNodes()) {
				box.removeChild(box.firstChild);
			}

			insertImage(data.file_url);

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

// Function that adds download functionality to image
const download = (url) => {
	const type = url.substr(-3);
	downloadButton.href = url;
	downloadButton.target = "_blank";
	downloadButton.download = `sukipic.${type}`;
};

// Function that shows total posts found
const totalPosts = (data, search = "") => {
	const totalPosts = data.totalPosts;
	const heading = document.createElement("h3");

	// Checking if a keyword was not provided
	if (!search) {
		heading.innerHTML = "A random image was retrieved!";
	} else {
		heading.innerHTML = `${totalPosts} posts found with "${search}" keyword!`;
	}

	// Condition to check if picbox has an h3 element
	if (!picbox.hasChildNodes()) {
		picbox.insertAdjacentElement("afterbegin", heading);
	} else {
		picbox.removeChild(picbox.childNodes[0]);
		picbox.insertAdjacentElement("afterbegin", heading);
	}
};
