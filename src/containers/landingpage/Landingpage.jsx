import React from "react";
import "./landingpage.css";
import confetti from "../../assets/logowithconfetti.png";
import title from "../../assets/CardGen.png";
import backbutton from "../../assets/backbutton.png";
import { Link } from "react-router-dom";

const Landingpage = () => {
  return (
    <div className="landingpage_content">
      <header className="App-header">
        <Link to="/">
          <img src={title} alt="title" id="title" />
        </Link>
        <div className="mainImg">
          <img src={confetti} alt="confettiwithlogo" id="confettiwithlogo" />
        </div>

        <div id="container">
          <div id="center">
            <p>
              <span className="lightGreen">Birthday </span>&nbsp;
              <span className="darkGreen">Reminders</span>&nbsp;and&nbsp;
              <span className="lightGreen"> Greeting </span>&nbsp;
              <span className="darkGreen">Cards.</span>
            </p>
          </div>
        </div>
        <div class="fade-in_btn">
          <Link to="/About">
            <button>
              <img src={backbutton} alt="backbutton" id="backbtn_img" />
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Landingpage;
