import React from "react";
import "./upcomingevents.css";
import notif_icon from "../../assets/notif_icon.png";
import profile_icon from "../../assets/profile_icon.png";
import logoandname from "../../assets/logoandname.png";
import { Link } from "react-router-dom";

const UpcomingEvents = () => {
  return (
    <div className="upcomingevents_wrapper">
      <div className="homepage_header">
        <div className="homepage_header--image">
          <Link to="/">
            <img src={logoandname} alt="logoandname" />
          </Link>
        </div>
      </div>
      <div className="nav_icons">
        <button type="button" className="nav_btn profile" id="profile">
          <img
            src={profile_icon}
            alt="profile_icon"
            className="profile_img nav_img"
          />
        </button>
        <button type="button" className="nav_btn" id="notif">
          <img
            src={notif_icon}
            alt="notification_icon"
            className="notif_img nav_img"
          />
        </button>
      </div>

      <div className="events_dashboard--title">Upcoming Events</div>
    </div>
  );
};

export default UpcomingEvents;
