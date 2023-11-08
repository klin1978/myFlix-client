import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';

import './movie-view.scss';

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((movie) => movie.id === movieId);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className='text-center mb-4'><h3>{movie.Title}</h3></Card.Title>
                            <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
                            <Card.Text>Description: {movie.Description}</Card.Text>
                            <Card.Text>Director: {movie.Director.Name}</Card.Text>
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