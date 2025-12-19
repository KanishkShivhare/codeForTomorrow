Authentication System with JWT Refresh Token

This project implements a secure authentication system using Node.js, Express.js, MongoDB, and JWT, including Access Token and Refresh Token flow.

Features
User Registration
User Login
Password Hashing using bcrypt
JWT Access Token (expires in 1 minute)
JWT Refresh Token (expires in 7 days)
Refresh Token endpoint to generate new access tokens
MongoDB database integration

Tech Stack
JavaScript
Node.js
Express.js
MongoDB
Mongoose
JSON Web Token (JWT)
bcryptjs
dotenv

API Endpoints

Register User
POST /register

Request Body
name: Kanishk
email: test@gmail.com

password: 123456

Login User
POST /login

Request Body
email: test@gmail.com

password: 123456

Response
Access Token
Refresh Token

Refresh Token
POST /refresh-token

Request Body
refreshToken: your_refresh_token_here

Returns a new Access Token if the refresh token is valid.

Installation and Run

Clone Repository
https://github.com/KanishkShivhare/codeForTomorrow

Install Dependencies
npm install

Environment Variables
PORT=3000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

Start Server
npm start

JWT Refresh Token Flow
User logs in and receives Access Token and Refresh Token.
Access Token expires in 1 minute.
Client sends Refresh Token to /refresh-token.
Server verifies the Refresh Token and returns a new Access Token.

Author
Kanishk Shivhare
GitHub: https://github.com/KanishkShivhare
