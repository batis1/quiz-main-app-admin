import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { SetPopupContext } from "../../App";
import {
  callAxios,
  checkForEmptyInput,
  useAxios,
} from "../../hooks/axiosUtils";

import { server } from "../../lib/apiList";
// import "./user.css";
import { UserContainer } from "./userSC";

export default function User() {
  const [user, setUser] = useState({});

  const { username, email, imageUrl } = user;
  const { userId } = useParams();
  useAxios("get", `user/${userId}`, setUser, (data) => data);

  const setPopup = useContext(SetPopupContext);

  const handleUpdate = async (e) => {
    const [invalid, invalidParams] = checkForEmptyInput(user, [
      "username",
      "email",
    ]);

    if (invalid) {
      setPopup({
        open: true,
        severity: "error",
        message: `${invalidParams.join(", ")} ${
          invalidParams.length > 1 ? "are" : "is"
        } required`,
      });

      return;
    }

    e.preventDefault();
    const { error } = await callAxios(
      "put",
      `user/${userId}`,
      null,
      null,
      user
    );

    if (error) {
      setPopup({
        open: true,
        severity: "error",
        message: `there were an error while updating the user`,
      });
    } else
      setPopup({
        open: true,
        severity: "success",
        message: `user updated successfully`,
      });
  };

  return (
    <UserContainer>
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <Link to="/newUser">
            {/* <button className="userAddButton">Create</button> */}
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={`${server}/${imageUrl}`}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{username}</span>
                {/* <span className="userShowUserTitle">Software Engineer</span> */}
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{username}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">Email</span>
              </div>
              {/* <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">+1 123 456 67</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">New York | USA</span>
              </div> */}
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    // className="userUpdateInput"
                    className="form-input"
                    onChange={(e) =>
                      setUser((data) => ({ ...data, username: e.target.value }))
                    }
                  />
                </div>
                {/* <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Anna Becker"
                    className="userUpdateInput"
                  />
                </div> */}
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    // placeholder="annabeck99@gmail.com"
                    // className="userUpdateInput"
                    className="form-input"
                    value={email}
                    onChange={(e) =>
                      setUser((data) => ({ ...data, email: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={`${server}/${imageUrl}`}
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton" onClick={handleUpdate}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </UserContainer>
  );
}
