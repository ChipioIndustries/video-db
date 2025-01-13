let data = [];
let tab = "video";
let contentType = "movie";
let searchTerm = "";
let selection = null;

function selectTab(tabName) {
	tab = tabName;
	document.querySelectorAll(".tab").forEach((value, index, array) => {
		if (value.getAttribute("name") == tabName) {
			value.classList.add("selected");
		} else {
			value.classList.remove("selected");
		}
	});
	document.querySelectorAll(".tab-page").forEach((value, index, array) => {
		if (value.getAttribute("name") == tabName) {
			value.classList.remove("hidden")
		} else {
			value.classList.add("hidden")
		}
	})
}

function detectTabClicks() {
	document.querySelectorAll(".tab").forEach((value, index, array) => {
		value.onclick = function () {
			selectTab(value.name);
		}
	})
}

function setFilters() {
	const url = new URL(window.location.toString()).searchParams;
	if (url.get("selection")) {
		document.querySelector("#filter").value = url.get("selection");
	}
}

function updateResults() {
	document.querySelectorAll(".entry").forEach((value, key, parent) => {
		value.remove();
	})
	getFilteredData().forEach((value, index, array) => {
		document.querySelector("#video-tab-page").insertAdjacentHTML("beforeend", makeEntryDisplay(value))
	})
}

function makeEntryDisplay(entry) {
	return `
	<div id="entry-`+ entry.name + `" class="entry" name="` + entry.name + `">
		<img src="covers/`+ entry.name + `.png" class="cover">
		<div class="entry-details">
			<h2 class="entry-title">`+ entry.title + `</h2>
			<p><b>UPC:</b> `+ entry.upc + `</p>
			<p class="description">`+ entry.description + `</p>
		</div>
	</div>
`
}

function getFilteredData() {
	return data.filter((value, index, array) => {
		if (value["media-type"] == tab && value["content-type"] == contentType && value.title.toLowerCase().search(searchTerm.toLowerCase()) != -1) {
			return true
		} else {
			return false
		}
	})
}

function getEntryByName(name) {
	return data.find((value) => value.name == name)
}

async function loadDb() {
	await fetch('db.json').then(response => response.json()).then(response => { data = response.data }).catch(err => console.error(err))
	updateResults();
}

function handleFilters() {
	document.querySelector("#media-type").addEventListener("change", () => {
		contentType = document.querySelector("#media-type").value;
		updateResults();
	})
	document.querySelector("#filter").addEventListener("input", () => {
		searchTerm = document.querySelector("#filter").value;
		updateResults();
	})
}

window.onload = async function () {
	selectTab("video");
	setFilters();
	handleFilters();
	detectTabClicks();
	await loadDb();
}
