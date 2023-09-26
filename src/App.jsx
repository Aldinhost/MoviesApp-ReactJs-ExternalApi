import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import SearchIcon from "./assets/search.svg";

const App = () => {
  const [texto, setTexto] = useState(true);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = `http://www.omdbapi.com?apikey=${
    import.meta.env.VITE_API_KEY_OMDB
  }`;

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    setTexto(true);
  }, []);

  const handleChange = (e) => {
    setTexto(false);
    setSearchTerm(e.target.value)
  }

  return (
    <div className="app">
      <h1>MovieApp</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={handleChange}
        />

        <img
          src={SearchIcon}
          alt="search-icon"
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>

      {texto ? (
        <div className="empty">
          <h2>Ingrese un título.</h2>
        </div>
      ) : movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.Title} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies Found.</h2>
        </div>
      )}
    </div>
  );
};

export default App;
