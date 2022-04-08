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

export default function Tutor() {
  const [user, setUser] = useState({});

  //   const { username, email, imageUrl } = user;
  const { tutorId } = useParams();
  useAxios("get", `tutors/${tutorId}`, setUser, ({ doc }) => doc);

  const setPopup = useContext(SetPopupContext);

  const handleUpdate = async (e) => {
    const [invalid, invalidParams] = checkForEmptyInput(user, [
      "hskLevel",
      "teachingPeriod",
      "teachingTime",
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
      `tutors/${tutorId}`,
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
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>HSK Level</label>
                  <input
                    type="text"
                    value={user.hskLevel}
                    // className="userUpdateInput"
                    className="form-input"
                    onChange={(e) =>
                      setUser((data) => ({ ...data, hskLevel: e.target.value }))
                    }
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Category</label>
                  <select
                    name="inStock"
                    id="idStock"
                    value={user.status}
                    style={{ padding: "0.6rem", borderRadius: "5px" }}
                    onChange={(e) =>
                      setUser((data) => ({ ...data, status: e.target.value }))
                    }
                  >
                    <option value="applied">Applied</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    {/* {readerOptions(["Reading", "Writing", "Listing"], input.category)} */}
                  </select>
                </div>
                <div className="userUpdateItem">
                  <label>Educational background</label>
                  <input
                    type="text"
                    // placeholder="annabeck99@gmail.com"
                    // className="userUpdateInput"
                    className="form-input"
                    value={user.educationalBackground}
                    onChange={(e) =>
                      setUser((data) => ({
                        ...data,
                        educationalBackground: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Teaching period</label>
                  <input
                    type="text"
                    // placeholder="annabeck99@gmail.com"
                    // className="userUpdateInput"
                    className="form-input"
                    value={user.teachingPeriod}
                    onChange={(e) =>
                      setUser((data) => ({
                        ...data,
                        teachingPeriod: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Teaching period</label>
                  <input
                    type="text"
                    // placeholder="annabeck99@gmail.com"
                    // className="userUpdateInput"
                    className="form-input"
                    value={user.teachingPeriod}
                    onChange={(e) =>
                      setUser((data) => ({
                        ...data,
                        teachingPeriod: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="userUpdateItem">
                  <label>More Info</label>
                  <input
                    type="text"
                    // placeholder="annabeck99@gmail.com"
                    // className="userUpdateInput"
                    className="form-input"
                    value={user.moreInfo}
                    onChange={(e) =>
                      setUser((data) => ({ ...data, moreInfo: e.target.value }))
                    }
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Zoom's room ID</label>
                  <input
                    type="text"
                    // placeholder="annabeck99@gmail.com"
                    // className="userUpdateInput"
                    className="form-input"
                    value={user.zoomRoomID}
                    onChange={(e) =>
                      setUser((data) => ({
                        ...data,
                        zoomRoomID: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={`${server}/${user?.userId?.imageUrl}`}
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
