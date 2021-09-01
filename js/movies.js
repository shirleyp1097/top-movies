
const url = 'https://spangled-capable-lightning.glitch.me/movies'
updateDropdown();
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
                '<p>' + movie.rating + '/5' + '</p>' +
            `<button class="delete-button" id=${movie.id}>` + 'Delete Movie' + '</button>'
        // console.log(movie.id);

        })


    $('#movie-list').html(html);

}


$(document).on('click','.delete-button', function() {

    let buttonNumber = $(this).attr('id')

    console.log(buttonNumber);

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(url + '/' + String(buttonNumber), options)
        .then(response => console.log(response.json()))
        .then(displayMovies)
        .then(updateDropdown)
        .catch(console.error);
});

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
        .then(updateDropdown)
        .then(displayMovies)
        .catch(console.error);
})


function displayMovies() {
    fetch(url)
        .then(response=> response.json())
        .then(data =>
        {formatMovies(data);
            console.log(data)})
        .catch(console.error)
}

function updateDropdown(){
fetch(url)
    .then(response => response.json())
    .then(movies => {
        let html = "";
        html += '<select>'
        movies.forEach((movie) =>
            html += `<option value=${movie.id}>`+ movie.title + '</option>'
        )
        html += '</select>'
        $('#all_movies').html(html)
    })}

$('#submit-edit').click(function(e) {
    e.preventDefault();
    let originalMovieName = $('#all_movies').val();
    let changedMovieName = $('#new-movie-title').val();
    let changedMovieRating = $('#new-user-rating').val();
    console.log(originalMovieName)


    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: changedMovieName,
            rating: changedMovieRating
        }),
    };

    fetch(url + '/' + originalMovieName, options)
        .then(updateDropdown)
        .then(displayMovies)
        .catch(console.error);
})




///what is the mvp?
///what can we add to the project?
