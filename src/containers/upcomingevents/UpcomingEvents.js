import React, { useEffect } from "react";
import "./upcomingevents.css";
import notif_icon from "../../assets/notif_icon.png";
import profile_icon from "../../assets/profile_icon.png";
import logoandname from "../../assets/logoandname.png";
import plussign from "../../assets/plussign.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Dashboard from "../../containers/dashboard/Dashboard.js";
// import balloon from "../../assets/balloon.png";
// import heart from "../../assets/heart.png";
// import otherevent from "../../assets/otherevent.png";

const UpcomingEvents = () => {
  useEffect(() => {
    const close_btn = document.querySelector(".close_btn");
    const addevent_btn = document.querySelector(".addevent_btn");
    const modalevent_form = document.querySelector(".modaladd_form");
    const overlay = document.querySelector(".overlay");
    // const submitevent_btn = document.querySelector(".submitevent_btn");

    const openModalForm = () => {
      modalevent_form.classList.remove("hidden");
      overlay.classList.remove("hidden");
    };

    const closeModalForm = () => {
      modalevent_form.classList.add("hidden");
      overlay.classList.add("hidden");
      dateModal.classList.add("hidden");
    };

    addevent_btn.addEventListener("click", openModalForm);

    close_btn.addEventListener("click", closeModalForm);

    overlay.addEventListener("click", closeModalForm);

    const checkboxes = document.querySelectorAll("input[name=checkbox]");

    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener("change", changeCheckBoxState);
    }

    const dateModal = document.querySelector(".dateModal");

    function changeCheckBoxState() {
      if (this.checked) {
        dateModal.classList.remove("hidden");
      } else {
        dateModal.classList.add("hidden");
      }
    }
  }, []);

  const initialValues = {
    firstname: "",
    lastname: "",
  };

  const initialDates = {
    birthday: "",
    anniversary: "",
  };

  const [formNames, setFormNames] = useState(initialValues);
  const [formDates, setFormDates] = useState(initialDates);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormNames({ ...formNames, [name]: value });
    setFormDates({ ...formDates, [name]: value });
    console.log(formDates);
    console.log(formNames, submittedData);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      closeModalForm();
    }
    // eslint-disable-next-line
  }, [formErrors]);

  const modalevent_form = document.querySelector(".modaladd_form");
  const overlay = document.querySelector(".overlay");
  const dateModal = document.querySelector(".dateModal");

  const closeModalForm = () => {
    modalevent_form.classList.add("hidden");
    overlay.classList.add("hidden");
    dateModal.classList.add("hidden");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formNames));
    setIsSubmit(true);
    setSubmittedData([...submittedData, { ...formNames }, { ...formDates }]);
    console.log(submittedData);
    setFormNames({ firstname: "", lastname: "" });
    setFormDates({ birthday: "", anniversary: "" });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.firstname) {
      errors.firstname = "First name is required";
    }
    return errors;
  };

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

      {/* passing props to dashboard component */}

      <Dashboard submittedData={submittedData} />

      <div className="addevent_btn--container">
        <button type="button" className="addevent_btn">
          Add event{" "}
          <img src={plussign} alt="addevent" className="addevent_img" />
        </button>
      </div>

      <div className="modaladd_form hidden">
        <form
          name="eventForm"
          action="#"
          className="eventForm"
          onSubmit={handleSubmit}
        >
          <div className="form-control">
            <p>{formErrors.firstname}</p>

            <input
              type="text"
              placeholder="First Name"
              id="firstName"
              name="firstname"
              value={formNames.firstname}
              onChange={handleChange}
            />

            <div className="close_btn"></div>
          </div>

          <div className="form-control">
            <input
              type="text"
              placeholder="Last Name"
              id="lastName"
              name="lastname"
              value={formNames.lastname}
              onChange={handleChange}
            />
          </div>

          <div className="form-control eventTypes">
            {/* <img src={balloon} alt="balloon_icon" className="event_icon" /> */}
            Birthday
            <input type="checkbox" name="checkbox" />
          </div>

          <div className="form-control eventTypes">
            {/* <img src={heart} alt="heart_icon" className="event_icon" /> */}
            Anniversary
            <input type="checkbox" name="checkbox" />
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
        <div className="dateModal hidden">
          <label>Date of Birth</label>
          <input
            type="date"
            name="birthdate"
            id="dateofbirth"
            onChange={handleChange}
          ></input>
        </div>

        <div className="dateModal hidden">
          <label>Anniversary</label>
          <input
            type="date"
            name="anniversarydate"
            id="dateofanniversary"
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="overlay hidden"></div>
    </div>
  );
};

export default UpcomingEvents;
