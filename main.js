let data = [];
let tab = "video";
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
	document.getElementsByName("media-title").forEach((value, key, parent) => {
		value.remove();
	})
	data.forEach((value, index, array) => {
		//document.getElementById("insert-here").insertAdjacentHTML("afterend", "<p name='media-title'>" + value.title + "</p>")
	})
}

function makeEntryDisplay(entry) {

}

function getEntryByName(name) {
	return data.find((value) => value.name == name)
}

async function loadDb() {
	await fetch('db.json').then(response => response.json()).then(response => { data = response.data }).catch(err => console.error(err))
	updateResults();
}

window.onload = async function () {
	selectTab("video");
	setFilters();
	detectTabClicks();
	await loadDb();
}
