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

    fetch(omdbURL + "Don Jon")
        .then(res => res.json())
        .then(data => {

            let html = `
                <div class="container" id="overlay" style="display:none">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${data.Poster}">
                        </div>
                        <div class="col-md-8">
                            <h2>${data.Title} (${data.Year})</h2>
                            <h5>${data.Rated} | ${data.Genre} | ${data.Runtime}</h5>
                            <p> ${data.Plot}</p>
                        </div>
                    </div>
                </div>
            `
            $('#movie-list').html(html);

            let originalhtml = `<button id="moreInfo">More Info</button>`
            $('body').append(originalhtml);
            $('#moreInfo').on('click', function(e) {
                $('#overlay').css("display","block")});

            $('#overlay').on('click', function(e) {
                $('#overlay').css("display","none")});

        })
        .catch(console.error);

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
                        let html = "";
                        let img = "";
                        html += `<div class="col-md-3 card">`
                        if (data.Error || data.Poster == "N/A") {
                            img =  `<img class="card-img-top p-2" src="https://www.reelviews.net/resources/img/default_poster.jpg">`
                        } else {
                            img = `<img class="card-img-top p-2" src="${data.Poster}">`
                        }
                        html += img;
                        html += `
                            <h4>${movie.title}</h4>
                            <div class="row">
                                <button class="more-info btn btn-primary col-md-6" id="${movie.id}">More Info</button>
                                <button class="delete-button btn btn-danger col-md-6" id="${movie.id}">Delete Movie</button>
                            </div>
                            </div>
                        `;
                        $('#movie-list').append(html);

                        // Add more info view but hidden
                        let moreInfoHtml = `
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-4">
                                        
                                    </div>
                                    <div class="col-md-8">
                                    
                                    </div>
                                </div>
                            
                            </div>
                        `;

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

    // MORE INFO
    // $(document).on('click','.more-info', function() {
    //     console.log($(this).)
    //     // fetch(omdbURL + )
    // })

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



