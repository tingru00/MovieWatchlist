const API_KEY = "YOUR_API_KEY_HERE";
const BASE_URL = "https://api.themoviedb.org/3";

//Search movies
export async function searchMovies(query) {
    const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );

    const data = await res.json();
    return data.results;
}

//Popular movies
export async function getPopularMovies() {
    const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );

    const data = await res.json();
    return data.results;
}