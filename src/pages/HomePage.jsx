import React, { useEffect, useState } from "react";
import axios from "axios";
import Poster from "../images/poster.svg";
import Logo from "../images/logo.png";
import hamButton from "../images/ellipse.png";
import imbdLogo from "../images/imbd.png";
import rottenTomatoesLogo from "../images/rotten-tomatoes.png";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import "./HomePage.css";

function HomePage() {
  const [posterMovieData, setPosterMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const apiKey = "f15e3b78ab011b4f0ae84e1556ee2de9";

    const fetchPoster = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=John+Wick&api_key=${apiKey}`
        );
        const posterMovieData = response.data.results[3];
        setPosterMovieData(posterMovieData);
      } catch (error) {
        console.error("Error fetching poster:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoster();
  }, []);

  useEffect(() => {
    const apiKey = "f15e3b78ab011b4f0ae84e1556ee2de9";

    const fetchTopMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=1`
        );
        const topMovies = response.data.results.slice(0, 10);
        setTopMovies(topMovies);
      } catch (error) {
        console.error("Error fetching top movies:", error);
        toast.error("An error occurred, try again later.");
      }
    };

    fetchTopMovies();
  }, []);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const apiKey = "f15e3b78ab011b4f0ae84e1556ee2de9";
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${apiKey}`
      );

      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching for movies:", error);
      toast.error(
        "Oops! Something went wrong. Gremlins must be messing with our movie search!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div
        className="poster-image"
        style={{ backgroundImage: `url(${Poster})` }}
      >
        <header>
          <div className="header">
            <img src={Logo} alt="" style={{ cursor: "pointer" }} />
            <div className="search-container">
              <input
                type="text"
                placeholder="What do you want to watch?"
                className="search-input"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <div onClick={handleSearch}>
                <SearchIcon className="search-icon" />
              </div>
            </div>
            <p>SignIn</p>
            <img src={hamButton} alt="" style={{ cursor: "pointer" }} />
          </div>
          {posterMovieData ? (
            <Container style={{ textAlign: "left" }}>
              <h2 className="poster-info">{posterMovieData.title}</h2>
              <div className="rating">
                <img src={imbdLogo} alt="" />
                <img src={rottenTomatoesLogo} alt="" />
              </div>
              <p className="poster-overview">{posterMovieData.overview}</p>
              <button className="watch-button">
                <PlayCircleOutlineIcon sx={{ color: "white" }} />
                WATCH TRAILER
              </button>
            </Container>
          ) : (
            <p style={{ color: "white" }}>Loading....</p>
          )}
        </header>
        <main style={{ marginTop: "80px" }}>
          <Container>
            {loading ? (
              <Loading />
            ) : (
              <>
                {Array.isArray(searchResults) &&
                  searchQuery &&
                  searchResults.length > 0 && (
                    <div className="search-result">
                      <h1>Your Search Result</h1>
                      <Container
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(4, 1fr)",
                          gap: "48px",
                        }}
                      >
                        {searchResults.map((movie) => (
                          <MovieCard key={movie.id} movie={movie} />
                        ))}
                      </Container>
                    </div>
                  )}
                <h1 className="head">Top 10 Movies</h1>
                {Array.isArray(topMovies) && topMovies.length > 0 && (
                  <div className="each">
                    {topMovies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                )}
              </>
            )}
          </Container>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
