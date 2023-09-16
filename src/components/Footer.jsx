import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="icons">
        <FacebookIcon />
        <InstagramIcon />
        <TwitterIcon />
        <YouTubeIcon />
      </div>
      <div className="line">
        <p>Conditions Of Use</p>
        <p>Privacy & Policy</p>
        <p>Press Room</p>
      </div>
      <p>
        <span>&copy; 2021 MovieBox by Emmanuel</span>
      </p>
    </footer>
  );
}

export default Footer;
