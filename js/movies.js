fetch('https://spangled-capable-lightning.glitch.me/movies')
.then(response => response.json())
.then(data => console.log(data))
.catch(console.error)