"use strict";

const search = document.getElementById("name-search");
const submit = document.querySelector("button");

// Event listener that handles search value retrieval
submit.addEventListener("click", (e) => {
	// Using prevent default method in order for browser to not refresh
	e.preventDefault();

	// Retrieving value from search bar
	const searching = search.value;

	console.log(searching);
});
