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
import Loading from "../../components/Loading/Loading";
import { callAxios, useAxios } from "../../hooks/axiosUtils";
// import "./user.css";
import { UserContainer } from "./userSC";

export default function NewWord() {
  const [word, setWord] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { character, pinyin, englishTranslation, sentence } = word;

  const { lessonId } = useParams();
  const setPopup = useContext(SetPopupContext);
  const handleCreate = (e) => {
    e.preventDefault();
    callAxios("post", `words`, null, null, { ...word, lessonId });
    setPopup({
      open: true,
      severity: "success",
      message: "word created successfully",
    });
  };

  //   return isLoading ? (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         width: "100%",
  //         height: "30rem",
  //         marginRight: "10rem",
  //       }}
  //     >
  //       <Loading />
  //     </div>
  //   ) : (
  return (
    <UserContainer>
      <div className="user">
        {/* <div className="userTitleContainer">
        <h1 className="userTitle">Edit Word</h1>
        <Link to="/newWord">
          <button className="userAddButton">Create</button>
        </Link>
      </div> */}
        <div className="userContainer">
          <div className="wordCreate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Characters</label>
                  <input
                    type="text"
                    placeholder="Please enter Characters"
                    value={character}
                    // className="userUpdateInput"
                    className="form-input"
                    onChange={(e) =>
                      setWord((data) => ({
                        ...data,
                        character: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Pinyin</label>
                  <input
                    value={pinyin}
                    onChange={(e) =>
                      setWord((data) => ({ ...data, pinyin: e.target.value }))
                    }
                    placeholder="Please enter pinyin"
                    type="text"
                    // placeholder="Anna Becker"
                    // className="userUpdateInput"
                    className="form-input"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>English</label>
                  <input
                    type="text"
                    placeholder="Please enter the translation"
                    // className="userUpdateInput"
                    className="form-input"
                    value={englishTranslation}
                    onChange={(e) =>
                      setWord((data) => ({
                        ...data,
                        englishTranslation: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Sentence</label>
                  <input
                    value={sentence}
                    onChange={(e) =>
                      setWord((data) => ({
                        ...data,
                        sentence: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="Please enter a sentence"
                    // className="userUpdateInput"
                    className="form-input"
                  />
                </div>
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
                {/* <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div> */}
              </div>
            </form>
            <button className="wordCreateButton" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
      </div>
    </UserContainer>
  );
  //   );
}
