import React, { useEffect } from "react";
import "./upcomingevents.css";
import notif_icon from "../../assets/notif_icon.png";
import profile_icon from "../../assets/profile_icon.png";
import logoandname from "../../assets/logoandname.png";
import plussign from "../../assets/plussign.png";
import balloon from "../../assets/balloon.png";
import heart from "../../assets/heart.png";
import otherevent from "../../assets/otherevent.png";
import { Link } from "react-router-dom";

const UpcomingEvents = () => {
  useEffect(() => {
    const close_btn = document.querySelector(".close_btn");
    const addevent_btn = document.querySelector(".addevent_btn");
    const modalevent_form = document.querySelector(".modaladd_form");
    const overlay = document.querySelector(".overlay");

    const openModalForm = () => {
      modalevent_form.classList.remove("hidden");
      overlay.classList.remove("hidden");
    };

    const closeModalForm = () => {
      modalevent_form.classList.add("hidden");
      overlay.classList.add("hidden");
    };

    addevent_btn.addEventListener("click", openModalForm);

    close_btn.addEventListener("click", closeModalForm);

    overlay.addEventListener("click", closeModalForm);
  }, []);

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

      <div className="addevent_btn--container">
        <button type="button" className="addevent_btn">
          Add event{" "}
          <img src={plussign} alt="addevent" className="addevent_img" />
        </button>
      </div>

      <div className="modaladd_form hidden">
        <form action="#" className="eventForm">
          <div className="form-control">
            <input type="text" placeholder="First Name" id="firstName" />
            <div className="close_btn"></div>
          </div>

          <div className="form-control">
            <input type="text" placeholder="Last Name" id="lastName" />
          </div>

          <div className="form-control eventTypes">
            {/* <img src={balloon} alt="balloon_icon" className="event_icon" /> */}
            Birthday
            <input type="checkbox" />
          </div>

          <div className="form-control eventTypes">
            {/* <img src={heart} alt="heart_icon" className="event_icon" /> */}
            Anniversary
            <input type="checkbox" />
          </div>

          <div className="form-control eventTypes">
            {/* <img
              src={otherevent}
              alt="otherevent_icon"
              className="event_icon"
            /> */}
            Other
            <input type="checkbox" />
          </div>

          <div className="submitevent_btn--container">
            <button type="submit" className="submitevent_btn">
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="overlay hidden"></div>
    </div>
  );
};

export default UpcomingEvents;
