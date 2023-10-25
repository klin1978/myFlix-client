import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
    return (
      <Card className='h-100'>
        <Card.Img variant='top' src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Genre.Name}</Card.Text>
          <Card.Text>{movie.Description}</Card.Text>
          <Card.Text>{movie.Director.Name}</Card.Text>
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant='link'>Open</Button>
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