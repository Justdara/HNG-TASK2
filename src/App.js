import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoviePage from "./pages/MoviePage";
import HomePage from "./pages/HomePage";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Movie Discovery App</title>
        <link
          rel="canonical"
          href="https://moviediscoveryapp-hng.netlify.app/"
        />
        <meta name="description" content="A movie discovery application" />
      </Helmet>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
