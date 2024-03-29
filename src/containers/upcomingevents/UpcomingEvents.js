import React, { useEffect } from "react";
import "./upcomingevents.css";
import "./reminderradiobuttons.css";
import notif_icon from "../../assets/notif_icon.png";
import profile_icon from "../../assets/profile_icon.png";
import logoandname from "../../assets/logoandname.png";
import plussign from "../../assets/plussign.png";
import createbutton from "../../assets/createbutton.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Dashboard from "../dashboard/Dashboard.js";

const UpcomingEvents = () => {
  useEffect(() => {
    const close_btn = document.querySelector(".close_btn");
    const addevent_btn = document.querySelector(".addevent_btn");
    const modalevent_form = document.querySelector(".modaladd_form");
    const overlay = document.querySelector(".overlay");
    const dateModal = document.querySelector(".dateModal");
    const dateModalAnniversary = document.querySelector(
      ".dateModalAnniversary"
    );
    const dateModalOtherEvent = document.querySelector(".dateModalOtherEvent");
    const bdaycheckbox = document.querySelector(
      "form[name='eventForm'] input[name='birthdaybox']"
    );
    const anniversarycheckbox = document.querySelector(
      "form[name='eventForm'] input[name='anniversarybox']"
    );
    const otherEventsCheckbox = document.querySelector(
      "form[name='eventForm'] input[name='othereventsbox']"
    );
    const otherEventsTextArea = document.querySelector(".otherEventsTextArea");
    const reminderContainer = document.querySelector(".reminderContainer");
    const dates = document.querySelectorAll("input[type='date']");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");

    const openModalForm = () => {
      modalevent_form.classList.remove("hidden");
      overlay.classList.remove("hidden");
      firstName.focus();
      otherEventsTextArea.disabled = true;
    };

    addevent_btn.addEventListener("click", openModalForm);
    close_btn.addEventListener("click", closeModalForm);
    overlay.addEventListener("click", closeModalForm);

    bdaycheckbox.addEventListener("change", changeCheckBoxState);
    anniversarycheckbox.addEventListener("change", changeCheckBoxState);
    otherEventsCheckbox.addEventListener("change", changeCheckBoxState);

    function changeCheckBoxState() {
      const checkboxArray = [
        bdaycheckbox,
        anniversarycheckbox,
        otherEventsCheckbox,
      ];
      const modalArray = [dateModal, dateModalAnniversary, dateModalOtherEvent];

      checkboxArray.forEach((checkbox) => {
        if (checkbox.checked) {
          modalArray.forEach((modal) => modal.classList.add("hidden"));
          reminderContainer.classList.remove("hidden");

          if (checkbox === bdaycheckbox) {
            dateModal.classList.remove("hidden");
            dates.forEach((date) => date.focus());
          } else if (checkbox === anniversarycheckbox) {
            dateModalAnniversary.classList.remove("hidden");
            dates.forEach((date) => date.focus());
          } else if (checkbox === otherEventsCheckbox) {
            dateModalOtherEvent.classList.remove("hidden");
            otherEventsTextArea.disabled = false;
            otherEventsTextArea.style.cursor = "text";
            otherEventsTextArea.focus();
            changeFieldSettings(firstName, true);
            changeFieldSettings(lastName, true);
          }

          checkboxArray.forEach((cb) => {
            if (cb !== checkbox) cb.disabled = true;
          });
        }
      });

      if (checkboxArray.every((checkbox) => !checkbox.checked)) {
        modalArray.forEach((modal) => modal.classList.add("hidden"));
        reminderContainer.classList.add("hidden");
        firstName.focus();
        resetCheckBoxes();
        resetValues();
        otherEventsTextArea.disabled = true;
        otherEventsTextArea.style.cursor = "not-allowed";
        changeFieldSettings(firstName, false);
        changeFieldSettings(lastName, false);
      }
    }

    // eslint-disable-next-line
  }, []);

  const initialValues = {
    firstname: "",
    lastname: "",
    birthday: "",
    anniversary: "",
    otherevent: "",
    othereventdate: "",
    reminder: "",
    id: Date.now(),
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({});
  };
  //run this code once page reloads to retrieve the stored data and set it to the state variable
  useEffect(() => {
    const storedData = localStorage.getItem("submittedData");

    if (localStorage.length > 0) {
      setSubmittedData(JSON.parse(storedData));
    } else {
      setSubmittedData([]);
    }
  }, []);

  //update the storedData whenever the submittedData prop changes
  useEffect(() => {
    const clearall_btn = document.querySelector(".clearall_btn");
    localStorage.setItem("submittedData", JSON.stringify(submittedData));

    if (Array.isArray(submittedData) && submittedData.length > 0) {
      clearall_btn.classList.remove("hidden");
    }

    if (Array.isArray(submittedData) && submittedData.length > 0) {
      clearall_btn.classList.remove("hidden");
    }
  }, [submittedData]);

  function closeModalForm() {
    const modalevent_form = document.querySelector(".modaladd_form");
    const overlay = document.querySelector(".overlay");
    const dateModal = document.querySelector(".dateModal");
    const dateModalAnniversary = document.querySelector(
      ".dateModalAnniversary"
    );
    const dateModalOtherEvent = document.querySelector(".dateModalOtherEvent");
    const reminderContainer = document.querySelector(".reminderContainer");

    modalevent_form.classList.add("hidden");
    overlay.classList.add("hidden");
    dateModal.classList.add("hidden");
    dateModalAnniversary.classList.add("hidden");
    dateModalOtherEvent.classList.add("hidden");
    reminderContainer.classList.add("hidden");

    uncheckAll();
    resetValues();
    resetCheckBoxes();
    setFormErrors({});
    changeFieldSettings(firstName, false);
    changeFieldSettings(lastName, false);
  }

  function resetValues() {
    setFormValues(initialValues);
  }

  function resetCheckBoxes() {
    const bdaycheckbox = document.querySelector(
      "form[name='eventForm'] input[name='birthdaybox']"
    );
    const anniversarycheckbox = document.querySelector(
      "form[name='eventForm'] input[name='anniversarybox']"
    );
    const otherEventsCheckbox = document.querySelector(
      "form[name='eventForm'] input[name='othereventsbox']"
    );
    const radioButtons = document.querySelectorAll('input[type="radio"]');

    const checkboxArray = [
      bdaycheckbox,
      anniversarycheckbox,
      otherEventsCheckbox,
    ];

    checkboxArray.forEach((checkbox) => (checkbox.disabled = false));

    radioButtons.forEach((button) => {
      button.checked = false;
    });
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      closeModalForm();
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSubmittedData([...submittedData, { ...formValues }]);
      resetValues();
      setIsSubmit(true);
      closeModalForm();
      uncheckAll();
      resetCheckBoxes();

      const clearall_btn = document.querySelector(".clearall_btn");
      if (submittedData) {
        clearall_btn.classList.remove("hidden");
      }
    }
  }

  function uncheckAll() {
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  }

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");

  function changeFieldSettings(field, disableField) {
    field.style.cursor = disableField ? "not-allowed" : "text";
    field.disableField = disableField;
  }

  function clearAll() {
    const confirmation = window.confirm(
      "Are you sure you want to clear all events saved?"
    );

    if (confirmation) {
      setTimeout(() => {
        const clearall_btn = document.querySelector(".clearall_btn");
        localStorage.clear();
        setSubmittedData([]);
        clearall_btn.classList.add("hidden");
      }, 500);
    }
  }

  function validate(values) {
    const errors = {};
    const otherEventsCheckbox = document.querySelector(
      "form[name='eventForm'] input[name='othereventsbox']"
    );
    const otherEventsTextArea = document.querySelector(".otherEventsTextArea");

    if (!values.firstname) {
      errors.firstname = "First name is required";
    }

    if (!values.birthday && !values.anniversary && !values.othereventdate) {
      errors.date = "A date is required";
    }

    if (otherEventsCheckbox.checked && !values.otherevent) {
      errors.eventname = "Event name is required";
      otherEventsTextArea.style.cursor = "pointer";
      values.firstname = "";
      delete errors.firstname;
    } else if (values.otherevent) {
      firstName.Value = "";
      values.firstname = "";
      values.lastname = "";
      delete errors.firstname;
    }

    if (!values.reminder) {
      errors.date = "Please set a reminder";
    }
    return errors;
  }
  const MemoizedDashboard = React.memo(Dashboard);

  return (
    <div className="upcomingevents_wrapper">
      <div className="title_container">
        <div className="homepage_header">
          <div className="homepage_header--image">
            <Link to="/">
              <img src={logoandname} className="logoimage" alt="logoandname" />
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
      {/* <div className="addevent_btn--container"> */}
      <button type="button" className="addevent_btn">
        Add event <img src={plussign} alt="addevent" className="addevent_img" />
      </button>

      {/* <button type="button" className="smalladd_btn">
        <img src={createbutton} alt="addevent" className="smalladd_img" />
      </button> */}
      {/* </div> */}
      <button type="button" className="clearall_btn hidden" onClick={clearAll}>
        Clear all
      </button>
      {/* passing props to dashboard component */}

      <MemoizedDashboard submittedData={submittedData} />

      <div className="modaladd_form hidden">
        <form
          name="eventForm"
          action="#"
          className="eventForm"
          onSubmit={handleSubmit}
        >
          <div className="form-control">
            <p id="firstNameError">{formErrors.firstname}</p>

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

          <div className="form-control eventTypes" id="birthdaylabel">
            Birthday
            <input type="checkbox" name="birthdaybox" />
          </div>

          <div className="form-control eventTypes" id="anniversarylabel">
            Anniversary
            <input type="checkbox" name="anniversarybox" />
          </div>

          <div className="form-control eventTypes" id="otherEventsDiv">
            <div className="errorMessage">{formErrors.date}</div>
            <textarea
              placeholder="Other"
              className="otherEventsTextArea"
              value={formValues.otherevent}
              name="otherevent"
              onChange={handleChange}
            ></textarea>

            <input type="checkbox" name="othereventsbox" />
          </div>
          <div className="errorMessageEventName">{formErrors.eventname}</div>
          <div className="submitevent_btn--container">
            <button type="submit" className="submitevent_btn">
              Save
            </button>
          </div>
        </form>
        <div className="dateModal hidden">
          <label>Choose a date</label>
          <input
            type="date"
            name="birthday"
            value={formValues.birthday}
            id="date"
            onChange={handleChange}
          ></input>
        </div>
        <div className="dateModalAnniversary hidden">
          <label>Choose a date</label>
          <input
            type="date"
            name="anniversary"
            value={formValues.anniversary}
            id="date"
            onChange={handleChange}
          ></input>
        </div>
        <div className="dateModalOtherEvent hidden">
          <label>Choose a date</label>
          <input
            type="date"
            name="othereventdate"
            value={formValues.othereventdate}
            id="date"
            onChange={handleChange}
          ></input>
        </div>
        <div className="reminderContainer hidden">
          <div className="reminderTitle">Remind me:</div>
          <div className="optionsContainer">
            <label htmlFor="zerodayprior">On the day</label>
            <input
              type="radio"
              name="reminder"
              value="0"
              onChange={handleChange}
              id="zerodayprior"
            ></input>
            <br></br>
            <label htmlFor="onedayprior">One day earlier</label>
            <input
              type="radio"
              name="reminder"
              value="1"
              onChange={handleChange}
              id="onedayprior"
            ></input>
            <br></br>
            <label htmlFor="threedaysprior">Three days earlier</label>
            <input
              type="radio"
              name="reminder"
              value="3"
              onChange={handleChange}
              id="threedaysprior"
            ></input>
            <br></br>
            <label htmlFor="oneweekprior">One week earlier</label>
            <input
              type="radio"
              name="reminder"
              value="7"
              onChange={handleChange}
              id="oneweekprior"
            ></input>
          </div>
        </div>
        );
      </div>
      <div className="overlay hidden"></div>
    </div>
  );
};

export default UpcomingEvents;
