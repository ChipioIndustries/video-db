let data = {};

function update_visual() {
	document.getElementsByName("media-title").forEach((value, key, parent) => {
		value.remove();
	})
	data.forEach((value, index, array) => {
		document.getElementById("insert-here").insertAdjacentHTML("afterend", "<p name='media-title'>" + value.title + "</p>")
	})
}

async function handleDb() {
	await fetch('db.json').then(response => response.json()).then(response => { data = response.data }).catch(err => console.error(err))
	update_visual();
}

handleDb();
