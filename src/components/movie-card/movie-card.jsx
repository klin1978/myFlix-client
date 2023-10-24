import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card className='h-100' onClick={() => onMovieClick(movie)} variant='link'>
        <Card.Img variant='top' src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Genre.Name}</Card.Text>
          <Card.Text>{movie.Description}</Card.Text>
          <Card.Text>{movie.Director.Name}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant='link'>Open</Button>
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
    onMovieClick: PropTypes.func.isRequired
  };