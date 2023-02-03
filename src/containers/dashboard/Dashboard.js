import React from "react";
import "./dashboard.css";

const Dashboard = (props) => {
  const { submittedData } = props;
  console.log(submittedData);
  return (
    <div className="dashboardContainer">
      <ul>
        {submittedData.map((data, index) => {
          return (
            <li key={index}>
              {data.firstname} {data.lastname} {data.birthday}
            </li>
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
