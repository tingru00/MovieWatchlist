//Fetch all movies from API (GET)
async function loadMovies() {
    try {
        console.log("START loadMovies");

        const response = await fetch(API_URL ="https://localhost:7206/api/tournament");
        const data = await response.json();

        console.log("DATA:", data);

        const list = document.getElementById("list");
        list.innerHTML = "";

    data.forEach(movie => {
    const li = document.createElement("li");

    const title = document.createElement("h3");
    title.textContent = movie.title;

    const genre = document.createElement("p");
    genre.textContent = "Genre: " + movie.genre;

    const img = document.createElement("img");
    img.src = movie.imageUrl;
    img.style.width = "100px";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.onclick = () => deleteMovie(movie.id);

    li.appendChild(deleteButton);
    li.appendChild(title);
    li.appendChild(genre);
    li.appendChild(img);

    list.appendChild(li);
});

    } catch (error) {
        console.error("ERROR:", error);
    }
}

loadMovies();

//Delete a movie (DELETE)
async function deleteMovie(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        loadMovies();
        
    } catch (error) {
        console.error("Error deleting movie:", error);
    }
}

//Add a new movie (POST)
document.getElementById("movieForm").addEventListener("submit", async function (e) {
e.preventDefault();

const dateInput = document.getElementById("date");

//Rule for date input
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

dateInput.min = now.toISOString().slice(0, 16);

    const movie = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        genre: document.getElementById("genre").value,
        imageUrl: document.getElementById("imageUrl").value,
        date: document.getElementById("date").value
    };

    const selectedDate = new Date(document.getElementById("date").value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
    alert("Date cannot be in the past");
    return;
}

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movie)
        });

        loadMovies(); // uppdatera listan

        document.getElementById("movieForm").reset(); // rensa form
    } catch (error) {
        console.error("Error adding movie:", error);
    }
});