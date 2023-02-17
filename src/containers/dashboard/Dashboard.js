import "./dashboard.css";
import balloon from "../../assets/balloon.png";
import heart from "../../assets/heart.png";
import otherevent from "../../assets/otherevent.png";
import React, { useState, useEffect } from "react";

const Dashboard = (props) => {
  const { submittedData } = props;
  //adding dynamic container colour change serially with event addition
  const containerColors = ["#F9E1B4", "#9B9BDD", "#EC7689", "#8FC7FF"];

  for (let i = 0; i < submittedData.length; i++) {
    submittedData[i].backgroundcolor =
      containerColors[i % containerColors.length];
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
    submittedData.forEach((data) => {
      if (data[keyName]) {
        const eventDate = new Date(data[keyName]).toDateString();
        eventDates.push(eventDate);
      }
    });
  }

  const eventDates = [];

  addDateToEvent("birthday", submittedData, eventDates);
  addDateToEvent("anniversary", submittedData, eventDates);
  addDateToEvent("othereventdate", submittedData, eventDates);

  console.log(eventDates);

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

  // console.log(remainingDays);
  const remainingTimes = eventDates.map((date) => getTimeRemaining(date));

  console.log(submittedData);
  return (
    <div className="dashboardContainer">
      <ul>
        {submittedData.map((data, index) => {
          const remainingTime = remainingTimes[index];

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
                </div>
              </div>

              <div
                className="dashboardContent eventCountdown"
                key={index}
                style={{ backgroundColor: data.backgroundcolor }}
              >
                {remainingTime
                  ? `${remainingTime.days} days left`
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
