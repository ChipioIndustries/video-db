var db = fetch('db.json').then(response => response.json()).catch(err => console.error(err))
console.log(db)