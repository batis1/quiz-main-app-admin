import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import profile from "../../Images/profile.jpg";
import { Switch } from "antd";
import { useHistory } from "react-router-dom";
export default function Topbar() {
  const switchTheme = (props) => {
    const newTheme = props.theme === "light" ? "dark" : "light";
    props.setTheme(newTheme);
    // props.setIsThemeChange(true);
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">DASHBOARD</span>
        </div>

        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          {/* <div className="topbarIconContainer">
            <Settings />
          </div> */}
          <img src={profile} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
