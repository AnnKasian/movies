# Movie Library Web Service

## About

This is a web application for managing a collection of movies.
It supports user authentication, adding, deleting, updating, and viewing movies, as well as searching by title or actor name.
Movies can also be imported via a '.txt' file using the web interface.
A documentation file is provided with details about the application architecture and setup instructions.

## Steps to run

**Development**

1. Create and fill `.env` file using `.env.example` as a reference.
2. To run the app in development mode with live reloading, run `npm run dev`.
3. Or build and run docker container: `docker-compose up`

**Production**

1. Run image on DockerHub `docker run --name movie-base -p 8000:8050 -e PORT=8050 annkasian/movies`

The app will be available at: http://localhost:8000/api/v1

### Docker Image

Docker Hub: https://hub.docker.com/r/annkasian/movies

You can also pull the image manually: `docker pull annkasian/movies`

## Import Sample File

You can import movies using a .txt file (sample_movies.txt) via the web interface (Postman).

## Application

RESTful API

### Routes:

**Users**

- Create user: `POST /users`

**Sessions**

- Create session: `POST /sessions`

**Movies**

- Create movie: `POST /movies`
- Delete movie: `DELETE /movies/{id}`
- Update movie: `PATCH /movies/{id}`
- Get movie by id: `GET /movies/{id}`
- Get all movies: `GET /movies`
- Import movies: `POST /movies/import`

#### Query parameters for `GET /movies`:

- `actor: string`. Search movies by `title` (partial match)
- `title: string`. Search movies by `actor name` (partial match)
- `search: string`. Combined search by movie `title` or `actor name`
- `limit: number`. Sort field: `id`, `title`, or `year`, **default: `id`**
- `offset: number`. Sort direction: `ASC` or `DESC`, **default: `ASC`**
- `order: string`. Limit number of results, **default: 20**
- `sort: string`. Skip first N results (used for pagination), **default: 0**

## Technologies

**Framework:** Express <br>
**Language:** TypeScript <br>
**Database:** SQLite with Sequelize <br>
**Authentication:** JWT <br>
**Routing:** Express Router <br>
**Containerization:** Docker <br>
