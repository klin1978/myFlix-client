import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m._id === movieId);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Title:</Card.Title>
                            <Card.Text>{movie.Title}</Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Title>Genre: </Card.Title>
                            <Card.Text>{movie.Genre.Name}</Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Title>Description: </Card.Title>
                            <Card.Text>{movie.Description}</Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Title>Director: </Card.Title>
                            <Card.Text>{movie.Director.Name}</Card.Text>
                            <Card.Text>{movie.Director.Born}</Card.Text>
                            <Card.Text>{movie.Director.Died}</Card.Text>
                            <Card.Text>{movie.Director.Biography}</Card.Text>
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