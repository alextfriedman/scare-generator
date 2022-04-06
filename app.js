// 1. On button click, pick a random horror movie
// 2. Display horror movie title, poster, & plot on the page

// isolate all horror movies (in an array)
// clear page upon new selection (.empty)

// Creating namespace object
const app = {};

// Adding the API key to the app
app.apiKey = "5ac48a289c9996359f09b28d225c9fb9";

app.tmdbBaseUrl = "https://api.themoviedb.org/3/discover/movie";

// Selectors
app.$title = $(".movieTitle");
app.$poster = $(".poster");
app.$moviePlot = $(".moviePlot");

app.getRandomElement = (array) => {
    // pass in an array, return a random object in that array
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

// Function to pull a random horror movie from the API
app.setMovie = () => {
    $.ajax({
        url: app.tmdbBaseUrl,
        method: "GET",
        dataType: "json",
        data: {
            api_key: app.apiKey,
            with_genres: 27,
            sort_by: "vote_average.desc",
            "vote_count.gte": 500,
            "release_date.lte": "1990",
        }
    }).then((responseMovie) => {
        const randomMovie = app.getRandomElement(responseMovie.results);
        app.$title.append(randomMovie.title);
        app.$poster.attr("src", `https://image.tmdb.org/t/p/w500/${randomMovie.poster_path}`);
        app.$poster.attr("alt", `poster for ${randomMovie.title}`);
        app.$moviePlot.append(randomMovie.overview);
    });
}

// New movie selection each time button is clicked
app.refreshMovie = () => {
    app.$title.empty();
    app.$moviePlot.empty();
    app.$poster.empty();
    app.setMovie();
}


//init function
app.init = () => {
    // event listener for when user clicks the button
    $("button").on("click", () => {
        app.refreshMovie();
    })
}

// Calling the init function
$(document).ready(() => {
    app.init();
})