import React from "react";
import "./landingpage.css";
import confetti from "../../assets/logowithconfetti.png";
import title from "../../assets/CardGen.png";
import forwardbutton from "../../assets/forwardbutton.png";
import { Link } from "react-router-dom";

const Landingpage = () => {
  return (
    <div className="landingpage_content">
      <header className="App-header">
        <Link to="/">
          <div className="title_img">
            <img src={title} alt="title" id="title" />
          </div>
        </Link>
        <div className="main_img">
          <img src={confetti} alt="confettiwithlogo" id="confettiwithlogo" />
        </div>

        <div id="container">
          <div id="center">
            <div className="animated_text">
              <span className="lightGreen">Birthday </span>&nbsp;
              <span className="darkGreen">Reminders</span>&nbsp;and&nbsp;
              <span className="lightGreen"> Greeting </span>&nbsp;
              <span className="darkGreen">Cards.</span>
            </div>
          </div>
        </div>
        <div className="fade-in_btn">
          <Link to="/About">
            <button type="button" className="basic_btn forward--btn">
              <img
                src={forwardbutton}
                alt="forwardbutton"
                id="forward_btn--img"
              />
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Landingpage;
