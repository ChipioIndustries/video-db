let data = [];
let mediaTypes = {};
let videoTypes = {};
let searchTerm = "";
let selection = null;

function setFilterFromURL() {
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
		document.querySelector(".entries").insertAdjacentHTML("beforeend", makeEntryDisplay(value))
	})
}

function formatSeconds(sec_num) {
	var hours = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (minutes < 10) { minutes = "0" + minutes; }
	if (seconds < 10) { seconds = "0" + seconds; }
	return hours + ':' + minutes + ':' + seconds;
}

function makeEntryDisplay(entry) {
	let year = entry.year.toString()
	if (entry["year-end"]) {
		year = entry.year.toString() + ` - ` + entry["year-end"]
	}
	let display = `
	<div id="entry-`+ entry.name + `" class="entry" name="` + entry.name + `">
		<img src="covers/`+ entry.name + `.png" class="cover">
		<div class="entry-details">
			<div class="entry-title-div"><h2 class="entry-title">`+ entry.title + ` (` + year + `)</h2> <h3 class="creator-name">by ` + entry.creator + `</h3></div>
			<p class="entry-detail"><b>Media Type:</b> `+ entry["media-type"] + `</p>`
	if (entry["video-type"]) {
		display = display + `<p class="entry-detail"><b>Video Type:</b> ` + entry["video-type"] + `</p>`
	}
	if (entry["media-format"]) {
		display = display + `<p class="entry-detail"><b>Media Format:</b> ` + entry["media-format"] + `</p>`
	}
	if (entry.runtime) {
		display = display + `<p class="entry-detail"><b>Runtime:</b> ` + formatSeconds(entry.runtime) + `</p>`
	}
	display = display + `
			<p class="entry-detail"><b>UPC:</b> ` + entry.upc + `</p>
			<p class="description">`+ entry.description + `</p>
			<div>
				<a href="details?name=` + entry.name + `" class="details"><b>Details \></b></a>
			</div>
		</div>
	</div>
`

	return display
}

function getFilteredData() {
	return data.filter((value, index, array) => {
		if (mediaTypes[value["media-type"]] && videoTypes[value["video-type"]] && value.title.toLowerCase().search(searchTerm.toLowerCase()) != -1) {
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
	await fetch('db.json')
		.then(response => response.json())
		.then(response => { data = response.data })
		.catch(err => console.error(err))
	updateResults();
}

function handleFilters() {
	document.querySelectorAll(".media-type-input").forEach((value, key, parent) => {
		mediaTypes[value.getAttribute("value")] = value.checked;
		value.addEventListener("change", () => {
			mediaTypes[value.getAttribute("value")] = value.checked;
			updateResults();
		})
	})

	document.querySelectorAll(".video-type-input").forEach((value, key, parent) => {
		videoTypes[value.getAttribute("value")] = value.checked;
		value.addEventListener("change", () => {
			videoTypes[value.getAttribute("value")] = value.checked;
			updateResults();
		})
	})

	document.querySelector("#filter").addEventListener("input", () => {
		searchTerm = document.querySelector("#filter").value;
		updateResults();
	})
}

window.onload = async function () {
	setFilterFromURL();
	handleFilters();
	await loadDb();
}
