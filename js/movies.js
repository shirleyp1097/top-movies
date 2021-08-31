

fetch('https://spangled-capable-lightning.glitch.me/movies')
.then(response => response.json())
.then($('#loading').html(""))
.then(data => formatMovies(data))
.catch(console.error)



function formatMovies(movies){
    let html = ""
    movies.forEach((movie, index ,arr) =>{
        if(movie.hasOwnProperty('title')) {
            html += '<h4>' + movie.title + '</h4>' +
                '<p>' + movie.rating + '/5' + '</p>'
        }})
    $('#movie-list').html(html);
}

/// what are we trying to do?

/// display a loading message

/// finished list of movies

/// ability to add movies

/// ability to delete movies

///what is the mvp?
///what can we add to the project?
