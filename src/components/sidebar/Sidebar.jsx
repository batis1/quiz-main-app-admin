import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  QuestionAnswerRounded,
  CastForEducationOutlined,
  TranslateRounded,
  SchoolRounded,
  ScoreOutlined,
  CloseOutlined,
  MenuOutlined,
  SwapHorizontalCircleSharp,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Switch } from "@material-ui/core";
// import { Switch } from "antd";

export default function Sidebar(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const switchTheme = () => {
    const newTheme = props.theme === "light" ? "dark" : "light";
    props.setTheme(newTheme);
    // props.setIsThemeChange(true);
  };
  const handleToggle = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="sidebar">
      <button className="sidebar-button" onClick={handleToggle}>
        {menuOpen ? (
          <CloseOutlined className="navbar-icon" />
        ) : (
          <MenuOutlined className="navbar-icon" />
        )}
      </button>
      <div className="sidebarWrapper">
        <div className={`menuNav ${menuOpen ? "showMenu" : ""}`}>
          <div className="sidebarMenu">
            {/* <h3 className="sidebarTitle">Dashboard</h3> */}
            {/* <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul> */}
          </div>
          <div className="sidebarMenu">
            {/* <h3 className="sidebarTitle">Dashboard</h3> */}
            <ul className="sidebarList">
              <Link to="/users" className="link">
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  USERS
                </li>
              </Link>
              <Link to="/questions" className="link">
                <li className="sidebarListItem">
                  <QuestionAnswerRounded className="sidebarIcon" />
                  QUESTIONS
                </li>
              </Link>
              <li className="sidebarListItem">
                <ScoreOutlined className="sidebarIcon" />
                SCORES
              </li>
              <Link to="/lessons" className="link">
                <li className="sidebarListItem">
                  <CastForEducationOutlined className="sidebarIcon" />
                  LESSONS
                </li>
              </Link>
              {/* <li className="sidebarListItem">
                <TranslateRounded className="sidebarIcon" />
                WORDS
              </li> */}
              <Link to="/tutors" className="link">
                <li className="sidebarListItem">
                  <SchoolRounded className="sidebarIcon" />
                  TUTORS
                </li>
              </Link>
            </ul>
            <div>
              <Switch
                defaultChecked
                onChange={switchTheme}
                className="switch-theme-toggle"
                color="default"
              />
              {/* <h2>{props.theme === "light" ? "Light" : "Dark"} Theme</h2> */}
              {/* <i onClick={switchTheme} class="fas fa-toggle-on"></i> */}
            </div>
          </div>
          {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div> */}
          <div className="sidebarMenu">
            {/* <h3 className="sidebarTitle">Staff</h3> */}
            {/* <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
}
