import "./dashboard.css";
import balloon from "../../assets/balloon.png";
import heart from "../../assets/heart.png";
import otherevent from "../../assets/otherevent.png";
import React, { useState, useEffect } from "react";

const Dashboard = (props) => {
  const { submittedData } = props;
  //adding dynamic container colour change serially with event addition
  const containerColors = ["#F9E1B4", "#9B9BDD", "#EC7689", "#8FC7FF"];

  if (submittedData) {
    for (let i = 0; i < submittedData.length; i++) {
      submittedData[i].backgroundcolor =
        containerColors[i % containerColors.length];
    }
  }

  //assigning icons to corresponding event
  let arrayOfIcons = [];

  arrayOfIcons.push(
    <img src={balloon} />,
    <img src={heart} />,
    <img src={otherevent} />
  );

  function displayIcon(data) {
    let eventIcon;
    if (data.birthday) {
      eventIcon = <img src={balloon} alt="balloon" />;
    } else if (data.anniversary) {
      eventIcon = <img src={heart} alt="heart" />;
    } else if (data.otherevent) {
      eventIcon = <img src={otherevent} alt="otherevent" />;
    } else {
      eventIcon = "";
    }
    return eventIcon;
  }

  //formatting dates for all events

  function getFormattedDate(date) {
    const suffixes = [
      "th",
      "st",
      "nd",
      "rd",
      "th",
      "th",
      "th",
      "th",
      "th",
      "th",
    ];
    const day = date.getDate();
    const suffix = day >= 11 && day <= 13 ? "th" : suffixes[day % 10];
    return `${date.toLocaleString("en-US", {
      month: "short",
    })} ${day}${suffix}`;
  }

  //format dates and save to respective arrays
  const [formattedBirthdayArray, setFormattedBirthdayArray] = useState([]);
  const [formattedAnniversaryArray, setFormattedAnniversaryArray] = useState(
    []
  );
  const [formattedOthereventArray, setFormattedOthereventArray] = useState([]);

  function formatDates(submittedData, keyName, setStateFunc) {
    const formattedDates = submittedData.map((data) => {
      if (data[keyName]) {
        return getFormattedDate(new Date(data[keyName]));
      }
      return null;
    });
    setStateFunc(formattedDates);
  }

  useEffect(() => {
    if (Array.isArray(submittedData) && submittedData.length > 0) {
      formatDates(submittedData, "birthday", setFormattedBirthdayArray);
      formatDates(submittedData, "anniversary", setFormattedAnniversaryArray);
      formatDates(submittedData, "othereventdate", setFormattedOthereventArray);
    }
  }, [submittedData]);

  //creating a countdown
  function addDateToEvent(keyName, submittedData, eventDates) {
    if (submittedData) {
      submittedData.forEach((data) => {
        if (data[keyName]) {
          const eventDate = new Date(data[keyName]).toDateString();
          eventDates.push(eventDate);
        }
      });
    }
  }

  const eventDates = [];

  addDateToEvent("birthday", submittedData, eventDates);
  addDateToEvent("anniversary", submittedData, eventDates);
  addDateToEvent("othereventdate", submittedData, eventDates);

  //get days remaining until event
  function getTimeRemaining(eventDate) {
    const difference = Date.parse(eventDate) - Date.now();
    function convertToDays(difference) {
      const days = Math.round(difference / (1000 * 60 * 60 * 24));
      return days;
    }

    const eventMonth = new Date(eventDate).getMonth() + 1;
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const eventDates = new Date(currentYear, eventMonth - 1);
    const currentDates = new Date(currentYear, currentMonth - 1);
    const currentDate = new Date().getDate();
    const specificEventDate = new Date(eventDate).getDate();

    function addYearToDate(date) {
      const newDate = new Date(date);
      newDate.setFullYear(newDate.getFullYear() + 1);
      return newDate;
    }

    if (difference > 0) {
      const days = convertToDays(difference);

      return { days, difference };
    }

    if (difference < 0 && eventDates < currentDates) {
      function setToThisYear() {
        let eventDateYear = new Date(eventDate);
        // const getEventDateYear = eventDateYear.getFullYear();
        eventDateYear.setFullYear(currentYear);

        return eventDateYear;
      }
      const setEventDate = setToThisYear(eventDate);
      const updatedEventDate = addYearToDate(setEventDate);
      const difference = Date.parse(updatedEventDate) - Date.now();
      const days = convertToDays(difference);
      return { days, difference };
    }

    if (difference < 0 && eventDates > currentDates) {
      const difference = eventDates.getTime() - Date.now();
      const days = convertToDays(difference);
      return { days, difference };
    }

    if (specificEventDate !== currentDate && eventMonth === currentMonth) {
      const updatedEventDate = addYearToDate(eventDate);
      const difference = Date.parse(updatedEventDate) - Date.now();
      const days = convertToDays(difference);
      return { days, difference };
    }
  }

  const remainingTimes = eventDates.map((date) => getTimeRemaining(date));

  // //adding reminders
  // const birthdayReminder = document.getElementById("birthdayreminderdate");
  // const anniversaryReminder = document.getElementById(
  //   "anniversaryreminderdate"
  // );
  // const otherEventReminder = document.getElementById("othereventreminderdate");
  // // console.log(
  // //   birthdayReminder.value,
  // //   anniversaryReminder.value,
  // //   otherEventReminder.value
  // // );

  // const [reminders, setReminders] = useState([]);

  // useEffect(() => {
  //   // const oneDayPrior = document.getElementById("onedayprior");
  //   // const threeDaysPrior = document.getElementById("threedaysprior");
  //   // const oneWeekPrior = document.getElementById("oneweekprior");
  //   const reminderRadioButtons = document.querySelectorAll(
  //     "input[type='radio'][name='reminder']"
  //   );

  //   const date = submittedData.map((data) => {
  //     return data.birthday || data.anniversary || data.othereventdate;
  //   });

  //   const eventDate = new Date(date[0]);
  //   let millisecondsInADay = 24 * 60 * 60 * 1000;
  //   let dateOffset;
  //   let allReminders = [];

  //   for (let i = 0; i < reminderRadioButtons.length; i++) {
  //     // if (
  //     //   reminderRadioButtons[i].checked &&
  //     //   reminderRadioButtons[i].value === "0"
  //     // ) {
  //     //   allReminders.push(date[0]);
  //     // } else if (
  //     if (
  //       reminderRadioButtons[i].checked &&
  //       reminderRadioButtons[i].value === "1"
  //     ) {
  //       dateOffset = millisecondsInADay * 1; //1 day
  //       allReminders.push(
  //         new Date(
  //           eventDate.setTime(eventDate.getTime() - dateOffset)
  //         ).toLocaleString("en-UK")
  //       );
  //     } else if (
  //       reminderRadioButtons[i].checked &&
  //       reminderRadioButtons[i].value === "3"
  //     ) {
  //       dateOffset = millisecondsInADay * 3; //1 day
  //       allReminders.push(
  //         new Date(
  //           eventDate.setTime(eventDate.getTime() - dateOffset)
  //         ).toLocaleString("en-UK")
  //       );
  //     } else if (
  //       reminderRadioButtons[i].checked &&
  //       reminderRadioButtons[i].value === "7"
  //     ) {
  //       dateOffset = millisecondsInADay * 7; //1 day
  //       allReminders.push(
  //         new Date(
  //           eventDate.setTime(eventDate.getTime() - dateOffset)
  //         ).toLocaleString("en-UK")
  //       );
  //     }
  //   }

  //   setReminders(allReminders);
  // }, [submittedData]);

  // const allReminders = submittedData.map((data, index) => {
  //   const date = data.birthday || data.anniversary || data.othereventdate;
  //   return date;
  // });
  // console.log(allReminders);
  // // const [reminders, setReminders] = useState([]);
  // // useEffect(() => {

  // function changeRadioButton(date) {
  //   const reminderRadioButtons = document.querySelectorAll(
  //     "input[type='radio'][name='reminder']"
  //   );

  //   const eventDate = new Date(date);
  //   console.log(eventDate);

  //   const millisecondsInADay = 24 * 60 * 60 * 1000;

  //   let selectedValue = null;
  //   for (let i = 0; i < reminderRadioButtons.length; i++) {
  //     if (
  //       reminderRadioButtons[i].checked &&
  //       ["1", "3", "7"].includes(reminderRadioButtons[i].value)
  //     ) {
  //       selectedValue = reminderRadioButtons[i].value;
  //       break;
  //     }
  //   }

  //   if (selectedValue === "1") {
  //     const dateOffset = millisecondsInADay * 1; //1 day
  //     const newDate = new Date(eventDate.getTime() - dateOffset);
  //     const reminder = new Date(
  //       eventDate.setTime(newDate.getTime())
  //     ).toLocaleString("en-UK");
  //     return { reminder, selectedValue };
  //   }

  //   if (selectedValue === "3") {
  //     const dateOffset = millisecondsInADay * 3; //3 days
  //     const newDate = new Date(eventDate.getTime() - dateOffset);
  //     const reminder = new Date(
  //       eventDate.setTime(newDate.getTime())
  //     ).toLocaleString("en-UK");
  //     return { reminder, selectedValue };
  //   }

  //   if (selectedValue === "7") {
  //     const dateOffset = millisecondsInADay * 7; //7 days
  //     const newDate = new Date(eventDate.getTime() - dateOffset);
  //     const reminder = new Date(
  //       eventDate.setTime(newDate.getTime())
  //     ).toLocaleString("en-UK");
  //     return { reminder, selectedValue };
  //   }
  // }

  // const reminderDates = allReminders.map((date) => changeRadioButton(date));

  // console.log(submittedData);
  return (
    <div className="dashboardContainer">
      <ul>
        {submittedData &&
          submittedData.map((data, index) => {
            const remainingTime = remainingTimes[index];
            // const reminders = reminderDates[index];

            return (
              <div className="allContainers" key={index}>
                <div className="dashboardContent dateDetailsContainer">
                  <div className="dashboardContent eventDate" key={index}>
                    {formattedBirthdayArray[index]}
                    {formattedAnniversaryArray[index]}
                    {formattedOthereventArray[index]}
                  </div>
                  <div
                    className="dashboardContent dateSideContainer"
                    style={{ backgroundColor: data.backgroundcolor }}
                  ></div>
                </div>
                <div
                  className="dashboardContent eventName"
                  style={{ backgroundColor: data.backgroundcolor }}
                >
                  <div className="eventIcon" key={data.index}>
                    {displayIcon(data)}
                  </div>

                  <div className="eventType">
                    {data.firstname} {data.lastname}
                    {data.otherevent}
                    {/* <div className="reminders" key={index}>
                    {reminders}
                  </div>{" "} */}
                    {/* </div> */}
                  </div>
                </div>

                <div
                  className="dashboardContent eventCountdown"
                  key={index}
                  style={{ backgroundColor: data.backgroundcolor }}
                >
                  {remainingTime
                    ? `${remainingTime.days + 1} days left`
                    : "🎉Today's the day! 🎉"}
                </div>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default Dashboard;
