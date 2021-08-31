fetch('https://spangled-capable-lightning.glitch.me/movies')
.then(response => response.json())
.then(data => formatMovies(data))
.catch(console.error);


function formatMovies(movies){
    let html = ""
    movies.forEach((movie, index ,arr) =>{
         html += '<p>' + movie.title + '</p>'
    })
    $('#movie-list').html(html);
}

/// what are we trying to do?

/// display a loading message

/// finished list of movies

/// ability to add movies

/// ability to delete movies

///what is the mvp?
///what can we add to the project?
