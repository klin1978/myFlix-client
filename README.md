# myFlix-client
A client-side web application built using React and existing server-side code (REST API and database) for movie enthusiasts who enjoy reading information about various movies. Users will be able to create a profile, access information about movies, and save data about favorite movies.

## Technical Features
- Single-page (SPA)
- State routing to navigate between views and share URLs
- Option to filter movies using a "search" feature
- Parcel build tool
- React library and ES2015+
- Bootstrap as UI library for styling and responsiveness
- Function components
- React Redux for state management

## Features

MAIN VIEW
- Returns all movies to the user (each movie item with a title, genre, and description)
- Filtering the list of movies with a “search” feature
- Ability to select a movie for more details
- Ability to log out
- Ability to navigate to Profile view

MOVIE VIEW
- Returns data (description, genre, director, image) about a single movie to the user
-  Allows users to add a movie to their list of favorites

LOGIN VIEW
-  Allows users to log in with a username and password

SIGNUP VIEW
-  Allows new users to register (username, password, email, date of birth)

PROFILE VIEW
- Displays user registration details
- Allows users to update their info (username, password, email, date of birth)
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows existing users to deregister
