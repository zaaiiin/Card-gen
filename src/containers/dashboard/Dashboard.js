import React from "react";
import "./dashboard.css";
import balloon from "../../assets/balloon.png";
// import heart from "../../assets/heart.png";
// import otherevent from "../../assets/otherevent.png";

const Dashboard = (props) => {
  const { submittedData } = props;
  console.log(submittedData);
  return (
    // <div className="dashboardContainer">
    //   <ul>
    //   {submittedData.map((data, index) => {
    //     return (
    //       <div className="allContainers" key={index}>
    //         {data.firstname} {data.lastname} {data.birthday} &nbsp; &nbsp;
    //         {data.anniversary} {data.otherevent} &nbsp;
    //         {data.othereventdate}
    //       </div>
    //     );
    //   })}
    //   </ul>
    // </div>

    <div className="dashboardContainer">
      <ul>
        {submittedData.map((data, index) => {
          return (
            <div className="allContainers" key={index}>
              {" "}
              <div className="dashboardContent dateDetailsContainer">
                <div className="dashboardContent eventDate">
                  {data.birthday}
                  {data.anniversary}
                  {data.othereventdate}
                </div>
                <div className="dashboardContent dateSideContainer"></div>{" "}
              </div>
              <div className="dashboardContent eventName">
                <div className="eventIcon">
                  <img src={balloon} className="iconImage" id="balloon"></img>
                </div>
                <div className="eventType">
                  {data.firstname} {data.lastname}
                  {data.otherevent}
                </div>
              </div>
              <div className="dashboardContent eventCountdown">
                59 days left
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

/* <div className="allButtons">

      
  
<button className="allClear" onClick={allClear}>AC</button>



<button className="operators" onClick={operatorType}>/</button>
<button className="digits" onClick={inputNum} >7</button> */

export default Dashboard;
