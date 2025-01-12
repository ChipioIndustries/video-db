var db = fetch('db.json').then(response => response.json()).then(data => {
	createTable(data)
}).catch(err => console.error(err))
alert(db[1].title);