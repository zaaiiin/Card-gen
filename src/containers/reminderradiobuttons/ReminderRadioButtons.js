import React from "react";
import "./reminderradiobuttons.css";

const ReminderRadioButtons = ({ handleReminderChange }) => {
  console.log(handleReminderChange);
  return (
    <div className="reminderContainer ">
      <div className="reminderTitle">Remind me:</div>
      <div className="optionsContainer">
        <label htmlFor="zeroDay">On the day</label>
        <input
          type="radio"
          name="reminder"
          value="0"
          onChange={handleReminderChange}
          id="zerodayprior"
        ></input>
        <br></br>
        <label htmlFor="oneDay">One day earlier</label>
        <input
          type="radio"
          name="reminder"
          value="1"
          onChange={handleReminderChange}
          id="onedayprior"
        ></input>
        <br></br>
        <label htmlFor="threeDays">Three days earlier</label>
        <input
          type="radio"
          name="reminder"
          value="3"
          onChange={handleReminderChange}
          id="threedaysprior"
        ></input>
        <br></br>
        <label htmlFor="oneWeek">One week earlier</label>
        <input
          type="radio"
          name="reminder"
          value="7"
          onChange={handleReminderChange}
          id="oneweekprior"
        ></input>
      </div>
    </div>
  );
};
export default ReminderRadioButtons;
