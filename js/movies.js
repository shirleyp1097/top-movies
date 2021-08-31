

const url = 'https://spangled-capable-lightning.glitch.me/movies'

fetch(url)
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


function addMovies(){
    $('#submit-button').click(function(e){
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title:$('#user-movie').val(),
                rating:$('#user-rating').val()
            }),
        };
        fetch(url, options)
            .then(response => response.json())
            // .then(data => formatMovies(data))
            .catch(console.error)

        // console.log($('#user-movie').val());
        // console.log($('#user-rating').val());
    })
}
addMovies()

fetch(url)
    .then(response=> response.json())
    .then(data => formatMovies(data))
    .catch(console.error)

/// ability to add movies

/// ability to delete movies

///what is the mvp?
///what can we add to the project?
