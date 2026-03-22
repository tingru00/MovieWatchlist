//URL for API
const API_URL = "https://localhost:7206/api/tournament";

//Fetch all movies (GET)
export async function getMovies() {
    const response = await fetch(API_URL);
    return response.json();
}

//Create a new movie (POST)
export async function createMovie(movie) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("POST ERROR:", errorText);
        throw new Error(errorText);
    }
}

//Update an existing movie (PUT)
export async function updateMovie(id, movie) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("PUT ERROR:", errorText);
        throw new Error(errorText);
    }
}

//Delete a movie (DELETE)
export async function deleteMovie(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
}