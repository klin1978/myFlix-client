import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export const MovieCard = ({ movie, setUser, user, token }) => {

  const [isFavorite, setFavorite] = useState(user.FavoriteMovies.includes(movie.id));

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
    <Card className='h-100'>
      <Card.Img variant='top' src={movie.image} />
      <Card.Body>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`} className='movie-link'>
          <Card.Title className='text-center mb-1'><h3>{movie.Title}</h3></Card.Title>
        </Link>
        <Card.Text className='text-center'>{movie.Genre.Name}</Card.Text>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant='outline-dark' size='sm' className='open-btn'>Open</Button>
        </Link>
        {isFavorite ? (
          <Button variant='outline-dark' size='sm' onClick={removeFavoriteMovie}>Remove Favorite</Button>
        ) : (
          <Button variant='outline-dark' size='sm' onClick={addFavoriteMovie}>Add to Favorites</Button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
      }),
      Description: PropTypes.string.isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Born: PropTypes.string.isRequired,
        Died: PropTypes.string,
        Biography: PropTypes.string.isRequired
      })
    }).isRequired,
  };