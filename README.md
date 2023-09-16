# Movie Discovery Web Application

Welcome to the Movie Discovery Web Application project! This web application allows users to search for movies and view details about them, all while consuming data from the TMDB API (The Movie Database API).

**Live Demo**: [Movie Discovery Web App](https://moviediscoveryapp-hng.netlify.app/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Key Configuration](#api-key-configuration)
- [Contributing](#contributing)

## Overview

This web application is designed to make it easy for users to discover information about movies, including details such as release date and ratings. It uses the TMDB API as a data source to provide accurate and up-to-date movie information.

## Features

- **User Interface**: The application is designed to work seamlessly on both desktop and mobile devices and shows a list of the top 10 movies on the homepage.
- **Movie Search**: Users can search for movies by title, Display search results, including movie posters, titles, and release dates. It shows a loading indicator while fetching search results.
- **Movie Details**: Users can view detailed information about a selected movie, including its overview

## Installation

To run this application locally, follow these steps:

1. Clone this repository to your local machine

2. Navigate to the project directory

3. Install the project dependencies

## Usage

To start the web application, run the following command:

npm start

This will start the development server, and you can access the application in your web browser by navigating to `http://localhost:3000`.

## API Key Configuration

To use this application, you need to obtain an API key from [TMDB](https://www.themoviedb.org/documentation/api) and configure it in the application. Here's how:

1. Visit the [TMDB API](https://www.themoviedb.org/documentation/api) website and sign up for an API key if you don't already have one.

2. Create a `.env` file in the project root directory.

3. Inside the `.env` file, add the following line with your API key:

REACT_APP_TMDB_API_KEY=your_api_key_here

4. Save the `.env` file.

## Contributing

If you'd like to contribute to this project, please follow our [Contributing Guidelines](CONTRIBUTING.md).

We hope you enjoy using the Movie Discovery Web Application! If you have any questions or encounter any issues, please don't hesitate to open an issue or reach out.

Happy movie searching! 🎬🍿
