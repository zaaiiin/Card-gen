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

  const suffixes = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];

  function getFormattedDate(date) {
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

  console.log(submittedData);
  return (
    <div className="dashboardContainer">
      <ul>
        {submittedData.map((data, index) => {
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
                style={{ backgroundColor: data.backgroundcolor }}
              >
                59 days left
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboard;
