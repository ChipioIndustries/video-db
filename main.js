var db = fetch('db.json').then(response => response.json()).catch(err => console.error(err))
db.array.forEach(element => {
	alert(element.title);
});