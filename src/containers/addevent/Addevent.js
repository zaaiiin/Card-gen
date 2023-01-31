import React from "react";
import { Link } from "react-router-dom";

import logoandname from "../../assets/logoandname.png";

const Addevent = () => {
  return (
    <div className="about_wrapper">
      <div className="homepage_header">
        <div className="homepage_header--image">
          <Link to="/">
            <img src={logoandname} alt="logoandname" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Addevent;
