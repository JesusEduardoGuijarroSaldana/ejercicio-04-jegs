const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();
const port = process.env.port || 3000;
app.use(express.json());
// ID (clave primaria),
// Título,
// Director,
// Año de Lanzamiento,
// Género,
// Calificación
let movies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    releaseYear: 1994,
    gender: "Drama",
    rating: 9.3,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    releaseYear: 1972,
    gender: "Crime, Drama",
    rating: 9.2,
  },
  {
    id: 3,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    releaseYear: 2008,
    gender: "Action, Crime, Drama",
    rating: 9.0,
  },
  {
    id: 4,
    title: "The Godfather Part II",
    director: "Francis Ford Coppola",
    releaseYear: 1974,
    gender: "Crime, Drama",
    rating: 9.0,
  },
  {
    id: 5,
    title: "12 Angry Men",
    director: "Sidney Lumet",
    releaseYear: 1957,
    gender: "Crime, Drama",
    rating: 9.0,
  },
  {
    id: 6,
    title: "Schindler's List",
    director: "Steven Spielberg",
    releaseYear: 1993,
    gender: "Biography, Drama, History",
    rating: 9.0,
  },
  {
    id: 7,
    title: "The Lord of the Rings: The Return of the King",
    director: "Peter Jackson",
    releaseYear: 2003,
    gender: "Action, Adventure, Drama",
    rating: 9.0,
  },
  {
    id: 8,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    releaseYear: 1994,
    gender: "Crime, Drama",
    rating: 8.9,
  },
  {
    id: 9,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    director: "Peter Jackson",
    releaseYear: 2001,
    gender: "Action, Adventure, Drama",
    rating: 8.8,
  },
  {
    id: 10,
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    releaseYear: 1994,
    gender: "Drama, Romance",
    rating: 8.8,
  },
];
// Obtener la lista de todas las peliculas (GET).
app.get("/partners/v1/movies", (req, res) => {
  if (!movies) {
    res.status(404).json({
      status: 0,
      message: "No existen películas.",
      movies: [],
    });
  } else {
    res.status(200).json({
      status: 1,
      message: "Existen películas.",
      movies: movies,
    });
  }
});
// Obtener una película por su ID (GET).
app.get("/partners/v1/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = movies.find((movies) => movies.id == id);
  if (!movie) {
    res.status(404).json({
      status: 0,
      message: "Película no encontrada.",
      movie: null,
    });
  } else {
    res.status(200).json({
      status: 1,
      message: "Película encontrada.",
      movie: movie,
    });
  }
});
// Agregar una nueva película por su ID (POST).
app.post("/partners/v1/movies", (req, res) => {
  const { title, director, releaseYear, gender, rating } = req.body;
  const id = Math.round(Math.random() * 1000);
  if (!title | !director | !releaseYear | !gender | !rating) {
    res.status(400).json({
      status: 0,
      message: "Faltan parámetros en la solicitud (Bad Request).",
    });
  } else {
    const movie = { id, title, director, releaseYear, gender, rating };
    const initialLength = movies.length;
    movies.push(movie);
    if (!(movies.length > initialLength)) {
      res.status(500).json({
        status: 0,
        message: "Ocurrió un error desconocido.",
      });
    } else {
      res.status(201).json({
        status: 1,
        message: "Película creada correctamente.",
      });
    }
  }
});
// Actualizar una película por su ID (PUT).
app.put("/partners/v1/movies/:id", (req, res) => {
  const { id } = req.params;
  const { title, director, releaseYear, gender, rating } = req.body;
  if (!title | !director | !releaseYear | !gender | !rating) {
    res.status(400).json({
      status: 0,
      message: "Faltan parámetros en la solicitud (Bad Request).",
    });
  } else {
    const indexUpdate = movies.findIndex((movie) => movie.id == id);
    if (indexUpdate == -1) {
      res.status(404).json({
        status: 0,
        message: "Proyecto no encontrado.",
        movies: [],
      });
    } else {
      movies[indexUpdate].title = title;
      movies[indexUpdate].director = director;
      movies[indexUpdate].releaseYear = releaseYear;
      movies[indexUpdate].gender = gender;
      movies[indexUpdate].rating = rating;
      res.status(200).json({
        status: 1,
        message: "Película actualizada correctamente.",
        movies: movies[indexUpdate],
      });
    }
  }
});
// Eliminar una película por su ID (DELETE).
app.delete("/partners/v1/movies/:id", (req, res) => {
  const { id } = req.params;
  const indexDelete = movies.findIndex((movie) => movie.id == id);
  if (indexDelete == -1) {
    res.status(404).json({
      status: 0,
      message: "Tarea no encontrado.",
    });
  } else {
    movies.splice(indexDelete, 1);
    res.status(201).json({
      status: 1,
      message: "Película eliminada correctamente.",
    });
  }
});
app.listen(port, () => {
  console.log("Servidor corriendo en el puerto: ", port);
});
