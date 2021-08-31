

const url = 'https://spangled-capable-lightning.glitch.me/movies'

// INITALIZATION
fetch(url)
.then(response => response.json())
.then($('#loading').html(""))
.then(data => formatMovies(data))
.catch(console.error)





function formatMovies(movies){
    let html = ""
    movies.forEach((movie, index ,arr) =>{
        // if(movie.hasOwnProperty('title')) {
        //     html += '<h4>' + movie.title + '</h4>' +
        //         '<p>' + movie.rating + '/5' + '</p>'
        // }
        html += '<h4>' + movie.title + '</h4>' +
                '<p>' + movie.rating + '/5' + '</p>'
        })
    $('#movie-list').html(html);

}


// function addMovies(){
$('#submit-button').click(function(e){
    e.preventDefault()
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
        .then(displayMovies)
        .catch(console.error);
    })


$('#user-movie').click(function(e) {
    e.preventDefault();
    alert('hello');

        // const options = {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }
        // fetch(url, options)
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .then(displayMovies)
        //     .catch(console.error)
    })






function displayMovies() {
    fetch(url)
        .then(response=> response.json())
        .then(data =>
        {formatMovies(data);
            console.log(data)})
        .catch(console.error)
}


/// ability to delete movies

///what is the mvp?
///what can we add to the project?
