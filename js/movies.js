const url = 'https://spangled-capable-lightning.glitch.me/movies';
const omdbURL = `http://www.omdbapi.com/?apikey=${OMDB_KEY}&t=`


$(document).ready(function() {
    // INITIALIZATION
    (function startPage() {
        fetch(url)
            .then(response => response.json())
            .then($('#loading').html(""))
            .then(() => displayMovies())
            .catch(console.error)
    })();

    function displayMovies() {
        fetch(url)
            .then(response => response.json())
            .then(data => formatMovies(data))
            .catch(console.error)
    }

    function formatMovies(movies){
        // UPDATE DISPLAYED MOVIES
        $('#movie-list').html("");
        movies.forEach((movie, index ,arr) => {
                fetch(omdbURL + movie.title)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.Error) {
                            let movieHtml = `
                        <div class = "col-md-3 card">
                            <img src="https://www.reelviews.net/resources/img/default_poster.jpg">
                            <h4>${movie.title}</h4>
                            <button class="delete-button" id="${movie.id}">Delete Movie</button>
                        </div>
                    `;
                            $('#movie-list').append(movieHtml);
                        } else {
                            let movieHtml = `
                        <div class = "col-md-3 card">
                            <img src="${data.Poster}">
                            <h4>${movie.title}</h4>
                            <button class="delete-button" id="${movie.id}">Delete Movie</button>
                        </div>
                    `;
                            $('#movie-list').append(movieHtml);
                        }
                    })
                    .catch(console.error);
        })


        // UPDATE EDIT MOVIE SELECT FORM
        html = "";
        html += '<select>'
        movies.forEach((movie) =>
            html += `<option value=${movie.id}>`+ movie.title + '</option>'
        )
        html += '</select>'
        $('#all_movies').html(html);
    }

    // DELETE FUNCTIONALITY
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
            .then(() => displayMovies())
            .catch(console.error);
    });

    // ADD NEW MOVIE
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
        $('#user-movie').val("");
    })


    // UPDATE MOVIE
    $('#submit-edit').click(function(e) {
        e.preventDefault();
        let originalMovieName = $('#all_movies').val();
        let changedMovieName = $('#new-movie-title').val();
        let changedMovieRating = $('#new-user-rating').val();

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
            .then(displayMovies)
            .catch(console.error);
    })
})

