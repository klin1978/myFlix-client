import { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';

import './profile-view.scss';

export const ProfileView = ({ user, token, movies, setUser }) => {
    const [username, setUsername] = useState(user.Username)
    const [email, setEmail] = useState(user.Email)
    const [password, setPassword] = useState(user.Password)
    const [birthday, setBirthday] = useState(user.Birthday)
    
    let favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie._id));
    
    const addFavorite = (movieId) => {
        fetch(`https://my-films-9be1d0babd61.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
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

    const removeFavorite = (movieId) => {
        fetch(`https://my-films-9be1d0babd61.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpdate();

        let data = {
            Username: username,
            Email: email,
            Password: password,
            Birthday: birthday
        };

        fetch(`https://my-films-9be1d0babd61.herokuapp.com/users/${user.Username}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(async (response) => {
            if (response.ok) {
                alert('Update successful!');
            } else {
                alert('Update failed')
            }
        }).then((data) => {
            if (data) {
                localStorage.setItem('user', JSON.stringify(data))
                setUser(data)
            }
        })
    }

    const handleDelete = () => {
        fetch(`https://my-films-9be1d0babd61.herokuapp.com/users/${user.Username}`, {
            method: 'DELETE',
            headers: {Authorization: `Bearer ${token}`}
        }).then((response) => {
            if (response.ok) {
                setUser(null);
                localStorage.clear();
                alert('Your account has been deleted');
            } else {
                alert('Something went wrong')
            }
        })
    }

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>My Info</Card.Title>
                            <Form className='profile-form' onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='Username'
                                        defaultValue={user.Username}
                                        onChange={(e) => {setUsername(e.target.value);}}
                                        required
                                        placeholder='Enter a new username' />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type='email'
                                        name='Email'
                                        defaultValue={user.Email}
                                        onChange={(e) => {setEmail(e.target.value);}}
                                        required
                                        placeholder='Enter your email address' />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type='password'
                                        name='Password'
                                        defaultValue={user.Password}
                                        onChange={(e) => {setPassword(e.target.value);}}
                                        required
                                        minLength='8'
                                        placeholder='Enter a new password' />
                                </Form.Group>
                                <Button variant='outline-dark' size='sm' type='submit' className='update-btn'>Update</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Favorite Movies</Card.Title>
                            {favoriteMovies.map((movie) => {
                                return (
                                    <Col xs={12} md={6} lg={3} key={movie._id} className='fav-movies'>
                                        <MovieCard 
                                            movie={movie}
                                            user={user}
                                            token={token}
                                            setUser={setUser}
                                            addFavorite={addFavorite}
                                            removeFavorite={removeFavorite}
                                        />
                                        <Button variant='outline-dark' size='sm' onClick={() => removeFavorite(movie._id)}>Remove</Button>
                                    </Col>
                                )
                            })
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to='/login'>
                        <Button variant='outline-danger' size='sm' onClick={handleDelete} className='delete-btn'>Delete Account</Button>
                    </Link>
                </Col>
            </Row>
        </>
    );
}
