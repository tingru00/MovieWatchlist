#  Movie Watchlist (Fullstack App)

## About the project

This is a fullstack web application where users can manage a movie watchlist.

The application allows users to:

* View all movies
* Add new movies
* Update existing movies
* Delete movies

The project demonstrates the full flow from frontend interaction to backend API and database.

---

## Technologies

**Frontend:**

* HTML
* CSS
* JavaScript (DOM & fetch)

**Backend:**

* .NET Web API
* Controllers
* Services
* DTOs
* Entity Framework Core

**Database:**

* SQL Server (LocalDB)

## External API (TMDB)

This project uses The Movie Database (TMDB) API to fetch real movie data.

To use this feature:

1. Create an account at https://www.themoviedb.org/
2. Generate an API key
3. Add your API key in `tmdbApi.js`:

const API_KEY = "YOUR_API_KEY_HERE";

The API key is not included in this repository for security reasons.
---

## How to run the project

### 1. Start the backend

* Open the API project in Visual Studio
* Run the project
* Swagger should open automatically

### 2. Start the frontend

* Open the frontend folder in VS Code
* Run with Live Server (or open index.html)
* The app will run on:

  ```
  http://127.0.0.1:5500
  ```

---

## API Endpoints

| Method | Endpoint             | Description      |
| ------ | -------------------- | ---------------- |
| GET    | /api/tournament      | Get all movies   |
| GET    | /api/tournament/{id} | Get movie by id  |
| POST   | /api/tournament      | Create new movie |
| PUT    | /api/tournament/{id} | Update movie     |
| DELETE | /api/tournament/{id} | Delete movie     |

---

## How frontend communicates with backend

The frontend uses `fetch()` to send HTTP requests to the API.

Example:

```javascript
fetch("https://localhost:7206/api/tournament")
```

The API processes the request through:

* Controller → receives request
* Service → contains logic
* Database → stores data

Then returns JSON back to the frontend, which updates the UI using DOM.

---


##  Notes

* The project uses CORS to allow communication between frontend and backend
* Validation is handled both in frontend and backend
* The backend API was originally developed for a "Tournament" project and has been reused for this assignment.

Because of this:

Some naming ("Tournament") still exists in the API
The logic and data structure have been adapted to represent movies instead

This demonstrates code reuse and refactoring, even though not all naming has been fully updated.
