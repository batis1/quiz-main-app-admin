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
  handleAxiosError,
  useAxios,
} from "../../hooks/axiosUtils";
import { Form, Input, Space, Button } from "antd";

// import "./user.css";
import { UserContainer } from "./userSC";

export default function NewLesson() {
  const [lesson, setLesson] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [grammars, setGrammars] = useState([]);

  // const { title, iconName } = lesson;
  //   const { lessonId } = useParams();
  //   useAxios(
  //     "get",
  //     `lessons/${lessonId}`,
  //     setLesson,
  //     (data) => data.doc,
  //     null,
  //     setIsLoading
  //   );

  //   useEffect(() => {
  //     // console.log(lesson.grammarsUrl);
  //     setGrammars(
  //       lesson?.grammarsUrl
  //         ? lesson.grammarsUrl.map((url, index) => ({ url, id: `id-${index}` }))
  //         : []
  //     );
  //   }, [isLoading]);
  const setPopup = useContext(SetPopupContext);

  const handleCreate = async (e) => {
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

    const { error } = await callAxios("post", `lessons`, null, null, {
      ...lesson,
      grammarsUrl: grammars.map(({ url }) => url),
    });

    console.log({ error });
    if (error) {
      handleAxiosError(error, setPopup);

      return;
    }

    setPopup({
      open: true,
      severity: "success",
      message: "lesson created successfully",
    });
    setLesson({ title: "" });
    setGrammars([]);
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
    <UserContainer>
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Add Lesson</h1>
          {/* <Link to="/newLesson">
          <button className="userAddButton">Create</button>
        </Link> */}
        </div>
        <div className="userContainer">
          <div className="userCreate">
            <span className="userUpdateTitle">Add</span>
            <div className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Title</label>
                  <Input
                    type="text"
                    value={lesson.title}
                    className="form-input"
                    placeholder="Please input the lesson title"
                    onChange={(e) =>
                      setLesson((data) => ({
                        ...data,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Grammar</label>
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
                <button className="userCreateButton" onClick={handleCreate}>
                  create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserContainer>
  );
}
