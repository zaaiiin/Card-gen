import React from "react";
import "./about.css";

import logoandname from "../../assets/logoandname.png";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about_wrapper">
      <div className="homepage_header">
        <div className="homepage_header--image">
          <Link to="/">
            <img src={logoandname} alt="logoandname" />
          </Link>
        </div>
      </div>

      <h1>Hello!</h1>

      <div className="welcome_msg">
        {`Welcome to CardGen. 
        Never miss out on a special day again!`}
      </div>

      <div className="container">
        <div className="info_box">
          <h2>Stay on track</h2>
          <p>
            Get reminders to wish loved ones on birthdays, anniversaries and
            more!
          </p>
        </div>
        <div className="info_box">
          <h2>Generate cards </h2>
          <p>
            Celebrate special moments with AI generated greeting cards and
            personalized messages.
          </p>
        </div>
        <div className="info_box">
          <h2>Plan ahead</h2>
          <p>
            Curate a gift list or plan gatherings for upcoming special days.
          </p>
        </div>
      </div>
      <Link to="/Form">
        <button type="button" className="basic_btn get_started--btn">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default About;
