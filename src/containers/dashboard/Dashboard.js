import "./dashboard.css";
import balloon from "../../assets/balloon.png";
import heart from "../../assets/heart.png";
import reminder_icon from "../../assets/reminder_icon.png";
import otherevent from "../../assets/otherevent.png";
import React, { useState, useEffect, useRef } from "react";
import NotificationSender from "../../containers/NotificationSender.js";

const Dashboard = (props) => {
  const { submittedData } = props;

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
      if (submittedData) {
        formatDates(submittedData, "birthday", setFormattedBirthdayArray);
        formatDates(submittedData, "anniversary", setFormattedAnniversaryArray);
        formatDates(
          submittedData,
          "othereventdate",
          setFormattedOthereventArray
        );
      }
    }
  }, []);

  const [allFormattedDates, setAllFormattedDates] = useState([]);
  useEffect(() => {
    const newArray = [];
    if (formattedBirthdayArray) {
      newArray.push(...formattedBirthdayArray);
    }
    if (formattedAnniversaryArray) {
      newArray.push(...formattedAnniversaryArray);
    }
    if (formattedOthereventArray) {
      newArray.push(...formattedOthereventArray);
    }
    setAllFormattedDates(newArray.filter(Boolean));
  }, [
    formattedBirthdayArray,
    formattedAnniversaryArray,
    formattedOthereventArray,
  ]);

  console.log(allFormattedDates);

  //creating a countdown
  function addDateToEvent(keyName, submittedData, eventDates) {
    if (Array.isArray(submittedData) && submittedData.length > 0) {
      if (submittedData) {
        submittedData.forEach((data) => {
          if (data[keyName]) {
            const eventDate = new Date(data[keyName]).toDateString();
            eventDates.push(eventDate);
          }
        });
      }
    }
  }

  const eventDates = [];

  addDateToEvent("birthday", submittedData, eventDates);
  addDateToEvent("anniversary", submittedData, eventDates);
  addDateToEvent("othereventdate", submittedData, eventDates);

  //add +1 to current year if event has already passed
  function getNextEventDate(eventDate) {
    const eventMonth = new Date(eventDate).getMonth() + 1;
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();
    const specificEventDate = new Date(eventDate).getDate();

    const eventYear =
      currentMonth > eventMonth ||
      (currentMonth === eventMonth && currentDay > specificEventDate)
        ? currentYear + 1
        : currentYear;
    return new Date(eventYear, eventMonth - 1, specificEventDate);
  }

  // useEffect(() => {
  //   console.log("Child component rendered");
  // }, [props.submittedData]);

  //get days remaining until event
  function getTimeRemaining(eventDate) {
    const difference = Date.parse(eventDate) - Date.now();

    function convertToDays(difference) {
      return Math.ceil(difference / (1000 * 60 * 60 * 24));
    }

    if (difference > 0) {
      const days = convertToDays(difference);
      return { days, difference };
    }

    const nextEventDate = getNextEventDate(eventDate);
    const differenceToNextEventDate = nextEventDate.getTime() - Date.now();

    const days = convertToDays(differenceToNextEventDate);
    return { days, difference: differenceToNextEventDate };
  }

  const remainingTimes =
    eventDates &&
    eventDates.map((date, index) => {
      const eachDate = eventDates[index];
      const remainingTime = getTimeRemaining(eachDate);
      return remainingTime;
    });

  console.log(remainingTimes);

  const reminderValues = submittedData.map((data) => data.reminder);

  const reminderDates =
    eventDates &&
    eventDates.map((eventDate, index) => {
      const reminderValue = reminderValues[index];
      const reminderDate = displayReminderDates(reminderValue, eventDate);
      return reminderDate;
    });

  //format reminder dates based on reminder option/value
  function displayReminderDates(reminderValue, eventDate) {
    const updatedDate = getNextEventDate(eventDate);

    const parts = updatedDate.toString().split(" ");
    const year = parts[3];
    const monthAbbreviation = parts[1];
    const monthMap = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    const month = monthMap[monthAbbreviation];
    const day = parts[2];
    const formattedDate = new Date(`${year}-${month}-${day}`);
    const millisecondsInADay = 24 * 60 * 60 * 1000;

    let reminderDate;

    if (reminderValue === "0") {
      reminderDate = formattedDate;
    } else {
      reminderDate = new Date(
        formattedDate.getTime() - parseInt(reminderValue) * millisecondsInADay
      );
    }

    if (reminderDate) {
      reminderDate = reminderDate.toLocaleString("en-UK").split(", ")[0];
    } else {
      return null;
    }

    return reminderDate;
  }

  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        // inline: "nearest",
      });
    }
  }, [submittedData]);

  const daysRemaining = remainingTimes.map((data) => {
    return data.days;
  });
  const withCountdownandReminderDates = submittedData.map((data, index) => {
    return {
      data,
      countdown: daysRemaining[index],
      reminderDates: reminderDates[index],
      formattedDates: allFormattedDates[index],
    };
  });

  console.log(withCountdownandReminderDates);

  withCountdownandReminderDates.sort((a, b) => a.countdown - b.countdown);

  //adding dynamic container colour change serially with event addition
  const containerColors = ["#F9E1B4", "#9B9BDD", "#EC7689", "#8FC7FF"];

  if (withCountdownandReminderDates) {
    for (let i = 0; i < withCountdownandReminderDates.length; i++) {
      withCountdownandReminderDates[i].backgroundcolor =
        containerColors[i % containerColors.length];
    }
  }

  return (
    <div className="dashboardContainer">
      <NotificationSender
        submittedData={submittedData}
        reminderDates={reminderDates}
      />
      <ul>
        {Array.isArray(withCountdownandReminderDates) &&
          withCountdownandReminderDates.length > 0 &&
          withCountdownandReminderDates &&
          withCountdownandReminderDates.map((obj, index) => {
            const data = obj.data;
            return (
              <div className="allContainers" key={index}>
                <div className="dashboardContent dateDetailsContainer">
                  <div
                    className="dashboardContent eventDate"
                    key={index}
                    style={{
                      color: "black",
                    }}
                  >
                    {obj.formattedDates}
                  </div>
                  <div
                    className="dashboardContent dateSideContainer"
                    style={{ backgroundColor: obj.backgroundcolor }}
                  ></div>
                </div>
                <div
                  className="dashboardContent eventName"
                  style={{ backgroundColor: obj.backgroundcolor }}
                >
                  <div className="eventIcon" key={data.index}>
                    {displayIcon(data)}
                  </div>

                  <div className="eventType" key={data.index}>
                    {obj.data.firstname} {obj.data.lastname}
                    {obj.data.otherevent}
                    <div className="reminder_img">
                      <img src={reminder_icon} alt="reminder_icon" />
                    </div>
                    <div className="reminders" key={index}>
                      {obj.reminderDates}
                    </div>
                  </div>
                </div>

                <div
                  className="dashboardContent eventCountdown"
                  key={index}
                  style={{
                    backgroundColor: obj.backgroundcolor,
                  }}
                >
                  {" "}
                  <div className="countdownContainer">
                    {obj.countdown === -0
                      ? "🎉Today's the day! 🎉"
                      : obj.countdown === 1
                      ? `${obj.countdown} day left`
                      : `${obj.countdown} days left`}
                  </div>
                </div>
              </div>
            );
          })}
        <div className="scrollTo" ref={messageRef}></div>
      </ul>
    </div>
  );
};

export default Dashboard;
