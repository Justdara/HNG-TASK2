import React from "react";
import Logo from "../images/tv.png";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import MovieIcon from "@mui/icons-material/OndemandVideo";
import TvseriesIcon from "@mui/icons-material/VideocamOutlined";
import UpcomingIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="div1">
      <nav className="nav1">
        <Link to="/" className="link">
          <div>
            <img src={Logo} alt="" />
            <h1>MovieBox</h1>
          </div>
        </Link>

        <ul>
          <li className="hover-effect">
            <HomeIcon />
            <p>Home</p>
          </li>

          <li className="hover-effect">
            <TvseriesIcon />
            <p>Movies</p>
          </li>
          <li className="hover-effect">
            <MovieIcon />
            <p>TV Series</p>
          </li>
          <li className="hover-effect">
            <UpcomingIcon />
            <p>Upcoming</p>
          </li>
        </ul>
        <div className="div2">
          <h4>Play movie quizes and earn free tickets</h4>
          <p>50k people are playing now</p>
          <button>start playing</button>
        </div>
        <div className="div3">
          <LogoutIcon />
          <p>Log out</p>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
