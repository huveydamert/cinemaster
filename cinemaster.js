const apiKey = 'da26c170cce829a75070a59add74c5d5';
const MOVIE_POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';


document.getElementById('search-button').addEventListener('click', searchMovies);
document.getElementById('search-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchMovies();
    }
});

async function searchMovies() {
    const searchInput = encodeURIComponent(document.getElementById('search-input').value);
    if (searchInput) {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`;

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                if (data.results) {
                    displayMovies(data.results);
                } else {
                    console.error('No results found.');
                }
            } else {
                console.error('Failed to fetch data. Status:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});



//Rest of the code... Got help from ChatGPT


function displayMovies(movies) {
    const movieListContainer = document.getElementById('movie-list-container');
    const movieList = document.getElementById('movie-list');
    // console.log('movieListContainer:', movieListContainer);
    // console.log('movieList:', movieList);
    if (movieList) {
        movieList.innerHTML = '';
    }

    const noMoviesMessage = document.getElementById('no-movies-message');
    if (noMoviesMessage) {
        movieListContainer.removeChild(noMoviesMessage);
    }

    if (!movieListContainer || !movieList) {
        console.error('movieListContainer or movieList is null.');
        return;
    }

    if (movies.length === 0) {
        const noMoviesMessage = document.createElement('p');
        noMoviesMessage.id = 'no-movies-message';
        noMoviesMessage.textContent = 'No movies found.';
        movieListContainer.appendChild(noMoviesMessage);
        return;
    }

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const posterPath = movie.poster_path
            ? `${MOVIE_POSTER_BASE_URL}${movie.poster_path}`
            : '';

        movieDiv.innerHTML = `
            <img src="${posterPath}" alt="${movie.title}">
            <h2>${movie.title}</h2>
            <p>Release Date: ${movie.release_date}</p>
            <p>Overview: ${movie.overview}</p>
            <p>Original Language: ${movie.original_language}</p>
            `;

        movieList.appendChild(movieDiv);

        // Trigger the animation by adding the 'loaded' class after a short delay
        setTimeout(() => {
            movieDiv.classList.add('loaded');
        }, 50);
    });
}

let searchInput;

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Event listener for the global "Submit Review" button
    document.getElementById('submit-review-button').addEventListener('click', function () {
        submitGlobalReview(searchInput);
    });
});




let reviewInput;

async function submitGlobalReview(reviewInput) {
    if (reviewInput) {
       const reviewInput = document.getElementById('review-input').value;

    const url = `https://654da611cbc325355741bf29.mockapi.io/feedback`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                review: reviewInput,
            }),
        });

        if (response.ok) {
            console.log('Review submitted successfully.');           
        } else {
            console.error('Failed to submit review. Status:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    }
}

// Event listener for the global "Submit Review" button
document.getElementById('submit-review-button').addEventListener('click', submitGlobalReview);


document.addEventListener("DOMContentLoaded", function () {
    const submitReviewButton = document.getElementById("submit-review-button");
    const nameInput = document.getElementById("name-input");
    const reviewInput = document.getElementById("review-input");
    const thankYou = document.getElementById("thank-you");

    submitReviewButton.addEventListener("click", function () {
        submitGlobalReview();
    });
    
    function submitGlobalReview() {
        const movieName = nameInput.value;
        const userReview = reviewInput.value;
        thankYou.style.display = "block";
        nameInput.value = "";
        reviewInput.value = "";
    }
});