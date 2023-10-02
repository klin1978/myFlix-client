import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    { 
        id: 1, 
        title: 'The Avengers', 
        image: 'https://www.pluggedin.com/wp-content/uploads/2019/12/the-avengers-review-image-1200x688.jpg',
        director: 'Joss Whedon'
    },
    { 
        id: 2, 
        title: 'Pitch Perfect',
        image: 'https://m.media-amazon.com/images/I/91bAKJ3lMVL._AC_UF894,1000_QL80_.jpg',
        director: 'Jason Moore'
    },
    { 
        id: 3, 
        title: 'The Heat',
        image: 'https://m.media-amazon.com/images/I/91IxCrm1VWL._AC_UF894,1000_QL80_.jpg',
        direcotr: 'Paul Feig'
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
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