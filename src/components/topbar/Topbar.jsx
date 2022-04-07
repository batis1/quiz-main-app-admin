import React, { useContext } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import profile from "../../Images/profile.jpg";
import { Switch } from "antd";
import { useHistory } from "react-router-dom";
import { actions, GlobalContext } from "../../App";
export default function Topbar() {
  const switchTheme = (props) => {
    const newTheme = props.theme === "light" ? "dark" : "light";
    props.setTheme(newTheme);
    // props.setIsThemeChange(true);
  };

  const { _, dispatch } = useContext(GlobalContext);

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
          <div
            className="topbarIconContainer"
            onClick={() => {
              sessionStorage.clear();
              dispatch({ type: actions.SET_USER, payload: { user: null } });
            }}
          >
            logout
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
