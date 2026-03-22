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