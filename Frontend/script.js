//IMPORTS 
import { getMovies, createMovie, updateMovie, deleteMovie } from "./api.js";
import { renderMovies } from "./ui.js";
import { searchMovies } from "./tmdbApi.js";


//STATE
let editingMovieId = null;


//DOM
const movieForm = document.getElementById("movieForm");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const genreInput = document.getElementById("genre");
const imageUrlInput = document.getElementById("imageUrl");
const dateInput = document.getElementById("date");

const moviesSection = document.getElementById("moviesSection");
const addSection = document.getElementById("addSection");

const searchInput = document.getElementById("tmdbSearch");
const resultsList = document.getElementById("tmdbResults");


//EVENT LISTENERS

//Form submit for POST and PUT
movieForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const movie = {
        title: titleInput.value,
        description: descriptionInput.value,
        genre: genreInput.value,
        imageUrl: imageUrlInput.value,
        date: dateInput.value
    };

    //Validation
    const selectedDate = new Date(movie.date);
    const currentDate = new Date();

    if (movie.title.length < 3) {
        return alert("Title must be at least 3 characters long");
    }

    if (selectedDate < currentDate) {
        return alert("Date cannot be in the past");
    }

    try {
        if (editingMovieId !== null) {
            await updateMovie(editingMovieId, movie);
            editingMovieId = null;
        } else {
            await createMovie(movie);
        }

        movieForm.reset();
        loadMovies();

    } catch (error) {
        console.error("Error saving movie:", error);
        alert("Something went wrong");
    }
});


//TMDB Search
searchInput.addEventListener("input", async () => {
    const query = searchInput.value;

    if (query.length < 2) {
        resultsList.innerHTML = "";
        return;
    }

    const movies = await searchMovies(query);

    resultsList.innerHTML = "";

    movies.forEach(movie => {
        const li = document.createElement("li");

        li.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" />
            <p>${movie.title}</p>
        `;

        li.onclick = () => addFromTMDB(movie);

        resultsList.appendChild(li);
    });
});


//FUNCTIONS

//Load movies
async function loadMovies() {
    try {
        const movies = await getMovies();
        renderMovies(movies, handleDelete, handleEdit);
    } catch (error) {
        console.error("Error loading movies:", error);
    }
}

//Delete
async function handleDelete(id) {
    try {
        await deleteMovie(id);
        loadMovies();
    } catch (error) {
        console.error("Error deleting movie:", error);
    }
}

//Edit
function handleEdit(movie) {
    titleInput.value = movie.title;
    descriptionInput.value = movie.description;
    genreInput.value = movie.genre;
    imageUrlInput.value = movie.imageUrl;
    dateInput.value = movie.date;

    editingMovieId = movie.id;
    showSection("add");
}

//Add from TMDB
async function addFromTMDB(movie) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

    const newMovie = {
        title: movie.title || "Unknown title",
        description: movie.overview && movie.overview.trim() !== "" 
            ? movie.overview 
            : "No description available",
        genre: "Unknown",
        imageUrl: movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x450",
        date: now.toISOString().slice(0, 16)
    };

    try {
        await createMovie(newMovie);

        showToast("✔ Movie added!");
        loadMovies();

        resultsList.innerHTML = "";
        searchInput.value = "";

    } catch (error) {
        console.error(error);
        alert("Could not add movie");
    }
}
//Navigation
window.showSection = function (section) {
    if (section === "movies") {
        moviesSection.classList.remove("hidden");
        addSection.classList.add("hidden");
    } else {
        moviesSection.classList.add("hidden");
        addSection.classList.remove("hidden");
    }
};

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;

    toast.classList.remove("hidden");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}


//INIT

//Prevent past dates
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
dateInput.min = now.toISOString().slice(0, 16);

// Initial load
loadMovies();