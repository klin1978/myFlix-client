import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';

import './movie-view.scss';

export const MovieView = ({ movies, setUser, user, token }) => {
    const { movieId } = useParams();
    const movie = movies.find((movie) => movie.id === movieId);

    const [isFavorite, setFavorite] = useState(false);

    useEffect(() => {
        setFavorite(user.FavoriteMovie.includes(movie.id));
      });
  
    const addFavoriteMovie = () => {
      fetch(`https://my-films-9be1d0babd61.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }
      ).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Failed to add movie')
        }
      }).then((data) => {
        if (data) {
          localStorage.setItem('user', JSON.stringify(data));
          setUser(data);
          setFavorite(true);
          alert('Movie added!');
        }
      }).catch((error) => {
        alert(error);
      });
    };
  
    const removeFavoriteMovie = () => {
      fetch(`https://my-films-9be1d0babd61.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
        method: 'DELETE', 
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Failed to remove favorite movie');
        }
      }).then((data) => {
          localStorage.setItem('user', JSON.stringify(data));
          setUser(data);
          setFavorite(false);
          alert('Favorite movie removed');
      }).catch((error) => {
        alert(error);
      });
    };

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Title: {movie.Title}</Card.Title>
                            <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
                            <Card.Text>Description: {movie.Description}</Card.Text>
                            <Card.Text>Director: {movie.Director.Name}</Card.Text>
                            <Card.Text>{movie.Director.Born}</Card.Text>
                            <Card.Text>{movie.Director.Died}</Card.Text>
                            <Card.Text>{movie.Director.Biography}</Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Row>
                                <Col>
                                    {isFavorite ? (
                                        <Button variant='outline-dark' onClick={removeFavoriteMovie}>Remove Favorite</Button>
                                    ) : (
                                        <Button variant='outline-dark' onClick={addFavoriteMovie}>Add to Favorites</Button>
                                    )}
                                </Col>
                            </Row>
                        </Card.Body>
                        <Link to={`/`}>
                            <Button variant='outline-dark' className="back-button">Back</Button>
                        </Link>
                    </Card>
                </Col>
            </Row>
        </>
    );
};