import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://my-films-9be1d0babd61.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`},
    })
    
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie.id,
            Title: movie.Title,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description
            },
            Description: movie.Description,
            Director: {
              Name: movie.Director.Name,
              Born: movie.Director.Born,
              Died: movie.Director.Died,
              Biography: movie.Director.Biography
            }
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

  if (!user) {
    return ( 
      <>
        <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return (
      <>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      <div>The list is empty!</div>;
      </>
    );
  }

  return (
    <div>
        {movies.map((movie) => (
            <MovieCard                
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
            />
        ))}
    </div>
  );
};