import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Container from "@mui/material/Container";
import NavBar from "../components/NavBar";
import Star from "../images/Star.png";

import "./MoviePage.css";

function MoviePage() {
  const { id } = useParams();
  const [moviePage, setMoviePage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genreNames, setGenreNames] = useState([]);

  const formatToUTCYear = (dateString) => {
    const utcDate = new Date(dateString).toISOString().split("T")[0];
    return utcDate;
  };

  useEffect(() => {
    const fetchMoviePage = async () => {
      try {
        const apiKey = "f15e3b78ab011b4f0ae84e1556ee2de9";

        const [movieResponse, genreResponse] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
          ),
          axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
          ),
        ]);

        const formattedDate = formatToUTCYear(movieResponse.data.release_date);
        const genreNames = movieResponse.data.genres.map(
          (genre) =>
            genreResponse.data.genres.find((g) => g.id === genre.id).name
        );

        const updatedMoviePage = {
          ...movieResponse.data,
          release_date: formattedDate,
        };

        setGenreNames(genreNames);
        setMoviePage(updatedMoviePage);
        setLoading(false);
      } catch (error) {
        console.error("There is an error fetching this movie Page:", error);
        setLoading(false);
      }
    };

    fetchMoviePage();
  }, [id]);

  return (
    <div className="movie-page">
      <NavBar />
      <>
        {loading ? (
          <div className="loading-page">
            <Loading />
          </div>
        ) : moviePage ? (
          <Container>
            <img
              src={`https://image.tmdb.org/t/p/w500/${moviePage.poster_path}`}
              alt={moviePage.title}
              data-testid="movie-poster"
              className="movie-img"
            />
            <div className="free">
              <div className="movie-details">
                <p data-testid="movie-title">{moviePage.title} &#8226;</p>
                <p data-testid="movie-release-date">
                  {moviePage.release_date} &#8226;
                </p>
                <p data-testid="movie-runtime">{moviePage.runtime} mins</p>
                <div className="genres">
                  {genreNames.map((genreName, index) => (
                    <h1 key={index}>{genreName}</h1>
                  ))}
                </div>
              </div>
              <div className="budget">
                <img src={Star} alt="" />
                <span>{moviePage.vote_average?.toFixed(1)}</span>|
                {moviePage.budget / Math.pow(10, 7)}M
              </div>
            </div>

            <p data-testid="movie-overview" className="overview">
              {moviePage.overview}
            </p>
          </Container>
        ) : (
          <div className="error-page">
            <p>Unable to load movie Page</p>
          </div>
        )}
      </>
    </div>
  );
}

export default MoviePage;
