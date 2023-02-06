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

    // const checkboxes = document.querySelectorAll("input[type=checkbox]");

    // for (let i = 0; i < checkboxes.length; i++) {
    //   checkboxes[i].addEventListener("change", changeCheckBoxState);
    // }
    const dateModal = document.querySelector(".dateModal");
    const dateModalAnniversary = document.querySelector(
      ".dateModalAnniversary"
    );

    const bdaycheckbox = document.querySelector(
      "form[name='eventForm'] input[name='birthdaybox']"
    );
    const anniversarycheckbox = document.querySelector(
      "form[name='eventForm'] input[name='anniversarybox']"
    );

    bdaycheckbox.addEventListener("change", changeCheckBoxState);
    anniversarycheckbox.addEventListener("change", changeCheckBoxState);

    function changeCheckBoxState() {
      if (bdaycheckbox.checked) {
        console.log("box is checked");
        dateModal.classList.remove("hidden");
        dateModalAnniversary.classList.add("hidden");
      } else if (anniversarycheckbox.checked) {
        console.log("abox is checked");
        dateModalAnniversary.classList.remove("hidden");
        dateModal.classList.add("hidden");
      } else {
        dateModalAnniversary.classList.add("hidden");
        dateModal.classList.add("hidden");
      }
    }
  }, []);

  // function changeAnniversaryCheckBoxState() {
  //   if (this.checked) {
  //     dateModalAnniversary.classList.remove("hidden");
  //   } else {
  //     dateModalAnniversary.classList.add("hidden");
  //   }
  // }

  const initialValues = {
    firstname: "",
    lastname: "",
    birthday: "",
    anniversary: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    console.log(formValues, submittedData);
  };

  const modalevent_form = document.querySelector(".modaladd_form");
  const overlay = document.querySelector(".overlay");
  const dateModal = document.querySelector(".dateModal");

  const closeModalForm = () => {
    modalevent_form.classList.add("hidden");
    overlay.classList.add("hidden");
    dateModal.classList.add("hidden");
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      closeModalForm();
    }
    // eslint-disable-next-line
  }, [formErrors, isSubmit]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const errors = validate(formValues);
  //   setFormErrors(errors);
  //   if (Object.keys(formErrors).length > 0) {
  //     return;
  //   }

  //   setIsSubmit(true);
  //   setSubmittedData([...submittedData, { ...formValues }]);
  //   console.log(submittedData);
  //   setFormValues({
  //     firstname: "",
  //     lastname: "",
  //     birthday: "",
  //     anniversary: "",
  //   });
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setSubmittedData([...submittedData, { ...formValues }]);
      setFormValues({
        firstname: "",
        lastname: "",
        birthday: "",
        anniversary: "",
      });
      setIsSubmit(true);
      uncheckAll();
      closeModalForm();
    }
  };

  function uncheckAll() {
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  }

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
              value={formValues.firstname}
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
              value={formValues.lastname}
              onChange={handleChange}
            />
          </div>

          <div className="form-control eventTypes">
            {/* <img src={balloon} alt="balloon_icon" className="event_icon" /> */}
            Birthday
            <input type="checkbox" name="birthdaybox" />
          </div>

          <div className="form-control eventTypes">
            {/* <img src={heart} alt="heart_icon" className="event_icon" /> */}
            Anniversary
            <input type="checkbox" name="anniversarybox" />
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
          <label>Choose the date</label>
          <input
            type="date"
            name="birthday"
            value={formValues.birthday}
            id="dateofbirth"
            onChange={handleChange}
          ></input>
        </div>
        <div className="dateModalAnniversary hidden">
          <label>Choose the date</label>
          <input
            type="date"
            name="anniversary"
            value={formValues.anniversary}
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
