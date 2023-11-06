import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import './movie-card.scss';

export const MovieCard = ({ movie }) => {

  return (
    <Card className='h-100'>
      <Card.Img variant='top' src={movie.image} />
      <Card.Body>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`} className='movie-link'>
          <Card.Title>{movie.Title}</Card.Title>
        </Link>
        <Card.Text>{movie.Genre.Name}</Card.Text>
        <Card.Text>{movie.Description}</Card.Text>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant='outline-dark' size='sm' className='open-btn'>Open</Button>
        </Link>
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