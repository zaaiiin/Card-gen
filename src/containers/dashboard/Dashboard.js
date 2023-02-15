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
  console.log(arrayOfIcons);

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

  const [formattedBirthdayArray, setFormattedBirthdayArray] = useState([]);
  const [formattedAnniversaryArray, setFormattedAnniversaryArray] = useState(
    []
  );
  const [formattedOthereventArray, setFormattedOthereventArray] = useState([]);

  useEffect(() => {
    if (Array.isArray(submittedData) && submittedData.length > 0) {
      const newFormattedBirthdayArray = submittedData.map((data) => {
        if (data.birthday) {
          return getFormattedDate(new Date(data.birthday));
        }
        return null;
      });
      setFormattedBirthdayArray(newFormattedBirthdayArray);

      const newFormattedAnniversaryArray = submittedData.map((data) => {
        if (data.anniversary) {
          return getFormattedDate(new Date(data.anniversary));
        }
        return null;
      });
      setFormattedAnniversaryArray(newFormattedAnniversaryArray);

      const newFormattedOtherEventArray = submittedData.map((data) => {
        if (data.othereventdate) {
          return getFormattedDate(new Date(data.othereventdate));
        }
        return null;
      });
      setFormattedOthereventArray(newFormattedOtherEventArray);
    }
  }, [submittedData]);

  //creating a countdown
  const [eventDates, setEventDates] = useState([]);

  submittedData.forEach((data) => {
    if (data.birthday && !eventDates.includes(data.birthday)) {
      eventDates.push(data.birthday);
    } else if (data.anniversary && !eventDates.includes(data.anniversary)) {
      eventDates.push(data.anniversary);
    } else if (
      data.otherevent &&
      data.othereventdate &&
      !eventDates.includes(data.othereventdate)
    ) {
      eventDates.push(data.othereventdate);
    }
  });
  console.log(eventDates);

  function getTimeRemaining(eventDate) {
    const difference = Date.parse(eventDate) - Date.now();
    function convertToDays(difference) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
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
      return days;
    }

    if (
      (specificEventDate !== currentDate && eventMonth === currentMonth) ||
      (difference < 0 && eventDates < currentDates)
    ) {
      const updatedEventDate = addYearToDate(eventDate);
      const difference = Date.parse(updatedEventDate) - Date.now();
      const days = convertToDays(difference);
      return days;
    }

    if (difference < 0 && eventDates > currentDates) {
      const difference = eventDates.getTime() - Date.now();
      const days = convertToDays(difference);
      return days;
    } else if (difference < 0 && eventDates < currentDates) {
      const days = convertToDays(difference);
      return days;
    }
  }

  const remainingTimes = eventDates.map((date) => getTimeRemaining(date));

  console.log(remainingTimes);

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
                  ? `${remainingTime} days left`
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
