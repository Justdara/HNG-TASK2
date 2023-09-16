import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoviePage from "./pages/MoviePage";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <div className="App">
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
