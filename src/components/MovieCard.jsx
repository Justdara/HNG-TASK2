import React, { useState, useEffect } from "react";
import { Card, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import "./MovieCard.css";
import Rotten from "../images/rotten.png";
import Imdb from "../images/imdblogo.png";

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [genre, setGenre] = useState("");
  const [imdbPercentage, setImdbPercentage] = useState("");
  const [rottenPercentage, setRottenPercentage] = useState("");
  const [formattedReleaseYear, setFormattedReleaseYear] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setIsFavorite(favorites.includes(movie.id));

      const apiKey = "7a529b24ef789e4a50de476f2a2bbd35";

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
        );
        const genreNames = response.data.genres
          .map((genre) => genre.name)
          .join(", ");
        setGenre(genreNames);

        const formattedDate = formatToUTCYear(response.data.release_date);
        setFormattedReleaseYear(formattedDate);
      } catch (error) {
        console.error("Error fetching genre data:", error);
      }

      setImdbPercentage(getRandomPercentage());
      setRottenPercentage(getRandomPercentage());
    };

    fetchData();
  }, [movie.id]);

  function getRandomPercentage() {
    const randomPercentage = Math.floor(Math.random() * 51) + 50;
    return `${randomPercentage}%`;
  }

  const formatToUTCYear = (dateString) => {
    const localDate = new Date(dateString);
    const utcYear = localDate.getUTCFullYear();
    return utcYear.toString();
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const updatedFavorites = isFavorite
      ? favorites.filter((id) => id !== movie.id)
      : [...favorites, movie.id];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      to={`/movies/${movie.id}`}
      style={{ textDecoration: "none" }}
      onClick={(e) => {
        if (e.target.closest(".favorite-icon")) {
          e.preventDefault();
          toggleFavorite();
        }
      }}
    >
      <Card className="movie-card" data-testid="movie-card">
        <IconButton
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            cursor: "pointer",
          }}
          className="favorite-icon"
          onClick={toggleFavorite}
        >
          {isFavorite ? (
            <FavoriteIcon style={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          data-testid="movie-poster"
          className="poster"
        />
        <p data-testid="movie-release-date" className="date">
          {formattedReleaseYear}
        </p>
        <div className="rate">
          <div className="ratings">
            <img src={Imdb} alt="" />
            <span>{imdbPercentage} / 100</span>
          </div>
          <div className="ratings">
            <img src={Rotten} alt="" />
            <span>{rottenPercentage} / 100</span>
          </div>
        </div>
        <h2 data-testid="movie-title" className="movie-title">
          {movie.title}
        </h2>
        <p className="movie-genre">{genre}</p>
      </Card>
    </Link>
  );
}

export default MovieCard;
