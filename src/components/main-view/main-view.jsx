import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
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

  return ( 
    <BrowserRouter>
      <Row className='justify-content-md-center'>
        <Routes>
          <Route 
            path='/signup'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path='/login' 
            element={ 
              <> 
                {user ? ( 
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                     <LoginView onLoggedIn={(user) => setUser(user)} /> 
                  </Col> 
                )} 
              </>
            }
          />
          <Route 
            path='/movies/:movieId' 
            element={ 
              <>
                {!user ? ( 
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? ( 
                  <Col>The list is empty!</Col> 
                ) : (
                  <Col md={8}> 
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className='mb-4' key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};