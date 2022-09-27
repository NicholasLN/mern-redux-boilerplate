# Simple MERN Boilerplate

This is a boilerplate I've set up for my own personal usage, however, feel free to use it yourself if you want!

The project uses MongoDB, React, Express, JWT, Tailwind, bcrypt, React-redux, and more for a basic authentication experience.

For authentication, I've established my own middleware that takes a JSON Web Token and verifies it using the secret in .env.example. Whenever you login or register, you are given an access token that is stored as a sameSite cookie. If running on HTTPS, you may go to .env and change secure to true to make the token even more safe.

Passwords are hashed with bcrypt.

## Features

- Basic login/register/profile/logout pages with Tailwind CSS
- Authentication and Authentication Strategies (logged in, is admin)
- MongoDB Connection
- Redux State Management (also restores state after refresh!)
- State will refresh upon being focused.

## Environment Variables

All environment variables are stored in .env.example. Just copy it into a new file (.env) and adjust the variables as you see fit.

## Authors

- [@Nicholas Lunna](https://www.github.com/NicholasLN)
