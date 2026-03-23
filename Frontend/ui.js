//Render all movies in the DOM
export function renderMovies(movies, onDelete, onEdit) {
    const list = document.getElementById("list");
    list.innerHTML = "";

    movies.forEach(movie => {
        const li = document.createElement("li");
        li.classList.add("movie-card");

        // Movie image
        const img = document.createElement("img");
        img.src = movie.imageUrl;

        // Overlay
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const title = document.createElement("h3");
        title.textContent = movie.title;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => onEdit(movie);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => onDelete(movie.id);

        overlay.appendChild(title);
        overlay.appendChild(editButton);
        overlay.appendChild(deleteButton);

        li.appendChild(img);
        li.appendChild(overlay);

        list.appendChild(li);
    });
}