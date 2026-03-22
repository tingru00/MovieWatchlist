const API_URL = "https://localhost:7206/api/tournament";

let editingMovieId = null;

//LOAD MOVIES (GET)
async function loadMovies() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

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

            //DELETE BUTTON
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => deleteMovie(movie.id);

            //EDIT BUTTON
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.onclick = () => editMovie(movie);

            li.appendChild(title);
            li.appendChild(genre);
            li.appendChild(img);
            li.appendChild(deleteButton);
            li.appendChild(editButton);

            list.appendChild(li);
        });

    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

//DELETE
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

//EDIT
function editMovie(movie) {
    document.getElementById("title").value = movie.title;
    document.getElementById("description").value = movie.description;
    document.getElementById("genre").value = movie.genre;
    document.getElementById("imageUrl").value = movie.imageUrl;
    document.getElementById("date").value = movie.date;

    editingMovieId = movie.id;
}

// POST + PUT
document.getElementById("movieForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const movie = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        genre: document.getElementById("genre").value,
        imageUrl: document.getElementById("imageUrl").value,
        date: document.getElementById("date").value
    };

    //Date validation
    const selectedDate = new Date(movie.date);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
        alert("Date cannot be in the past");
        return;
    }

    try {
        if (editingMovieId !== null) {
            //PUT
            await fetch(`${API_URL}/${editingMovieId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(movie)
            });

            editingMovieId = null;
        } else {
            //POST
            await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(movie)
            });
        }

        loadMovies();
        document.getElementById("movieForm").reset();

    } catch (error) {
        console.error("Error saving movie:", error);
    }
});

// Date input validation
const dateInput = document.getElementById("date");

const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

dateInput.min = now.toISOString().slice(0, 16);


loadMovies();