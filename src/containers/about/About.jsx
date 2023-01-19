import React from "react";
import "./about.css";

import logoandname from "../../assets/logoandname.png";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <body>
      <div className="homepage_header">
        <div className="homepage_header--image">
          <img src={logoandname} alt="logoandname" />
        </div>
      </div>
      <div>
        <h1>Hello!</h1>
      </div>

      <div className="welcome_msg">
        {`Welcome to CardGen. 
        Never miss out on a special day again!`}
      </div>

      <div className="container">
        <div className="info_box">
          <p>
            <h2>Stay on track</h2> Get reminders to wish loved ones on
            birthdays, anniversaries and more!
          </p>
        </div>
        <div className="info_box">
          <p>
            <h2>Generate cards </h2>Celebrate special moments with AI generated
            greeting cards and personalized messages.
          </p>
        </div>
        <div className="info_box">
          <p>
            <h2>Plan ahead</h2>Curate a gift list or plan gatherings for
            upcoming special days.
          </p>
        </div>
      </div>
      <Link to="/CreateAccount">
        <button type="button" className="basic_btn get_started--btn">
          Get Started
        </button>
      </Link>
    </body>
  );
};

export default About;
