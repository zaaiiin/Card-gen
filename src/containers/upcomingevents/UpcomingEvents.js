import React from "react";
import "./upcomingevents.css";

import logoandname from "../../assets/logoandname.png";

const UpcomingEvents = () => {
  return (
    <div className="about_wrapper">
      <div className="homepage_header">
        <div className="homepage_header--image">
          <img src={logoandname} alt="logoandname" />
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
