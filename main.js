var db = await fetch('db.json').then(response => response.json()).catch(err => console.error(err))
console.log(db.data[0].title)