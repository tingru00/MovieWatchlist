import { getMovies, createMovie, updateMovie, deleteMovie } from "./api.js";
import { renderMovies } from "./ui.js";

//Keeps track of which movie is being edited
let editingMovieId = null;

//Load and display all movies
async function loadMovies() {
    try {
        const movies = await getMovies();
        renderMovies(movies, handleDelete, handleEdit);
    } catch (error) {
        console.error("Error loading movies:", error);
    }
}

//Handles delete button click
async function handleDelete(id) {
    try {
        await deleteMovie(id);
        loadMovies();
    } catch (error) {
        console.error("Error deleting movie:", error);
    }
}

//Fill form for editing (PUT)
function handleEdit(movie) {
    document.getElementById("title").value = movie.title;
    document.getElementById("description").value = movie.description;
    document.getElementById("genre").value = movie.genre;
    document.getElementById("imageUrl").value = movie.imageUrl;
    document.getElementById("date").value = movie.date;

    editingMovieId = movie.id;
}

//Handle form submit (POST or PUT)
document.getElementById("movieForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const movie = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    genre: document.getElementById("genre").value,
    imageUrl: document.getElementById("imageUrl").value,
    date: document.getElementById("date").value
};

console.log(movie);
    //Validate date
    const selectedDate = new Date(movie.date);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
        alert("Date cannot be in the past");
        return;
    }

    try {
        if (editingMovieId !== null) {
            //Update existing movie (PUT)
            await updateMovie(editingMovieId, movie);
            editingMovieId = null;
        } else {
            //Create new movie (POST)
            await createMovie(movie);

            if (movie.title.length < 3) {
            alert("Title must be at least 3 characters long");
            return;
        }
        }

        loadMovies();
        document.getElementById("movieForm").reset(); // Clear form

    } catch (error) {
        console.error("Error saving movie:", error);
    }
});

//Prevent selecting past dates in input
const dateInput = document.getElementById("date");

const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

dateInput.min = now.toISOString().slice(0, 16);

//Initial load
loadMovies();