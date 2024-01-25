# Movie App

Welcome to the Movie App! This web application allows users to explore and manage their movie watchlist. It includes features such as user authentication, movie listing, and the ability to add movies to a watchlist.
## Deployment
- The application has been deployed successfully. You can access the live version at
- [Deployed Frontend Link](https://propftx-movie-app.vercel.app/)
- [Deployed Backend(Server) Link](https://propftx-movie-api.onrender.com)
  
## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Technologies Used
- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Cors (Cross-Origin Resource Sharing)
  - Jsonwebtoken for authentication
  - Bcrypt for password hashing

- **Frontend:**
  - React.js

## Features
1. **User Authentication:**
   - Users can sign up and log in securely.
   - Authentication is implemented using Jsonwebtoken for token-based security.

2. **Movie Listing:**
   - Retrieve a list of available movies.

3. **Watchlist Management:**
   - Users can add movies to their watchlist.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/movie-app.git
   cd movie-app

2. Install backend dependencies
   ```bash
   cd Backend
   npm install

3. Install frontend dependencies
    ```bash
    cd ../Frontend/react-movie-app
    npm install

  ## Usage
  - Access the application by navigating to http://localhost:3000 in your web browser.

  ### Endpoints

- **POST /users/register**
  - Registers a new user.
  - Payload: `{username, email, password}`.
  
- **POST /users/login**
  - Logs in an existing user.
  - Payload: `{email, password}`.

## User Management

### Endpoints

- **GET /users**
  - Retrieves all users.

- **GET /users/:userID**
  - Retrieves a single user by their ID.

- **PUT /users/:userID**
  - Updates a user's information.
  - Payload: `{field to be updated}`.

- **DELETE /users/:userID**
  - Deletes a user by their ID.

- **POST /users/:userID/watchlist**
  - Adds a movie to user's watchlist.
  - Payload: `{movieId}`.

- **DELETE /users/:userID/watchlist**
  - Removes a movie from a user's watchlist.
  - Payload: `{movieId}`.

## Course Management

### Endpoints

- **POST /movies**
  - Creates a new movie.
  - Payload: `{title, duration, description, poster_image, genre, release_year,release_date,director,rating}`.

- **GET /movies**
  - Retrieves all movies.

- **GET /movies/:movieId**
  - Retrieves a single movie by its ID.

- **PUT /movies/:movieId**
  - Updates a movie's information.
  - Payload: `{field to be updated}`.

- **DELETE /movies/:movieId**
  - Deletes a movie by its ID.


