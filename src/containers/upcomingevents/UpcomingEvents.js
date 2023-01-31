import React, { useEffect } from "react";
import "./upcomingevents.css";
import notif_icon from "../../assets/notif_icon.png";
import profile_icon from "../../assets/profile_icon.png";
import logoandname from "../../assets/logoandname.png";
import plussign from "../../assets/plussign.png";
import { Link } from "react-router-dom";

// const addevent_btn = document.querySelector("addevent_btn");
// const title = document.querySelector("events_dashboard--title");

const UpcomingEvents = () => {
  useEffect(() => {
    const formGroup = document.querySelector(".formGroup");
    // addevent_btn.addEventListener("click", () => {
    //   modalAddForm.classList.add;
    // });

    formGroup.addEventListener("click", () => {
      formGroup.classList.remove("hidden");
    });
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
          </div>

          <div className="form-control">
            <input type="text" placeholder="Last Name" id="lastName" />
          </div>

          <div className="form-control eventTypes">
            Birthday
            <input type="checkbox" />
          </div>

          <div className="form-control eventTypes">
            Anniversary
            <input type="checkbox" />
          </div>

          <div className="form-control eventTypes">
            Other
            <input type="checkbox" />
          </div>

          <div className="form-control groupSelect">
            <label>Group</label>
            <select
              id="formgroup"
              className="formGroup hidden"
              name="groups"
              size="3"
            >
              <option value="family">Family</option>
              <option value="friends">Friends</option>
              <option value="workmates">Workamtes</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpcomingEvents;
