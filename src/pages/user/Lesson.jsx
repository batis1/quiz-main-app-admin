import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { SetPopupContext } from "../../App";
import { InputArray } from "../../components/InputArray";
import Loading from "../../components/Loading/Loading";
import {
  callAxios,
  checkForEmptyInput,
  useAxios,
  handleAxiosError,
} from "../../hooks/axiosUtils";
import "./user.css";

export default function Lesson() {
  const [lesson, setLesson] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [grammars, setGrammars] = useState([]);

  const { title, iconName } = lesson;
  const { lessonId } = useParams();
  useAxios(
    "get",
    `lessons/${lessonId}`,
    setLesson,
    (data) => data.doc,
    null,
    setIsLoading
  );

  useEffect(() => {
    // console.log(lesson.grammarsUrl);
    setGrammars(
      lesson?.grammarsUrl
        ? lesson.grammarsUrl.map((url, index) => ({ url, id: `id-${index}` }))
        : []
    );
  }, [isLoading]);

  const setPopup = useContext(SetPopupContext);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const [invalid, invalidParams] = checkForEmptyInput(lesson, ["title"]);

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

    const { error } = await callAxios(
      "put",
      `lessons/${lessonId}`,
      null,
      null,
      {
        ...lesson,
        grammarsUrl: grammars.map(({ url }) => url),
      }
    );

    console.log("here🎈🎈");
    console.log({ error });

    if (error) {
      handleAxiosError(error, setPopup);

      return;
    }

    setPopup({
      open: true,
      severity: "success",
      message: "lesson updated successfully",
    });
  };

  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "30rem",
        marginRight: "10rem",
      }}
    >
      <Loading />
    </div>
  ) : (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Word</h1>
        <Link to="/newLesson">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              {/* <span className="userShowUsername">{username}</span> */}
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{title}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{iconName}</span>
            </div>

            {/* <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{englishTranslation}</span>
            </div> */}

            {/* <span className="userShowTitle">{englishTranslation}</span> */}
            {/* <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{sentence}</span>
            </div> */}
            {/* <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{sentence}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">New York | USA</span>
              </div> */}
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <div className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  className="userUpdateInput"
                  onChange={(e) =>
                    setLesson((data) => ({
                      ...data,
                      title: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="userUpdateItem">
                <label>grammars</label>
                <InputArray array={grammars} setArray={setGrammars} />
              </div>
              {/* <div className="userUpdateItem">
                <label>English</label>
                <input
                  type="text"
                  // placeholder="annabeck99@gmail.com"
                  className="userUpdateInput"
                  value={englishTranslation}
                  onChange={(e) =>
                    setLesson((data) => ({
                      ...data,
                      englishTranslation: e.target.value,
                    }))
                  }
                />
              </div> */}
              {/* <div className="userUpdateItem">
                <label>Sentence</label>
                <input
                  value={sentence}
                  onChange={(e) =>
                    setLesson((data) => ({
                      ...data,
                      sentence: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div> */}
              {/* <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="New York | USA"
                    className="userUpdateInput"
                  />
                </div> */}
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
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
          </div>
        </div>
      </div>
    </div>
  );
}
