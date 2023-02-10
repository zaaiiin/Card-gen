import React from "react";
import "./dashboard.css";
import balloon from "../../assets/balloon.png";
import heart from "../../assets/heart.png";
import otherevent from "../../assets/otherevent.png";

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

  console.log(submittedData);
  return (
    <div className="dashboardContainer">
      <ul>
        {submittedData.map((data, index) => {
          return (
            <div className="allContainers" key={index}>
              <div className="dashboardContent dateDetailsContainer">
                <div className="dashboardContent eventDate">
                  {data.birthday}
                  {data.anniversary}
                  {data.othereventdate}
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
