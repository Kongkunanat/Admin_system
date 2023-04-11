import React from "react";

import { Link } from "react-router-dom";
import profileImg from "../../assets/images/profile-02.png";
import "./top-nav.css";

const TopNav = () => {
  return (
    <div className="top__nav">
      <div className="top__nav-wrapper">
        
        <div className="top__nav-right">
          <div className="profile">
              <img src={profileImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
